// compresses images in public in place. keeps the same filename and format so
// nothing in the code needs to change, and downscales anything wider than we
// could ever show so big source files dont sit in the repo.
//
// next/image still serves a right sized webp/avif per device at request time,
// this just stops bloated sources from getting committed in the first place.
//
// run on everything:   npm run optimize:images
// run on one folder:    node scripts/optimize-images.mjs public/hero
//
// drop new images into public, then run this before you commit them.

import sharp from "sharp";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

// nothing in the ui is wider than this even on the largest desktop layout, and
// mobile uses a fraction of it. anything bigger is just wasted bytes.
const MAX_WIDTH = 1600;

// re encode quality, good enough that you cannot tell at screen sizes.
const QUALITY = 80;

const EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

// only rewrite a file when the saving is big. a fresh unoptimised source saves
// 50 to 99 percent, an already optimised one barely budges, so this skips files
// we have already done and stops repeat runs from slowly re quantising them.
const MIN_SAVING = 0.25;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (EXTS.has(extname(entry.name).toLowerCase())) out.push(p);
  }
  return out;
}

async function optimize(file) {
  const input = await readFile(file);
  const ext = extname(file).toLowerCase();
  const img = sharp(input, { failOn: "none" });
  const meta = await img.metadata();

  const resized = meta.width > MAX_WIDTH;

  // a png we have already done is an 8 bit palette image. re quantising it just
  // stacks more dithering noise every run, so leave it alone unless it still
  // needs a resize. a fresh truecolor png has no palette and falls through.
  if (ext === ".png" && meta.paletteBitDepth && !resized) {
    return { file, before: input.length, after: input.length, skipped: true };
  }

  let pipeline = img;
  if (resized) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".png") {
    // palette + dither keeps illustrations and ui art tiny without visible banding.
    pipeline = pipeline.png({ compressionLevel: 9, effort: 10, palette: true, quality: QUALITY });
  } else if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: QUALITY });
  }

  const output = await pipeline.toBuffer();
  const saving = (input.length - output.length) / input.length;
  if (saving < MIN_SAVING) return { file, before: input.length, after: input.length, skipped: true };

  await writeFile(file, output);
  return { file, before: input.length, after: output.length, saving, resized };
}

const kb = (n) => (n / 1024).toFixed(1) + "kb";

const targets = process.argv.slice(2).length ? process.argv.slice(2) : ["public"];
const files = (await Promise.all(targets.map(walk))).flat();

let before = 0;
let after = 0;
for (const f of files) {
  const r = await optimize(f);
  before += r.before;
  after += r.after;
  if (r.skipped) {
    console.log(`skip  ${r.file}  ${kb(r.before)} already lean`);
  } else {
    const tag = r.resized ? " (resized)" : "";
    console.log(`done  ${r.file}  ${kb(r.before)} -> ${kb(r.after)}  -${Math.round(r.saving * 100)}%${tag}`);
  }
}
console.log(`\ntotal ${kb(before)} -> ${kb(after)}  -${Math.round(((before - after) / before) * 100)}%`);
