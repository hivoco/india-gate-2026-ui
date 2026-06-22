import Carousal from "./components/Carousal";
import BrandIntro from "./components/BrandIntro";
import ProductShowCase from "./components/ProductShowCase";
import SectionHeading from "./products/classic/SectionHeading";
import AromaEdit from "./components/AromaEdit";
import QuatrefoilPattern from "./components/QuatrefoilPattern";
import Initiatives from "./components/Initiatives";
import ViewAllBanner from "./components/ViewAllBanner";
import LoopingVideo from "./components/LoopingVideo";
import MadeWithIndiaGate from "./components/MadeWithIndiaGate";
import Faqs, { type Faq } from "./components/Faqs";
import Reveal from "./components/Reveal";
import { Button } from "./components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductSpotlight, {
  type SpotlightItem,
} from "./components/ProductSpotlight";

// home page faqs
const FAQS: Faq[] = [
  {
    question: "Which basmati rice is best for biryani?",
    answer:
      "For biryani, look for extra-long grains with high elongation that stay firm through dum cooking. Naturally aged basmati delivers better texture, grain separation, and the presentation biryani deserves. India Gate Classic and Super are ideal choices.",
  },
  {
    question: "What makes basmati rice different from regular rice?",
    answer:
      "Basmati is a distinct variety known for its long, slender grains, natural fragrance, and fluffy texture when cooked. Unlike regular rice, basmati elongates significantly during cooking and stays light and separate, not sticky or clumpy.",
  },
  {
    question: "Why is naturally aged basmati better?",
    answer:
      "Ageing is the hallmark of quality basmati. Through natural ageing, grains develop deeper flavour, finer texture, improved elongation, and more consistent cooking results. It's what separates refined basmati from ordinary rice.",
  },
  {
    question: "How do I choose the right rice for different dishes?",
    answer:
      "Match the rice to the meal: Extra-long grain (Classic, Super) for biryani and special pulaos. Long grain (Tibar, Dubar) for everyday premium meals. Medium grain (Everyday, Rozzana) for daily dal-chawal. Regional varieties (Sona Masoori, Ponni, Kolam) for authentic regional dishes.",
  },
  {
    question: "What makes India Gate trusted by Indian families?",
    answer:
      "Since 1889, India Gate has delivered naturally aged basmati with consistent quality, stone-free, hygienically packed, and untouched by hands. Over 130 years of trust, one grain at a time.",
  },
];

// packs shown in the spotlight dialog for each range. front pack shots live in
// per range folders under public, swap a src without touching the component
const BASMATI_PACKS: SpotlightItem[] = [
  {
    text: "Classic Rice",
    subtext: "Gold Standard",
    image: "/basmati-products/classic.jpg",
    scale: "scale-125",
  },
  {
    text: "Biryani Rice",
    subtext: "Biryani Special",
    image: "/basmati-products/biryani.png",
    scale: "scale-120",
  },
  {
    text: "Select Rice",
    subtext: "Premium Grain",
    image: "/basmati-products/select.jpg",
    scale: "scale-115",
  },
  {
    text: "Mogra Rice",
    subtext: "Broken Grain",
    image: "/basmati-products/mogra.jpg",
    scale: "scale-115",
  },
  {
    text: "Dubar Rice",
    subtext: "Long Grain",
    image: "/basmati-products/dubar.jpg",
    scale: "scale-115",
  },
  {
    text: "Tibar Rice",
    subtext: "Extra Long Grain",
    image: "/basmati-products/tibar.jpg",
    scale: "scale-115",
  },
  {
    text: "Everyday Rice",
    subtext: "Daily Premium",
    image: "/basmati-products/everyday.jpg",
    scale: "scale-115",
  },
  {
    text: "Daily Premium Rice",
    subtext: "Everyday Premium",
    image: "/basmati-products/daily-premium.jpg",
    scale: "scale-115",
  },
  {
    text: "Feast Rozzana Rice",
    subtext: "Everyday Value",
    image: "/basmati-products/feast-rozzana.jpg",
    scale: "scale-115",
  },
  {
    text: "Rozana Lite Rice",
    subtext: "Light Everyday",
    image: "/basmati-products/roz-lite.jpg",
    scale: "scale-115",
  },
  {
    text: "Pulav Rice",
    subtext: "Pulav Special",
    image: "/basmati-products/pulav.jpg",
  },

  {
    text: "Daily Delight Rice",
    subtext: "Everyday Value",
    image: "/basmati-products/daily-delight.jpg",
    scale: "scale-115",
  },
  {
    text: "Everyday Choice Rice",
    subtext: "Value Pick",
    image: "/basmati-products/ev-choice.jpg",
    scale: "scale-115",
  },
  // mini mogra is the 5kg pack, so it sorts after the 1kg variants
  {
    text: "Mini Mogra Rice",
    subtext: "Broken Grain 5kg",
    image: "/basmati-products/mini-mogra-1.jpg",
    scale: "scale-115",
  },
  {
    text: "Mini Mogra II Rice",
    subtext: "Broken Grain 5kg",
    image: "/basmati-products/mini-mogra-2.jpg",
    scale: "scale-115",
  },
];

