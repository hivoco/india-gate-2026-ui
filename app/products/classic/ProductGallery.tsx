"use client";
import Image from "next/image";
import { useState } from "react";
import NavArrow from "../../components/ui/NavArrow";
import { cn } from "../../lib/utils";
import type { PackLabel } from "./HeroSection";

type Thumb = {
  id: string;
  src: string;
  alt: string;
};

// one full list per pack, just read GALLERY[currentPack] and map over it
const GALLERY: Record<PackLabel, Thumb[]> = {
  "1KG": [
    {
      id: "1kg-front",
      src: "/ig-classic-assets/1kg/pack-front.jpg",
      alt: "India Gate Classic Basmati Rice 1kg, pack front",
    },
    {
      id: "1kg-back",
      src: "/ig-classic-assets/1kg/pack-back.jpg",
      alt: "Classic Basmati Rice 1kg, pack back",
    },
    {
      id: "1kg-product",
      src: "/ig-classic-assets/1kg/product.jpg",
      alt: "India Gate Classic Basmati Rice 1kg",
    },
    {
      id: "1kg-story",
      src: "/ig-classic-assets/story.jpg",
      alt: "Gold standard Classic, for the perfectionist in you",
    },
    {
      id: "1kg-nutrition",
      src: "/ig-classic-assets/nutrition.jpg",
      alt: "Nutritional information",
    },
    {
      id: "1kg-manufacturer",
      src: "/ig-classic-assets/manufacturer.jpg",
      alt: "Manufactured & marketed by KRBL Limited",
    },
    {
      id: "1kg-certifications",
      src: "/ig-classic-assets/certifications.jpg",
      alt: "GMO free, FSSAI licence and barcode",
    },
  ],
  "5KG": [
    {
      id: "5kg-front",
      src: "/ig-classic-assets/5kg/pack-front.jpg",
      alt: "India Gate Classic Basmati Rice 5kg, pack front",
    },
    {
      id: "5kg-back",
      src: "/ig-classic-assets/5kg/pack-back.jpg",
      alt: "Classic Basmati Rice 5kg, pack back",
    },
    {
      id: "5kg-product",
      src: "/ig-classic-assets/5kg/product.jpg",
      alt: "India Gate Classic Basmati Rice 5kg",
    },
    {
      id: "5kg-story",
      src: "/ig-classic-assets/story.jpg",
      alt: "Gold standard Classic, for the perfectionist in you",
    },
    {
      id: "5kg-nutrition",
      src: "/ig-classic-assets/nutrition.jpg",
      alt: "Nutritional information",
    },
    {
      id: "5kg-manufacturer",
      src: "/ig-classic-assets/manufacturer.jpg",
      alt: "Manufactured & marketed by KRBL Limited",
    },
    {
      id: "5kg-certifications",
      src: "/ig-classic-assets/certifications.jpg",
      alt: "GMO free, FSSAI licence and barcode",
    },
  ],
};

const ProductGallery = ({ currentPack }: { currentPack: PackLabel }) => {
  const thumbs = GALLERY[currentPack];
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
    <div className="flex flex-col gap-4 ">
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
        <Image
          src={selected.src}
          alt={selected.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          priority
          className="object-contain mix-blend-multiply"
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
