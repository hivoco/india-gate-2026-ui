import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/app/lib/utils";

// which corner the round arrow button tucks into
type IconCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface InitiativeCardProps {
  image: string;
  // swapped in at sm and up, falls back to image when not given
  desktopImage?: string;
  alt: string;
  // the corner the lucide arrow badge sits in
  iconPosition?: IconCorner;
  // grid placement / sizing passed in by the parent
  className?: string;
}



// where the badge sits, centered right on the corner so it nests in the notch
const cornerClasses: Record<IconCorner, string> = {
  "top-left": "-top-1 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-1 right-0",
};

const InitiativeCard = ({
  image,
  desktopImage,
  alt,
  iconPosition = "top-right",
  className,
}: InitiativeCardProps) => {

  return (
    <div className={cn("relative", className)}>
      {/* mobile art, hidden once the desktop art takes over */}
      <Image
        src={image}
        alt={alt}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 768px"
        className={cn("h-full w-auto", desktopImage && "sm:hidden")}
      />

      {/* desktop art, only from sm up */}
      {desktopImage && (
        <Image
          src={desktopImage}
          alt={alt}
          fill
          loading="lazy"
          sizes="(min-width: 640px) 50vw, 100vw"
          className="hidden h-full w-auto sm:block"
        />
      )}

      {/* round arrow badge sitting inside the notch */}
      <button
        type="button"
        aria-label={`Open ${alt}`}
        className={cn(
          "absolute grid size-9 place-items-center rounded-full bg-primary text-white transition-transform hover:scale-105 sm:size-16",
          cornerClasses[iconPosition],
        )}
      >
        <ArrowUpRight  size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default InitiativeCard;
