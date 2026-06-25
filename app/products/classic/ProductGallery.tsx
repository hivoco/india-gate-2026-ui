"use client";
import Image from "next/image";
import { useState } from "react";
import NavArrow from "../../components/ui/NavArrow";
import { cn } from "../../lib/utils";
import type { PackLabel } from "./HeroSection";

export type Thumb = {
  id: string;
  src: string;
  alt: string;
};

//this comp is  left on the desktop
const ProductGallery = ({
  currentPack,
  gallery,
}: {
  currentPack: PackLabel;
  // one full list per pack, just read gallery[currentPack] and map over it
  gallery: Record<PackLabel, Thumb[]>;
}) => {
  const thumbs = gallery[currentPack];
  const [selectedIndex, setSelectedIndex] = useState(0);
  // gallery toggle md

  // pick by position, fall back to the first if the pack has fewer shots
  const selected = thumbs[selectedIndex] ?? thumbs[0];

  // // mobile arrows step through the same list, wrapping at both ends
  const handleDirection = (dir: "left" | "right") =>
    setSelectedIndex((prev) => {
      if (dir === "left" && prev > 0) {
        return prev - 1;
      } else if (dir === "right" && prev < thumbs.length - 1) {
        return prev + 1;
      }
      return prev;
    });

  return (
    <div className="flex flex-col gap-4 sm:justify-between  sm:h-full">
      {/* mobile only title, the desktop one lives in HeroSection's right column */}
      <header className="flex flex-col gap-1.5 sm:hidden mx-auto">
        <h1 className="font-display text-3xl leading-tight text-primary font-semibold">
          Classic Basmati Rice
        </h1>
        <p className="text-base font-bold text-black">
          2 Years Perfectly Aged | The Gold Standard
        </p>
        <Image
          src="/ig-classic-assets/pattern-icon.png"
          alt=""
          width={262}
          height={28}
          loading="lazy"
          className="mx-auto mt-4 block h-5 w-auto"
        />
      </header>

      {/* Main viewer */}
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        {/* nav arrows show on mobile only, the thumbnail strip takes over from sm up */}

        <Image
          src={selected.src}
          alt={selected.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          priority
          className="object-contain mix-blend-multiply"
        />

        <NavArrow
          direction="left"
          size="sm"
          label="Previous image"
          disabled={selectedIndex === 0}
          onClick={() => handleDirection("left")}
          className="md:hidden"
        />
        <NavArrow
          direction="right"
          size="sm"
          label="Next image"
          disabled={selectedIndex === thumbs.length - 1}
          onClick={() => handleDirection("right")}
          className="md:hidden"
        />
      </div>

      {/* Thumbnail strip */}
      <div className="hidden sm:flex items-center gap-2  w-4/5 mx-auto">
        {/* <ChevronLeft className="size-6 shrink-0 text-black/40" aria-hidden /> */}

        <ul className="flex flex-1 gap-3 overflow-x-auto p-1">
          {thumbs.map((thumb, i) => {
            const isSelected = selectedIndex === i;
            return (
              <li key={thumb.id} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedIndex(i)}
                  className="block"
                >
                  <div
                    className={cn(
                      "relative aspect-square w-24 overflow-hidden rounded-lg  ring-2 shadow-lg",
                      isSelected ? "ring-primary" : "ring-transparent",
                    )}
                  >
                    <Image
                      src={thumb.src}
                      alt={thumb.alt}
                      fill
                      sizes="96px"
                      className="object-contain "
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* <ChevronRight className="size-6 shrink-0 text-black/40" aria-hidden /> */}
      </div>
    </div>
  );
};

export default ProductGallery;
