import Image from "next/image";
import QuatrefoilPattern from "../../components/QuatrefoilPattern";
import SectionHeading from "./SectionHeading";

type Dish = {
  name: string;
  image: string;
};

const DISHES: Dish[] = [
  { name: "Hyderabadi Biryani", image: "/ig-classic-assets/dishes/hyderabadi-biryani.png" },
  { name: "Lucknowi Biryani", image: "/ig-classic-assets/dishes/lucknowi-biryani.png" },
  { name: "Kashmiri Pulao", image: "/ig-classic-assets/dishes/kashmiri-pulao.png" },
  { name: "Zafrani Pulao", image: "/ig-classic-assets/dishes/zafrani-pulao.png" },
];

const PairsWellWith = () => {
  return (
    <section className="relative isolate overflow-hidden  py-6 sm:py-12 ">
      {/* // keep this h in multiples of 5  */}
      <QuatrefoilPattern className="bottom-auto h-[25%]" />

      <div className="relative z-10 mx-auto flex sm:custom-container flex-col gap-8">
        <SectionHeading title="Pairs Well With" />

        <div className="relative overflow-x-auto z-10 flex sm:grid gap-4 sm:gap-5 md:grid-cols-4 px-6 sm:p-0">
          {" "}
          {/* padding here  */}
          {DISHES.map((dish) => (
            <DishCard key={dish.name} dish={dish} />
          ))}
        </div>
      </div>
    </section>
  );
};

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

export default PairsWellWith;
