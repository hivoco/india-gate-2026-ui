"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../lib/utils";
import QuatrefoilPattern from "./QuatrefoilPattern";

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: "What is the best basmati rice for biryani in India?",
    answer:
      "For restaurant-quality biryani at home, you need: (1) extra-long grains for visual appeal, (2) extended aging for aroma and separation, (3) high elongation for fluffy results. India Gate Classic checks all three — 2-year aged, extra-long grains, 2.5x elongation. It's specifically designed for dishes where rice is the centrepiece. For everyday biryani, Super or Tibar work well at lower price points.",
  },
  {
    question: "Classic vs Biryani Special — which is better for biryani?",
    answer:
      "Both are premium options. Classic is our flagship gold standard — 2-year aged, extra-long grains, works brilliantly for biryani AND pulao AND special occasions. Biryani Special is specifically engineered for biryani with optimized grain separation. Choose Classic for versatility across celebrations; Biryani Special if you're a biryani purist who wants rice designed for that one dish.",
  },
  {
    question: "Why is aged basmati rice better than fresh basmati?",
    answer:
      "Aging transforms basmati rice. During 2 years of controlled storage, moisture content reduces and starch structure changes. The result: (1) Stronger aroma — the signature basmati fragrance intensifies, (2) Better elongation — grains stretch longer, (3) Exceptional separation — no clumping or sticking, (4) Fluffier texture — lighter, more delicate grains. Fresh basmati can be sticky and lacks the aromatic depth that makes biryani memorable.",
  },
  {
    question: "Is India Gate Classic worth the premium price?",
    answer:
      "Classic costs more because it delivers more: 2 full years of aging (most competitors age 12-18 months), hand-selected extra-long grains, and India Gate's 135-year quality legacy. For everyday meals, our mid-range options like Tibar or Dubar offer excellent value. But for occasions where rice quality is visible and memorable — festivals, guests, celebrations — Classic is the rice that never disappoints.",
  },
  {
    question: "Which India Gate rice is best for special occasions?",
    answer:
      "For celebrations and special occasions, we recommend: Classic (flagship, 2-year aged, versatile for biryani + pulao), Biryani Special (optimized specifically for biryani), or Super (premium, versatile option at a mid-range price). Classic is the traditional choice for weddings, Eid, Diwali, and family gatherings where the rice needs to impress.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) =>
    setOpenIndex((current) => (current === index ? null : index));

  return (
    <section className="relative isolate overflow-hidden py-6 sm:py-12 ">
      {/* Faint quatrefoil brand bands, top and bottom. */}
      <QuatrefoilPattern className="bottom-auto h-[15%] " />
      {/* <QuatrefoilPattern className="top-auto h-[15%] " /> */}

      <div className="relative z-10 mx-auto flex custom-container flex-col gap-10">
        <header className="text-center">
          <h2 className="font-display text-3xl text-primary sm:text-4xl">
            FAQs
          </h2>

          <Image
            src="/ig-classic-assets/pattern-icon.png"
            alt=""
            width={262}
            height={28}
            loading="lazy"
            className="mx-auto mt-4 block h-5 w-auto"
          />
        </header>

        <ul className="flex flex-col divide-y divide-gray-200 ">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const number = String(index + 1).padStart(2, "0");
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <li className="backdrop-blur-lg" key={faq.question}>
                {/* No border here — a border-b on a rounded-3xl box is clipped
                    by the corner radius, so it wouldn't span the full width. The
                    full-width rules come from `divide-y` on the <ul>. */}
                <div
                  className={cn(
                    "rounded-t-3xl transition-colors duration-200",
                    isOpen && "bg-primary/5",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(index)}
                      className="group flex flex-col sm:flex-row w-full cursor-pointer items-center gap-3 rounded-3xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:gap-6 sm:p-6"
                    >
                      <span
                        className={cn(
                          "w-10 shrink-0 font-display text-2xl tabular-nums sm:w-12 sm:text-3xl self-start sm:self-center",
                        )}
                      >
                        {number}
                      </span>

                      <div className="flex gap-2 sm:justify-between w-full">
                        <span
                          className={cn(
                            "flex-1 text-xl transition-opacity ease-out duration-500",
                            isOpen
                              ? "font-bold text-primary"
                              : "font-normal text-primary ",
                          )}
                        >
                          {faq.question}
                        </span>

                        <span
                          className={cn(
                            "grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-200 sm:size-10 ",
                            isOpen
                              ? "bg-primary text-white"
                              : "bg-primary/10 text-primary group-hover:bg-primary/15",
                          )}
                        >
                          {/* collapsed shows a down arrow, the open panel flips
                            it to an up arrow */}
                          {isOpen ? (
                            <ChevronUp
                              aria-hidden
                              className="size-4 sm:size-5"
                            />
                          ) : (
                            <ChevronDown
                              aria-hidden
                              className="size-4 sm:size-5"
                            />
                          )}
                        </span>
                      </div>
                    </button>
                  </h3>

                  {/* grid-rows 0fr→1fr gives a smooth height transition without
                      measuring the content in JS. */}

                  {/* Don't use `hidden`/`display:none` here — it can't be
                      transitioned, so the panel would pop instead of slide. The
                      grid-rows 0fr→1fr + overflow-hidden keeps it collapsed. */}

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={cn(
                      "grid transition-all duration-500 ease-out motion-reduce:transition-none ",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="flex gap-4 px-5 pb-6 sm:gap-6 sm:px-7">
                        {/* Spacer matches the number column so the answer aligns
                            under the question, not the number. */}
                        <span
                          className="hidden sm:inline w-10 shrink-0 sm:w-12"
                          aria-hidden
                        />
                        <p className="flex-1 text-sm font-normal sm:text-lg leading-relaxed text-primary">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Faqs;