// ordered by pack size, smallest first (1kg, then 5kg, 10kg, then larger)
const REGIONAL_PACKS: SpotlightItem[] = [
  {
    text: "Ponni Rice",
    subtext: "South Indian",
    image: "/regional/ponni-raw-front.png",
    scale: "scale-125",
  },
  {
    text: "Kaima Rice",
    subtext: "Kerala Biryani",
    image: "/regional/kaima-rice-front.png",
    scale: "scale-125",
  },

  {
    text: "Idli Rava",
    subtext: "Idli & Dosa",
    image: "/regional/idli-rava-1kg.png",
    scale: "scale-110",
  },
  {
    text: "Lachkari Kolam Rice",
    subtext: "Maharashtra Favourite",
    image: "/regional/lachkari-kolam-front.png",
    scale: "scale-115",
  },

  {
    text: "Wada Kolam Rice",
    subtext: "Maharashtra Favourite",
    image: "/regional/wada-kolam-front.png",
    scale: "scale-135",
  },

  {
    text: "Surti Kolam Rice",
    subtext: "Gujarat Favourite",
    image: "/regional/surti-kolam-front.png",
    scale: "scale-120",
  },
  {
    text: "Sona Masoori Rice",
    subtext: "South Indian",
    image: "/regional/sona-masoori-5kg-front.png",
    scale: "scale-95",
  },
  {
    text: "Kolam Rice",
    subtext: "Everyday Regional",
    image: "/regional/kolam-rice-5kg-front.png",
    scale: "scale-95",
  },
  {
    text: "Gobindo Bhog Rice",
    subtext: "Bengal Aromatic",
    image: "/regional/gobindo-bhog-1kg-front.png",
    scale: "scale-70",
  },
  {
    text: "Jeera Rice",
    subtext: "Short Grain",
    image: "/regional/jeera-rice-1kg-front.png",
    scale: "scale-70",
  },
];

const MASALA_PACKS: SpotlightItem[] = [
  {
    text: "Chettinad Chicken Masala",
    subtext: "Chicken Masala",
    image: "/masala/chettinad-chicken-masala-1.png",
  },
  {
    text: "Purani Dilli Butter Chicken Masala",
    subtext: "Butter Chicken Masala",
    image: "/masala/purani-dilli-butter-chicken-masala.png",
  },
  {
    text: "Kashmiri Dum Aloo Masala",
    subtext: "Dum Aloo Masala",
    image: "/masala/kashmiri-dum-aloo-masala.png",
  },
  {
    text: "Patiala Paneer Tikka Masala",
    subtext: "Paneer Tikka Masala",
    image: "/masala/patiala-paneer-tikka-masala.png",
  },
  {
    text: "Kolkata Biryani Masala",
    subtext: "Biryani Masala",
    image: "/masala/kolkata-biryani-masala.jpg",
    scale: "scale-90",
  },
  {
    text: "Lucknowi Biryani Masala",
    subtext: "Biryani Masala",
    image: "/masala/lucknowi-biryani-masala.jpg",
    scale: "scale-90",
  },
  {
    text: "Hyderabadi Biryani Masala",
    subtext: "Biryani Masala",
    image: "/masala/hyderabadi-biryani-masala.jpg",
    scale: "scale-90",
  },
];

const UNITY_PACKS: SpotlightItem[] = [
  {
    text: "Biryani Rice",
    subtext: "Biryani Special",
    image: "/unity/biryani-1kg-front.png",
  },
  {
    text: "Pulav Rice",
    subtext: "Pulav Special",
    image: "/unity/pulav-1kg-front-1.png",
  },
  {
    text: "Dubar Rice",
    subtext: "Long Grain",
    image: "/unity/dubar-1kg-front.png",
  },
  {
    text: "Tibar Rice",
    subtext: "Extra Long Grain",
    image: "/unity/tibar-1kg-front.png",
  },
  {
    text: "Super Rice",
    subtext: "Super Value",
    image: "/unity/super-1kg-front.png",
  },
  {
    text: "Premium Rice",
    subtext: "Premium Grain",
    image: "/unity/premium-1kg-front.png",
  },
  {
    text: "Rozzana Rice",
    subtext: "Everyday Value",
    image: "/unity/rozzana-1kg-front.png",
  },
  {
    text: "Fried Rice",
    subtext: "Fried Rice Special",
    image: "/unity/fried-rice-1kg-front.png",
  },
];

