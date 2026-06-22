import Image from "next/image";

import { cn } from "@/app/lib/utils";

// extends section props so it can act as a dialog trigger via asChild, which
// forwards onClick / ref / aria onto the root section
interface ProductShowCaseProps extends React.ComponentProps<"section"> {
  image: string;
  // optional, some images already have the headline baked in
  headline?: string;
  rangeLabel: string;
  // animated spin badge gif, leave it out to drop the badge entirely
  badgeGif?: string;
  // accessible label for the badge gif
  badgeText?: string;
  // which side the spinning badge sits on. the headline and range label
  // flip to the opposite side so they stay clear of it
  align?: "left" | "right";
  // which corner the badge gif sits in. defaults to the corner derived from
  // align and badgePosition, pass this to place it anywhere independently
  badgePlacement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  // which edge the badge hugs, eg the masala art has a notch up top
  badgePosition?: "top" | "bottom";
  // which edge the range label hugs, defaults to the bottom
  labelPosition?: "top" | "bottom";
  // light backgrounds keep the maroon text, dark imagery flips it to white
  tone?: "light" | "dark";
}

const ProductShowCase = ({
  image,
  headline,
  rangeLabel,
  badgeGif,
  badgeText,
  align = "left",
  badgePlacement,
  badgePosition = "bottom",
  labelPosition = "bottom",
  tone = "light",
  className,
  ...rest
}: ProductShowCaseProps) => {
  const badgeRight = align === "right";
  const labelTop = labelPosition === "top";
  // badge corner, from badgePlacement if given, else from align + badgePosition
  const placement =
    badgePlacement ?? `${badgePosition}-${badgeRight ? "right" : "left"}`;
  const badgeTop = placement.startsWith("top");
  const badgeAtRight = placement.endsWith("right");
  const textColor = tone === "dark" ? "text-white" : "text-primary";
  const hasBadge = Boolean(badgeGif);

  // with a badge the range label dodges to the other side, without one it just
  // sits on the aligned side
  const rangeLabelPosition = hasBadge
    ? badgeRight
      ? "left-3 sm:left-10"
      : "left-1/4"
    : badgeRight
      ? "right-3 sm:right-10"
      : "left-3 sm:left-10";

  return (
    <section className={cn("px-6 sm:p-0", className)} {...rest}>
      <div className="relative mx-auto h-auto w-full max-w-3xl overflow-hidden rounded-3xl">
        <Image
          src={image}
          alt="India Gate basmati rice range"
          width={400}
          height={300}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />

        {/* headline sits at the top, opposite the badge so the two never crowd */}
        {headline && (
          <h2
            className={cn(
              "absolute top-3 sm:top-4 max-w-[90%] sm:max-w-none font-sans text-base sm:text-[22px]/5.5 font-normal ",
              textColor,
              badgeRight
                ? "right-3 text-right sm:right-10 "
                : "left-3 sm:left-4 ",
            )}
          >
            {headline}
          </h2>
        )}

        {/* range label, kept clear of the badge by pushing it the other way */}
        <p
          className={cn(
            "absolute font-sans text-xl font-bold uppercase text-shadow-[0px_4.01px_8.02px_#672E1FB2] sm:text-3xl sm:text-shadow-[0px_6.3px_12.61px_#672E1FB2]",
            labelTop ? "top-2 sm:top-9" : "bottom-2 sm:bottom-3",
            textColor,
            rangeLabelPosition,
          )}
        >
          {rangeLabel}
        </p>

        {/* animated spin badge gif, absolutely placed in its corner */}

        {badgeGif && (
          <Image
            src={badgeGif}
            alt={badgeText ?? ""}
            width={132}
            height={132}
            loading="lazy"
            unoptimized
            className={cn(
              "absolute z-10 h-auto w-16 sm:w-20",
              badgeTop ? "top-0" : "bottom-0",
              badgeAtRight ? "right-0" : "left-0",
            )}
          />
        )}

        {/* mp4 version, parked until the white bg is fixed, see AGENTS.md
        {badgeGif && (
          <video
            src={badgeGif.replace(".gif", ".mp4")}
            autoPlay
            loop
            muted
            playsInline
            aria-label={badgeText}
            className={cn(
              "absolute z-10 h-auto w-16 sm:w-24",
              badgeTop ? "top-3 sm:top-5" : "bottom-3 sm:bottom-5",
              badgeAtRight ? "right-3 sm:right-5" : "left-3 sm:left-5",
            )}
          />
        )} */}
      </div>

      {/*  */}
    </section>
  );
};

export default ProductShowCase;
