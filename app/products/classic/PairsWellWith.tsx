import QuatrefoilPattern from "../../components/QuatrefoilPattern";
import SectionHeading from "./SectionHeading";
import DishCard from "./DishCard";

export type Dish = {
  name: string;
  image: string;
};

const PairsWellWith = ({ dishes }: { dishes: Dish[] }) => {
  return (
    <section className="relative isolate overflow-hidden  py-6 sm:py-12 ">
      {/* // keep this h in multiples of 5  */}
      <QuatrefoilPattern className="bottom-auto h-[25%]" />

      <div className="relative z-10 mx-auto flex sm:custom-container flex-col gap-8">
        <SectionHeading title="Pairs Well With" />

        <div className="relative overflow-x-auto z-10 flex sm:grid gap-4 sm:gap-5 md:grid-cols-4 px-6 sm:p-0">
          {" "}
          {/* padding here  */}
          {dishes.map((dish) => (
            <DishCard key={dish.name} dish={dish} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PairsWellWith;
