"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import SectionHeading from "../products/classic/SectionHeading";

// instagram serves a self contained embed at /{p|reel|tv}/SHORTCODE/embed, so
// pull the post type and shortcode out of whatever permalink shape we get and
// point an iframe straight at it. no embed.js, no client side processing.
const toEmbedSrc = (url: string) => {
  const match = url.match(/\/(p|reel|tv)\/([^/?#]+)/);
  return match
    ? `https://www.instagram.com/${match[1]}/${match[2]}/embed`
    : url;
};

// made with india gate, an official instagram post embed sitting in a card with
// the family illustration tucked behind its lower edge. pass the post or reel
// permalink as url for the mobile single post.

// the four community posts shown as a row on desktop only. mobile stays the
// single old post passed via url.
const DESKTOP_POSTS = [
  "https://www.instagram.com/indiagatefoods/p/DYpJkj7lBvF/?img_index=5",
  "https://www.instagram.com/indiagatefoods/p/DZui6MslMjO/",
  "https://www.instagram.com/indiagatefoods/p/DZPN2p3lL4i/",
  // "https://www.instagram.com/indiagatefoods/p/DY3w1iClKz3/",
];

const MadeWithIndiaGate = ({ url }: { url: string }) => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate py-6 sm:py-10">
      <SectionHeading title="Made With India Gate" />

      {/* mobile, single embed card pulled down so it overlaps the illustration. hidden from sm up */}
      <div className="relative z-10 mx-auto -mb-12 bor  mt-8  w-[min(420px,90vw)] overflow-hidden rounded-2xl  border-black/10 bg-white shadow-sm sm:mb-0 sm:hidden">
        <iframe
          src={toEmbedSrc(url)}
          title="Made With India Gate instagram post"
          loading="lazy"
          allowFullScreen
          className="block w-full min-h-[70svh]"
        />
      </div>

      {/* desktop, a row of four community posts. hidden below sm */}
      <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2  md:grid-cols-3">
        {DESKTOP_POSTS.map((post) => (
          <div
            key={post}
            className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
          >
            <iframe
              src={toEmbedSrc(post)}
              title="Made With India Gate instagram post"
              loading="lazy"
              allowFullScreen
              className="block h-150 w-full"
            />
          </div>
        ))}
      </div>

      {/* family illustration, full width at the bottom, behind the card. mobile only, hidden from sm up */}
      <motion.div
        className="pointer-events-none relative z-10 block w-full overflow-hidden sm:hidden"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src="/family-sharing-meal.png"
          alt="A family sharing a meal of India Gate rice"
          width={1000}
          height={520}
          loading="lazy"
          className="block h-auto w-full"
        />
      </motion.div>
    </section>
  );
};

export default MadeWithIndiaGate;