const Home = () => {
  return (
    <>
      {/* desktop version is still being built, show a placeholder above sm */}
      {/* <div className="hidden min-h-screen flex-col items-center justify-center gap-2 text-center sm:flex">
        <p className="font-display text-2xl text-primary">We are working on Desktop version </p>
        <p className="text-sm text-black/60">Check the mobile version, it&apos;s live</p>
      </div> */}

      {/* mobile stays untouched, just hidden once we hit sm */}
      <div className="smhidden  sm:custom-container">
      <Carousal />

      <Reveal>
        <BrandIntro />
      </Reveal>
      {/* quiz */}

      <section className="py-6 sm:py-10 border">
        <Reveal>
          <SectionHeading title="Our Range" />
        </Reveal>

        <div className="mt-8 space-y-3 overflow-hidden flex flex-col sm:flex-row sm:justify-center gap-5 ">
          {/* cards slide in from the side they sit on, basmati left, regional right */}
          <Reveal direction="left">
            {/* card opens the spotlight dialog, centred on Classic */}
            <ProductSpotlight items={BASMATI_PACKS}>
              <ProductShowCase
                image="/Basmati.png"
                headline="Aged to perfection. Crafted for every plate."
                rangeLabel="Basmati Range"
                badgeGif="/spin-badges/basmati.gif"
                badgeText="BASMATI"
                className="cursor-pointer "
              />
            </ProductSpotlight>
          </Reveal>

          <Reveal direction="right">
            <ProductSpotlight items={REGIONAL_PACKS}>
              <ProductShowCase
                image="/Regional.png"
                headline="The taste your region calls home."
                rangeLabel="Regional Range"
                badgeGif="/spin-badges/regional.gif"
                badgeText="REGIONAL"
                align="right"
                className="cursor-pointer"
              />
            </ProductSpotlight>
          </Reveal>
        </div>
      </section>

      <div className="py-6  border">
        <Reveal>
          <AromaEdit />
        </Reveal>

        <div className="relative isolate flex justify-center bg-primary py-4">
          <QuatrefoilPattern image="/quatrefoil-pattern.png" />

          <Button
            size="lg"
            className="rounded-lg bg-white px-10 font-normal py-3 text-sm text-primary  hover:bg-white/90 "
          >
            Explore Now
            <ArrowRight size={10} />
          </Button>
        </div>

        <Reveal>
          <Initiatives />
        </Reveal>

        <ViewAllBanner />

        <section className="mt-4">
          <Reveal>
            <LoopingVideo
              src="/rice-journey"
              videoClassName="h-auto object-contain"
              heading="Our Journey"
            />
          </Reveal>
        </section>
      </div>

      <Reveal>
        <MadeWithIndiaGate url="https://www.instagram.com/indiagatefoods/reel/DYERSO3M15D/" />
      </Reveal>

      <section className="py-6">
        <Reveal>
          <SectionHeading title="Other Ranges" />
        </Reveal>

        <div className="mt-8 space-y-3 sm:mt-12 overflow-hidden flex  flex-col sm:flex-row">
          <Reveal direction="left">
            <ProductSpotlight items={UNITY_PACKS} imageScale="scale-[0.8]">
              <ProductShowCase
                image="/Unity.png"
                headline="India Gate quality. Every day value."
                rangeLabel="Unity Range"
                badgeGif="/spin-badges/unity.gif"
                badgeText="Unity"
                align="left"
                tone="dark"
                className="cursor-pointer"
              />
            </ProductSpotlight>
          </Reveal>

          <Reveal direction="right">
            {/* masala image already has the headline baked in */}
            <ProductSpotlight items={MASALA_PACKS} imageScale="scale-[1.2]">
              <ProductShowCase
                image="/Masala.png"
                rangeLabel="Masala Range"
                badgeGif="/spin-badges/masala.gif"
                badgeText="Masala"
                align="right"
                badgePosition="top"
                labelPosition="top"
                tone="dark"
                className="cursor-pointer"
              />
            </ProductSpotlight>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <div className="flex flex-col items-center gap-8 pb-6">
          <Faqs faqs={FAQS} />

          <Button
            asChild
            size="lg"
            className="rounded-full px-7! py-6 text-base font-normal"
          >
            <a href="/faqs">
              View All FAQs
              <ArrowRight />
            </a>
          </Button>
        </div>
      </Reveal>
      </div>
    </>
  );
};

export default Home;
