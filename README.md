# India Gate

Marketing and product site for India Gate Basmati Rice. UI only for now, no backend or
business logic. Two pages are substantial: the Classic product page at `/products/classic`
and the home page. The home page runs a hero carousel, brand intro, our range (with a
product spotlight dialog), the aroma edit content hub, brand initiatives, an explore cta, a
looping journey video, a made with india gate instagram embed, other ranges and faqs. A
quiz section is still stubbed and not built yet.

The home page is mobile first, with the desktop layout still being built up from the mobile
markup at the `sm` breakpoint and above. The mobile view is the locked reference and stays
untouched.

## Tech stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4 (via `@tailwindcss/postcss`, configured in `app/globals.css`), plus
  `tw-animate-css` for the dialog enter / exit keyframes
- Motion for animation
- next/image + sharp for image optimisation
- TypeScript
- shadcn style button and dialog built on Radix Slot + Radix Dialog +
  class-variance-authority, merged with the `cn` helper (clsx + tailwind-merge)
- embla-carousel-react drives the product spotlight thumbnail rail
- lucide-react and react-icons for icons
- React Compiler is on (`babel-plugin-react-compiler`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Classic page lives at
[http://localhost:3000/products/classic](http://localhost:3000/products/classic).

## Scripts

- `npm run dev` start the dev server
- `npm run build` production build
- `npm run start` serve the production build (port 8825)
- `npm run lint` run eslint
- `npm run optimize:images` compress raster images in `public/` in place (sharp based),
  run after dropping a new image in before committing it

## Project structure

```
app/
  layout.tsx              root layout, fonts, Header / ScrollToTop / Footer
  page.tsx                home: Carousal, BrandIntro, Our Range, AromaEdit, Initiatives,
                          ViewAllBanner, LoopingVideo, MadeWithIndiaGate, Other Ranges, Faqs
  globals.css             tailwind + tw-animate-css imports, theme tokens, custom-container
  components/             shared ui: Header, Footer, Faqs, Coverflow, ScrollToTop,
                          QuatrefoilPattern, Reveal, ui/button, ui/dialog, ui/NavArrow.
                          home page: Carousal, BrandIntro, ProductShowCase, ProductSpotlight,
                          SpinningBadge, AromaEdit, ArticleCard, VideoCard, Initiatives,
                          InitiativeCard, ViewAllBanner, LoopingVideo, MadeWithIndiaGate
  lib/utils.ts            cn() class merge helper
  hooks/                  shared client hooks (useIsHomePage wraps the "/" pathname check)
  fonts/                  self hosted OptimusPrinceps display font (400 + 600)
  products/classic/       classic product page, split into section components
                          (HeroSection, ProductGallery, BuyOptions, Range, Body,
                          Flagship, PairsWellWith, ExploreUniverse, with SectionHeading
                          and BagIcon helpers)
scripts/
  optimize-images.mjs     sharp based image compressor for public/ (npm run optimize:images)
public/
  ig-classic-assets/      classic page imagery; subfolders icons, 1kg, 5kg, dishes,
                          india-gate-subbrands, rice-sacks
  basmati-products/       home spotlight packs, one folder per range card and pack array:
  regional/               basmati-products (BASMATI_PACKS), regional (REGIONAL_PACKS),
  masala/                 masala (MASALA_PACKS), unity (UNITY_PACKS)
  unity/
  hero/                   home hero slides used by Carousal
  initiatives/            initiative artwork (InitiativeCard) + boy-eating-rice (ViewAllBanner)
  article-assets/         AromaEdit card patterns and recipe placeholder
  retailers/              retailer logos
  *.png / rice-journey.*  home range art (Basmati, Regional, Unity, Masala), patterns and the
                          looping rice journey video live at the public root
```

## Conventions

- Fonts: Overlock is the body font (`font-sans`), OptimusPrinceps is the display font
  (`font-display`). OptimusPrinceps is self hosted from `app/fonts` since it is not on
  Google Fonts.
- Theme colours live in `@theme inline` in `globals.css`: `primary` (maroon, #672e1f),
  `secondary` (gold, #da9f23), `cream` (#fbefcb). Use them as utilities, eg `text-primary`,
  `bg-secondary`, `bg-cream`. Black is the only colour shared site wide (the default text
  colour). Shared max width and responsive padding live in the `custom-container` utility
  in `globals.css`, use it instead of redefining container padding per section.
- Images: hero / above the fold images load eagerly (next/image `priority`). Everything
  below the fold uses `loading="lazy"`.
- Animation: top level sections are wrapped in the shared `Reveal` component so they fade
  up the first time they scroll into view. It runs once and respects reduced motion.
- Attribute icons in `ig-classic-assets/icons` are flat PNGs with two pre coloured
  variants. The `*-gold.png` ones are used in the golden hero feature strip, the plain
  black ones everywhere else (eg the Range spec rows).
- This is a Next.js 16 project. APIs and conventions can differ from older versions, so
  check the docs before reaching for something from memory.
