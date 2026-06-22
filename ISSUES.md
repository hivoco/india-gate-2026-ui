# Issues — India Gate site

review of the current codebase (28 source files, ~2k lines). tooling is clean:
`npx eslint .` and `npx tsc --noEmit` both pass with zero errors. everything below
is found by reading the code. nothing is a safety risk, most are polish, a handful
are real defects.

date: 2026-06-16

note: a prior `CODE-REVIEW.md` (dated 2026-06-13) covered the classic page. several
of its findings are still unfixed (flagged below), and the newer home page files
(`Carousal`, `BrandIntro`, `Header`) add fresh issues it never saw.

---

## Bugs / behaviour

### 1. Carousel arrows clamp silently, no disabled state
`app/components/Carousal.tsx:16-22`

`prev` at index 0 and `next` at the last slide just return the same index, so the
button stays focusable and clickable but does nothing. the classic page already
solved this with `NavArrow`'s `disabled` prop (`ProductGallery.tsx:135,144`). either
disable the arrows at the ends or wrap around. right now it is an inconsistent
dead-click.

### 2. Two menu buttons on desktop home
`app/components/Carousal.tsx:25-31` + `app/components/Header.tsx:27,53`

`Header` is hidden on mobile home (`isHomePage && "hidden sm:flex"`) so the carousel
draws its own hamburger. but from `sm` up the header comes back while the carousel
hamburger is still absolutely positioned on top, so there are two menu triggers at
once. the carousel menu should be mobile-only (`sm:hidden`) or removed.

### 3. Carousel menu button does nothing and has no `aria-expanded`
`app/components/Carousal.tsx:25-31`

ui-only is fine, but a control labelled "Open menu" with no `aria-expanded` reads as
broken to assistive tech. add `aria-expanded={false}` for now, same as the disclosure
note in the old review.

### 4. Hand image sizing is fragile
`app/components/BrandIntro.tsx:49-57`

`width={100} height={200}` with `className="h-full w-auto"` inside a flex row that has
no defined height. `h-full` resolves against an auto-height parent, so it collapses to
the intrinsic 100px and the `h-full` is a no-op. give the image a real height or drop
the `h-full`.

---

## Accessibility

### 5. Disclaimer text is 6px on mobile
`app/components/BrandIntro.tsx:26`

`text-[6px]` for the "*As per the Mordor Intelligence Report..." line is far below any
legible/WCAG-reasonable size on phones (it jumps to `sm:text-sm` only at the sm
breakpoint). bump the mobile size to at least `text-[10px]`/`text-xs`.

### 6. `aria-current` gets a boolean
`app/components/Carousal.tsx:75`

`aria-current={selected === i}` renders `aria-current="true"`. valid, but the intended
token for a carousel position is a string; prefer `aria-current={selected === i ? "true" : undefined}`
to avoid emitting `aria-current="false"` on every other dot.

### 7. Missing focus-visible rings on home controls
`Carousal` arrows / dots / menu, `Header` menu + nav links

`button.tsx`, `Faqs`, `Coverflow`, `ExploreUniverse` already use `focus-visible`. the
home page controls do not, so keyboard focus is inconsistent across the site. (carried
over from the old review for the nav/hamburger; now also true for the carousel.)

### 8. No skip-to-content link
`app/layout.tsx:44-49`

keyboard users tab the whole header before reaching content. still open from the prior
review.

---

## Conventions (from CLAUDE.md / AGENTS.md)

### 9. Off-brand neutrals
`app/products/classic/BuyOptions.tsx:50` (`text-gray-500`),
`app/components/Faqs.tsx:57` (`divide-gray-200`)

the rule is "black is the only site-wide neutral". use a black opacity instead, eg
`text-black/50`, `divide-black/10`. still unfixed from the prior review.

### 10. `bg-background` on a white section
`app/components/BrandIntro.tsx:11`

`--color-background` is white (`globals.css:9`), which is already the body background,
so the class is redundant. it also is not one of the documented theme utilities
(`primary`/`secondary`/`cream`). drop it or use a real token.

### 11. Inconsistent `'use client'` directive
`app/components/Header.tsx:1`, `app/products/classic/HeroSection.tsx:1`

single-quoted `'use client'` with no semicolon, while every other client file uses
`"use client";`. also `Header.tsx:18-21` has cramped spacing (`isHomePage= pathname==="/"`)
and stray blank lines.

### 12. Leftover `};;`
`app/products/classic/Range.tsx:129`

double semicolon. trivial, still there from the prior review.

### 13. Dead `ring-0 ring-black/5`
`app/components/Footer.tsx:46`

`ring-0` cancels the ring so the colour does nothing. pick `ring-1` or drop both.
still there from the prior review.

### 14. Stray whitespace in className strings
widespread

double spaces inside `className` in 12 files (most in `Carousal.tsx`, 5) and trailing
spaces in 10 files. adding `prettier-plugin-tailwindcss` would normalise whitespace and
class order on save and clear most of these at once.

### 15. Home page indentation
`app/page.tsx:8`

`<BrandIntro />` is over-indented under `<Carousal />`. cosmetic, prettier fixes it.

---

## Repo housekeeping

### 16. Stale review doc
`CODE-REVIEW.md`

dated 2026-06-13 and scoped to the classic page only; it predates the home page work.
either fold it into this file or refresh it so there is one current source of truth.

### 17. `to-do-list.md` mentions unifying chevrons
the todo and the old review both call out "too many chevron icons". `Carousal` uses
lucide `ChevronLeft/Right` while the classic page uses `NavArrow`; worth picking one
arrow component for consistency.

---

## Cleared (checked, not issues)

- image eager/lazy split is correct: home hero (`Carousal`) and logos use `priority`,
  below-the-fold images (`BrandIntro` hand, gallery thumbs, footer, range, pairs)
  use `loading="lazy"`.
- tailwind v4 syntax is correct throughout (`px-25`, theme utilities, `@utility`,
  `@theme inline`).
- eslint and tsc are both clean.
- external links and image handling have no obvious safety surface.

---

## Suggested fix order

1. quick unambiguous pass: `};;` (#12), dead ring (#13), `bg-background` (#10),
   gray neutrals (#9), `'use client'` normalise (#11), prettier-tailwind for whitespace (#14, #15).
2. home page behaviour: carousel arrow disabled state (#1), duplicate menu (#2),
   6px disclaimer (#5).
3. a11y batch: focus rings (#7), `aria-expanded` (#3), `aria-current` token (#6),
   skip link (#8).
