import Image from "next/image";
import { cn } from "../../lib/utils";
import { packs, PackLabel, PackSize } from "./HeroSection";

// bag size per pack, the 5kg sack reads bigger than the 1kg
const BAG_WIDTH: Record<PackSize, string> = {
  small: "w-10 sm:w-12",
  large: "w-14 sm:w-16",
};

const BuyOptions = ({
  packs,
  selected,
  OnClick,
}: {
  packs: packs;
  selected: PackLabel;
  OnClick: (val: PackLabel) => void;
}) => {
  return (
    <div className="flex flex-col gap-6 ">
      <div>
        <h2 className="font-display text-2xl text-primary text-center sm:text-left">Available Packs</h2>
        <div className="mt-3 sm:mt-4 flex justify-center items-end gap-6  ">
          {packs.map((pack) => {
            const isSelected = selected === pack.label;
            return (
              <button
                key={pack.label}
                type="button"
                onClick={() => OnClick(pack.label)}
                className={cn("relative shrink-0", BAG_WIDTH[pack.size])}
              >
                {/* rice sack art, brown filled when selected, grey when not */}
                <Image
                  src={
                    isSelected
                      ? "/ig-classic-assets/rice-sacks/bag-selected.png"
                      : "/ig-classic-assets/rice-sacks/bag-unselected.png"
                  }
                  alt=""
                  width={52}
                  height={62}
                  className="h-auto w-full"
                />

                <span
                  className={cn(
                    "absolute inset-x-0 bottom-1/4 text-center text-sm font-semibold text-primary",
                    { "text-gray-500": !isSelected },
                  )}
                >
                  {pack.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuyOptions;
