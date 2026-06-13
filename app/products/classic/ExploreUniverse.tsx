"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "../../lib/utils";
import QuatrefoilPattern from "../../components/QuatrefoilPattern";
import Coverflow from "../../components/Coverflow";
import SectionHeading from "./SectionHeading";

type SubBrand = {
  name: string;
  image: string;
};

/** Ordered as shown on the carousel, the centre item is the featured pack. */
const SUBBRANDS: SubBrand[] = [
  {
    name: "Mogra",
    image: "/ig-classic-assets/india-gate-subbrands/IG Mogra 1kg front.jpg",
  },
  {
    name: "Dubar",
    image: "/ig-classic-assets/india-gate-subbrands/IG Dubar 1kg front.jpg",
  },
  {
    name: "Biryani",
    image: "/ig-classic-assets/india-gate-subbrands/IG-Biryani-1kg-front.jpg",
  },
  {
    name: "Feast Rozzana",
    image: "/ig-classic-assets/india-gate-subbrands/IG FR 1kg front.jpg",
  },
  {
    name: "Everyday",
    image: "/ig-classic-assets/india-gate-subbrands/IG Everyday 1kg front.jpg",
  },
];

const ExploreUniverse = () => {
  const [active, setActive] = useState(2);

  return (
    <section className="relative isolate overflow-hidden py-8 sm:py-12 ">
      <QuatrefoilPattern className="bottom-auto h-[25%] " />
      <QuatrefoilPattern className="top-auto h-[15%]" />

      <div className="relative z-10 mx-auto flex  sm:custom-container flex-col gap-4 sm:gap-8 ">
        <SectionHeading className="px-6 sm:px-0 "  title="Explore the Universe of India Gate" />

        {/* coverflow owns the motion, we just hand it the pack card and theme it. */}
        <Coverflow
          items={SUBBRANDS}
          initialFocus={1}
          autoplayMs={2000}
          getKey={(brand) => brand.name}
          onActiveChange={setActive}
          arrowClassName="bg-primary text-white hover:bg-primary/90"
          cardClassName="focus-visible:ring-secondary/70 "
          renderCard={(brand, { featured }) => (
            <div
              className={cn(
                "relative aspect-square w-full sm:w-auto overflow-hidden rounded-3xl bg-cream",
                featured && "shadow-lg ring-1 ring-secondary/40",
              )}
            >
              <Image
                src={brand.image}
                alt={`India Gate ${brand.name}`}
                fill
                loading="lazy"
                sizes="(min-width: 640px) 13vw, 40vw"
                className="object-cover"
              />
            </div>
          )}
        />

        <h3 className="text-center font-display text-xl sm:text-2text-2xl sm:text-3xlxl uppercase tracking-wide text-primary">
          {SUBBRANDS[active].name}
        </h3>
      </div>
    </section>
  );
};

export default ExploreUniverse;
