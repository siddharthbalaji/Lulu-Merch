import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

/**
 * Foundation landing.
 *
 * The full merchandising homepage (hero, categories, trending, drops,
 * franchises, countdown, community, newsletter) lands in later feature
 * branches. This page is the real launch state: a composed above-the-fold
 * that establishes brand voice and exercises every design-system token —
 * type scale, color, the mono spec-line signature, buttons, focus, motion.
 *
 * UX notes:
 *   Aesthetic-Usability — precision over volume; a minimal frame done tightly.
 *   Von Restorff        — one iris accent line draws the eye to the headline.
 *   Serial Position     — the primary CTA sits first; the range link second.
 *   Doherty Threshold   — reveal animations are ~120–360ms; nothing blocks.
 */

const productClasses = [
  "Oversized tees",
  "Hoodies & sweats",
  "Varsity jackets",
  "Caps & headwear",
  "Posters & prints",
  "Figures & collectibles",
];

// Staggered CSS reveal keeps this a server component; globals.css disables
// it under prefers-reduced-motion.
function reveal(step: number): React.CSSProperties {
  return { animationDelay: `${step * 90}ms` };
}

export default function HomePage() {
  return (
    <Container className="py-16 md:py-24 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        {/* Statement */}
        <div>
          <p className="spec-line animate-fade-up" style={reveal(0)}>
            Lulu Merch Co. <span className="tick mx-2" /> Gaming &amp; anime
          </p>

          <h1
            className="animate-fade-up mt-6 max-w-[15ch] font-display text-d-xl font-bold text-paper md:text-d-2xl"
            style={reveal(1)}
          >
            Wear what you{" "}
            <span className="relative whitespace-nowrap">
              main
              <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-iris" />
            </span>
            .
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-prose text-lg text-muted"
            style={reveal(2)}
          >
            Heavyweight cotton, faithful prints, and drops that don&apos;t
            restock. Built for the players and watchers who take the fit as
            seriously as the fight.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap items-center gap-3"
            style={reveal(3)}
          >
            <Button asChild size="lg">
              <Link href="/drops">
                Browse new drops
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/apparel">See the full range</Link>
            </Button>
          </div>
        </div>

        {/* Spec panel — the signature element, carrying real product data. */}
        <aside
          className="animate-fade-up rounded-lg border border-line bg-surface/60 p-6 shadow-panel md:p-8"
          style={reveal(2)}
          aria-label="Product range"
        >
          <div className="flex items-center justify-between">
            <span className="spec-line">Product classes</span>
            <span className="spec-line text-faint">06</span>
          </div>
          <ul className="mt-5 flex flex-col divide-y divide-line">
            {productClasses.map((item, i) => (
              <li
                key={item}
                className="flex items-center justify-between py-3.5"
              >
                <span className="text-sm text-paper">{item}</span>
                <span className="spec-line tabular text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-caption text-faint">
            Full catalogue, filters, and drop timers roll out as the store
            comes online.
          </p>
        </aside>
      </div>
    </Container>
  );
}
