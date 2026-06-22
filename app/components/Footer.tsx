import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Recipe Hub", href: "/recipes" },
  { label: "UPLIFE", href: "/uplife" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
  { label: "Brochure", href: "/brochure" },
];

// react-icons via named imports.
const SOCIALS: { name: string; href: string; Icon: IconType }[] = [
  { name: "Facebook", href: "#", Icon: FaFacebookF },
  { name: "Instagram", href: "#", Icon: FaInstagram },
  { name: "YouTube", href: "#", Icon: FaYoutube },
  { name: "LinkedIn", href: "#", Icon: FaLinkedinIn },
];

const Footer = () => {
  // Server component, so this resolves at render time — no hydration mismatch.
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-primary font-sans text-white pb-12 pt-2 sm:pt-4 ">
      {/* decorative cream diamond band, sits in flow as a strip across the top of the maroon */}

      <div
        aria-hidden
        className="pointer-events-none h-20 bg-[url('/bg-pattern-footer.png')] bg-size-[auto_100%] bg-top bg-repeat-x sm:h-32 "
      />

      <div className="flex custom-container flex-col items-center px-4 pt-4 sm:px-6 sm:pt-6">
        {/* White badge straddles the top edge of the maroon band, pulled out of
            flow so the pt above reserves its footprint for the nav below. */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 grid size-28 place-items-center rounded-full bg-white shadow-lg ring-0 ring-black/5 sm:-top-24 sm:size-40">
          <Image
            src="/india-gate-original-logo.png"
            alt="India Gate"
            width={245}
            height={278}
            className="h-auto w-16 sm:w-20"
          />
        </div>

        <nav
          aria-label="Footer"
          className=" grid grid-cols-2 sm:flex items-center justify-center gap-x-7 gap-y-3 text-base sm:gap-x-9 sm:text-lg  "
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-opacity hover:opacity-70 "
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ul className="mt-8 flex items-center gap-3 ">
          {SOCIALS.map(({ name, href, Icon }) => (
            <li key={name}>
              <Link
                href={href}
                aria-label={name}
                className="grid size-10 place-items-center rounded-xl bg-white text-primary transition-opacity hover:opacity-80"
              >
                <Icon className="size-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-2 text-sm ">
          <Link
            href="/privacy-policy"
            className="underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Privacy Policy
          </Link>
          <span aria-hidden>|</span>
          <Link
            href="/terms"
            className="underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Terms of Service
          </Link>
        </div>

        {/* brownish backdrop so the copyright stays readable over the bg art */}
        <p className="mt-2 inline-block rounded-full bg-primary/40 px-4 py-1.5 text-sm text-white  backdrop-blur-sm">
          © {year} KRBL All Rights Reserved
        </p>
      </div>

      {/* decorative band at the bottom-most edge, full width, behind content.
          mobile gets the taller bg-foote.png, sm and up swap to the wider
          bg-footer-sm.png. both stay lazy + hidden so only the active one loads */}
      <Image
        src="/bg-foote.png"
        alt=""
        width={1536}
        height={200}
        aria-hidden
        loading="lazy"
        sizes="100vw"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full opacity-50 sm:hidden"
      />
      <Image
        src="/bg-footer-sm.png"
        alt=""
        width={1536}
        height={200}
        aria-hidden
        loading="lazy"
        sizes="100vw"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden h-auto w-full opacity-50 sm:block"
      />
    </footer>
  );
};

export default Footer;
