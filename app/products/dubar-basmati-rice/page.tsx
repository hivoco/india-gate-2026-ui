import type { Metadata } from "next";
import HeroSection, {
  type PackLabel,
  type Pack,
  type Retailer,
} from "../classic/HeroSection";
import { type Feature } from "../classic/Features";
import { type Thumb } from "../classic/ProductGallery";
import Range, { type Product } from "../classic/Range";
// import Flagship from "../classic/Flagship";
import PairsWellWith, { type Dish } from "../classic/PairsWellWith";
import ExploreUniverse from "../classic/ExploreUniverse";
import SectionHeading from "../classic/SectionHeading";
import Faqs, { type Faq } from "@/app/components/Faqs";
import Reveal from "@/app/components/Reveal";
import Breadcrumb, { type Crumb } from "@/app/components/Breadcrumb";
import QuatrefoilPattern from "@/app/components/QuatrefoilPattern";

export const metadata: Metadata = {
  title: "Classic Basmati Rice | India Gate",
  description:
    "Aged perfectly for 2 years, India Gate Classic Basmati Rice is the gold standard of basmati — extra long grains, perfect for dum cooking.",
};

const BREADCRUMB: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Our range", href: "/products" },
  { label: "Basmati Rice", href: "/products" },
  { label: "Classic", href: "/products/classic" },
];

// hero feature strip, dubar's own teal icon set
const FEATURES: Feature[] = [
  { icon: "/ig-dubar-assets/icons/lean-slender.png", label: "Lean & Slender" },
  { icon: "/ig-dubar-assets/icons/long-grain.png", label: "Long Grain" },
  { icon: "/ig-dubar-assets/icons/aged.png", label: "Naturally Aged" },
];

// one full list per pack, gets handed to ProductGallery as a prop
// each pack folder ships its own front, back and detail tiles
const GALLERY: Record<PackLabel, Thumb[]> = {
  "1KG": [
    {
      id: "1kg-front",
      src: "/ig-dubar-assets/1kg/pack-front.jpg",
      alt: "India Gate Dubar Basmati Rice 1kg, pack front",
    },
    {
      id: "1kg-back",
      src: "/ig-dubar-assets/1kg/pack-back.jpg",
      alt: "India Gate Dubar Basmati Rice 1kg, pack back",
    },
    {
      id: "1kg-story",
      src: "/ig-dubar-assets/common/story.jpg",
      alt: "Flavourful & fine Dubar, for the quality seeker in you",
    },
    {
      id: "1kg-nutrition",
      src: "/ig-dubar-assets/common/nutrition.jpg",
      alt: "Nutritional information",
    },
    {
      id: "1kg-manufacturer",
      src: "/ig-dubar-assets/common/manufacturer.jpg",
      alt: "Manufactured & marketed by KRBL Limited",
    },
    {
      id: "1kg-certifications",
      src: "/ig-dubar-assets/1kg/certifications.jpg",
      alt: "GMO free, FSSAI licence and barcode",
    },
  ],
  "5KG": [
    {
      id: "5kg-front",
      src: "/ig-dubar-assets/5kg/pack-front.jpg",
      alt: "India Gate Dubar Basmati Rice 5kg, pack front",
    },
    {
      id: "5kg-back",
      src: "/ig-dubar-assets/5kg/pack-back.jpg",
      alt: "India Gate Dubar Basmati Rice 5kg, pack back",
    },
    {
      id: "5kg-story",
      src: "/ig-dubar-assets/common/story.jpg",
      alt: "Flavourful & fine Dubar, for the quality seeker in you",
    },
    {
      id: "5kg-nutrition",
      src: "/ig-dubar-assets/common/nutrition.jpg",
      alt: "Nutritional information",
    },
    {
      id: "5kg-manufacturer",
      src: "/ig-dubar-assets/common/manufacturer.jpg",
      alt: "Manufactured & marketed by KRBL Limited",
    },
    {
      id: "5kg-certifications",
      src: "/ig-dubar-assets/5kg/certifications.jpg",
      alt: "GMO free, FSSAI licence and barcode",
    },
  ],
};

