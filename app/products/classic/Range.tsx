"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import QuatrefoilPattern from "../../components/QuatrefoilPattern";
import NavArrow from "../../components/ui/NavArrow";
import SectionHeading from "./SectionHeading";

type Spec = {
  /** Path to the icon artwork in /ig-classic-assets/icons. */
  icon: string;
  label: string;
  value: string;
};

type Product = {
  name: string;
  image: string;
  alt: string;
  /** Drives the card's title and border via `--accent`. */
  accent: string;
  specs: Spec[];
};

const PRODUCTS: Product[] = [
  {
    name: "Classic",
    image: "/ig-classic-assets/india-agte-classic-hero-section.jpg",
    alt: "India Gate Classic Pure Basmati Rice pack",
    accent: "var(--color-primary)",
    specs: [
      { icon: "/ig-classic-assets/icons/grain.png", label: "Grain", value: "Extra long" },
      { icon: "/ig-classic-assets/icons/aging.png", label: "Aging", value: "2 Years" },
      { icon: "/ig-classic-assets/icons/best-for.png", label: "Best for", value: "All celebrations" },
      { icon: "/ig-classic-assets/icons/elongation.png", label: "Elongation", value: "2.5X" },
    ],
  },
  {
    name: "Biryani Rice",
    image: "/ig-classic-assets/biryani-rice.png",
    alt: "India Gate Gold Standard Biryani Basmati Rice pack",
    accent: "#1B4D4B",
    
    specs: [
      { icon: "/ig-classic-assets/icons/grain.png", label: "Grain", value: "Long" },
      { icon: "/ig-classic-assets/icons/aging.png", label: "Aging", value: "Extended" },
      { icon: "/ig-classic-assets/icons/best-for.png", label: "Best for", value: "Biryani only" },
      { icon: "/ig-classic-assets/icons/elongation.png", label: "Elongation", value: "2X" },
    ],
  },
];

const Range = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // grey out the arrow that can't move further, left at the start, right at the end
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // recompute which end we have hit as the row scrolls
  const syncArrows = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    setAtStart(scroller.scrollLeft <= 0);
    setAtEnd(scroller.scrollLeft >= maxScroll - 1);
  };

  // sync on mount and when the row resizes, so the arrows do not go stale when
  // the layout stops overflowing, eg a rotate or resize on mobile
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    syncArrows();
    const observer = new ResizeObserver(syncArrows);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

  // scroll the row by one card, its width plus the live flex gap, in either direction
  const handleScroll = (dir: "left" | "right") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : scroller.clientWidth;
    scroller.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative isolate  overflow-hidden sm:py-12">
      <QuatrefoilPattern className="bottom-auto h-[25%]" />
      <QuatrefoilPattern className="top-auto h-[10%]" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-10">
        <SectionHeading title="The Gold Standard Range" />

        {/* left right nav for the mobile scroll row, ui only, both cards fit from md up */}
        <div className="relative">
          <NavArrow
            direction="left"
            label="Previous product"
            onClick={() => handleScroll("left")}
            disabled={atStart}
            className="md:hidden"
          />
          <NavArrow
            direction="right"
            label="Next product"
            onClick={() => handleScroll("right")}
            disabled={atEnd}
            className="md:hidden"
          />
          <div
            ref={scrollerRef}
            onScroll={syncArrows}
            className="flex gap-6 overflow-x-auto px-6 sm:justify-center sm:gap-8 sm:px-0"
          >
            {PRODUCTS.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};;

const ProductCard = ({ product }: { product: Product }) => (
  <article
    style={{ "--accent": product.accent } as CSSProperties}
    className="flex w-4/5 sm:w-full max-w-xs shrink-0 flex-col rounded-4xl border border-(--accent) bg-white p-4 shadow-sm  sm:p-6"
  >
    <div className="relative mb-5 aspect-square overflow-hidden rounded-3xl bg-(--accent)/5">
      <Image
        src={product.image}
        alt={product.alt}
        fill
        loading="lazy"
        sizes="(min-width: 768px) 15vw, 90vw"
        className="object-contain mix-blend-multiply"
      />
    </div>

    <h3 className="text-center font-display text-xl uppercase tracking-wide text-(--accent) sm:text-2xl">
      {product.name}
    </h3>

    <dl className="mt-4 flex flex-col font-normal">
      {product.specs.map(({ icon, label, value }) => (
        <div
          key={label}
          className="flex items-center gap-4 border-t border-black/40 py-4 first:border-t-0"
        >
          <Image
            src={icon}
            alt=""
            width={60}
            height={60}
            loading="lazy"
            className="size-5 shrink-0 object-contain "
          />
          <dt className="text-black">{label}</dt>
          <dd className="ml-auto text-right  text-black">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  </article>
);

export default Range;
