import Image from "next/image";
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

/** A single upcoming tile: its display label and the franchise artwork behind it. */
interface Item {
  label: string;
  image: string;
}

interface Group {
  /** Optional sub-label that splits a section into clusters (e.g. Marvel / DC). */
  cluster?: string;
  items: Item[];
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
                {group.items.map((item) => (
                  <li key={item.label}>
                    <div
                      className="panel group relative flex aspect-[16/9] flex-col justify-between overflow-hidden p-4 sm:aspect-[3/2]"
                      aria-label={`${item.label} — coming soon`}
                    >
                      {/* franchise artwork sits behind everything */}
                      <Image
                        src={item.image}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
                      />
                      {/* legibility scrim — grounds the label at the bottom, then
                          fades out by the midpoint so the top half of the artwork
                          keeps its full, un-bleached vibrance */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent"
                      />

                      {/* diagonal COMING SOON ribbon */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-10 top-3 z-20 rotate-45 bg-line-strong px-10 py-0.5 text-center font-mono text-[0.5rem] uppercase tracking-widest text-ink"
                      >
                        Soon
                      </span>

                      <span className="spec-line relative z-10 text-paper [text-shadow:0_1px_3px_rgb(0_0_0/0.7)]">
                        {tone === "gaming" ? "Game" : "Title"}
                      </span>

                      <span className="relative z-10 font-poster text-xl uppercase leading-none dbz-outline">
                        {item.label}
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
            { label: "League of Legends", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490817/League_of_Legends_jzedtc.jpg" },
            { label: "Valorant", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490812/Valorant_f6afbz.jpg" },
            { label: "Genshin Impact", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490816/Genshin_Impact_xodsxi.png" },
            { label: "Elden Ring", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490809/Elden_Ring_pqqtzi.jpg" },
            { label: "Cyberpunk 2077", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490817/Cyberpunk_2077_dnw9ep.jpg" },
            { label: "The Witcher", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490813/Witcher_wzaeei.jpg" },
            { label: "Minecraft", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490810/Minecraft_b1ywzl.jpg" },
            { label: "Overwatch", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490810/Overwatch_krimdu.jpg" },
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
          items: [
            { label: "Avengers", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490810/Avengers_a37chc.jpg" },
            { label: "Spider-Man", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490811/Spider-Man_iqnach.jpg" },
            { label: "X-Men", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490812/X-Men_lwf8zz.jpg" },
            { label: "Guardians of the Galaxy", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490819/Guardians_of_the_Galaxy_ygp83y.jpg" },
          ],
        },
        {
          cluster: "DC",
          items: [
            { label: "Batman", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490809/Batman_gs4ryi.jpg" },
            { label: "Superman", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783491353/Superman_h8mkpe.jpg" },
            { label: "Justice League", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490811/Justice_League_iaue19.jpg" },
            { label: "The Flash", image: "https://res.cloudinary.com/dxqucwyyo/image/upload/v1783490813/Flash_m2qt5o.jpg" },
          ],
        },
      ]}
    />
  );
}
