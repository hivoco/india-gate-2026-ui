"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../lib/utils";
import QuatrefoilPattern from "./QuatrefoilPattern";
import SectionHeading from "../products/classic/SectionHeading";
// import { useIsHomePage } from "../hooks/useIsHomePage";

export type Faq = {
  question: string;
  answer: string;
};

const Faqs = ({ faqs }: { faqs: Faq[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  // const isHomePage = useIsHomePage();

  const toggle = (index: number) =>
    setOpenIndex((current) => (current === index ? null : index));

  return (
    <section className="relative isolate overflow-hidden py-6 sm:py-12 ">
      {/* // in rest of the component is sm py-10 either they will change in future or this will idk */}

      {/* Faint quatrefoil brand bands, top and bottom. */}
      <QuatrefoilPattern className="bottom-auto h-[15%] sm:h-[10%]" />
      {/* <QuatrefoilPattern className="top-auto h-[15%] " /> */}

      <div className="relative z-10 mx-auto flex custom-container flex-col gap-10">
        <SectionHeading title="FAQs" />

        <ul className="flex flex-col divide-y divide-gray-200 ">
          {faqs.map((faq, index) => {
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
