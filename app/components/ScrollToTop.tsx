"use client";

import { FaChevronUp } from "react-icons/fa";
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

  return (
    <section className="relative isolate grid place-items-center bg-white px-4 py-12  sm:py-16">
      <QuatrefoilPattern className=" sm:bottom-auto  sm:h-[75%]" />

      <Button
        type="button"
        variant="soft"
        onClick={handleClick}
        aria-label={label}
        className={cn(
          "group h-auto gap-2.5 sm:gap-4 rounded-lg sm:rounded-xl px-4 py-2 sm:px-4 sm:py-2.5 font-sans text-base sm:text-xl font-bold shadow-xl backdrop-blur-lg",
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
    </section>
  );
};

export default ScrollToTop;
