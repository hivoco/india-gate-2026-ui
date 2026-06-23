import { cn } from "@/app/lib/utils";

type LoopingVideoProps = {
  // base path in public without extension, eg "/rice-journey"
  // expects matching .webm, .mp4 and -poster.jpg alongside it
  src: string;
  poster?: string;
  // styles the wrapper that holds the video and any overlay children
  className?: string;
  // styles the video element itself
  videoClassName?: string;
  // above the fold videos should preload, below the fold stay lazy
  eager?: boolean;
  // optional title rendered bottom left over a dark fade, like the brand still
  heading?: string;
  // extra overlays on top of the video if the heading is not enough
  children?: React.ReactNode;
};

// muted autoplay loop that replaces a heavy gif with webm + mp4 video.
// webm (vp9) loads first where supported, mp4 (h264) is the fallback.
// wraps the video in a positioned container so the heading can overlay it.
const LoopingVideo = ({
  src,
  poster,
  className,
  videoClassName,
  eager = false,
  heading,
  children,
}: LoopingVideoProps) => {
  return (
    <div className={cn("relative isolate sm:rounded-xl sm:overflow-hidden", className)}>
      <video
        className={cn("h-full w-full  object-cover", videoClassName)}
        poster={poster ?? `${src}-poster.jpg`}
        autoPlay
        loop
        muted
        playsInline
        // above the fold preloads, below the fold waits until needed
        preload={eager ? "auto" : "none"}
      >
        {/* <source src={`${src}.webm`} type="video/webm" /> */}
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>

      {heading && (
        <>
          {/* dark fade sits above the video so the heading stays readable */}
          <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-transparent via-black/70 via-[87.02%] to-black/70" />


          {/* heading sits above the video, bottom left like the brand still */}
          <h2 className="absolute bottom-3  left-5 z-10 font-display text-3xl text-white drop-shadow-md sm:bottom-10 sm:left-20 sm:text-5xl">
            {heading}
          </h2>
        </>
      )}

      {children}
    </div>
  );
};

export default LoopingVideo;
