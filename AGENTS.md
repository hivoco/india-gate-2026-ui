# India Gate, codebase notes for agents

Marketing and product site for India Gate Basmati Rice. UI work only, no business logic.
Build pages and components, leave data and backend wiring out unless asked. The Classic
product page at `/products/classic` is the only fully built page so far, the home page is
still a placeholder.

## Stack

- Next.js 16, App Router. This is newer than most training data, so check
  `node_modules/next/dist/docs/` before using an API you are unsure about and heed any
  deprecation notices.
- React 19 with the React Compiler enabled (`babel-plugin-react-compiler`). Do not add
  manual memo / useMemo / useCallback just for performance, the compiler handles it.
- Tailwind CSS v4. Config is css first in `app/globals.css` via `@import "tailwindcss"`
  and `@theme inline`. There is no `tailwind.config.js`. Use current v4 syntax.
- Motion for animation, next/image (+ sharp) for images, TypeScript throughout.
- Buttons are a shadcn style component (`components/ui/button`) built on Radix Slot and
  class-variance-authority, merged with `cn()`. Icons come from lucide-react and react-icons.

## Where things live

- `app/layout.tsx` root layout, registers the fonts (Overlock + OptimusPrinceps) and
  renders Header, the page, ScrollToTop and Footer.
- `app/page.tsx` home, still a placeholder.
- `app/globals.css` tailwind import, theme tokens, and the `custom-container` utility.
- `app/components/` shared components (Header, Footer, Faqs, Coverflow, ScrollToTop,
  QuatrefoilPattern, `ui/button`, `ui/NavArrow`).
- `app/lib/utils.ts` the `cn()` helper, use it to merge class lists.
- `app/products/classic/` the Classic product page. `page.tsx` mounts HeroSection, Range,
  Body and Faqs. Sections nest rather than sit flat: HeroSection holds ProductGallery and
  BuyOptions, Body holds Flagship, PairsWellWith and ExploreUniverse. SectionHeading and
  BagIcon are small shared helpers.
- `public/ig-classic-assets/` images and icons for the Classic page. Subfolders: `icons/`,
  `1kg/`, `5kg/`, `dishes/`, `india-gate-subbrands/`, `rice-sacks/`.
- `public/retailers/` retailer logos (blinkit, zepto, swiggy, amazon, bigbasket, flipkart).

## Conventions

- Theme colours: `primary` (maroon) and `secondary` (gold), plus `cream`, are defined in
  `@theme inline`, so consume them as utilities: `text-primary`, `bg-secondary`, `bg-cream`.
  Do not use `text-[var(--color-primary)]` or `text-(--color-primary)`. Black is the only
  site wide colour, it is the default text colour.
- `custom-container` (an `@utility` in globals.css) holds the shared max width and
  responsive padding. Reach for it instead of redefining container padding per section.
- Fonts: `font-sans` is Overlock (next/font/google), `font-display` is the local
  OptimusPrinceps, self hosted from `app/fonts/` in two weights (400 and 600). The stray
  `Overlock-*.ttf` files sitting in `public/` are unused leftovers, the live Overlock is
  the Google font.
- Images: hero / above the fold use next/image `priority` (eager). Below the fold use
  `loading="lazy"`.
- Attribute icons (`icons/`) are flat PNGs with the colour baked in. The `*-gold.png`
  variants (`grain-gold`, `aroma-gold`, `aging-gold`) are for the golden hero feature
  strip, the plain black ones (`grain.png`, `aging.png`, `best-for.png`, `elongation.png`)
  are for everywhere else, eg the Range spec rows. They are not recoloured at runtime. The
  one exception is `BagIcon`, an inline SVG that recolours via `currentColor`.
- QuatrefoilPattern heights are kept in multiples of 5 (5%, 10%, 25%, 35%) so the brand
  pattern stays visually consistent from one section to the next.
- Comments: lowercase, plain human language, no em dashes, no filler.
