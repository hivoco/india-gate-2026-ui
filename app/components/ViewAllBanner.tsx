"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import QuatrefoilPattern from "./QuatrefoilPattern";
import { Button } from "./ui/button";

// cta banner with a centered view all button, the happy eater mascot tucks
// into the bottom right and the brand quatrefoil pattern sits behind it
const ViewAllBanner = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section className="">
      <motion.div
        className="relative isolate overflow-x-clip overflow-y-visible rounded-2xl bg-white"
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* single row of brand quatrefoil dots sitting just above the strip */}
        <QuatrefoilPattern className="inset-x-0 top-auto bottom-4 h-15 bg-repeat-x bg-bottom" />

        {/* maroon base strip following the rounded bottom corners */}
        <div className="absolute inset-x-0 bottom-0 h-4 bg-primary" />

        {/* centered call to action */}
        <div className="relative flex min-h- items-center justify-center px-6 pb-16 ">
          <Button
            size="lg"
            className="rounded-xl !px-12 py-6 text-base font-normal"
          >
            View All
            <ArrowRight />
          </Button>
        </div>

        {/* mascot tucked into the bottom right, overlapping the maroon strip */}
        <motion.div
          className="pointer-events-none absolute bottom-0 right-3 w-28 overflow-hidden sm:w-40"
          variants={{
            hidden: { x: "120%", opacity: 0 },
            show: { x: 0, opacity: 1 },
          }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src="/initiatives/boy-eating-rice.png"
            alt="Happy customer enjoying a bowl of India Gate rice"
            width={130}
            height={101}
            loading="lazy"
            className="block h-auto w-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ViewAllBanner;
