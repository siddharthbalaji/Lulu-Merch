<div align="center">

# Lulu Merch Co.

**Gaming & anime, worn well.**

Premium gaming & anime merchandise storefront — light-first, comic-inked, and
built to feel handcrafted, not like a Shopify template or an AI mockup.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand-state-593D88)](https://zustand-demo.pmnd.rs/)
![Node](https://img.shields.io/badge/Node-%E2%89%A518.17-339933?logo=node.js&logoColor=white)

[**Live demo →**](https://lulu-merch.vercel.app)

</div>

---

## Status

The storefront is **built and live as a front-end**. `main` ships a full
shopping experience on a clean white, Dragon Ball-flavoured design system:

- **Home** — hero → universes → trending → new-drops → featured collection → franchises → gaming/movies "coming soon" → weekly countdown → community → newsletter
- **Shop (PLP)** — filter rail, sort, grid/list toggle, active-filter chips, live count, URL-seeded deep links
- **Product (PDP)** — gallery, colour + size pickers, honest scarcity meter, disclosures, related items, Product JSON-LD
- **Cart** — slide-in drawer with a free-shipping goal-gradient bar (Zustand + persist)
- **Checkout** — guest form with inline validation and UPI / card / wallet / COD, clearly labelled as a demonstration (**no real payment is taken yet**)

The catalogue is **24 real products across 9 franchise lines** (Dragon Ball,
Naruto, One Piece, Demon Slayer, Bleach, Death Note, Berserk, Black Clover, One
Punch Man), with your own studio mockups served via Cloudinary.

> [!NOTE]
> Everything is currently **front-end only** — the catalogue is static data,
> the cart lives in `localStorage`, and checkout takes no payment. Turning this
> into a real, operable company store is the focus of the
> [backend roadmap](#-upcoming--backend-first) below.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 14** (App Router) + **TypeScript** (strict) |
| Styling | **Tailwind CSS v3** with a CSS-variable token system |
| Theming | **next-themes** — light-first, with a supported dark theme |
| Motion | **Framer Motion** — restrained, `prefers-reduced-motion`-aware |
| State | **Zustand** (+ `persist`) — cart & wishlist |
| Variants | **class-variance-authority**, **clsx**, **tailwind-merge** |
| Icons | **lucide-react** |
| Composition | **@radix-ui/react-slot** — polymorphic `asChild` |
| Images | **next/image** + Cloudinary remote patterns |

The foundation stays lean on purpose. Heavier libraries (a database/ORM,
payments SDK, auth, search engine, R3F/Three) are introduced by the branch that
first needs them — see the roadmap.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
npm run fonts      # fetch + install the free Saiyan Sans display face
```

Optional environment:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL="https://lulumerch.co"   # canonical / OG / sitemap
```

> The production build fetches Google Fonts (Anton, Space Grotesk, Inter,
> JetBrains Mono) at build time, so it needs network access — fine locally and
> on Vercel.

---

## Architecture

Feature-based, with a shared design system as the single source of truth.

```
src/
├─ app/                       # App Router routes + SEO/PWA metadata routes
│  ├─ layout.tsx              # fonts, theme, app shell, Organization JSON-LD
│  ├─ page.tsx                # homepage (all sections)
│  ├─ shop/page.tsx           # product listing (PLP)
│  ├─ product/[slug]/page.tsx # product detail (PDP) — all slugs prerendered
│  ├─ checkout/page.tsx       # demonstration checkout
│  ├─ not-found.tsx / error.tsx
│  ├─ globals.css             # design tokens + base layer
│  └─ robots.ts / sitemap.ts / manifest.ts / icon.svg
├─ components/
│  ├─ layout/                 # header (scroll-swap logo), footer, skip link
│  ├─ providers/              # theme provider
│  └─ ui/                     # primitives (button, container, logo, star, …)
├─ features/
│  ├─ home/                   # hero, categories, trending, new-drops, featured,
│  │                          #   franchises, coming-soon, countdown, community, newsletter
│  ├─ catalog/                # products (data), product-card, product-detail,
│  │                          #   shop-client (filters/sort), wishlist store
│  └─ cart/                   # cart drawer, cart store, checkout client
├─ config/                    # site identity + navigation
└─ lib/                       # fonts, seo helpers, price formatter, utils
```

**Server vs client:** Server Components by default. Client components are opt-in
and minimal — the header, theme toggle, and the interactive shop/cart/checkout
surfaces that need state.

---

## Design system

Tokens live as CSS variables in `src/app/globals.css` and are surfaced to
Tailwind in `tailwind.config.ts`. Colours are stored as space-separated RGB
channels so every token supports opacity modifiers (`bg-paper/60`).

**Light-first**, with a Dragon Ball-derived accent system pulled straight from
the brand logos and keyed with heavy black comic outlines.

| Token | Role | Light |
| --- | --- | --- |
| `ink` / `surface` | app background / cards | `#FFFFFF` |
| `elevated` | faintly raised warm off-white | `#F9F8F4` |
| `paper` | primary text (near-black) | `#141416` |
| `muted` / `faint` | secondary / tertiary text | `#58585E` / `#8A8A90` |
| `line` / `line-strong` | hairline / the black comic keyline | `#E4E2DD` / `#111113` |
| `kame` | **Kame red** — primary action | `#CC232A` |
| `saiyan` | **Saiyan gold** — single highlight (Von Restorff) | `#FFDA00` |
| `flame` | **Ember** — Dragon Ball orange | `#E49D31` |

> `iris` remains as a back-compat alias mapped to Kame red, so older component
> classes keep working.

**Signature look** — the inked **comic keyline panel** (`.panel` / `.panel-hover`):
a 2px black border with a hard offset shadow, replacing glassy dark cards. A
single recurring glyph, the **Dragon Star** (`components/ui/star.tsx`), and the
mono **spec-line** (uppercase micro-labels carrying real data, not decoration).

**Type** — four roles as CSS variables so faces swap in one place
(`src/lib/fonts.ts`):

- `--font-poster` → **Saiyan Sans** (free DBZ face; falls back to **Anton**) — hero-scale headlines only
- `--font-display` → **Space Grotesk** — headings
- `--font-sans` → **Inter** — body & UI
- `--font-mono` → **JetBrains Mono** — prices, SKUs, spec-lines

Run `npm run fonts` to fetch Saiyan Sans; until the `.ttf` is present the poster
role falls back to Anton so nothing breaks.

---

## Principles

- **Laws of UX, not decoration** — Jakob's (familiar shop/PDP/checkout layouts),
  Hick's (filters limited to attributes actually stocked), Fitts's (44px+
  targets), Von Restorff (one red CTA, one gold highlight), Goal-Gradient
  (free-shipping bar, sticky buy box), Serial-Position & Peak-End (section
  order). Each component carries a short rationale comment.
- **Honest by default** — no fabricated reviews, testimonials, or fake UGC.
  Social proof is real stock/demand signals only. No lorem ipsum. Unbuilt links
  render a small **Soon** tag instead of 404-ing.
- **Accessibility** — WCAG AA baseline: skip link, visible `:focus-visible`
  rings, semantic landmarks, `prefers-reduced-motion` honoured globally,
  hydration-safe theme toggle.
- **SEO** — `metadataBase` + templated titles, Open Graph, Twitter cards,
  Organization + Product JSON-LD, `robots.ts`, `sitemap.ts`, and a web manifest.

---

## Deployment (Vercel)

Zero-config: import the repo into Vercel, set `NEXT_PUBLIC_SITE_URL`, and
deploy. `next build` is the build command; the App Router is detected
automatically. Backend features below will add `DATABASE_URL` and provider keys
as they land.

---

## Roadmap

Strict feature-branch workflow — one shippable feature per branch, merged via PR.

**Legend:** ✅ shipped · 🔨 in progress · ⏳ planned

### ✅ Shipped

- [x] `feat/project-foundation` — scaffold, design system, app shell
- [x] `feat/home-hero` — homepage hero + featured collection
- [x] `feat/dbz-white-theme` — light-first Dragon Ball theme, brand logos, scroll-swap header
- [x] `feat/home-sections` — categories, trending grid, new drops, franchises, gaming/movies "soon", countdown, community, newsletter
- [x] `feat/product-listing` — PLP: filters, sorting, grid/list, active-filter chips, URL-seeded state
- [x] `feat/product-detail` — PDP: gallery, size guide, sticky purchase panel, honest scarcity meter, Product JSON-LD
- [x] `feat/cart-drawer` — animated cart drawer + free-shipping progress (Zustand + persist) + persisted wishlist
- [x] `feat/checkout-ui` — guest checkout form, payment-method UI, live order summary *(demonstration — no real payment)*

### 🔨 Upcoming — backend first

Priority is the **backend**, added one branch at a time, to turn the front-end
demo into a **complete, functioning company store**. Order reflects dependencies
— each step builds on the last.

1. ⏳ `feat/data-layer` — **Database + ORM foundation.** Postgres (Neon / Supabase / Vercel Postgres) with Prisma or Drizzle. Schema for products, variants, colourways, lines, inventory, and drops; migrate the static `products.ts` catalogue into the DB with a seed script. *Everything below reads and writes through this.*
2. ⏳ `feat/catalog-api` — **Server-driven catalogue.** Route Handlers / Server Actions for listing, detail, filter, sort, and pagination, backed by real inventory counts (replacing client-static reads), with caching + revalidation.
3. ⏳ `feat/cart-api` — **Server-authoritative cart.** Cart persisted server-side (session/cookie or user-keyed); the server recomputes prices and validates stock so the client is never trusted; guest carts merge into the account on login.
4. ⏳ `feat/auth-accounts` — **Authentication + accounts.** Auth.js (NextAuth) or Clerk with email + OAuth; `users`/`addresses` tables; account backend for profile, saved addresses, order history, and server-synced wishlist.
5. ⏳ `feat/checkout-payments` — **Real payments + orders.** Razorpay (INR-first) and/or Stripe; `orders`/`order_items`/`payments` tables with idempotency keys; server-side tax + shipping calc; inventory decrement on paid; confirmation webhooks. *Turns the demo checkout into a real one.*
6. ⏳ `feat/order-fulfilment` — **Post-purchase lifecycle.** Order status (placed → paid → packed → shipped → delivered); transactional email (Resend / Postmark) for confirmation and shipping; a real **track-order** page (currently a "soon" footer link); returns/RMA flow.
7. ⏳ `feat/admin-dashboard` — **Internal operations.** Protected admin with role-based access: product & inventory CRUD, drop scheduling, order management, and a Cloudinary upload pipeline — so the store runs without code edits.
8. ⏳ `feat/search-service` — **Backend search.** Postgres full-text or Meilisearch / Typesense, indexed on catalogue changes; powers the command-palette UI.
9. ⏳ `feat/newsletter-crm` — **Marketing backend.** Persist newsletter signups and connect an ESP (Resend Audiences / Mailchimp / Klaviyo) with consent + double opt-in; wire the existing newsletter section to it.
10. ⏳ `feat/platform-hardening` — **Production readiness.** Zod validation on every route, rate limiting, CSRF/secret management; observability (structured logging, Sentry, consent-gated analytics); CI (typecheck/lint/test), automated tests, and backups; real About / Privacy / Terms pages (currently "soon").

### ⏳ Planned

Not part of the backend track above. Tracked separately so the store's content,
pages, and catalogue can grow in parallel.

**Content & company pages** — every footer link below currently renders as a
`soon` stub (no route exists yet); each becomes a real page.

- [ ] `feat/pages-support` — **Shipping & delivery** (`/help/shipping`), **Returns** (`/help/returns`), **Size guide** (`/help/sizing`)
- [ ] `feat/pages-company` — **About** (`/about`), **Careers** (`/careers`)
- [ ] `feat/pages-legal` — **Privacy** (`/legal/privacy`), **Terms** (`/legal/terms`)
- [ ] `feat/track-order` — **Track order** (`/orders/track`) *(powered by `feat/order-fulfilment`)*

**Catalogue expansion** — these bands ship on the homepage *today* as "coming
soon" merchandising only (`#gaming-heading` / `#movies-heading`); planned as
real, shoppable lines with their own products and `/shop?line=…` deep links.

- [ ] `feat/line-gaming` — **Gaming** line (League of Legends, Valorant, Genshin Impact, Elden Ring, Cyberpunk 2077, The Witcher, Minecraft, Overwatch)
- [ ] `feat/line-movies` — **Movies & Comics**: Marvel + DC capsules

**Front-end & enhancements**

- [ ] `feat/search-palette` — command-palette search UI *(backed by `feat/search-service`)*
- [ ] `feat/account-ui` — orders, addresses, wishlist, rewards screens *(backed by `feat/auth-accounts`)*
- [ ] `feat/hero-3d` — optional R3F/Three enhancement of the hero + 360° product spin
- [ ] `feat/pwa-offline` — installable PWA, offline catalogue cache, i18n/currency

---

## Project docs

- [`TRANSFORMATION.md`](./TRANSFORMATION.md) — the dark-scaffold → white DBZ storefront rebuild
- [`CHANGES.md`](./CHANGES.md) — targeted fixes and section completions
