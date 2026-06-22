import Image from "next/image";
import { Clock } from "lucide-react";

import { cn } from "@/app/lib/utils";
// import SpinningBadge from "./SpinningBadge";

type ArticleCardProps = {
  // primary dish / article image, sits in the gold ringed circle on the left
  image: string;
  heading: string;
  text: string;
  // read time label, eg "5 min reads"
  time: string;
  // extra classes for the root article tag
  className?: string;
};

// editorial article card. dusty taupe panel with the brand pattern bleeding off
// the top right, a circular dish image and a spinning "read more" badge.
const ArticleCard = ({ image, heading, text, time, className }: ArticleCardProps) => {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl bg-primary/10 px-2 py-5  sm:w-2/3 sm:shrink-0  ",
        className,
      )}
    >
      {/* brand pattern, top right corner only */}
      <Image
        src="/article-assets/card-pattern.png"
        alt=""
        width={320}
        height={320}
        loading="lazy"
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-auto w-40 select-none sm:w-56 "
      />

      <div className="relative flex items-center gap-1 sm:gap-8">
        <div className="shrink-0">
          <Image
            src={image}
            alt={heading}
            width={260}
            height={260}
            loading="lazy"
            className="size-30 rounded-full object-cover "

          />
        </div>

        <div className="min-w-0 space-y-2.5  text-left">
          <h3 className="font-sans font-bold text-lg/4.5 text-primary ">
            {heading}
          </h3>

          <p className="mt-3 text-base/5 text-primary ">
            {text}
          </p>

          <div className="mt-2 flex items-center gap-2 text-primary/30 ">
            <Clock className="size-3.5 sm:size-5" strokeWidth={1.75} />
            <span className="text-xs font-bold">{time}</span>
          </div>
        </div>

        {/* read more badge gif */}
        <Image
          src="/spin-badges/read-more.gif"
          alt="Read more"
          width={88}
          height={88}
          loading="lazy"
          unoptimized
          className="ml-auto h-auto w-11 shrink-0 self-start"
        />

        {/* mp4 version, parked until the white bg is fixed, see AGENTS.md
        <video
          src="/spin-badges/read-more.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Read more"
          className="ml-auto h-auto w-11 shrink-0 self-start sm:w-16"
        /> */}

        {/* swapped the spinning badge for the gif above
        <SpinningBadge
          text="Read more"
          repeat={2}
          separator="·"
          size={44}
          duration={12}
          className="ml-auto shrink-0 self-start bg-primary/40 rounded-full"
          textClassName="text-[9px] text-white "
          iconClassName="size-1/3 text-white"
        /> */}
      </div>
    </article>
  );
};

export default ArticleCard;
