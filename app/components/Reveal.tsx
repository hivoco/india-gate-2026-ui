"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/utils";

// which way the section drifts in from before settling into place
type Direction = "up" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  // small nudge so stacked items can stagger in one after another
  delay?: number;
  // up is the default drift, left/right slide in from the side, none is a plain fade
  direction?: Direction;
};

// how far the content sits from its resting spot before it animates in
const OFFSET = 50;

// maps a direction to its starting offset, the tween always lands at 0,0
const offsetFor = (direction: Direction) => {
  switch (direction) {
    case "left":
      return { x: -OFFSET, y: 0 };
    case "right":
      return { x: OFFSET, y: 0 };
    case "none":
      return { x: 0, y: 0 };
    default:
      return { x: 0, y: OFFSET };
  }
};

// fades a section into place the first time it scrolls into view.
// runs once and skips the movement entirely for reduced motion users.
const Reveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("overflow-x-hidden",className)}
      initial={reduceMotion ? false : { opacity: 0, ...offsetFor(direction) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
