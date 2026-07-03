import Link from "next/link";
import { Instagram } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { GarmentFlat } from "./garments";
import { siteConfig } from "@/config/site";

/**
 * Community — an invitation, not invented testimonials. The tiles are the
 * studio lookbook (our own flats), and the module's real job is to route
 * people to submit their fits via the tag. No fabricated customers, no fake
 * five-star quotes (both explicitly barred by the brief).
 *
 * UX rationale (Laws of UX):
 *   Law of Similarity — a uniform tile wall reads as one gallery.
 *   Peak-End — a warm, human close before the newsletter's final ask.
 *   Aesthetic-Usability — restraint over stock cosplay photography.
 */

const tiles: Array<{ kind: "tee" | "hoodie" | "varsity"; tag: string }> = [
  { kind: "hoodie", tag: "Nocturne Hoodie" },
  { kind: "tee", tag: "Kame House Tee" },
  { kind: "varsity", tag: "Respawn Varsity" },
  { kind: "tee", tag: "Guild Tee" },
  { kind: "hoodie", tag: "Sennin Hoodie" },
  { kind: "varsity", tag: "Nocturne Varsity" },
];

export function Community() {
  return (
    <section aria-labelledby="community-heading" className="border-t-2 border-line-strong py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> The crew
            </p>
            <h2 id="community-heading" className="mt-3 font-poster text-d-lg uppercase tracking-tight text-paper md:text-d-xl">
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
          {tiles.map((t, i) => (
            <li key={i} className="panel group aspect-square overflow-hidden">
              <div className="relative flex h-full items-center justify-center bg-elevated p-6">
                <GarmentFlat kind={t.kind} className="h-full w-auto transition-transform duration-500 ease-brand group-hover:scale-105" />
                <span className="spec-line absolute bottom-2 left-2 text-[0.55rem] text-faint">{t.tag}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
