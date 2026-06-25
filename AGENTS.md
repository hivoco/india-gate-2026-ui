# India Gate, codebase notes for agents

Marketing and product site for India Gate Basmati Rice. UI work only, no business logic.
Build pages and components, leave data and backend wiring out unless asked. The substantial
work lives in the home page and the product pages. The Classic product page at
`/products/classic` is the reference build, its section components are now prop driven and a
second product page at `/products/dubar-basmati-rice` reuses them by importing from
`../classic` and feeding its own data arrays. The
home page runs hero carousel, brand intro, our range (with a product spotlight dialog), the
aroma edit content hub, brand initiatives, an explore cta, a looping journey video, a made
with india gate instagram embed, other ranges, and faqs. A quiz section between brand intro
and our range is still stubbed with a comment and not built yet.

The home page is mid way through going responsive. Mobile is the locked reference and must
not change (its classnames stay untouched, only sm and up are styled). The desktop layout is
being built up from the mobile markup at sm and above, hero and initiatives already ship
desktop image variants, and an old "working on desktop" placeholder still sits commented out
at the top of `app/page.tsx`.

## Stack

- Next.js 16, App Router. This is newer than most training data, so check
  `node_modules/next/dist/docs/` before using an API you are unsure about and heed any
  deprecation notices.
- React 19 with the React Compiler enabled (`babel-plugin-react-compiler`). Do not add
  manual memo / useMemo / useCallback just for performance, the compiler handles it.
- Tailwind CSS v4. Config is css first in `app/globals.css` via `@import "tailwindcss"`
  and `@theme inline`. There is no `tailwind.config.js`. Use current v4 syntax.
  `tw-animate-css` is also imported for the dialog enter / exit keyframes.
- Motion for animation, next/image (+ sharp) for images, TypeScript throughout.
- Buttons are a shadcn style component (`components/ui/button`) built on Radix Slot and
  class-variance-authority, merged with `cn()`. The Dialog (`components/ui/dialog`) is the
  same style, built on Radix Dialog, and backs the product spotlight. The spotlight
  thumbnail rail runs on `embla-carousel-react` in center mode. Icons come from
  lucide-react and react-icons.

## Where things live

- `app/layout.tsx` root layout, registers the fonts (Overlock + OptimusPrinceps) and
  renders Header, the page, ScrollToTop and Footer.
- `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx` the app router ux fallbacks.
  `error` is the route level boundary (client, retries via `reset()`), `global-error`
  catches a throw in the root layout itself so it renders its own html and body with inline
  styles (the layout fonts and globals are not available there, production only), and
  `not-found` is the 404. All three lean on QuatrefoilPattern and the shared Button.
- `app/page.tsx` home. In order it mounts Carousal (hero slider), BrandIntro, a quiz
  comment stub, the Our Range section (SectionHeading plus two ProductShowCase cards for
  Basmati and Regional, each wrapped in a ProductSpotlight so a tap opens the pack dialog),
  AromaEdit (content hub), an Explore Now cta band over a QuatrefoilPattern, Initiatives,
  ViewAllBanner, a LoopingVideo for the rice journey, MadeWithIndiaGate (instagram embed),
  an Other Ranges section (two more ProductShowCase cards, `tone="dark"`, for Unity and
  Masala, also wrapped in ProductSpotlight), then Faqs with a View All FAQs button. All
  four range cards open a spotlight. The page also holds the home `FAQS` data array and
  four pack arrays (`BASMATI_PACKS`, `REGIONAL_PACKS`, `MASALA_PACKS`, `UNITY_PACKS`), one
  per range card.
- `app/globals.css` tailwind import, the `tw-animate-css` import, theme tokens, and the
  `custom-container` utility.
