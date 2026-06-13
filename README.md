# India Gate

Marketing and product site for India Gate Basmati Rice. UI only for now, no backend or
business logic. The first fully built page is the Classic product page at `/products/classic`.

## Tech stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4 (via `@tailwindcss/postcss`, configured in `app/globals.css`)
- Motion for animation
- next/image + sharp for image optimisation
- TypeScript
- shadcn style button built on Radix Slot + class-variance-authority, merged with the
  `cn` helper (clsx + tailwind-merge)
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
- `npm run start` serve the production build
- `npm run lint` run eslint

## Project structure

```
app/
  layout.tsx              root layout, fonts, Header / ScrollToTop / Footer
  page.tsx                home (placeholder for now)
  globals.css             tailwind import, theme tokens, custom-container utility
  components/             shared ui: Header, Footer, Faqs, Coverflow, ScrollToTop,
                          QuatrefoilPattern, ui/button, ui/NavArrow
  lib/utils.ts            cn() class merge helper
  fonts/                  self hosted OptimusPrinceps display font (400 + 600)
  products/classic/       classic product page, split into section components
                          (HeroSection, ProductGallery, BuyOptions, Range, Body,
                          Flagship, PairsWellWith, ExploreUniverse, with SectionHeading
                          and BagIcon helpers)
public/
  ig-classic-assets/      classic page imagery; subfolders icons, 1kg, 5kg, dishes,
                          india-gate-subbrands, rice-sacks
  retailers/              retailer logos
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
- Attribute icons in `ig-classic-assets/icons` are flat PNGs with two pre coloured
  variants. The `*-gold.png` ones are used in the golden hero feature strip, the plain
  black ones everywhere else (eg the Range spec rows).
- This is a Next.js 16 project. APIs and conventions can differ from older versions, so
  check the docs before reaching for something from memory.
