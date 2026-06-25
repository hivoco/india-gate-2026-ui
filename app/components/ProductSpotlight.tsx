"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";

import { cn } from "@/app/lib/utils";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export interface SpotlightItem {
  // main label under the phone, eg the variant name
  text: string;
  // smaller line below the main label
  subtext: string;
  image: string;
  // optional per image tailwind scale class, eg "scale-90". overrides the
  // spotlight wide imageScale prop when this one pack needs its own zoom
  scale?: string;
}

interface ProductSpotlightProps {
  items: SpotlightItem[];
  // the element that opens the dialog, eg a ProductShowCase card
  children: React.ReactNode;
  // which item is in the phone frame when the dialog first opens
  initialIndex?: number;
  // tailwind scale class for the main pack shot, packs are framed differently
  // per range so each spotlight can tune its own zoom, eg "scale-90"
  imageScale?: string;
}

// notch ui, a frosted control bar with a centered bulge dropping out of it. the
// dots inside track which pack is in frame, mirroring the thumbnail rail below.
// the bar and the bulge are one flat strip plus one svg path that abut edge to
// edge, drawn as a single shape so a translucent fill stays even instead of
// doubling up where two parts would overlap. this only draws the notch, it does
// not position itself, the caller places it (eg over the white screen).
// the glass card's whole look mixed down to one flat colour, since an svg fill
// can only take a colour. maroon primary, plus its white/10 fill, plus a heavier
// pour of the white inset sheen so it lands on the frostier, glassier side.
const NOTCH = "rgba(168, 134, 126, 0.6)";

