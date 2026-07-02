# Lulu Merch Co.

Premium gaming & anime merchandise storefront. Dark-first, fashion-forward,
built to feel handcrafted — not like a Shopify template or an AI mockup.

> **Status:** homepage hero. On top of the foundation, this branch ships the
> homepage hero and the featured-collection band. Catalogue, product, cart,
> checkout, account, and search land in subsequent feature branches — see the
> [roadmap](#branch-roadmap).

## Stack

- **Next.js 14** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v3** with a CSS-variable token system
- **next-themes** — dark-first with a light theme
- **Framer Motion** — restrained, reduced-motion-aware interactions
- **class-variance-authority**, **clsx**, **tailwind-merge** — component variants
- **lucide-react** — icons
- **@radix-ui/react-slot** — polymorphic `asChild` composition

Heavier dependencies (React Three Fiber, GSAP/ScrollTrigger, Zustand, React
Hook Form + Zod, TanStack Query, Embla) are added by the feature branch that
first needs them, so the foundation stays lean.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

Optional environment:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL="https://lulumerch.co"   # used for canonical/OG/sitemap
```

## Architecture

Feature-based, with a shared design system. Directories are added as branches
introduce them (e.g. `src/features/cart`, `src/features/catalog`).

```
src/
├─ app/                     # App Router routes + SEO/PWA metadata routes
│  ├─ layout.tsx            # fonts, theme, app shell, Organization JSON-LD
│  ├─ page.tsx              # foundation landing
│  ├─ not-found.tsx         # designed 404
│  ├─ error.tsx             # route error boundary
│  ├─ globals.css           # design tokens + base layer
│  ├─ robots.ts / sitemap.ts / manifest.ts / icon.svg
├─ components/
│  ├─ layout/               # app-shell chrome (header, footer, skip link)
│  ├─ providers/            # theme provider
│  └─ ui/                   # design-system primitives (button, container, …)
├─ features/
│  └─ home/                 # homepage sections: hero, featured collection, garments, data
├─ config/                  # site identity + navigation (single source of truth)
└─ lib/                     # fonts, seo helpers, price formatter, utils
```

**Server vs client:** everything is a Server Component by default. Client
components are opt-in and minimal — the header (menu/scroll state) and theme
toggle. The landing reveal uses CSS animation so the page stays a Server
Component.

## Design system

Tokens live as CSS variables in `src/app/globals.css` and are surfaced to
Tailwind in `tailwind.config.ts`. Colors are stored as RGB channels so every
token supports opacity modifiers (`bg-ink/60`).

**Color** — dark-first. One signature accent (Iris), used with restraint.

| Token | Role | Dark |
| --- | --- | --- |
| `ink` | app background | `#0B0B0D` |
| `surface` / `elevated` | raised panels | `#141417` / `#1C1C21` |
| `paper` | primary text | `#F4F3F0` |
| `muted` / `faint` | secondary / tertiary text | `#9B9BA3` / `#6E6E76` |
| `line` / `line-strong` | hairlines / borders | `#26262B` / `#3A3A42` |
| `iris` | signature accent (CTA, focus, active) | `#7C5CFC` |

**Type** — three roles as CSS variables so faces swap in one place
(`src/lib/fonts.ts`): `--font-display` (Space Grotesk), `--font-sans` (Inter),
`--font-mono` (JetBrains Mono, for prices/SKUs/spec-lines). Display sizes
(`text-d-sm … text-d-2xl`) ship with tight tracking.

**Signature** — the *spec-line*: a mono, uppercase micro-label (`.spec-line`)
with tick dividers (`.tick`). It carries real data — product classes, drop
names, counts — in a collector/HUD voice, not decoration.

**Radius** — intentionally tight (4–12px; buttons 6px). No pill buttons, no
oversized rounding.

### Swapping in the brief's first-choice fonts

The brief lists Geist (body) and Clash Display (display). To use them, drop the
licensed `.woff2` files into `public/fonts/` and switch the relevant import in
`src/lib/fonts.ts` from `next/font/google` to `next/font/local`. Nothing else
changes — all components read the `--font-*` variables.

## Homepage — hero + featured collection

The homepage opens with a statement hero and presents the store's inaugural
house capsule (**Nocturne · Vol. 01** — original, not a licensed franchise, per
the brief's ban on copyrighted artwork).

**Product imagery without photos or generated art.** There are no real product
shots yet and franchise art is off-limits, so garments are rendered as original
**technical flats** — the front-view cut-sheet line drawings apparel studios use
in a tech pack (`src/features/home/garments.tsx`). They're on-brand for the
collector/spec-sheet voice, theme-aware (token-driven fill/stroke), and weigh
nothing — no image bytes to hurt LCP. The hero frames the drop's hero garment as
an annotated cut-sheet (registration ticks, spec callouts on leaders, a `New
drop` marker), which is the page's signature moment.

**Content is data, not filler.** Every field in `src/features/home/collection.ts`
is a real product attribute — weight (GSM), cut, colorways, edition size, honest
stock status — so the mono spec-lines carry information. No lorem, no fake
reviews, no fake countdown (the animated drop timer is its own later section).

**Motion stack — Framer Motion, not GSAP (yet).** The brief lists GSAP +
ScrollTrigger for the hero. A single load reveal, on-scroll stagger, and a
subtle plate parallax are fully served by Framer Motion, which the foundation
already ships — so pulling in GSAP here would add bundle weight against the 95+
Lighthouse target for no gain. GSAP earns its place when a section needs true
timeline choreography (scroll storytelling in `home-sections`, or the 3D hero).
All motion is gated on `prefers-reduced-motion`.

**Scope.** This is the hero and the featured-collection band only. The trending
grid (quick-add, wishlist, alternate images), category cards, franchises,
countdown, community, and newsletter belong to `feat/home-sections`. Per-product
pages arrive with `feat/product-detail`; until then the CTAs and cards point at
`/drops`, which resolves to the designed 404 — the foundation's "soon" pattern.
Product/ItemList JSON-LD is intentionally deferred to the product branch so the
structured data stays truthful (no prices/availability endpoints exist yet).

## UX rationale (Laws of UX)

Applied throughout and documented inline where they drive a decision:

- **Jakob's Law** — conventional storefront layout: logo left, nav, actions right.
- **Hick's Law** — short primary nav; the long-tail IA lives in the footer.
- **Fitts's Law** — 44px+ tap targets on every control.
- **Aesthetic-Usability** — a minimal frame executed with precision.
- **Von Restorff** — a single iris accent marks the primary action / headline.
- **Serial Position** — primary CTA first; secondary second.
- **Law of Proximity / Similarity** — footer columns grouped and styled by task.
- **Doherty Threshold** — reveals stay ~120–360ms; nothing blocks interaction.
- **Progressive Disclosure** — the mobile menu discloses nav on demand.

## Accessibility

WCAG AA baseline: skip link, visible `:focus-visible` rings, semantic landmarks
(`header` / `main#main` / `footer` / labelled `nav`), `prefers-reduced-motion`
honored globally, hydration-safe theme toggle.

## SEO

`metadataBase` + templated titles, Open Graph, Twitter cards, Organization
JSON-LD, `robots.ts`, `sitemap.ts`, and a web manifest. The sitemap lists only
live routes and grows with each feature branch.

## Deployment (Vercel)

Zero-config: import the repo into Vercel, set `NEXT_PUBLIC_SITE_URL`, and
deploy. `next build` is the build command; the App Router is detected
automatically.

## Branch roadmap

Strict feature-branch workflow — one shippable feature per branch, merged via PR.

- [x] `feat/project-foundation` — scaffold, design system, app shell
- [x] `feat/home-hero` — homepage hero + featured collection *(this branch)*
- [ ] `feat/home-sections` — categories, trending grid, new drops, franchises, community, newsletter
- [ ] `feat/product-listing` — PLP: filters, sorting, grid/list, infinite scroll
- [ ] `feat/product-detail` — PDP: gallery, size guide, sticky purchase panel, reviews
- [ ] `feat/cart-drawer` — animated cart drawer + free-shipping progress (Zustand)
- [ ] `feat/checkout` — guest checkout, address, payments (RHF + Zod)
- [ ] `feat/search-palette` — command-palette search with instant results
- [ ] `feat/account` — orders, wishlist, addresses, rewards
- [ ] `feat/hero-3d` — optional R3F/Three enhancement of the hero
```
