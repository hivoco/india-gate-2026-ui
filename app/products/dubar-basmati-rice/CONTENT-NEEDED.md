# Dubar Basmati Rice page, content needed from PM

the page is built and live as a scaffold, but most of the data is still copied
from the classic page. below is everything i (frontend) need handed to me to
make it real. nothing here is my call, it is product / marketing / seo.

grouped by priority. each item says exactly what i need and where it ends up.

---

## 1. retailer / buy links (highest priority, currently fake)

real product urls for the dubar pack on each retailer, one per pack size.
right now blinkit/zepto/swiggy/amazon point at made up dubar slugs and
bigbasket/flipkart still point at classic. all are placeholders.

need, for both 1KG and 5KG:

| retailer  | 1KG url | 5KG url |
|-----------|---------|---------|
| Blinkit   | ?       | ?       |
| Zepto     | ?       | ?       |
| Swiggy    | ?       | ?       |
| Amazon    | ?       | ?       |
| BigBasket | ?       | ?       |
| Flipkart  | ?       | ?       |

also confirm: are these the only 6 retailers for dubar, or add/remove any?
and is dubar actually sold in both 1KG and 5KG, or different sizes?

## 2. seo metadata (currently still says "Classic")

the page title and meta description are literally the classic page copy.
need dubar specific:

- meta title (the browser tab + google headline, ~60 chars)
- meta description (the google snippet, ~150 to 160 chars)
- target keyword/phrase you want this page to rank for

## 3. breadcrumb trail

current trail is Home / Our range / Basmati Rice / Classic. for dubar the last
crumb should be Dubar, but i need the final routes confirmed:

- what is the real url for "Our range" (currently /products, page does not exist yet)
- what is the real url for the "Basmati Rice" category
- confirm the dubar page url stays /products/dubar-basmati-rice

## 4. product claims and copy (currently classic copy)

- hero title + subtitle: confirm "Dubar Basmati Rice" / "Naturally Aged | Flavourful & Fine"
- the 3 feature strip labels: confirm "Lean & Slender", "Long Grain", "Naturally Aged"
  (or give me the real 3 attributes for dubar)
- the "story" tile line, currently "Flavourful & fine Dubar, for the quality seeker in you"
- manufacturer line, currently "Manufactured & marketed by KRBL Limited", confirm correct
- certifications shown: GMO free, FSSAI licence, barcode, confirm what dubar actually carries

## 5. range comparison cards (currently classic + biryani rice)

the "gold standard range" section shows comparison cards. right now it is the
classic page's cards (Classic + Biryani Rice). for the dubar page, tell me:

- which products should appear in this comparison on the dubar page
- for each, the spec values: Grain, Aging, Best for, Elongation

example of what i need per card:
```
name: Dubar
Grain: ?
Aging: ?
Best for: ?
Elongation: ?
```

## 6. faqs (currently 5 classic faqs)

all 5 faqs are about Classic. need dubar specific question + answer pairs.
give me as many as you want (5 is the current count), each a question and a
short answer. these are seo important so write them how you want them to read.

## 7. "pairs well with" dishes

currently 4 classic dishes (hyderabadi biryani, lucknowi biryani, kashmiri
pulao, zafrani pulao) using classic art. tell me which dishes dubar should be
paired with. if the list is the same, just confirm.

## 8. images / art (art, not links, but i need them from you)

dubar art is staged under `public/IG Dubar/` but the page currently references
`/ig-dubar-assets/...` which is not populated. i need final dubar assets for:

- 1KG pack: front, back, certifications tile
- 5KG pack: front, back, certifications tile
- shared tiles: story, nutrition, manufacturer
- 3 feature strip icons (lean/slender, long grain, aged), teal set
- range card pack shot(s) for the comparison section
- dish images, only if the dubar dish list differs from classic

## 9. nice to confirm

- the "explore the universe" subbrand carousel: should dubar be dropped from it
  (pass its own name) so it does not show itself
- pricing: the UI shows no price right now, confirm we are keeping it priceless
  (links only) or whether MRP needs to appear

---

once 1, 2, 3 land i can ship a correct page. 4 to 9 can follow.
