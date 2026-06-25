"use client";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { cn } from "@/app/lib/utils";
import type { PackLabel, Retailer } from "./HeroSection";

// buy now button reveals the retailer logo row. data comes in as props from the
// hero so the list stays in one place
const Retailers = ({
  retailers,
  pack,
}: {
  retailers: Retailer[];
  pack: PackLabel;
}) => {
  const [display, setDisplay] = useState(false);
  const handleClick = () => setDisplay((prev) => !prev);
  return (
    <div className="space-y-3 sm:space-y-4 pb-4 sm:p-0">
      <button
        onClick={handleClick}
        type="button"
        className="w-full rounded-lg bg-linear-to-r from-primary to-secondary py-3 text-center text-lg sm:text-xl font-normal text-white"
      >
        Buy Now
      </button>

      <div
        className={cn(
          "flex-wrap items-center  sm:gap-3 justify-between sm:justify-center sm:flex",
          display ? "flex" : "hidden",
        )}
      >
        {retailers.map((retailer, i) => (
          <Fragment key={retailer.name}>
            <Link
              href={retailer.href[pack]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex aspect-square w-10 sm:w-14 items-center justify-center rounded-lg border border-black/10 bg-primary/10 p-1"
            >
              <Image
                src={retailer.logo}
                alt={retailer.name}
                width={retailer.width}
                height={retailer.height}
                className="h-auto w-full object-contain"
              />
            </Link>
            {/* divider splits the row in half, quick commerce on the left, marketplaces on the right */}
            {i + 1 === Math.floor(retailers.length / 2) && (
              <div className="w-px self-stretch bg-primary/25" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Retailers;
