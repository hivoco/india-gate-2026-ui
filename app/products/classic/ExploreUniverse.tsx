import QuatrefoilPattern from "../../components/QuatrefoilPattern";
import ProductShowCase from "../../components/ProductShowCase";
import ProductSpotlight, {
  type SpotlightItem,
} from "../../components/ProductSpotlight";
import SectionHeading from "./SectionHeading";

// the pack the spotlight opens focused on, dubar sits at index 1
const INITIAL_FOCUS = 1;

// the sub brand range, same shape as the home page packs so the showcase card
// can open the shared spotlight and browse them on its own embla rail
const SUBBRANDS: SpotlightItem[] = [
  {
    text: "Mogra",
    subtext: "Broken Grain",
    image: "/ig-classic-assets/india-gate-subbrands/IG Mogra 1kg front.jpg",
  },
  {
    text: "Dubar",
    subtext: "Long Grain",
    image: "/ig-classic-assets/india-gate-subbrands/IG Dubar 1kg front.jpg",
  },
  {
    text: "Biryani",
    subtext: "Biryani Special",
    image: "/ig-classic-assets/india-gate-subbrands/IG-Biryani-1kg-front.jpg",
  },
  {
    text: "Feast Rozzana",
    subtext: "Everyday Value",
    image: "/ig-classic-assets/india-gate-subbrands/IG FR 1kg front.jpg",
  },
  {
    text: "Everyday",
    subtext: "Daily Premium",
    image: "/ig-classic-assets/india-gate-subbrands/IG Everyday 1kg front.jpg",
  },
];

const ExploreUniverse = () => {
  return (
    <section className="relative isolate overflow-hidden py-8 sm:py-12 ">
      <QuatrefoilPattern className="bottom-auto h-[25%] " />
      <QuatrefoilPattern className="top-auto h-[15%]" />

      <div className="relative z-10 mx-auto flex  sm:custom-container flex-col gap-4 sm:gap-8 ">
        <SectionHeading
          className="px-6 sm:px-0 "
          title="Explore the Universe of India Gate"
        />

        {/* one showcase card opens the spotlight, which carousels the whole sub
            brand range on its own embla rail. no second coverflow needed. */}
        <ProductSpotlight items={SUBBRANDS} initialIndex={INITIAL_FOCUS}>
          <ProductShowCase
            image="/Basmati.png"
            rangeLabel="India Gate Range"
            badgeGif="/spin-badges/basmati.gif"
            badgeText="Basmati"
            align="right"
            className="cursor-pointer"
          />
        </ProductSpotlight>
      </div>
    </section>
  );
};

export default ExploreUniverse;
