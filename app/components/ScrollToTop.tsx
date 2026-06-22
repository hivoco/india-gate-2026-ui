"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { FaChevronUp } from "react-icons/fa";
import { useIsHomePage } from "../hooks/useIsHomePage";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import QuatrefoilPattern from "./QuatrefoilPattern";

type ScrollToTopProps = {
  label?: string;
  className?: string;
};

const ScrollToTop = ({
  label = "Scroll to top",
  className,
}: ScrollToTopProps) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isHome = useIsHomePage();
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative isolate flex items-center gap-4 bg-white  sm:py-16",
        // image pins left and button pins right on home, otherwise the button hugs the right
        isHome ? "justify-between pr-4 pt-12" : "justify-end px-4 py-12 overflow-hidden",
      )}
    >
      <QuatrefoilPattern className=" sm:bottom-auto  sm:h-[75%]" />

      {isHome && (
        // drives in from the right edge of the screen to its resting spot, like a scooter rolling in
        <motion.div
          initial={reduceMotion ? false : { x: "45vw" }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/family-scooter.png"
            alt="Family riding a scooter"
            width={192}
            height={138}
            loading="lazy"
            className=" h-auto w-48"
          />
        </motion.div>
      )}

      <Button
        type="button"
        variant="soft"
        onClick={handleClick}
        aria-label={label}
        className={cn(
          "group h-auto gap-2.5 sm:gap-4 rounded-lg sm:rounded-xl px-4 py-2 sm:px-4 sm:py-2.5 font-sans text-base sm:text-xl font-bold shadow-xl backdrop-blur-lg",
          // off home, drop it down a bit so it does not crowd the top edge
          !isHome && "mb-6 sm:mb-8",
          className,
        )}
      >
        <span>{label}</span>
        {/* wrapped so the button's has-[>svg] padding rule stays off, our px wins */}
        <span className="inline-flex">
          <FaChevronUp
            aria-hidden
            className="size-3 sm:size-5 transition-transform group-hover:-translate-y-0.5"
          />
        </span>
      </Button>

      {/* decorative maroon strip pinned to the bottom edge */}
      <Image
        src="/brown-patti.png"
        alt=""
        aria-hidden
        width={1641}
        height={67}
        loading="lazy"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-auto w-full"
      />
    </section>
  );
};

export default ScrollToTop;