const RETAILERS: Retailer[] = [
  {
    name: "Blinkit",
    logo: "/retailers/blinkit.png",
    width: 193,
    height: 67,
    href: {
      "1KG": "https://blinkit.com/prn/india-gate-dubar-1kg",
      "5KG": "https://blinkit.com/prn/india-gate-dubar-5kg",
    },
  },
  {
    name: "Zepto",
    logo: "/retailers/zepto.png",
    width: 223,
    height: 77,
    href: {
      "1KG": "https://www.zeptonow.com/pn/india-gate-dubar-1kg",
      "5KG": "https://www.zeptonow.com/pn/india-gate-dubar-5kg",
    },
  },
  {
    name: "Swiggy",
    logo: "/retailers/swiggy.png",
    width: 182,
    height: 53,
    href: {
      "1KG": "https://www.swiggy.com/instamart/item/india-gate-dubar-1kg",
      "5KG": "https://www.swiggy.com/instamart/item/india-gate-dubar-5kg",
    },
  },
  {
    name: "Amazon",
    logo: "/retailers/amazon.png",
    width: 179,
    height: 63,
    href: {
      "1KG": "https://www.amazon.in/india-gate-dubar/dp/IGD1KG001",
      "5KG": "https://www.amazon.in/india-gate-dubar/dp/IGD5KG005",
    },
  },
  {
    name: "BigBasket",
    logo: "/retailers/bigbasket.png",
    width: 179,
    height: 40,
    href: {
      "1KG": "https://www.bigbasket.com/pd/india-gate-dubar-1kg",
      "5KG": "https://www.bigbasket.com/pd/india-gate-dubar-5kg",
    },
  },
  {
    name: "Flipkart",
    logo: "/retailers/flipkart.png",
    width: 178,
    height: 40,
    href: {
      "1KG": "https://www.flipkart.com/india-gate-dubar-1kg/p/IGD1KG001",
      "5KG": "https://www.flipkart.com/india-gate-dubar-5kg/p/IGD5KG005",
    },
  },
];

const PACKS: Pack[] = [
  { label: "1KG", size: "small" },
  { label: "5KG", size: "large" },
];

// the gold standard range cards, passed down to Range. accent drives each card's
// border and title colour to match its pack art
const PRODUCTS: Product[] = [
  {
    name: "Dubar",
    image: "/basmati-products/dubar.jpg",
    alt: "India Gate Dubar Pure Basmati Rice pack",
    accent: "#1B7F77",
    specs: [
      { icon: "/ig-classic-assets/icons/grain.png", label: "Grain", value: "Extra long" },
      { icon: "/ig-classic-assets/icons/aging.png", label: "Aging", value: "2 Years" },
      { icon: "/ig-classic-assets/icons/best-for.png", label: "Best for", value: "All celebrations" },
      { icon: "/ig-classic-assets/icons/elongation.png", label: "Elongation", value: "2.5X" },
    ],
  },
  {
    name: "Tibar",
    image: "/basmati-products/tibar.jpg",
    alt: "India Gate Tibar Pure Basmati Rice pack",
    accent: "#C24A2C",
    specs: [
      { icon: "/ig-classic-assets/icons/grain.png", label: "Grain", value: "Extra long" },
      { icon: "/ig-classic-assets/icons/aging.png", label: "Aging", value: "2 Years" },
      { icon: "/ig-classic-assets/icons/best-for.png", label: "Best for", value: "All celebrations" },
      { icon: "/ig-classic-assets/icons/elongation.png", label: "Elongation", value: "2.5X" },
    ],
  },
  {
    name: "Super",
    image: "/basmati-products/daily-premium.jpg",
    alt: "India Gate Super Pure Basmati Rice pack",
    accent: "#4E4391",
    specs: [
      { icon: "/ig-classic-assets/icons/grain.png", label: "Grain", value: "Extra long" },
      { icon: "/ig-classic-assets/icons/aging.png", label: "Aging", value: "2 Years" },
      { icon: "/ig-classic-assets/icons/best-for.png", label: "Best for", value: "All celebrations" },
      { icon: "/ig-classic-assets/icons/elongation.png", label: "Elongation", value: "2.5X" },
    ],
  },
  {
    name: "Select",
    image: "/basmati-products/select.jpg",
    alt: "India Gate Select Pure Basmati Rice pack",
    accent: "#8A7A2A",
    specs: [
      { icon: "/ig-classic-assets/icons/grain.png", label: "Grain", value: "Long" },
      { icon: "/ig-classic-assets/icons/aging.png", label: "Aging", value: "Extended" },
      { icon: "/ig-classic-assets/icons/best-for.png", label: "Best for", value: "Biryani only" },
      { icon: "/ig-classic-assets/icons/elongation.png", label: "Elongation", value: "2X" },
    ],
  },
];

// dishes the classic basmati pairs with, passed down to PairsWellWith
const DISHES: Dish[] = [
  { name: "Hyderabadi Biryani", image: "/ig-classic-assets/dishes/hyderabadi-biryani.png" },
  { name: "Lucknowi Biryani", image: "/ig-classic-assets/dishes/lucknowi-biryani.png" },
  { name: "Kashmiri Pulao", image: "/ig-classic-assets/dishes/kashmiri-pulao.png" },
  { name: "Zafrani Pulao", image: "/ig-classic-assets/dishes/zafrani-pulao.png" },
];

