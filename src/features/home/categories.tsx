import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { products } from "@/features/catalog/products";
import { cn } from "@/lib/utils";

/**
 * Featured categories — the doors into the catalogue, each fronted by a real
 * studio photo of a piece from that line (no SVG mockups).
 *
 * UX rationale (Laws of UX):
 *   Hick's Law    — a short, scannable set; the store's surface, not a wall.
 *   Von Restorff  — "Limited Drops" is the one red-filled tile, so it draws the eye.
 *   Law of Similarity — uniform inked tiles read instantly as one navigation set.
 *   Fitts's Law   — each entire tile is the tap target.
 */

interface Cat {
  label: string;
  href: string;
  kicker: string;
  /** Slug of a product whose photo fronts the tile. */
  cover: string;
  accent?: boolean;
}

const cats: Cat[] = [
  { label: "Dragon Ball", href: "/shop?line=Dragon+Ball", kicker: "The flagship line", cover: "dragon-ball-classic-tee" },
  { label: "Naruto", href: "/shop?line=Naruto", kicker: "Leaf Village drops", cover: "naruto-tee" },
  { label: "One Piece", href: "/shop?line=One+Piece", kicker: "Straw Hat crew", cover: "one-piece-tee" },
  { label: "Demon Slayer", href: "/shop?line=Demon+Slayer", kicker: "Hashira heat", cover: "demon-slayer-tee" },
  { label: "Limited Drops", href: "/shop?limited=1", kicker: "Numbered. No restock.", cover: "zoro-sanji-tee", accent: true },
];

const coverOf = (slug: string) =>
  products.find((p) => p.slug === slug)?.image ?? products[0]!.image;

export function Categories() {
  return (
    <section aria-labelledby="cat-heading" className="py-section">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> Shop by universe
            </p>
            <h2 id="cat-heading" className="mt-3 font-poster text-d-lg uppercase dbz-outline md:text-d-xl">
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
              <div className="relative z-10 flex items-start justify-between">
                <span className={cn("spec-line", cat.accent ? "text-on-brand/85" : "text-muted")}>
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

              {/* Real product photo */}
              <div className="pointer-events-none absolute inset-x-0 bottom-6 top-8 flex items-center justify-center">
                <div className="relative h-full w-full">
                  <Image
                    src={coverOf(cat.cover)}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 768px) 45vw, 20vw"
                    className={cn(
                      "object-contain transition-transform duration-500 ease-brand group-hover:scale-105",
                      cat.accent && "opacity-95"
                    )}
                  />
                </div>
              </div>

              <h3
                className={cn(
                  "relative z-10 font-poster text-2xl uppercase leading-none tracking-tight",
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
