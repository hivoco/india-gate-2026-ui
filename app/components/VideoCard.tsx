"use client";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import { cn } from "@/app/lib/utils";
// import SpinningBadge from "./SpinningBadge";

type VideoCardProps = {
  // youtube watch url, the id is pulled out of it for the thumbnail and embed
  url: string;
  title: string;
  // optional thumbnail override, falls back to the youtube poster
  thumbnail?: string;
  // extra classes for the root tag
  className?: string;
};

// grab the 11 char video id out of a youtube watch / youtu.be / embed url
const getYoutubeId = (url: string) => {
  const match = url.match(
    /(?:v=|\/embed\/|youtu\.be\/)([\w-]{11})/,
  );
  return match?.[1] ?? "";
};

// video variant of the article card. same dusty taupe panel and brand pattern.
// shows just a thumbnail, the real youtube player only mounts after the click
// so nothing heavy loads up front.
const VideoCard = ({ url, title, thumbnail, className }: VideoCardProps) => {
  const [playing, setPlaying] = useState(false);
  const id = getYoutubeId(url);
  const poster = thumbnail ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl bg-primary/10 sm:w-1/2 sm:shrink-0 ",
        className,
      )}
    >
      {/* top media area, full width landscape */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {playing ? (
          // real player, only mounted after the click, autoplay so it starts right away
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          // thumbnail facade, this is all that loads before the click
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0"
          >
            <Image
              src={poster}
              alt={title}
              width={640}
              height={360}
              loading="lazy"
              unoptimized
              className="h-full w-full object-cover"
            />

            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-12 place-items-center rounded-full bg-white/90 text-primary transition-transform group-hover:scale-110">
                <Play className="size-5 translate-x-px" fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="relative px-4 py-6">
        {/* brand pattern, bottom left corner only */}
        <Image
          src="/article-assets/video-card-pattern.png"
          alt=""
          width={320}
          height={320}
          loading="lazy"
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-1/2 select-none"
        />

        {/* watch now badge gif, links out to the video, centred with the headline */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${title}`}
          className="absolute top-1/2 right-4 -translate-y-1/2"
        >
          <Image
            src="/spin-badges/watch-now.gif"
            alt="Watch now"
            width={88}
            height={88}
            loading="lazy"
            unoptimized
            className="h-auto w-11"
          />
        </a>

        {/* mp4 version, parked until the white bg is fixed, see AGENTS.md
        <video
          src="/spin-badges/watch-now.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Watch now"
          className="absolute bottom-4 right-4 h-auto w-11 sm:bottom-6 sm:right-6 sm:w-16"
        /> */}

        {/* swapped the spinning badge for the gif above
        <SpinningBadge
          text="Watch now"
          repeat={2}
          separator="·"
          size={44}
          duration={12}
          className="absolute bottom-4 right-4 bg-primary/40 sm:bottom-6 sm:right-6 rounded-full"
          textClassName="text-[9px] text-white"
          iconClassName="size-1/3 text-white"
        /> */}

        <div className="relative pr-16 text-left ">
          <h3 className="font-sans font-bold text-lg text-primary line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;
