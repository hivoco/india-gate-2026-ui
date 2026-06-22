import SectionHeading from "@/app/products/classic/SectionHeading";
import InitiativeCard from "./InitiativeCard";
const Initiatives = () => {
  return (
    <section className="custom-container py-6 ">
      <SectionHeading title="Our Initiatives" />

      <div className="mt-8 grid grid-cols-5 gap-y-4 gap-x-2.5 sm:mt-12 sm:grid-cols-10">
        {/* grains of hope, full width on both */}
        <InitiativeCard
          image="/initiatives/grains-of-hope.png"
          desktopImage="/initiatives/grains-of-hope-desktop.png"
          alt="India Gate Grains of Hope initiative"
          iconPosition="top-right"
          className="col-span-5 aspect-square sm:col-span-10 sm:aspect-972/444"
        />

        {/* 3/5 on mobile, half on desktop */}
        <InitiativeCard
          image="/initiatives/perfectly-aged-mobile.png"
          desktopImage="/initiatives/perfectly-aged-desktop.png"
          alt="The perfectly aged Classic"
          iconPosition="bottom-right"
          className="col-span-3 aspect-square sm:col-span-5 sm:aspect-474/346"
        />

        {/* 2/5 on mobile, half on desktop */}
        <InitiativeCard
          image="/initiatives/taste-of-indian-values-mobile.png"
          desktopImage="/initiatives/taste-of-indian-values-desktop.png"
          alt="Let's share the taste of Indian values"
          iconPosition="top-left"
          className="col-span-2 h-full sm:col-span-5 sm:h-auto sm:aspect-474/346"
        />
      </div>
    </section>
  );
};

export default Initiatives;
