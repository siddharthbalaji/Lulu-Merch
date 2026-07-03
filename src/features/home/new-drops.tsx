import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { formatPrice } from "@/lib/format";
import { newArrivals } from "@/features/catalog/products";

/**
 * New Drops — a magazine layout: one lead story + a stacked column of the rest.
 *
 * UX rationale (Laws of UX):
 *   Von Restorff — the lead tile is oversized and inked red-cornered, so the
 *                  freshest piece is unmistakably the hero.
 *   Serial Position — the lead opens the section; the newest secondary piece closes it.
 *   Law of Proximity — each entry keeps title, class, and price as one block.
 *   Aesthetic-Usability — asymmetric editorial rhythm, not another equal grid.
 */
export function NewDrops() {
  const items = newArrivals(4);
  const [lead, ...rest] = items;
  if (!lead) return null;

  return (
    <section aria-labelledby="drops-heading" className="border-t-2 border-line-strong bg-elevated py-section">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> Fresh off the press
            </p>
            <h2 id="drops-heading" className="mt-3 font-poster text-d-lg uppercase tracking-tight text-paper md:text-d-xl">
              New drops
            </h2>
          </div>
          <Link href="/shop?sort=new" className="group hidden items-center gap-1.5 text-sm font-semibold text-paper hover:text-kame sm:inline-flex">
            All new
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          {/* lead story */}
          <Link href={`/product/${lead.slug}`} className="panel panel-hover group relative flex min-h-[22rem] flex-col justify-between overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <span className="spec-line rounded-sm border-2 border-line-strong bg-saiyan px-2 py-1 text-saiyan-ink">Latest</span>
              <span className="spec-line text-muted">{lead.line}</span>
            </div>
            <div className="pointer-events-none absolute inset-0 transition-transform duration-500 ease-brand group-hover:scale-105">
              <Image
                src={lead.image}
                alt={`${lead.name} — ${lead.line}`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain p-10"
                priority
              />
            </div>
            <div className="relative">
              <h3 className="font-poster text-3xl uppercase leading-none tracking-tight text-paper">{lead.name}</h3>
              <p className="spec-line mt-2">{lead.className} · {lead.spec}</p>
              <p className="mt-3 font-mono text-lg font-semibold tabular text-paper">{formatPrice(lead.price)}</p>
            </div>
          </Link>

          {/* stacked column */}
          <ul className="flex flex-col gap-4">
            {rest.map((p) => (
              <li key={p.slug} className="flex-1">
                <Link href={`/product/${p.slug}`} className="panel panel-hover group flex h-full items-center gap-4 overflow-hidden p-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded border-2 border-line-strong bg-surface">
                    <Image
                      src={p.image}
                      alt={`${p.name} — ${p.line}`}
                      fill
                      sizes="96px"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-lg font-semibold text-paper">{p.name}</h3>
                    <p className="spec-line mt-1 text-faint">{p.line} · {p.className}</p>
                    <p className="mt-2 font-mono text-sm font-semibold tabular text-paper">{formatPrice(p.price)}</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-kame" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
