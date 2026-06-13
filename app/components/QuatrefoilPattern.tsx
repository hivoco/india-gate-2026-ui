import { cn } from "../lib/utils";

/**
 * Faint quatrefoil brand band — renders the master `bg-pattern.svg` asset as a
 * tiling background. Drop it into any positioned host (`relative` or `isolate`)
 * so the pattern sits behind the content:
 *
 *   <section className="relative ...">
 *     <QuatrefoilPattern />
 *     …content…
 *   </section>
 *
 * The asset already bakes in the maroon colour at 10% opacity, so it's ready to
 * use as-is. Tile position or extra opacity can be tuned per use via className.
 */
{
  /* // keep this h in this patten of 5 ,15,25,35 % in className  */
}

const QuatrefoilPattern = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-0 -z-10 bg-[url('/ig-classic-assets/bg-pattern.svg')] bg-repeat",
      className,
    )}
  />
);

export default QuatrefoilPattern;
