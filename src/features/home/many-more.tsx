import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { cn } from "@/lib/utils";

/**
 * "More than merch" — a coming-soon band for the lifestyle line beyond apparel:
 * figures, audio, desk gear and drinkware.
 *
 * Layout: a true BENTO — one fixed rectangle carved into cells of different
 * sizes, every cell FILLED by its render (object-cover), so the whole block
 * reads as a single solid mosaic with no ragged edges or letterboxing. The two
 * tall products (figurine, tumbler) take the portrait side columns; the wider
 * pair (keyboard, headphones) stack in the middle. On mobile it folds down to a
 * 2-column rectangle: the two tall shots up top, the two wide ones beneath.
 *
 * The Cloudinary `e_trim` transform strips any empty margin baked into each PNG
 * so the product meets the cell edges instead of floating inside transparent
 * padding. If a shot ever looks over-cropped, remove `e_trim/` from its URL.
 *
 * Copyright note: these are our own product renders / plain category labels —
 * consistent with the rest of the store, no third-party artwork.
 *
 * UX rationale (Laws of UX):
 *   Law of Pragnanz — the filled rectangle reads as one clean, ordered shape.
 *   Law of Similarity — the shared inked-panel language ties it to the live grid.
 *   Aesthetic-Usability — a balanced mosaic reads as intentional, not broken.
 *   Goal Gradient — a single "Notify me" exit routes interest to the drop alert.
 */

/** A single bento tile: label, kicker, product render, and its grid footprint. */
interface BentoItem {
  label: string;
  kicker: string;
  image: string;
  /** Responsive grid placement: 2-col rectangle on mobile, 4-col on desktop. */
  area: string;
}

/** Trim baked-in margins so the product fills its cell edge-to-edge. */
const trim = (publicPath: string) =>
  `https://res.cloudinary.com/dxqucwyyo/image/upload/e_trim/${publicPath}`;

const items: BentoItem[] = [
  {
    label: "Figurine",
    kicker: "Collectible",
    image: trim("v1783505114/Figurine_ttwefy.png"),
    // Tall portrait — left column, full height, both breakpoints.
    area: "col-start-1 row-start-1 row-span-2",
  },
  {
    label: "Keyboard",
    kicker: "Desk setup",
    image: trim("v1783524324/Keyboard_fewom2.png"),
    // Wide — full width row on mobile; top-middle strip on desktop.
    area: "col-start-1 col-span-2 row-start-3 lg:col-start-2 lg:row-start-1",
  },
  {
    label: "Headphones",
    kicker: "Audio",
    image: trim("v1783523018/Headphones_djbblb.png"),
    // Wide — full width row on mobile; bottom-middle strip on desktop.
    area: "col-start-1 col-span-2 row-start-4 lg:col-start-2 lg:row-start-2",
  },
  {
    label: "Tumbler",
    kicker: "Drinkware",
    image: trim("v1783505114/Tumbler_gpte63.png"),
    // Tall portrait — right column, full height, both breakpoints.
    area: "col-start-2 row-start-1 row-span-2 lg:col-start-4",
  },
];

export function ManyMore() {
  return (
    <section
      aria-labelledby="many-more-heading"
      className="border-t-2 border-line-strong py-section"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> New universe
            </p>
            <h2
              id="many-more-heading"
              className="mt-3 flex items-center gap-3 font-poster text-d-lg uppercase dbz-outline md:text-d-xl"
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-line-strong bg-saiyan text-saiyan-ink md:h-11 md:w-11"
                aria-hidden
              >
                <Sparkles className="h-5 w-5" />
              </span>
              More than merch
            </h2>
            <p className="mt-3 text-muted">
              The line goes beyond the wardrobe. Collectible figures, audio, desk
              gear and drinkware — cut from the same universe, landing soon.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 self-start rounded-full border-2 border-line-strong bg-saiyan px-3 py-1.5 text-saiyan-ink shadow-hard">
            <DragonStar className="h-4 w-4" />
            <span className="font-mono text-label uppercase">Coming soon</span>
          </span>
        </div>

        {/*
          Bento grid. Mobile: 2 columns × 4 rows (two tall shots up top, two
          wide ones beneath). Desktop: 4 columns × 2 rows (tall figurine and
          tumbler bookend a stacked keyboard/headphones middle). Fixed row
          heights + object-cover make every cell fill, so the block is one
          seamless rectangle.
        */}
        <ul className="mt-6 grid auto-rows-[8.5rem] grid-cols-2 gap-3 sm:auto-rows-[10.5rem] sm:gap-4 lg:mt-8 lg:grid-cols-4 lg:auto-rows-[13.5rem]">
          {items.map((item) => (
            <li key={item.label} className={item.area}>
              <div className="panel panel-hover group relative h-full overflow-hidden">
                {/* product render — fills the cell edge-to-edge */}
                <Image
                  src={item.image}
                  alt={`${item.label} — coming soon`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
                />

                {/* legibility scrim — grounds the label without bleaching the render */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"
                />

                {/* diagonal COMING SOON ribbon */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 top-3 z-20 rotate-45 bg-line-strong px-10 py-0.5 text-center font-mono text-[0.5rem] uppercase tracking-widest text-ink"
                >
                  Soon
                </span>

                {/* label block, pinned to the bottom edge of the cell */}
                <div className={cn("absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 p-4")}>
                  <span className="spec-line text-paper [text-shadow:0_1px_3px_rgb(0_0_0/0.7)]">
                    {item.kicker}
                  </span>
                  <span className="font-poster text-xl uppercase leading-none dbz-outline">
                    {item.label}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/#nl-heading"
            className="group inline-flex items-center gap-1.5 rounded border-2 border-line-strong bg-ink px-4 py-2.5 text-sm font-semibold text-paper shadow-hard transition-transform duration-150 ease-brand hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-lg"
          >
            Notify me when it drops
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <span className="spec-line text-faint">
            Vote for a line by tagging @lulumerch
          </span>
        </div>
      </Container>
    </section>
  );
}