const FAQS: Faq[] = [
  {
    question: "What is the best basmati rice for biryani in India?",
    answer:
      "For restaurant-quality biryani at home, you need: (1) extra-long grains for visual appeal, (2) extended aging for aroma and separation, (3) high elongation for fluffy results. India Gate Classic checks all three — 2-year aged, extra-long grains, 2.5x elongation. It's specifically designed for dishes where rice is the centrepiece. For everyday biryani, Super or Tibar work well at lower price points.",
  },
  {
    question: "Classic vs Biryani Special — which is better for biryani?",
    answer:
      "Both are premium options. Classic is our flagship gold standard — 2-year aged, extra-long grains, works brilliantly for biryani AND pulao AND special occasions. Biryani Special is specifically engineered for biryani with optimized grain separation. Choose Classic for versatility across celebrations; Biryani Special if you're a biryani purist who wants rice designed for that one dish.",
  },
  {
    question: "Why is aged basmati rice better than fresh basmati?",
    answer:
      "Aging transforms basmati rice. During 2 years of controlled storage, moisture content reduces and starch structure changes. The result: (1) Stronger aroma — the signature basmati fragrance intensifies, (2) Better elongation — grains stretch longer, (3) Exceptional separation — no clumping or sticking, (4) Fluffier texture — lighter, more delicate grains. Fresh basmati can be sticky and lacks the aromatic depth that makes biryani memorable.",
  },
  {
    question: "Is India Gate Classic worth the premium price?",
    answer:
      "Classic costs more because it delivers more: 2 full years of aging (most competitors age 12-18 months), hand-selected extra-long grains, and India Gate's 135-year quality legacy. For everyday meals, our mid-range options like Tibar or Dubar offer excellent value. But for occasions where rice quality is visible and memorable — festivals, guests, celebrations — Classic is the rice that never disappoints.",
  },
  {
    question: "Which India Gate rice is best for special occasions?",
    answer:
      "For celebrations and special occasions, we recommend: Classic (flagship, 2-year aged, versatile for biryani + pulao), Biryani Special (optimized specifically for biryani), or Super (premium, versatile option at a mid-range price). Classic is the traditional choice for weddings, Eid, Diwali, and family gatherings where the rice needs to impress.",
  },
];

const ClassicPage = () => {
  return (
    <main className="">
      <div className="custom-container md:py-6 sm:space-y-4">
        <Breadcrumb items={BREADCRUMB} />

        <Reveal>
          <HeroSection
            title="Dubar Basmati Rice"
            subtitle="Lean & Slender | Flavourful & Fine"
            theme="duber"
            features={FEATURES}
            gallery={GALLERY}
            retailers={RETAILERS}
            packs={PACKS}
          />
        </Reveal>
      </div>

      <Reveal className="">
        <Range title="The Flavourful & Fine Range" products={PRODUCTS} />
      </Reveal>

      <Reveal>
        {/* <Flagship /> */}
        {/* inlined from classic Flagship so dubar can carry its own heading and copy */}
        <section className="relative isolate overflow-hidden py-6  sm:py-12 ">
          <QuatrefoilPattern className="bottom-auto h-[35%]" />

          <div className="relative z-10 mx-auto flex custom-container flex-col gap-8 ">
            <SectionHeading title="The Quality Choice" />

            <div className="flex flex-col gap-4 sm:gap-5 text-center text-black text-sm sm:text-base lg:text-lg leading-4.5 font-normal">
              <p className="w-[80%] mx-auto">
                Some names carry weight. Classic Basmati is{" "}
                <span className="font-bold italic text-primary">
                  India Gate&apos;s flagship -
                </span>{" "}
                the rice that set the gold standard for celebrations across
                decades of unmatched expertise.
              </p>

              <p className="w-[90%]">
                What makes Classic different is how it behaves under pressure.
                The 2-year ageing process lowers moisture content and stabilises
                starch structure, so when the heat goes up and the dum seals in,
                Classic holds its form. Each grain cooks independently, absorbs
                the masala without breaking down, and delivers the visual
                separation that distinguishes a celebrated biryani from an
                ordinary one.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <PairsWellWith dishes={DISHES} />
      </Reveal>

      <Reveal>
        <ExploreUniverse />
      </Reveal>

      <Reveal>
        <Faqs faqs={FAQS} />
      </Reveal>
    </main>
  );
};

export default ClassicPage;
