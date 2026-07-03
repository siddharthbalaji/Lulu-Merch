# Lulu Merch — DBZ White-Theme Transformation

Branch: `feat/dbz-white-theme` (based off `feat/home-hero`)

This branch turns the dark‑purple scaffold into a **clean, white, Dragon‑Ball‑Z‑flavoured
storefront** and builds out the full shopping experience: home, listing, product, cart, and
checkout. It ships with your own logos and your own product mockups as the live catalogue.

## What changed at a glance

**Theme & brand**
- Light‑first design system. `globals.css` and `tailwind.config.ts` flipped to a white canvas
  with near‑black ink text. Brand tokens: **Kame red** `#CC232A` (primary action),
  **Saiyan gold** `#FFDA00` (single highlight, used sparingly — Von Restorff), **Ember**
  `#E49D31` (the star orb), black keylines.
- Signature look: the inked **comic keyline panel** (`.panel` / `.panel-hover`) — 2px black
  border with a hard offset shadow — replaces glassy dark cards.
- Your logos are wired in: the full **LULU · MERCH** wordmark centred in the top bar, which
  **swaps to the compact "Lulu" mark on scroll**. Assets optimised into `public/brand/`.
- A single recurring glyph, the **Dragon Star** (`components/ui/star.tsx`), and a heavy poster
  face (Anton) reserved for hero‑scale headlines.

**Real product catalogue (your mockups)**
- 21 products across **9 franchise lines** — Dragon Ball, Naruto, One Piece, Demon Slayer,
  Bleach, Death Note, Berserk, Black Clover, One Punch Man — built from the Cloudinary image
  set you supplied. Where a second studio shot exists it becomes the **hover / alternate**
  image on the card and a second gallery frame on the product page.
- Cloudinary added to `next.config.mjs` image `remotePatterns` so `next/image` optimises them.

**Pages built**
- **Home** (`/`): hero → categories (universes) → trending → new‑drops magazine → featured
  collection → franchises → weekly countdown → community → newsletter.
- **Shop** (`/shop`): filter rail (franchise / size / availability / limited), sort, grid‑and‑
  list toggle, active‑filter chips, live result count, mobile filter sheet. URL‑seeded, so
  `/shop?line=Dragon+Ball` and `/shop?sort=new` deep‑link correctly.
- **Product** (`/product/[slug]`): gallery with thumbnails, colour + size pickers, quantity,
  add‑to‑cart, honest scarcity meter (units claimed / edition size — **no fake star ratings**),
  shipping / size‑guide / care disclosures, related products, and Product JSON‑LD. All 21
  slugs are statically generated.
- **Checkout** (`/checkout`): guest form with inline validation, UPI / card / wallet / COD,
  live order summary, free‑shipping logic. Clearly labelled as a **front‑end demonstration** —
  it takes no real payment.
- Cart is a slide‑in drawer (Zustand + persist) with a free‑shipping goal‑gradient bar; wishlist
  is a small persisted store.
- 404 and error pages re‑themed; `sitemap.ts` now lists shop + every product.

## Laws of UX applied (not decoration)
Jakob's Law (familiar shop/PDP/checkout layouts), Hick's Law (filters limited to attributes we
actually stock), Fitts's Law (44px+ targets throughout), Von Restorff (one red CTA, one gold
highlight, scarcity dots), Goal‑Gradient (free‑shipping bar, sticky buy box), Serial‑Position &
Peak‑End (home section order), Aesthetic‑Usability (consistent inked‑panel language). Every
component carries a short rationale comment in this house style.

## Deliberately avoided (anti‑"AI look" + honesty)
No glassmorphism, blobs, or neon overload. No fabricated reviews, testimonials, or fake UGC —
social proof is real stock/demand signals only. No lorem ipsum. Motion is restrained and
respects `prefers-reduced-motion`.

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```
The production build fetches the Google fonts (Anton, Space Grotesk, Inter, JetBrains Mono) at
build time — that needs network access (fine locally and on Vercel).

## Honest status
Delivered and building: the white DBZ theme, logos + scroll‑swap header, full homepage, real
franchise catalogue, cart, wishlist, shop (PLP), product (PDP), and a designed checkout.
Scaffolded / deferred (per the brief's larger roadmap, not built here): real payment
processing, 3D/R3F hero and 360° product spin, account pages, and command‑palette search.
Footer help/legal links are intentionally marked "soon" rather than linking to empty pages.
