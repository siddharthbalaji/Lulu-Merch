import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";

/**
 * "More than merch" — a coming-soon band for the lifestyle line beyond apparel:
 * figures, audio, desk gear and drinkware.
 *
 * The four product renders come at different aspect ratios (a tall figurine, a
 * wide keyboard, near-square headphones, a tall tumbler). Rather than force them
 * into equal-height cells — which letterboxes each shot with dead space — the
 * tiles flow in a MASONRY bento: every card sizes itself to its own image, so
 * the artwork sits edge-to-edge with no empty margins. The columns balance the
 * differing heights into a tight, deliberate mosaic.
 *
 * Copyright note: these are our own product renders / plain category labels —
 * consistent with the rest of the store, no third-party artwork.
 *
 * UX rationale (Laws of UX):
 *   Law of Pragnanz  — cards that hug their image read as one clean shape each.
 *   Law of Similarity — the shared inked-panel language ties it to the live grid.
 *   Aesthetic-Usability — the balanced mosaic reads as intentional, not broken.
 *   Goal Gradient — a single "Notify me" exit routes interest to the drop alert.
 */

/** A single bento tile: its display label, a small kicker, and the product render. */
interface BentoItem {
  label: string;
  kicker: string;
  image: string;
}

/* Ordered tallest-first so the masonry balances the columns cleanly. */
const items: BentoItem[] = [
  {
    label: "Figurine",
    kicker: "Collectible",
    image:
      "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783505114/Figurine_ttwefy.png",
  },
  {
    label: "Keyboard",
    kicker: "Desk setup",
    image:
      "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783505116/Keyboard_fewom2.png",
  },
  {
    label: "Headphones",
    kicker: "Audio",
    image:
      "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783505115/Headphones_djbblb.png",
  },
  {
    label: "Tumbler",
    kicker: "Drinkware",
    image:
      "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783505114/Tumbler_gpte63.png",
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
          Masonry bento: 2 columns on mobile, 3 on desktop. Each tile is a
          `break-inside-avoid` block whose height follows its own image, so the
          render fills the card edge-to-edge with no letterboxing.
        */}
        <ul className="mt-8 columns-2 gap-3 [column-fill:_balance] sm:gap-4 lg:columns-3">
          {items.map((item) => (
            <li key={item.label} className="mb-3 break-inside-avoid sm:mb-4">
              <div
                className="panel panel-hover group relative overflow-hidden"
                aria-label={`${item.label} — coming soon`}
              >
                {/* product render — sized to its natural aspect ratio so the
                    card wraps it tightly (width 0 / height 0 + w-full h-auto is
                    the Next.js pattern for images of unknown intrinsic size) */}
                <Image
                  src={item.image}
                  alt={`${item.label} — coming soon`}
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 30vw"
                  className="h-auto w-full transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
                />

                {/* legibility scrim — grounds the label without bleaching the render */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent"
                />

                {/* diagonal COMING SOON ribbon */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 top-3 z-20 rotate-45 bg-line-strong px-10 py-0.5 text-center font-mono text-[0.5rem] uppercase tracking-widest text-ink"
                >
                  Soon
                </span>

                {/* label block, pinned to the bottom edge of the card */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 p-4">
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
