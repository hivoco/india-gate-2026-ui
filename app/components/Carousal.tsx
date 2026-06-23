"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

// each slide carries a mobile and a desktop shot, the desktop ones kick in at sm
const slides = [
  {
    mobile: "/hero/hero-mobile-1.png",
    desktop: "/hero/hero-desktop-1.png",
    alt: "India Gate basmati hero one",
  },
  {
    mobile: "/hero/hero-mobile-2.png",
    desktop: "/hero/hero-desktop-2.png",
    alt: "India Gate basmati hero two",
  },
];

const Carousal = () => {
  const [selected, setSelected] = useState(0); // probbaly need to make a use carousal hook returns prev next selected and accepts array
    const reduceMotion = useReducedMotion();
  const current = slides[selected];
  const prev = () => {
    setSelected((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const next = () => {
    setSelected((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };


  useEffect(() => {
    if (reduceMotion) return;
    const timer = setTimeout(next, 5000);
    return () => clearTimeout(timer);
  }, [selected, reduceMotion]);

  return (
    <motion.div
      className="sm:pt-6"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* relative box that hugs the hero image so every absolute element below sits
          against the image, not the padded outer. keeps its mobile padding so the
          mobile layout is untouched, drops it from sm up so it wraps the image tight */}
      <div className="relative p-6 pb-0 sm:p-0">
        <button
          type="button"
          aria-label="Open menu"
          className="absolute sm:hidden right-10 top-10  border border-white text-white p-1 rounded-lg"
        >
          <Menu className="size-7" />
        </button>

        <button
          onClick={prev}
          type="button"
          aria-label="Previous slide"
          className="absolute left-4 top-[49.5%] sm:top-1/2 sm:left-0 -translate-y-1/2  text-primary"
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          onClick={next}
          type="button"
          aria-label="Next slide"
          className="absolute right-4 top-[49.5%] sm:top-1/2 sm:right-0 -translate-y-1/2  text-primary"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* mobile hero, hidden once we hit sm */}
        <Image
          key={current.mobile}
          src={current.mobile}
          alt={current.alt}
          width={350}
          height={650}
          priority
          className="w-full h-auto sm:hidden"
        />

        {/* desktop hero, kicks in from sm up */}
        <Image
          key={current.desktop}
          src={current.desktop}
          alt={current.alt}
          width={1221}
          height={624}
          priority
          className="hidden w-full h-auto sm:block"
        />

        <Link href="/" aria-label="India Gate — home">
          <Image
            src="/ig-classic-assets/logo.png"
            alt="India Gate"
            width={68}
            height={88}
            priority
            className="h-auto w-12 sm:w-16  absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2  sm:hidden"
          />
        </Link>

        {/* carousel dots */}
        <div className="absolute bottom-2 sm:bottom-1 left-1/2 flex -translate-x-1/2 gap-1 ">
          {slides.map((_, i) => (
            <Button
              key={i}
              variant="ghost"
              size="icon"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={selected === i}
              // dot is fully custom, twMerge lets these win over the button base
              className={cn(
                "size-2 rounded-full transition-colors cursor-pointer",
                selected === i
                  ? "bg-primary hover:bg-primary"
                  : "bg-primary/25 hover:bg-primary/40",
              )}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Carousal;
