import type { Metadata } from "next";
import HeroSection, {
  type PackLabel,
  type Pack,
  type Retailer,
} from "./HeroSection";
import { type Feature } from "./Features";
import { type Thumb } from "./ProductGallery";
import Range, { type Product } from "./Range";
import Flagship from "./Flagship";
import PairsWellWith, { type Dish } from "./PairsWellWith";
import ExploreUniverse from "./ExploreUniverse";
import Faqs, { type Faq } from "@/app/components/Faqs";
import Reveal from "@/app/components/Reveal";
import Breadcrumb, { type Crumb } from "@/app/components/Breadcrumb";

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

// hero feature strip, uses the new standalone icon art instead of the gold variants
const FEATURES: Feature[] = [
  { icon: "/ig-classic-assets/icons/grains.png", label: "Extra-Long Grain" },
  { icon: "/ig-classic-assets/icons/rice.png", label: "Original Aroma" },
  {
    icon: "/ig-classic-assets/icons/aged.png",
    label: "Perfectly aged\nfor 2 years",
  },
];

// one full list per pack, gets handed to ProductGallery as a prop
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

const PACKS: Pack[] = [
  { label: "1KG", size: "small" },
  { label: "5KG", size: "large" },
];

// the gold standard range cards shown on the classic page, passed down to Range
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
            title="Classic Basmati Rice"
            subtitle="2 Years Perfectly Aged | The Gold Standard"
            features={FEATURES}
            gallery={GALLERY}
            retailers={RETAILERS}
            packs={PACKS}
          />
        </Reveal>
      </div>

      <Reveal className="">
        <Range title="The Gold Standard Range" products={PRODUCTS} />
      </Reveal>

      <Reveal>
        <Flagship />
      </Reveal>

      <Reveal>
        <PairsWellWith dishes={DISHES} />
      </Reveal>
      
      <Reveal>
        <ExploreUniverse  />
      </Reveal>

      <Reveal>
        <Faqs faqs={FAQS} />
      </Reveal>
    </main>
  );
};

export default ClassicPage;
