import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import HeroSection from "./HeroSection";
import Range from "./Range";
import Body from "./Body";
import Faqs from "@/app/components/Faqs";

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

const ClassicPage = () => {
  return (
    <main className="">
      <div className="custom-container md:py-6 sm:space-y-4">
        <Breadcrumb />
        <HeroSection />
      </div>

      <Range />
      <Body />
      <Faqs />
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
