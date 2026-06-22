"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const HAND_IMAGE = "/hand-ok-gesture.png";

const BrandIntro = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background py-6 sm:py-7">
      <div className=" flex pl-6 sm:px-0">
        <div className="relative z-10 max-w-[80%] md:max-w-[80%] font-normal ">
          <h2 className="font-display text-3xl text-primary sm:text-4xl">
            World&apos;s Number 1
            <sup className="text-[0.5em] font-normal">*</sup> Basmati Rice Brand
          </h2>

          <p className="mt-1 text-sm/4 text-primary sm:mt-2 sm:text-xl lg:text-xl/6">
            India Gate Basmati Rice, the flagship brand of KRBL Limited, is
            globally renowned for bringing perfectly aged rice with unmatched
            quality, consistency, and taste to millions of households across
            India and more than 90 countries worldwide.
          </p>

          <p className="mt-1 text-[6px] text-primary sm:mt-6 sm:text-sm">
            *As per the Mordor Intelligence Report on packaged basmati Rice, MAT
            June 2024.
          </p>
        </div>


        {/* outer stays put so the scroll trigger fires, inner is the part that
            slides in from off the right edge. doing both on one element breaks
            on mobile where the hand is already clipped off screen at rest. */}
        <motion.div
          className="overflow-hidden sm: ml-auto mr-0"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            className="h-full w-auto"
            variants={{
              hidden: { x: reduceMotion ? 0 : "100vw" },
              shown: { x: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={HAND_IMAGE}
              alt=""
              width={100}
              height={200}
              loading="lazy"
              aria-hidden
              className=" object-contain h-full w-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandIntro;
