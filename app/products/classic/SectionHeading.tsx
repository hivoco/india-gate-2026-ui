import { cn } from "@/app/lib/utils";
import Image from "next/image";

/**
 * Shared section header for the Classic body — a `font-display` title in maroon
 * with the brand ornament divider beneath it. Mirrors the header used in
 * `Range` so every section on the page reads as one family.
 */
const SectionHeading = ({ title,className }: { title: string,className?:string }) => (
  <header className="text-center">
    <h2 className={cn("font-display text-3xl text-primary sm:text-4xl",className)}>
      {title}
    </h2>

    <Image
      src="/ig-classic-assets/pattern-icon.png"
      alt=""
      width={262}
      height={28}
      loading="lazy"
      className="mx-auto mt-4 block h-5 w-auto"
    />
  </header>
);

export default SectionHeading;
