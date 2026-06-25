"use client";
import ProductGallery from "./ProductGallery";
import type { Thumb } from "./ProductGallery";
import BuyOptions from "./BuyOptions";
import Features from "./Features";
import type { Feature } from "./Features";
import Retailers from "./Retailers";
import { useState } from "react";

export type PackLabel = "1KG" | "5KG";
export type PackSize = "small" | "large";

export type Pack = {
  label: PackLabel;
  size: PackSize;
};

export type Retailer = {
  name: string;
  logo: string;
  width: number;
  height: number;
  href: Record<PackLabel, string>;
};

const HeroSection = ({
  title,
  subtitle,
  features,
  gallery,
  retailers,
  packs,
  theme,
}: {
  // page level copy, classic passes:
  // title    "Classic Basmati Rice"
  // subtitle "2 Years Perfectly Aged | The Gold Standard"
  title: string;
  subtitle: string;
  features: Feature[];
  gallery: Record<PackLabel, Thumb[]>;
  retailers: Retailer[];
  packs: Pack[];
  // data-theme name for the hero, scopes a brand colour override from globals.css
  // eg "duber" recolours primary and secondary. omit it to keep the default maroon
  theme?: string;
}) => {
  const [selected, setSelected] = useState(packs[0].label);

  // stacked + centered through tablet, splits into two columns only at lg where
  // there's room. before lg the 2-col split cramps features + retailers
  return (
    <section
      data-theme={theme}
      className="mx-auto grid max-w-xl items-start gap-8 lg:max-w-none lg:grid-cols-2 lg:gap-12 "
    >
      <ProductGallery currentPack={selected} gallery={gallery} />

      <div className="flex flex-col gap-6 sm:justifybetween h-full ">
        <header className="hidden flex-col gap-2 sm:flex ">
          <h1 className="font-display text-4xl leading-tight text-primary lg:text-[44px]">
            {title}
          </h1>
          <p className="text-lg font-bold text-black">{subtitle}</p>
        </header>

        <p className="max-w-prose text-black text-sm font-normal   text-center  sm:text-left">
          Aged perfectly for 2 years, India Gate Classic Basmati Rice is the
          gold standard of basmati. With extra long grains, it is the perfect
          choice for dum cooking. Now, craft indulgent celebrations, one perfect
          grain at a time.
        </p>

        <Features features={features} />

        <BuyOptions
          packs={packs}
          selected={selected}
          onSelect={(s) => setSelected(s)}
        />

        <Retailers retailers={retailers} pack={selected} />
      </div>
    </section>
  );
};

export default HeroSection;
