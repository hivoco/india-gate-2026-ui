import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import HeroSection from "./HeroSection";
import Range from "./Range";
import Body from "./Body";
import Faqs, { type Faq } from "@/app/components/Faqs";
import Reveal from "@/app/components/Reveal";

export const metadata: Metadata = {
  title: "Classic Basmati Rice | India Gate",
  description:
    "Aged perfectly for 2 years, India Gate Classic Basmati Rice is the gold standard of basmati — extra long grains, perfect for dum cooking.",
};

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Our range", href: "/products" },
  { label: "Basmati Rice", href: "/products" },
  { label: "Classic", href: "/products/classic" },
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
        <Breadcrumb />
        <Reveal>
          <HeroSection />
        </Reveal>
      </div>

      <Reveal>
        <Range />
      </Reveal>
      <Body />
      <Reveal>
        <Faqs faqs={FAQS} />
      </Reveal>
    </main>
  );
};

const Breadcrumb = () => (
  <nav aria-label="Breadcrumb " className="hidden sm:block">
    <ol className="flex flex-wrap items-center gap-2 text-sm text-black/60">
      {BREADCRUMB.map((crumb, i) => {
        const last = i === BREADCRUMB.length - 1;
        return (
          <li key={crumb.label} className="flex items-center gap-2">
            {last ? (
              <span className="font-semibold text-primary">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="transition-colors hover:text-primary"
              >
                {crumb.label}
              </Link>
            )}
            {!last && (
              <ChevronRight className="size-4 text-black/30" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default ClassicPage;
