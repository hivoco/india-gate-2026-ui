import { cn } from "@/app/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Shared section header for the whole site — a `font-display` title in maroon
 * with the brand ornament divider beneath it and an optional supporting line.
 * It owns all of its own spacing (divider and subtitle) so every section reads
 * as one family and no section has to add margins from the outside.
 */
const SectionHeading = ({
  title,
  subtitle,
  className,
  imageClassName,
  subtitleClassName,
}: {
  title: string;
  // optional supporting line under the divider, its top gap is baked in here
  subtitle?: ReactNode;
  className?: string;
  // pass tailwind size utils here to resize the ornament divider
  imageClassName?: string;
  subtitleClassName?: string;
}) => (
  <header className="text-center">
    <h2 className={cn("font-display text-3xl text-primary sm:text-4xl", className)}>
      {title}
    </h2>

    <Image
      src="/ig-classic-assets/pattern-icon.png"
      alt=""
      width={262}
      height={28}
      loading="lazy"
      className={cn("mx-auto mt-2 block h-3 w-auto", imageClassName)}
    />

    {subtitle && (
      <p
        className={cn(
          "mx-auto mt-2 max-w-xl sm:max-w-none text-center text-sm/4 sm:text-lg/4.5 font-normal text-primary sm:mt-6 ",
          subtitleClassName,
        )}
      >
        {subtitle}
      </p>
    )}
  </header>
);

export default SectionHeading;
