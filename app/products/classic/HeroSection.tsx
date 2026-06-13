'use client'
import Image from "next/image";
import ProductGallery from "./ProductGallery";
import BuyOptions from "./BuyOptions";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
// hero feature strip, uses the new standalone icon art instead of the gold variants
const FEATURES = [
  { icon: "/ig-classic-assets/icons/grains.png", label: "Extra-Long Grain" },
  { icon: "/ig-classic-assets/icons/rice.png", label: "Original Aroma" },
  { icon: "/ig-classic-assets/icons/aged.png", label: "Perfectly aged\nfor 2 years" },
];

export type PackLabel = "1KG" | "5KG";
export type PackSize = "small" | "large";

type Retailer = {
  name: string;
  logo: string;
  width: number;
  height: number;
  href: Record<PackLabel, string>;
};

const RETAILERS: Retailer[] = [
  {
    name: "Blinkit",
    logo: "/retailers/blinkit.png",
    width: 193,
    height: 67,
    href: {
      "1KG": "https://blinkit.com/prn/india-gate-classic-1kg",
      "5KG": "https://blinkit.com/prn/india-gate-classic-5kg",
    },
  },
  {
    name: "Zepto",
    logo: "/retailers/zepto.png",
    width: 223,
    height: 77,
    href: {
      "1KG": "https://www.zeptonow.com/pn/india-gate-classic-1kg",
      "5KG": "https://www.zeptonow.com/pn/india-gate-classic-5kg",
    },
  },
  {
    name: "Swiggy",
    logo: "/retailers/swiggy.png",
    width: 182,
    height: 53,
    href: {
      "1KG": "https://www.swiggy.com/instamart/item/india-gate-classic-1kg",
      "5KG": "https://www.swiggy.com/instamart/item/india-gate-classic-5kg",
    },
  },
  {
    name: "Amazon",
    logo: "/retailers/amazon.png",
    width: 179,
    height: 63,
    href: {
      "1KG": "https://www.amazon.in/india-gate-classic/dp/IG1KG001",
      "5KG": "https://www.amazon.in/india-gate-classic/dp/IG5KG005",
    },
  },
  {
    name: "BigBasket",
    logo: "/retailers/bigbasket.png",
    width: 179,
    height: 40,
    href: {
      "1KG": "https://www.bigbasket.com/pd/india-gate-classic-1kg",
      "5KG": "https://www.bigbasket.com/pd/india-gate-classic-5kg",
    },
  },
  {
    name: "Flipkart",
    logo: "/retailers/flipkart.png",
    width: 178,
    height: 40,
    href: {
      "1KG": "https://www.flipkart.com/india-gate-classic-1kg/p/IG1KG001",
      "5KG": "https://www.flipkart.com/india-gate-classic-5kg/p/IG5KG005",
    },
  },
];

export type pack = {
  label: PackLabel;
  size: PackSize;
};

export type packs = pack[];

const packs: packs = [
  { label: "1KG", size: "small" },
  { label: "5KG", size: "large" },
];

const HeroSection = () => {
    const [selected, setSelected] = useState(packs[0].label);

  // stacked + centered through tablet, splits into two columns only at lg where
  // there's room. before lg the 2-col split cramps features + retailers
  return (
    <section className="mx-auto grid max-w-xl items-start gap-8 lg:max-w-none lg:grid-cols-2 lg:gap-12 ">
      <ProductGallery currentPack={selected} />

      <div className="flex flex-col gap-6">
        <header className="hidden flex-col gap-2 sm:flex">
          <h1 className="font-display text-4xl leading-tight text-primary lg:text-[44px]">
            Classic Basmati Rice
          </h1>
          <p className="text-lg font-bold text-black">
            2 Years Perfectly Aged | The Gold Standard
          </p>

       
        </header>

        <p className="max-w-prose text-black text-sm font-normal   text-center  sm:text-left">
          Aged perfectly for 2 years, India Gate Classic Basmati Rice is the
          gold standard of basmati. With extra long grains, it is the perfect
          choice for dum cooking. Now, craft indulgent celebrations, one perfect
          grain at a time.
        </p>

        <Features />

        <BuyOptions
          packs={packs}
          selected={selected}
          OnClick={(s) => setSelected(s)}
        />

        <Retailers pack={selected} />
      </div>
    </section>
  );
};

const Features = () => (
  <ul className="grid grid-cols-3 divide-x divide-primary/30 rounded-2xl border border-primary py-3">
    {FEATURES.map(({ icon, label }) => (
      <li
        key={label}
        className="flex flex-col items-center gap-1.5 px-2 text-center "
      >
        <span className="flex size-9 items-center justify-center rounded-full border border-primary ">
          <Image
            src={icon}
            alt=""
            width={30}
            height={30}
            className="size-6 sm:size-7 object-contain "
          />
        </span>
        <span className="whitespace-pre-line text-[10px] sm:text-xs font-bold leading-tight text-black   ">
          {label}
        </span>
      </li>
    ))}
  </ul>
);

const Retailers = ({ pack }: { pack: PackLabel }) => {
  const [display, setDisplay] = useState(false);
  const handleClick = () => setDisplay(prev=>!prev)
  return (
    <div className="space-y-3 sm:space-y-4 pb-4 sm:p-0">
      <button
        onClick={handleClick}
        type="button"
        className="w-full rounded-lg bg-linear-to-r from-primary to-secondary py-3 text-center text-lg sm:text-xl font-normal text-white"
      >
        Buy Now
      </button>

      <div
        className={cn(
          "flex-wrap items-center  sm:gap-3 justify-between sm:justify-center sm:flex",
          display ? "flex" : "hidden",
        )}
      >
        {RETAILERS.map((retailer, i) => (
          <div key={retailer.name}>
            <RetailerCard retailer={retailer} href={retailer.href[pack]} />
            {i + 1 === RETAILERS.length / 2 && (
              <div className="w-px self-stretch bg-primary/25"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const RetailerCard = ({ retailer, href }: { retailer: Retailer; href: string }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex aspect-square w-10 sm:w-14 items-center justify-center rounded-lg border border-black/10 bg-primary/10 p-1"
  >
    <Image
      src={retailer.logo}
      alt={retailer.name}
      width={retailer.width}
      height={retailer.height}
      className="h-auto w-full object-contain"
    />
  </Link>
);

export default HeroSection;
