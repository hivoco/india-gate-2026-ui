import Image from "next/image";
import type { Dish } from "./PairsWellWith";

const DishCard = ({ dish }: { dish: Dish }) => (
  <article className="group relative aspect-square w-4/5 sm:w-auto overflow-hidden rounded-3xl shadow-sm shrink-0">
    <Image
      src={dish.image}
      alt={dish.name}
      fill
      loading="lazy"
      sizes="(min-width: 768px) 22vw, 45vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105 w-full  sm:w-auto "
    />

    {/* Legibility scrim for the label. */}
    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

    <h3 className="absolute inset-x-0 bottom-0 p-4 font-display text-lg text-white sm:text-xl">
      {dish.name}
    </h3>
  </article>
);

export default DishCard;
