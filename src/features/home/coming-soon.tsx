import Link from "next/link";
import { ArrowRight, Gamepad2, Clapperboard } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { cn } from "@/lib/utils";

/**
 * "Coming soon" merchandising bands for the two lines we haven't stocked yet:
 * Gaming and Movies (Marvel / DC). Each is divided into the categories we'll
 * launch with, presented as labelled tiles with an unmistakable COMING SOON
 * ribbon so nothing reads as purchasable.
 *
 * Copyright note: these are *category labels* only — plain navigation text,
 * never franchise artwork — consistent with the rest of the store.
 *
 * UX rationale (Laws of UX):
 *   Jakob's Law   — the same inked tile language as the live categories.
 *   Von Restorff  — the gold "Coming soon" chip marks the whole band as upcoming.
 *   Goal Gradient — a single "Notify me" exit routes interest to the drop alert.
 *   Law of Similarity — grouped grids read as one taxonomy per universe.
 */

interface Group {
  /** Optional sub-label that splits a section into clusters (e.g. Marvel / DC). */
  cluster?: string;
  items: string[];
}

function ComingSoonBand({
  id,
  eyebrow,
  title,
  blurb,
  icon,
  groups,
  tone,
}: {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  icon: React.ReactNode;
  groups: Group[];
  tone: "gaming" | "movies";
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="border-t-2 border-line-strong py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> {eyebrow}
            </p>
            <h2
              id={`${id}-heading`}
              className="mt-3 flex items-center gap-3 font-poster text-d-lg uppercase dbz-outline md:text-d-xl"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-line-strong md:h-11 md:w-11",
                  tone === "gaming" ? "bg-saiyan text-saiyan-ink" : "bg-kame text-on-brand"
                )}
                aria-hidden
              >
                {icon}
              </span>
              {title}
            </h2>
            <p className="mt-3 text-muted">{blurb}</p>
          </div>

          <span className="inline-flex items-center gap-2 self-start rounded-full border-2 border-line-strong bg-saiyan px-3 py-1.5 text-saiyan-ink shadow-hard">
            <DragonStar className="h-4 w-4" />
            <span className="font-mono text-label uppercase">Coming soon</span>
          </span>
        </div>

        <div className="mt-8 space-y-8">
          {groups.map((group, gi) => (
            <div key={group.cluster ?? gi}>
              {group.cluster && (
                <h3 className="spec-line mb-3 flex items-center gap-2 text-paper">
                  <span className="h-1.5 w-1.5 rounded-full bg-kame" aria-hidden />
                  {group.cluster}
                </h3>
              )}
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((label) => (
                  <li key={label}>
                    <div
                      className="panel group relative flex aspect-[16/9] flex-col justify-between overflow-hidden p-4 sm:aspect-[3/2]"
                      aria-label={`${label} — coming soon`}
                    >
                      {/* diagonal COMING SOON ribbon */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-10 top-3 rotate-45 bg-line-strong px-10 py-0.5 text-center font-mono text-[0.5rem] uppercase tracking-widest text-ink"
                      >
                        Soon
                      </span>

                      <span className="spec-line text-faint">
                        {tone === "gaming" ? "Game" : "Title"}
                      </span>

                      <span className="font-poster text-xl uppercase leading-none dbz-outline">
                        {label}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/#nl-heading"
            className="group inline-flex items-center gap-1.5 rounded border-2 border-line-strong bg-ink px-4 py-2.5 text-sm font-semibold text-paper shadow-hard transition-transform duration-150 ease-brand hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-lg"
          >
            Notify me when it drops
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <span className="spec-line text-faint">Vote for a line by tagging @lulumerch</span>
        </div>
      </Container>
    </section>
  );
}

export function Gaming() {
  return (
    <ComingSoonBand
      id="gaming"
      tone="gaming"
      eyebrow="New universe"
      title="Gaming"
      blurb="The gaming line is in production. Heavyweight tees and hoodies for the titles you actually grind — split by game so you can jump straight to your main."
      icon={<Gamepad2 className="h-5 w-5" aria-hidden />}
      groups={[
        {
          items: [
            "League of Legends",
            "Valorant",
            "Genshin Impact",
            "Elden Ring",
            "Cyberpunk 2077",
            "The Witcher",
            "Minecraft",
            "Overwatch",
          ],
        },
      ]}
    />
  );
}

export function Movies() {
  return (
    <ComingSoonBand
      id="movies"
      tone="movies"
      eyebrow="New universe"
      title="Movies & Comics"
      blurb="Superhero capsules are on the way — divided across the two houses so you can rep your side. Marvel and DC, cut in the same in-house heavyweight cotton."
      icon={<Clapperboard className="h-5 w-5" aria-hidden />}
      groups={[
        {
          cluster: "Marvel",
          items: ["Avengers", "Spider-Man", "X-Men", "Guardians of the Galaxy"],
        },
        {
          cluster: "DC",
          items: ["Batman", "Superman", "Justice League", "The Flash"],
        },
      ]}
    />
  );
}
