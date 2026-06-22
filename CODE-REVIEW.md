# Code Review — India Gate site

Full-codebase review (23 source files, ~1.8k lines). 72 candidate findings were
put through an adversarial verification pass across 8 dimensions (dry, bugs,
types, a11y, react/next, tailwind, conventions, structure). 68 held up, 4 were
thrown out. Verified independently with `npx eslint .` and grep.

Date: 2026-06-13

## Verdict

For a UI-only marketing site this is in good shape: clean component boundaries,
correct Tailwind v4 / Next 16 / React 19 idioms, thoughtful a11y in places
(FAQ accordion wiring, `useReducedMotion`, `aria-pressed` on thumbnails), and
comments that explain the why. Nothing is a safety risk. Most findings are
polish; a handful are real defects.

---

## Types and API quality

### 1. Shared domain types live in a leaf component (deferred)
`app/products/classic/HeroSection.tsx`

`PackLabel` / `PackSize` / `Pack` and the `PACKS` const are exported from the
hero and imported by `ProductGallery` and `BuyOptions` (inverted dependency).
Worth extracting to a small `app/products/classic/packs.ts`. Deferred for now,
the types are kept colocated in `HeroSection` by choice.

---

## DRY / reuse

- Section shell repeated 5x (`relative isolate overflow-hidden` + `QuatrefoilPattern`
  bands + inner container) across Flagship/PairsWellWith/ExploreUniverse/Range/Faqs.
  Optional `PatternSection` wrapper. Nice-to-have, the variance is partly intentional.
- Gallery data: 4 of 7 thumbs are byte-identical between 1KG/5KG
  (`app/products/classic/ProductGallery.tsx:33-51`); title/tagline duplicated across
  hero + gallery. Low priority static-data dedup.

---

## Accessibility

- Buy Now disclosure `app/products/classic/HeroSection.tsx:172` toggles the
  retailer panel with no `aria-expanded`/`aria-controls`. (medium)
- Pack selector `app/products/classic/BuyOptions.tsx:28-55` conveys selection only
  by color, add `aria-pressed` (you already do this on gallery thumbnails). (medium)
- No skip-to-content link in `app/layout.tsx:46-51`, keyboard users tab the whole
  nav first.
- Two `<h1>` in the DOM (hero desktop + gallery mobile, toggled by `sm:hidden`).
  Runtime a11y is fine (display:none drops it from the tree); only static linters
  complain.
- Focus-visible rings missing on `NavArrow`, pack buttons, Buy Now, the header
  hamburger, and thumbnail buttons.

Caveat: v4 preflight does not strip the native outline, so the focus-ring items
are contrast/consistency polish, not "zero focus indicator."

---

## Conventions and nits

- Comments break the lowercase / no-em-dash rule in `QuatrefoilPattern`, `Footer`,
  `SectionHeading`, `BagIcon`, `utils.ts`, `Faqs`, `Range`, `PairsWellWith`,
  `ExploreUniverse`. (Em dashes in marketing copy and aria-labels are content and
  are fine.)
- Dead commented-out code: stray `{/* */}` block
  `app/components/QuatrefoilPattern.tsx:16-18`, commented second band
  `app/components/Faqs.tsx:52`, commented chevrons + orphan `// //` notes in
  `app/products/classic/ProductGallery.tsx:95,100,161,194`.
- `};;` `app/products/classic/Range.tsx:129`; single-quoted `'use client'`
  `app/products/classic/HeroSection.tsx:1` (every other client file uses
  `"use client";`).
- `ring-0 ring-black/5` `app/components/Footer.tsx:46`, `ring-0` cancels the ring;
  the color is dead. Pick `ring-1` or drop both.
- Off-brand neutrals vs the "black is the only neutral" rule: `divide-gray-200`
  (`app/components/Faqs.tsx:70`), `text-gray-500`
  (`app/products/classic/BuyOptions.tsx:50`).
- Pervasive stray double/trailing spaces in className strings. Add
  `prettier-plugin-tailwindcss` to normalize whitespace + class order on save and
  most of these disappear.
- Magic `+ 72` stage height `app/components/Coverflow.tsx:125`. Promote to a named
  tunable like the others in that file.

---

## Cleared (verified, not issues)

- Tailwind v4 usage is correct: `px-25`, `leading-4.5`, `bg-linear-to-r`,
  `bg-size-[auto_100%]`, `border-(--accent)` are all valid v4.
- `new Date().getFullYear()` in the server-rendered Footer, no hydration risk.
- External retailer links use `rel="noopener noreferrer"`, no tabnabbing. No
  `dangerouslySetInnerHTML`, no user input, safety surface is clean.
- `as CSSProperties` for `--accent`, inline data consts, and `Body.tsx` as a thin
  wrapper are idiomatic / intentional. No `max-lines-per-function` violations.

---

## Suggested fix order

1. Quick unambiguous pass: `};;`, contradictory ring, dead comments.
2. Reviewable second batch: extract pack types to `packs.ts` (#1), a11y additions.