function Notch({ count, active }: { count: number; active: number }) {
  // bulge width follows the dot count, a floor so it never collapses with few
  // dots, growing per dot, capped so a long range still sits inside the frame.
  const DOT = 6; // size-1.5
  const GAP = 8; // gap-2
  const PAD = 52; // breathing room plus the two rounded ends
  const MIN_W = 120;
  const MAX_W = 240;
  const dotsWidth = count * DOT + Math.max(0, count - 1) * GAP;
  const width = Math.min(MAX_W, Math.max(MIN_W, dotsWidth + PAD));

  return (
    <div className="flex w-full flex-col items-center  absolute bottom-full">
      {/* the centered bulge hanging out of the bar, one path so the fill is even.
          the top corners are concave fillets that blend it back into the bar, the
          bottom corners are convex so the bulge reads as a rounded tab. the corner
          radii stay fixed, only the flat middle stretches with the width. */}
      <div className="relative">
        <svg
          width={width}
          height="26"
          viewBox={`0 0 ${width} 26`}
          fill="none"
          aria-hidden
        >
          <path
            d={`M0 26 L${width} 26 Q${width - 12} 26 ${width - 12} 14 L${width - 12} 10 Q${width - 12} 0 ${width - 22} 0 L22 0 Q12 0 12 10 L12 14 Q12 26 0 26 Z`}
            fill={NOTCH}
          />
        </svg>

        {/* dots sit over the bulge */}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={cn(
                // shrink-0 so flex never squishes the width and turns the circle into a pill
                "size-1.5 shrink-0 rounded-full transition-colors duration-300",
                i === active ? "bg-primary" : "bg-white",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// product spotlight, a shadcn dialog framing one product with a thumbnail rail
// of the rest of the range underneath. tapping a thumbnail swaps the hero shot.
// radix owns open state, focus trap, scroll lock and escape, we only track which
// item is active.
const ProductSpotlight = ({
  items,
  children,
  initialIndex = 0,
  imageScale = "scale-100",
}: ProductSpotlightProps) => {
  const [active, setActive] = useState(initialIndex);
  const current = items[active] ?? items[0];
  const reduceMotion = useReducedMotion();
  // desktop dialog is far wider than the rail, so an unlooped center rail parks
  // the first pack mid frame with an empty gutter beside it. loop only from sm up
  // to keep both ends balanced, mobile stays exactly as it was, unlooped.
  const isDesktop = useMediaQuery("(min-width: 640px)");

  // embla drives the bottom thumbnail rail in center mode, the centred pack is the
  // active one. loop on (desktop only) so the ends are not lopsided, the rail
  // wraps round and the centred pack always has neighbours on both sides.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: isDesktop,
    containScroll: false,
    startIndex: initialIndex,
    duration: reduceMotion ? 0 : 22,
  });

  // mirror embla's centred slide into active so the hero, dots and caption follow
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  // continuous coverflow scale, the further a thumb sits from the centre the
  // smaller and fainter it gets. we write transform straight to the dom on every
  // scroll frame instead of re-rendering, so it stays smooth during the drag.
  useEffect(() => {
    if (!emblaApi) return;
    const buttons = emblaApi
      .slideNodes()
      .map((slide) => slide.querySelector("button"));

    const tween = () => {
      const engine = emblaApi.internalEngine();
      const progress = emblaApi.scrollProgress();
      const snaps = emblaApi.scrollSnapList();
      // distance between two neighbouring snaps, so we can read distance in
      // whole slides rather than raw 0..1 progress.
      const step = snaps.length > 1 ? snaps[1] - snaps[0] : 1;

      snaps.forEach((snap, i) => {
        const node = buttons[i];
        if (!node) return;

        let diff = snap - progress;
        // when looped (desktop), a thumb can be shifted round to the far side.
        // read its distance from where it actually sits, not its raw snap, so
        // the centred pack keeps matching neighbours on both sides instead of a
        // tiny wrapped one.
        if (engine.options.loop) {
          engine.slideRegistry[i].forEach((slideIndex) => {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
              if (slideIndex === loopItem.index && target !== 0) {
                if (Math.sign(target) === -1) diff = snap - (1 + progress);
                if (Math.sign(target) === 1) diff = snap + (1 - progress);
              }
            });
          });
        }

        const distance = Math.abs(diff / step);
        // each slide away from the centre loses a bit of scale and opacity,
        // clamped so far away thumbs never vanish.
        const scale = Math.max(0.55, 1 - distance * 0.22);
        const opacity = Math.max(0.4, 1 - distance * 0.3);
        node.style.transform = `scale(${scale})`;
        node.style.opacity = `${opacity}`;
      });
    };

    tween();
    emblaApi.on("scroll", tween).on("reInit", tween).on("slideFocus", tween);
    return () => {
      emblaApi
        .off("scroll", tween)
        .off("reInit", tween)
        .off("slideFocus", tween);
    };
  }, [emblaApi]);

  // soft crossfade with a tiny lift on each swap, killed for reduced motion
  // const swap = {
  //   initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
  //   animate: { opacity: 1, y: 0 },
  //   exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 },
  //   transition: {
  //     duration: reduceMotion ? 0 : 0.35,
  //     ease: [0.16, 1, 0.3, 1] as const,
  //   },
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="flex gap-4 h-dvh w-screen max-w-none flex-col items-center justify-between overflow-hidden bg-primary/40 backdrop-blur-sm  py-6 pt-12  duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:slide-out-to-right-24 data-[state=open]:slide-in-from-right-24
      sm:h-[88dvh] sm:w-[92vw] sm:max-w-400 sm:rounded-4xl sm:border sm:border-white/15 sm:py-12
      "
      >
        {/* phone shell region, flex-1 + min-h-0 so it grows into the gap between
            the top and the rail and can still shrink on short screens */}
        <div className="flex min-h-0 w-full flex-1 justify-center px-6 sm:flex-none">
          <div
            className=" flex h-full w-full max-w-md sm:max-w-xs flex-col rounded-3xl 
            border border-white/25 bg-white/10  text-white
            backdrop-blur-xl shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.65),inset_0_-1.5px_2px_rgba(255,255,255,0.35),inset_0_0_24px_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.3)]
            sm:h-auto sm:border-0 sm:bg-transparent sm:backdrop-blur-none sm:shadow-none
        "
          >
            {/* white screen, the growing part. min-h-0 lets it shrink, the pack
                image contains inside so it never crops */}
            <div className="relative  min-h-0 flex-1 overflow-hidden rounded-3xl bg-white px-4 pt-4 pb-8 shadow-2xl sm:aspect-3/4 sm:h-auto sm:flex-none ">
              <Image
                src={current.image}
                alt={`${current.text} ${current.subtext}`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 90vw, 420px"
                className={cn(
                  "object-contain object-center p-4",
                  // per item scale wins, else the spotlight wide default
                  current.scale ?? imageScale,
                )}
              />
            </div>

            <div className="relative shrink-0 ">
              <Notch count={items.length} active={active} />
              <DialogTitle className="font-display text-3xl capitalize leading-none sm:text-2xl px-4 py-6 sm:py-3 sm:pb-0 sm:px-0 text-center">
                {current.text}
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* here we need to use embela libray */}
        {/* embla center mode thumbnail rail, the centred pack is the active one. tap a
            neighbour to slide it to the centre and swap the hero shot above. */}
        <div
          className="w-full max-w-lg overflow-hidden min-h-fit "
          ref={emblaRef}
        >
          <div className="flex items-center">
            {items.map((item, i) => {
              const isActive = i === active;

              return (
                <div
                  key={item.text + i}
                  className="flex shrink-0 grow-0 basis-1/4 justify-center px-2 sm:basis-1/5 py-1 sm:py-"
                >
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollTo(i)}
                    aria-label={item.text}
                    className={cn(
                      // scale and opacity are driven per frame by the embla tween
                      // above, css only owns the focus ring and the active ring.
                      "relative aspect-square w-full origin-center overflow-hidden rounded-full bg-white outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-white",
                      isActive &&
                        "ring-1 ring-white ring-offset-2 ring-offset-primary",
                    )}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 33vw, 120px"
                      className="object-contain p-3 "
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSpotlight;
