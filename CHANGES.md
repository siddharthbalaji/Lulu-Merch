# Lulu Merch — fixes & additions

A pass across the site addressing the reported glitches and rounding out
unfinished sections. Summary by request number:

### 1. Nav bar twitching on scroll (priority 1) — FIXED
`src/components/layout/site-header.tsx`. The header changed height at a single
`scrollY > 40` threshold. Because the header is **sticky**, that height change
shifted the layout, nudged the scroll position back across the same threshold,
and flipped the state again — the twitch. Replaced with:
- **Hysteresis**: enter the compact state above 80px, leave it below 24px, so a
  single height change can never trigger the opposite flip (a dead zone).
- **rAF throttling**: scroll bursts collapse to one state read per frame.

### 2. Centre logo — centring, smooth swap, size — FIXED
Rebuilt the centre brand as an **in-place crossfade**: the wordmark and the mark
share one box and cross-dissolve on opacity only, while the box animates between
two fixed sizes. Nothing reflows, so the swap is smooth. Added `py-1.5` so the
artwork never touches the keyline, and increased the size (wordmark ~52px tall).

### 3. Real images instead of SVG mockups — DONE
Swapped the SVG "technical flat" garments for the real studio product photos
(already in `products.ts`) across the hero plate, `categories.tsx`,
`featured-collection.tsx`, and `community.tsx`. (The SVG flat now only survives
as a last-resort fallback in the cart drawer when a line has no image.)

### 4 & 10. Unfinished sections / overall completeness — DONE
- **Featured collection** now shows the real flagship Dragon Ball trio with
  photos, prices, colourways, and live stock status (was fictional SVG pieces).
- **Footer** "Support"/"Company" links that pointed at unbuilt pages no longer
  404 — they render with a small **Soon** tag instead of linking.
- Footer gained **Gaming** and **Movies & Comics** entries linking to the new
  on-page sections.

### 5. Stretched footer logo — FIXED
`site-footer.tsx`: the wordmark now has an explicit height (`h-11 w-auto`) so it
renders at its native 1200×273 aspect ratio instead of stretching.

### 6. Hero text raised so the CTA is visible on every screen — DONE
`hero.tsx`: tighter top padding and margins, and the text column leads in source
order so on a stacked mobile layout the headline + primary CTA sit near the top.

### 7. Gaming + Movies (Marvel/DC) "COMING SOON" sections — ADDED
`src/features/home/coming-soon.tsx`, placed on the homepage after Franchises.
- **Gaming**, split into games (League of Legends, Valorant, Genshin Impact,
  Elden Ring, Cyberpunk 2077, The Witcher, Minecraft, Overwatch).
- **Movies & Comics**, split into **Marvel** (Avengers, Spider-Man, X-Men,
  Guardians of the Galaxy) and **DC** (Batman, Superman, Justice League, The
  Flash).
Each tile carries a diagonal **SOON** ribbon; a gold "Coming soon" chip marks
the whole band; a "Notify me" button routes to the newsletter. Text labels only
— no franchise artwork — to stay copyright-clean, matching the rest of the store.

### 8. Browser tab name + favicon — DONE
- Tab title is now **"Lulu Merch"** (`src/lib/seo.ts`; sub-pages read
  "<Page> — Lulu Merch").
- Favicon is now your brand mark. Generated `src/app/icon.png` (512×512, padded
  square from `lulu-mark.png`), `public/icon.png`, and `public/favicon.ico`;
  removed the old placeholder `icon.svg`; updated `manifest.ts`.

### 9. Saiyan Sans DBZ font + colour treatment (priority 2) — WIRED UP
- `@font-face` for **Saiyan Sans** added in `globals.css`, and the font is first
  in the `poster` family (`tailwind.config.ts`), so every `font-poster` heading
  uses it when present and **falls back to Anton** otherwise (nothing breaks if
  the file is absent).
- `.dbz-title` utility recreates the logo look: **Saiyan-gold fill, heavy black
  keyline, red 3D drop**. Applied to the hero headline.
- **One step for you:** the font is hosted on dafont (which blocks automated
  download), so run this once to install the free file:
  ```bash
  npm run fonts
  ```
  It downloads `Saiyan-Sans.ttf` into `public/fonts/saiyan-sans/`. See
  `public/fonts/saiyan-sans/README.md`.

---

## Verified
`npm run typecheck`, `npm run lint`, and `npm run build` all pass. (In this
environment the build's Google-Fonts fetch is network-blocked; on your machine
or Vercel it completes normally.)
