import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { products } from "@/features/catalog/products";
import { siteConfig } from "@/config/site";

/**
 * Community — an invitation, not invented testimonials. The tiles are the
 * studio lookbook (real product photography), and the module's real job is to
 * route people to submit their fits via the tag. No fabricated customers, no
 * fake five-star quotes.
 *
 * UX rationale (Laws of UX):
 *   Law of Similarity — a uniform tile wall reads as one gallery.
 *   Peak-End — a warm, human close before the newsletter's final ask.
 *   Aesthetic-Usability — real product shots over placeholder art.
 */

// Six real pieces spanning the lines, used as the studio lookbook wall.
const tileSlugs = [
  "dragon-ball-classic-tee",
  "naruto-tee",
  "one-piece-tee",
  "demon-slayer-tee",
  "bleach-tee",
  "zoro-sanji-tee",
];

const tiles = tileSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function Community() {
  return (
    <section aria-labelledby="community-heading" className="border-t-2 border-line-strong py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> The crew
            </p>
            <h2 id="community-heading" className="mt-3 font-poster text-d-lg uppercase dbz-outline md:text-d-xl">
              Worn by the fandom
            </h2>
            <p className="mt-3 text-muted">
              Tag <span className="font-semibold text-paper">#LULUMERCH</span> and{" "}
              <span className="font-semibold text-paper">@lulumerch</span> to get your fit featured here.
              This is the studio lookbook — your shots take these spots next.
            </p>
          </div>
          <Link
            href={siteConfig.social.instagram}
            className="inline-flex items-center gap-2 text-sm font-semibold text-paper hover:text-kame"
          >
            <Instagram className="h-4 w-4" aria-hidden /> Follow the drops
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((p) => (
            <li key={p.slug} className="panel group aspect-square overflow-hidden">
              <Link href={`/product/${p.slug}`} className="relative flex h-full items-center justify-center bg-elevated p-4">
                <Image
                  src={p.image}
                  alt={`${p.name} — ${p.line}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-contain p-4 transition-transform duration-500 ease-brand group-hover:scale-105"
                />
                <span className="overlay-chip spec-line absolute bottom-2 left-2 z-10 text-[0.55rem] text-muted">{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