- `app/components/` shared components.
  - Site wide: Header, Footer, Faqs, Breadcrumb, ScrollToTop, QuatrefoilPattern, Reveal,
    Coverflow, `ui/button`, `ui/dialog`, `ui/NavArrow`. ScrollToTop adapts to the route via
    `useIsHomePage`: on home it shows the `family-scooter` image at the left end with the
    button at the right end, off home it just right aligns the button. Faqs takes a `faqs`
    prop (each page owns its own array) and exports the `Faq` type. Breadcrumb is a desktop
    only trail for product pages, takes a `Crumb[]` of label plus href and exports `Crumb`,
    the links are still spans for now since the routes are not ready, last crumb is the
    current page as plain text.
  - Home page: Carousal (client hero slider with prev / next, dots and a centred logo;
    each slide carries a mobile and a desktop shot, the desktop one kicks in at sm),
    BrandIntro (the "world's number 1" brand block, hand gesture slides in via Motion),
    ProductShowCase (a range showcase card, image plus optional headline plus range label
    plus a spinning badge, takes `align` left or right, `tone` light or dark, and
    `badgePosition`), ProductSpotlight (a full screen Dialog that frames a pack in a phone
    shell with an embla center mode thumbnail rail and crossfades between items, takes an
    `items` array and an optional `imageScale`, plus per item `scale`, wrap a trigger in
    it), and
    SpinningBadge (a ring of text spinning around a static icon, hover speed modes, honours
    reduced motion).
  - Content hub: AromaEdit (All / Articles / Videos tabbed section) renders ArticleCard
    (editorial card with a spinning Read more badge) and VideoCard (lazy youtube thumbnail
    that swaps to a real embed on click).
  - Other home sections: Initiatives (grid built from InitiativeCard), ViewAllBanner (cta
    band with the boy eating rice mascot), LoopingVideo (muted autoplay video with
    webm / mp4 sources, poster and optional heading overlay), MadeWithIndiaGate (instagram
    post embed with a family illustration tucked behind it).
- `app/lib/utils.ts` the `cn()` helper, use it to merge class lists.
- `app/hooks/` shared client hooks. `useIsHomePage` wraps `usePathname() === "/"`, use it
  instead of re-deriving the home check (Header and ScrollToTop both consume it).
  `useMediaQuery` tracks whether a css media query matches and keeps it in sync on resize,
  it starts false so the server render and first paint stay mobile then resolves on mount,
  use it to drive js that has to track a tailwind breakpoint eg `(min-width: 640px)`.
- `app/products/classic/` the Classic product page, and the home of the reusable product
  page sections. `page.tsx` owns all the data (a `BREADCRUMB`, `FEATURES`, `GALLERY`,
  `RETAILERS`, `PACKS`, `PRODUCTS`, `DISHES` and `FAQS` set of consts) and passes each down
  as a prop, so the sections themselves carry no hardcoded content and a second product page
  can mount them with different data. In order it renders Breadcrumb, then HeroSection,
  Range, Flagship, PairsWellWith, ExploreUniverse and Faqs, each top level section wrapped
  in its own `Reveal` so it fades up as it scrolls into view (the old `Body` wrapper is gone,
  moved to `trash/`). HeroSection is the one with local state, it owns the pack types
  (`PackLabel`, `PackSize`, `Pack`, `Retailer`), tracks the selected pack, and stacks
  ProductGallery, Features, BuyOptions and Retailers. The pieces:
  - ProductGallery (left column, takes `currentPack` plus a `gallery` keyed by pack, exports
    the `Thumb` type, main viewer with mobile NavArrows and a thumbnail strip from sm up),
  - Features (the hero feature strip, a 3 up icon row, takes `Feature[]` and exports
    `Feature`),
  - BuyOptions (the pack size selector, rice sack art toggles selected vs unselected),
  - Retailers (the Buy Now button that reveals the retailer logo row, takes `retailers` plus
    the active `pack` so each logo links to the right pack url),
  - Range (the gold standard range cards, takes `products`, exports `Product` and `Spec`),
  - PairsWellWith (takes `dishes`, exports `Dish`, renders a DishCard each),
  - ExploreUniverse (the subbrand coverflow, takes an optional `currrentProduct` to drop the
    current product from the carousel),
  - SectionHeading is the shared heading helper. `BagIcon` is an inline svg helper that is
    currently unused.
- `app/products/dubar-basmati-rice/` a second product page. It imports the section
  components and their types from `../classic` and mounts them exactly like the classic page,
  with its own data arrays. Right now those arrays are still the classic copy and point at
  the classic assets, so it is a working scaffold to be filled in with the real Dubar content
  and art (staged under `public/IG Dubar/`).
