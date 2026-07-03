import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";

/**
 * Franchises — presented strictly as *category labels*, never franchise
 * artwork (per the brief's copyright ban). Each chip routes into a filtered
 * catalogue view once its line is stocked.
 *
 * UX rationale (Laws of UX):
 *   Law of Proximity/Similarity — a single chip field reads as one taxonomy.
 *   Aesthetic-Usability — restraint (type + one star glyph) over borrowed art.
 *   Fitts's Law — generously padded chips, easy to hit on mobile.
 *   Von Restorff — "Dragon Ball" carries the star, marking the house favourite.
 */

const franchises = [
  "Dragon Ball",
  "Naruto",
  "One Piece",
  "Demon Slayer",
  "Bleach",
  "Death Note",
  "Berserk",
  "Black Clover",
  "One Punch Man",
];

export function Franchises() {
  return (
    <section aria-labelledby="fr-heading" className="border-t-2 border-line-strong bg-elevated py-section">
      <Container>
        <div className="max-w-2xl">
          <p className="spec-line flex items-center gap-2">
            <DragonStar className="h-4 w-4" /> Universes
          </p>
          <h2 id="fr-heading" className="mt-3 font-poster text-d-lg uppercase dbz-outline md:text-d-xl">
            Shop your fandom
          </h2>
          <p className="mt-3 text-muted">
            The worlds we build capsules around. Nine lines in rotation right now — tap one to see
            everything currently in stock.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-3">
          {franchises.map((name) => {
            const flagship = name === "Dragon Ball";
            return (
              <li key={name}>
                <Link
                  href={`/shop?line=${encodeURIComponent(name)}`}
                  className={
                    "group inline-flex items-center gap-2 rounded-full border-2 border-line-strong bg-surface px-4 py-2 text-sm font-semibold text-paper shadow-hard transition-transform duration-150 ease-brand hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-lg" +
                    (flagship ? " bg-saiyan text-saiyan-ink" : "")
                  }
                >
                  {flagship && <DragonStar className="h-4 w-4" />}
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
