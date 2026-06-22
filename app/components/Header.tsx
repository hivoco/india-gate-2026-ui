'use client'
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "../lib/utils";
import { useIsHomePage } from "../hooks/useIsHomePage";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Recipe Hub", href: "/recipes" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

const Header = () => {
  const isHomePage = useIsHomePage();



  return (
    <header
      className={cn(
        "flex items-center justify-between gap-6 custom-container pt-8 pb-4 lg:pt-10 lg:pb-5 w-full",
        isHomePage && "hidden sm:flex",
      )}
    >
      <Link href="/" aria-label="India Gate — home">
        <Image
          src="/ig-classic-assets/logo.png"
          alt="India Gate"
          width={68}
          height={88}
          priority
          className="h-auto w-12 sm:w-16 "
        />
      </Link>

      <nav className="hidden items-center gap-8 font-display text-lg text-black md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-opacity hover:opacity-60"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button type="button" aria-label="Open menu" className="md:hidden">
        <Menu className="size-7" strokeWidth={1.75} aria-hidden />
      </button>
    </header>
  );
};

export default Header;
