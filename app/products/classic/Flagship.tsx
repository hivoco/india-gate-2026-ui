import QuatrefoilPattern from "../../components/QuatrefoilPattern";
import SectionHeading from "./SectionHeading";

const Flagship = () => {
  return (
    <section className="relative isolate overflow-hidden py-6  sm:py-12 ">
      <QuatrefoilPattern className="bottom-auto h-[35%]" />

      <div className="relative z-10 mx-auto flex custom-container flex-col gap-8 ">
        <SectionHeading title="Our Flagship" />

        <div className="flex flex-col gap-4 sm:gap-5 text-center text-black text-sm sm:text-base lg:text-lg leading-4.5 font-normal">
          <p className="w-[90%] mx-auto">
            Some names carry weight. Classic Basmati is{" "}
            <span className="font-bold italic text-primary">
              India Gate&apos;s flagship -
            </span>{" "}
            the rice that set the gold standard for celebrations across decades
            of unmatched expertise.
          </p>

          <p>
            What makes Classic different is how it behaves under pressure. The
            2-year ageing process lowers moisture content and stabilises starch
            structure, so when the heat goes up and the dum seals in, Classic
            holds its form. Each grain cooks independently, absorbs the masala
            without breaking down, and delivers the visual separation that
            distinguishes a celebrated biryani from an ordinary one.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Flagship;
