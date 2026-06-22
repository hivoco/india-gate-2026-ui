"use client";

import { useState } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";

import { cn } from "@/app/lib/utils";

// how much the spin speeds up or slows while the pointer is over the badge.
// mirrors react bits CircularText: speedUp 4x, slowDown half, pause freeze,
// goBonkers 20x. the factor multiplies the base spin rate.
const HOVER_SPEED = {
  slowDown: 0.5,
  speedUp: 4,
  pause: 0,
  goBonkers: 20,
} as const;

type HoverMode = keyof typeof HOVER_SPEED;

type SpinningBadgeProps = {
  // single word laid around the ring, repeated `repeat` times
  text: string;
  // how many times the word wraps around the circle
  repeat?: number;
  // glyph shown between each repeat of the word
  separator?: string;
  // overall diameter of the badge in px
  size?: number;
  // seconds for one full rotation
  duration?: number;
  // flip the spin direction
  reverse?: boolean;
  // any lucide icon sat still in the middle, defaults to the arrow
  icon?: LucideIcon;
  // how the ring reacts to hover, leave unset for no reaction
  onHover?: HoverMode;
  className?: string;
  // styling hooks for the two pieces
  textClassName?: string;
  iconClassName?: string;
};

// static lucide icon in the middle with a ring of text spinning around it.
// the ring rotates forever, the center sits still. honours reduced motion.
const SpinningBadge = ({
  text,
  repeat = 3,
  separator = "|",
  size = 160,
  duration = 18,
  reverse = false,
  icon: Icon = ArrowUpRight,
  onHover,
  className,
  textClassName,
  iconClassName,
}: SpinningBadgeProps) => {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  // build the full ring string. no padding around the separator so every glyph,
  // letters and separators alike, gets an equal slice of the ring. the spaces
  // were eating arc the letters could use
  const word = text.trim();
  const units = Array.from({ length: repeat }, () => `${word}${separator}`);
  const chars = units.join("").split("");

  // push each glyph out to the rim, a touch inside the edge so it never clips.
  // bigger radius means more circumference so the letters stop merging.
  const radius = size / 2 - size * 0.04;
  const step = 360 / chars.length;

  // drive the spin by hand so changing speed on hover just bends the rate
  // instead of snapping the ring back to a new keyframe.
  const rotate = useMotionValue(0);
  const degPerMs = (reverse ? -360 : 360) / (duration * 1000);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const factor = onHover && hovered ? HOVER_SPEED[onHover] : 1;
    if (factor === 0) return;
    rotate.set((rotate.get() + degPerMs * delta * factor) % 360);
  });

  // only wire up the hover listeners when a hover mode is actually set
  const hoverProps = onHover
    ? {
        onPointerEnter: () => setHovered(true),
        onPointerLeave: () => setHovered(false),
      }
    : undefined;

  // goBonkers gives the whole badge a little squeeze, like the react bits original
  const scale = !reduceMotion && hovered && onHover === "goBonkers" ? 0.8 : 1;

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      animate={{ scale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={word}
      {...hoverProps}
    >
      <motion.div className="absolute inset-0" style={{ rotate }}>
        {chars.map((char, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "absolute left-1/2 top-1/2 inline-block text-sm font-semibold text-primary",
              textClassName,
            )}
            style={{
              transform: `translate(-50%, -50%) rotate(${i * step}deg) translateY(-${radius}px)`,
            }}
          >
            {char}
          </span>
        ))}
      </motion.div>

      <Icon
        className={cn(
          "absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 text-primary",
          iconClassName,
        )}
        strokeWidth={2.5}
      />
    </motion.div>
  );
};

export default SpinningBadge;
