import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { cn } from "@/lib/utils";

/**
 * "More than merch" — a coming-soon band for the lifestyle line beyond apparel:
 * figures, audio, desk gear and drinkware. The four product renders come in
 * different aspect ratios (a tall figurine, a wide keyboard, near-square
 * headphones and a tall tumbler), so instead of forcing them into an even grid
 * they sit in an asymmetric BENTO layout — each shape gets a cell that suits it.
 *
 * Copyright note: these are our own product renders / plain category labels —
 * consistent with the rest of the store, no third-party artwork.
 *
 * UX rationale (Laws of UX):
 *   Von Restorff  — the oversized figurine hero anchors the eye first.
 *   Law of Similarity — the shared inked-panel language ties it to the live grid.
 *   Aesthetic-Usability — the bento's varied rhythm reads as intentional, not broken.
 *   Goal Gradient — a single "Notify me" exit routes interest to the drop alert.
 */

/** A single bento tile: label, a small kicker, artwork, and its grid footprint. */
interface BentoItem {
  label: string;
  kicker: string;
  image: string;
  /** Grid placement. cols map to a 2-col grid on mobile, a 4-col grid on md+. */
  span: string;
}

const items: BentoItem[] = [
  {
    label: "Figurine",
    kicker: "Collectible",
    image:
      "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783505114/Figurine_ttwefy.png",
    // Tall hero — full width on mobile, a 2×2 block on desktop.
    span: "col-span-2 row-span-2",
  },
  {
    label: "Headphones",
    kicker: "Audio",
    image:
      "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783505115/Headphones_djbblb.png",
    span: "col-span-1 row-span-1",
  },
  {
    label: "Tumbler",
    kicker: "Drinkware",
    image:
      "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783505114/Tumbler_gpte63.png",
    span: "col-span-1 row-span-1",
  },
  {
    label: "Keyboard",
    kicker: "Desk setup",
    image:
      "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783505116/Keyboard_fewom2.png",
    // Wide — full width on mobile, a 2-wide strip on desktop.
    span: "col-span-2 row-span-1",
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

        {/* Bento grid: 2 cols on mobile, 4 on desktop. Fixed row heights let
            the figurine hero span two rows while the rest tile around it. */}
        <ul className="mt-8 grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:auto-rows-[13rem] md:grid-cols-4 md:gap-4">
          {items.map((item) => (
            <li key={item.label} className={item.span}>
              <div
                className={cn(
                  "panel panel-hover group relative flex h-full flex-col justify-between overflow-hidden p-4"
                )}
                aria-label={`${item.label} — coming soon`}
              >
                {/* product render — contained (not cropped) so no shape is cut off */}
                <Image
                  src={item.image}
                  alt={`${item.label} — coming soon`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-6 transition-transform duration-500 ease-brand group-hover:scale-105"
                />

                {/* legibility scrim — grounds the label without bleaching the render */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent"
                />

                {/* diagonal COMING SOON ribbon */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 top-3 z-20 rotate-45 bg-line-strong px-10 py-0.5 text-center font-mono text-[0.5rem] uppercase tracking-widest text-ink"
                >
                  Soon
                </span>

                <span className="spec-line relative z-10 text-paper [text-shadow:0_1px_3px_rgb(0_0_0/0.7)]">
                  {item.kicker}
                </span>

                <span className="relative z-10 font-poster text-xl uppercase leading-none dbz-outline">
                  {item.label}
                </span>
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
