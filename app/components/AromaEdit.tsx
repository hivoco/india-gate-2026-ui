"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/app/lib/utils";
import SectionHeading from "@/app/products/classic/SectionHeading";
import ArticleCard from "./ArticleCard";
import VideoCard from "./VideoCard";

const FILTERS = ["All", "Articles", "Videos"] as const;

const indiaGateArticles = [
  {
    image: "/article-assets/recipe-dish.png",
    heading: "Perfecting Every Recipe",
    text: "Tips, techniques, and inspiration to elevate every meal you make.",
    time: "5 min reads",
  },
  {
    image: "/article-assets/story-of-basmati.png",
    heading: "The Story Of Basmati",
    text: "From the foothills of the Himalayas to your plate, the journey of every grain.",
    time: "4 min reads",
  },
  // {
  //   image: "/article-assets/recipe-dish.png",
  //   heading: "Cook Like A Chef",
  //   text: "Simple habits and small steps that turn an everyday meal into something special.",
  //   time: "6 min reads",
  // },
];

const indiaGateRiceVideos = [
  {
    title: "Feast Rozana Review",
    description:
      "Review and recipe demo of India Gate Feast Rozana Basmati Rice.",
    link: "https://www.youtube.com/watch?v=V2RdxMHfSOs",
  },
  {
    title: "Pulav Rice Cooking Demo",
    description:
      "Review and cooking demo of India Gate Pulav Basmati; creator asks viewers to like, subscribe and share feedback.",
    link: "https://www.youtube.com/watch?v=AI6iWBPFnzs",
  },
  // {
  //   title: "The World's No. 1 Basmati",
  //   description: "KRBL showcases how India Gate's trusted legacy is combined with cutting-edge manufacturing innovation to make it the world's most iconic basmati brand.",
  //   link: "https://www.youtube.com/watch?v=z3Cqaq_2FkE"
  // }
];
type Filter = (typeof FILTERS)[number];

const AromaEdit = () => {
  const [active, setActive] = useState<Filter>("All");
  const reduceMotion = useReducedMotion();

  return (
    <section className="text-center overflow-hidden">
      <SectionHeading
        title="The Aroma Edit"
        className="text-2xl uppercase sm:text-4xl lg:text-5xl"
        subtitle="Everything rice, recipes, guides, techniques, and stories. Your go-to destination for all things India Gate."
      />

      <div className="mt-4 mb-5 flex items-center justify-between gap-3 sm:mt-8 sm:mb-6 sm:max-w-2/3 sm:mx-auto">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={cn(
              "rounded-full px-2.5 w-full py-1 text-base font-bold transition-colors sm:px-8 sm:py-3",
              active === filter
                ? "bg-primary text-white"
                : "bg-primary/10 text-primary hover:bg-primary/15",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* mobile is untouched, every card stacks in one column with the art below.
          on sm up the left column goes display contents so its rows drop into the
          outer grid. the image fills the 30% column beside the last visible row,
          and in the all tab the articles span the full width on their own top row.
          the rows keep overflow-x-auto so they scroll when the cards run wide */}

      <div className="relative sm:grid sm:grid-cols-[1fr_30%] sm:items-end sm:gap-3 sm:pb-6">
        <div className="flex flex-col gap-3 sm:contents">
          {/* articles, one scrollable row on sm up */}
          {active !== "Videos" && (
            <div
              className={cn(
                "flex flex-col gap-3 sm:flex-row sm:overflow-x-auto sm:min-w-0 ",
                // in the all tab articles span the full width on their own top row
                active === "All" && "sm:col-span-2 sm:pl-10",
              )}
            >
              {indiaGateArticles.map((article, i) => (
                <ArticleCard
                  className={cn(active === "All" ? "sm:w-2/5" : "sm:w-3/5")}
                  key={`article-${i}`}
                  image={article.image}
                  heading={article.heading}
                  text={article.text}
                  time={article.time}
                />
              ))}
            </div>
          )}

          {/* videos, one scrollable row on sm up */}
          {active !== "Articles" && (
            <div className="flex flex-col gap-3 sm:flex-row sm:overflow-x-auto sm:min-w-0">
              {indiaGateRiceVideos.map((video, i) => (
                <VideoCard
                  key={`video-${i}`}
                  title={video.title}
                  url={video.link}
                />
              ))}
            </div>
          )}
        </div>

        {/* clip the wrapper so the slide in does not push the section sideways.
            on sm up the art fills the 30% grid column beside the rows */}

        <motion.div
          className="mx-auto -mt-4 relative z-10 w-full max-w-xs overflow-hidden sm:mx-0 sm:mt-0 sm:flex sm:max-w-none sm:items-end sm:-mb-6"
          initial={reduceMotion ? false : { opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/cooking-together.png"
            alt="couple cooking a meal together"
            width={416}
            height={303}
            loading="lazy"
            className="h-auto w-[85%] mx-auto sm:w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AromaEdit;