- `public/ig-classic-assets/` images and icons for the Classic page. Subfolders: `icons/`,
  `1kg/`, `5kg/`, `dishes/`, `india-gate-subbrands/`, `rice-sacks/`. At the folder root sit
  the shared gallery shots reused across packs (`story.jpg`, `nutrition.jpg`,
  `manufacturer.jpg`, `certifications.jpg`, `pack-front.jpg`, `pack-back.jpg`), the range
  card art (`india-agte-classic-hero-section.jpg`, note the typo in the filename, and
  `biryani-rice.png`) and `pattern-icon.png` for SectionHeading. The `icons/` feature strip
  art is now the standalone `grains.png`, `rice.png` and `aged.png` (see the icon note in
  Conventions). The `india-gate-subbrands/` packs are lowercase kebab named
  (`ig-mogra-1kg-front.jpg`, `ig-dubar-1kg-front.jpg`, `ig-biryani-1kg-front.jpg`,
  `ig-feast-rozzana-1kg-front.jpg`, `ig-everyday-1kg-front.jpg`).
- `public/IG Dubar/` staged Dubar art (`1Kg/` and `5Kg/`, each with front and back, a hero
  shot and a set of `PDP Tile` images plus one mp4), not wired into the dubar page yet.
- Home spotlight packs each have their own folder, one per range card and pack array:
  `public/basmati-products/` (BASMATI_PACKS), `public/regional/` (REGIONAL_PACKS),
  `public/masala/` (MASALA_PACKS) and `public/unity/` (UNITY_PACKS).
- `public/hero/` home hero slides, mobile (`hero-mobile-1`, `hero-mobile-2`) and desktop
  (`hero-desktop-1`, `hero-desktop-2`) variants, used by Carousal which swaps mobile for
  desktop at sm.
- `public/initiatives/` initiative artwork (`grains-of-hope`, `perfectly-aged`,
  `taste-of-indian-values`, each with mobile and desktop variants) for InitiativeCard, plus
  `boy-eating-rice.png` for ViewAllBanner.
- `public/article-assets/` AromaEdit imagery: `card-pattern.png` and `video-card-pattern.png`
  brand overlays, `recipe-dish.png` and `story-of-basmati.png` article art.
- Home range and section art lives at the public root: `Basmati.png`, `Regional.png`,
  `Unity.png`, `Masala.png` feed the ProductShowCase cards; `rice-journey.{mp4,webm,gif}`
  with `rice-journey-poster.jpg` feed LoopingVideo; `quatrefoil-pattern.png` and
  `brown-patti.png` are brand pattern fills; `hand-ok-gesture.png` feeds BrandIntro;
  `family-scooter.png` feeds ScrollToTop on home; `cooking-together.png` and
  `family-sharing-meal.png` are section illustration overlays.
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
- Image weight: run `npm run optimize:images` (`scripts/optimize-images.mjs`, sharp based)
  after dropping any new raster image into `public/`, before committing it. It compresses
  in place keeping the same filename and format so no code references change, and caps width
  at 1600px. It is idempotent, already optimised files are skipped, so it is safe to run on
  the whole folder any time. next/image still does per device resizing and webp at runtime,
  this only keeps the source files in the repo from being huge.
- Attribute icons (`icons/`) are flat PNGs with the colour baked in, not recoloured at
  runtime. The hero feature strip (Features) uses the standalone `grains.png`, `rice.png`
  and `aged.png`. The plain black ones (`grain.png`, `aging.png`, `best-for.png`,
  `elongation.png`) are for the Range spec rows. The older `*-gold.png` variants
  (`grain-gold`, `aroma-gold`, `aging-gold`) are now unused leftovers, nothing references
  them. `BagIcon` is an inline svg that would recolour via `currentColor` but is also
  currently unused.
- QuatrefoilPattern heights are kept in multiples of 5 (5%, 10%, 25%, 35%) so the brand
  pattern stays visually consistent from one section to the next.
- Scroll reveal: `Reveal` (`app/components/Reveal.tsx`) is the shared Motion wrapper that
  fades a section up the first time it enters view. It runs once and skips the movement for
  `useReducedMotion` users, so do not hand roll per section scroll animation, wrap the
  section in `Reveal` and pass `delay` to stagger siblings.
- Comments: lowercase, plain human language, no em dashes, no filler.

## Todo

- Spin badge mp4s: `public/spin-badges/` has both gif and mp4 versions of each badge
  (basmati, masala, regional, unity, read-more, watch-now). The badges currently render the
  gif in ProductShowCase, ArticleCard and VideoCard. The mp4s are much lighter and we want
  to switch to them, but they ship with a white background instead of transparent so they
  do not sit on the card art cleanly. Each component already has the mp4 `<video>` swap
  written and commented out right under the live gif. Once the mp4s are re-exported with a
  transparent or matched background, swap the comment over to the video and drop the gif.
