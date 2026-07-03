import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { GarmentFlat } from "./garments";
import { cn } from "@/lib/utils";

/**
 * Featured categories — the five doors into the catalogue.
 *
 * UX rationale (Laws of UX):
 *   Hick's Law    — exactly five choices; the store's whole surface area, not a wall.
 *   Miller's Law  — five sits inside the 7±2 comfortable chunk.
 *   Von Restorff  — "Limited Drops" is the one red-filled tile, so it draws the eye.
 *   Law of Similarity — uniform inked tiles read instantly as one navigation set.
 *   Fitts's Law   — each entire tile is the tap target.
 */

interface Cat {
  label: string;
  href: string;
  kicker: string;
  flat?: "tee" | "hoodie" | "varsity";
  accent?: boolean;
}

const cats: Cat[] = [
  { label: "Dragon Ball", href: "/shop?line=Dragon+Ball", kicker: "The flagship line", flat: "tee" },
  { label: "Naruto", href: "/shop?line=Naruto", kicker: "Leaf Village drops", flat: "tee" },
  { label: "One Piece", href: "/shop?line=One+Piece", kicker: "Straw Hat crew", flat: "hoodie" },
  { label: "Demon Slayer", href: "/shop?line=Demon+Slayer", kicker: "Hashira heat", flat: "varsity" },
  { label: "Limited Drops", href: "/shop?limited=1", kicker: "Numbered. No restock.", accent: true },
];

export function Categories() {
  return (
    <section aria-labelledby="cat-heading" className="py-section">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> Shop by universe
            </p>
            <h2 id="cat-heading" className="mt-3 font-poster text-d-lg uppercase tracking-tight text-paper md:text-d-xl">
              Pick your lane
            </h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {cats.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className={cn(
                "panel panel-hover group relative flex aspect-[4/5] flex-col justify-between overflow-hidden p-4",
                cat.accent && "bg-kame"
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "spec-line",
                    cat.accent ? "text-on-brand/80" : "text-muted"
                  )}
                >
                  {cat.kicker}
                </span>
                <ArrowUpRight
                  className={cn(
                    "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    cat.accent ? "text-on-brand" : "text-paper"
                  )}
                  aria-hidden
                />
              </div>

              {cat.flat ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-8 flex h-1/2 items-center justify-center opacity-70 transition-transform duration-500 ease-brand group-hover:scale-105">
                  <GarmentFlat kind={cat.flat} className="h-full w-auto" />
                </div>
              ) : (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
                  <DragonStar className="h-16 w-16" />
                </div>
              )}

              <h3
                className={cn(
                  "relative font-poster text-2xl uppercase leading-none tracking-tight",
                  cat.accent ? "text-on-brand" : "text-paper"
                )}
              >
                {cat.label}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
