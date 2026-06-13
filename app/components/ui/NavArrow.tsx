import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

// circular maroon prev/next button shared by the mobile carousels (hero gallery, range).
// position comes from direction, pass className for visibility eg md:hidden.
type NavArrowProps = {
  direction: "left" | "right";
  label: string;
  size?: "sm" | "md";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const SIZES = {
  sm: { button: "size-6", icon: "size-4" },
  md: { button: "size-8", icon: "size-5" },
} as const;

const NavArrow = ({
  direction,
  label,
  size = "md",
  onClick,
  disabled,
  className,
}: NavArrowProps) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-md transition disabled:pointer-events-none disabled:opacity-40",
        direction === "left" ? "left-1" : "right-1",
        SIZES[size].button,
        className,
      )}
    >
      <Icon className={SIZES[size].icon} aria-hidden />
    </button>
  );
};

export default NavArrow;
