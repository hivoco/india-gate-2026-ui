import Flagship from "./Flagship";
import PairsWellWith from "./PairsWellWith";
import ExploreUniverse from "./ExploreUniverse";
import Reveal from "@/app/components/Reveal";

const Body = () => {
  return (
    <>
      <Reveal>
        <Flagship />
      </Reveal>
      <Reveal>
        <PairsWellWith />
      </Reveal>
      <Reveal>
        <ExploreUniverse />
      </Reveal>
    </>
  );
};

export default Body;
