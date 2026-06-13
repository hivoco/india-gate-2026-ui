"use client";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

// tunables for the coverflow math, tweak these to re-skin without touching logic.
const SCALE_STEP = 0.16; // how fast cards shrink per step from the centre
const MIN_SCALE = 0.5;
const OPACITY_STEP = 0.3; // how fast cards fade per step from the centre
const LIFT_STEP = 12; // gentle downward push for side cards (px)

export type CoverflowCardState = {
  featured: boolean; // true only for the centre card
  distance: number; // steps away from the centre, 0..n
};

type CoverflowProps<T> = {
  items: T[];
  // the static card markup, coverflow wraps this in the animated layer.
  renderCard: (item: T, state: CoverflowCardState) => ReactNode;
  getKey?: (item: T, index: number) => string | number;
  onActiveChange?: (index: number) => void;
  initialFocus?: number;
  autoplayMs?: number;
  arrowClassName?: string; // theme the prev/next buttons
  cardClassName?: string; // extra classes on the animated wrapper (e.g. focus ring)
};

// shortest signed distance from a card to the focus, wrapped so the deck loops.
function wrappedOffset(index: number, focus: number, n: number) {
  let off = index - focus;
  if (off > n / 2) off -= n;
  if (off < -n / 2) off += n;
  return off;
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

// scale a card gets at `d` steps from the centre.
const stepScale = (d: number) => clamp(1 - d * SCALE_STEP, MIN_SCALE, 1);

// signed centre x for a card at `off`. we accumulate each card's scaled
// half-widths plus a fixed edgeGap, so the visible space between every pair of
// neighbours stays exactly equal even though the cards differ in size.
function centreOffset(off: number, cardW: number, edgeGap: number) {
  const d = Math.abs(off);
  let pos = 0;
  for (let k = 1; k <= d; k++) {
    pos += ((stepScale(k - 1) + stepScale(k)) * cardW) / 2 + edgeGap;
  }
  return Math.sign(off) * pos;
}

export default function Coverflow<T>({
  items,
  renderCard,
  getKey = (_, i) => i,
  onActiveChange,
  initialFocus = 0,
  autoplayMs = 2200,
  arrowClassName,
  cardClassName,
}: CoverflowProps<T>) {
  const [focus, setFocus] = useState(initialFocus);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const n = items.length;

  // edge gap, card size and visible count all derive from the live stage width.
  const [metrics, setMetrics] = useState({ cardW: 200, edgeGap: 30, visible: 2 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      const w = stage.clientWidth;
      const mobile = w < 640;
      const visible = mobile ? 1 : 2;
      // mobile is one dominant centre card with the neighbours just peeking in
      // at the edges, larger screens keep the tighter row of two each side.
      const cardW = mobile ? clamp(w * 0.74, 220, 340) : clamp(w * 0.38, 150, 240);
      // the equal breathing room between every pair of neighbours.
      const edgeGap = cardW * (mobile ? 0.02 : 0.05);
      setMetrics({ cardW, edgeGap, visible });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  const advance = useCallback(() => setFocus((f) => (f + 1) % n), [n]);

  // autoplay, paused on hover and skipped for reduced-motion users.
  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setInterval(advance, autoplayMs);
    return () => clearInterval(id);
  }, [advance, autoplayMs, reduceMotion, paused]);

  // let the parent mirror the active item, e.g. a caption under the deck.
  useEffect(() => {
    onActiveChange?.(focus);
  }, [focus, onActiveChange]);

  return (
    <div className="relative  sm:px-14 lg:px-12">
      <Arrow
        direction="prev"
        className={arrowClassName}
        onClick={() => setFocus((f) => (f === 0 ? n - 1 : f - 1))}
      />

      <div
        ref={stageRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative w-full overflow-hidden"
        style={{ height: metrics.cardW + 72 }}
      >
        {items.map((item, i) => {
          const off = wrappedOffset(i, focus, n);
          const dist = Math.abs(off);
          const hidden = dist > metrics.visible;
          const featured = dist === 0;

          const scale = stepScale(dist);
          const opacity = hidden ? 0 : clamp(1 - dist * OPACITY_STEP, 0, 1);

          return (
            <motion.button
              key={getKey(item, i)}
              type="button"
              onClick={() => setFocus(i)}
              aria-hidden={hidden}
              tabIndex={hidden ? -1 : 0}
              className={cn(
                "absolute left-1/2 top-1/2 cursor-pointer rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-black/40",
                cardClassName,
              )}
              style={{ width: metrics.cardW, zIndex: 100 - Math.round(dist) }}
              initial={false}
              // centering is baked into x/y so motion's transform can own the glide.
              animate={{
                x:
                  centreOffset(off, metrics.cardW, metrics.edgeGap) -
                  metrics.cardW / 2,
                y: dist * LIFT_STEP - metrics.cardW / 2,
                scale,
                opacity,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 120, damping: 22, mass: 0.9 }
              }
            >
              {renderCard(item, { featured, distance: dist })}
            </motion.button>
          );
        })}
      </div>

      <Arrow
        direction="next"
        className={arrowClassName}
        onClick={() => setFocus((f) => (f === n - 1 ? 0 : f + 1))}
      />
    </div>
  );
}

const Arrow = ({
  direction,
  className,
  onClick,
}: {
  direction: "prev" | "next";
  className?: string;
  onClick: () => void;
}) => {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={isPrev ? "Previous" : "Next"}
      className={cn(
        // hidden on mobile, the peeking cards plus autoplay drive the deck there.
        "absolute top-1/2 z-20 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition sm:flex sm:size-8",
        isPrev ? "left-0" : "right-0",
        className ?? "bg-black text-white hover:bg-black/90",
      )}
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
};
