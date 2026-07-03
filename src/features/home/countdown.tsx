"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DragonStar } from "@/components/ui/star";

/**
 * Limited-edition countdown — honest by construction: it counts to the next
 * weekly drop window (Saturday 12:00 local), so it never shows a fake or
 * expired timer.
 *
 * UX rationale (Laws of UX):
 *   Goal Gradient — a real, closing window creates momentum toward the drop.
 *   Doherty Threshold — a 1s tick; digits use tabular figures so nothing jumps.
 *   Von Restorff — the inked black band with a red CTA stands apart from the white page.
 *   Fitts's Law — one large, unambiguous CTA.
 */

function nextDropDate(now: Date): Date {
  const d = new Date(now);
  const day = d.getDay(); // 0 Sun … 6 Sat
  let add = (6 - day + 7) % 7; // days until Saturday
  d.setHours(12, 0, 0, 0);
  if (add === 0 && now.getTime() >= d.getTime()) add = 7;
  d.setDate(d.getDate() + add);
  return d;
}

function useCountdown() {
  const [parts, setParts] = React.useState<{ d: number; h: number; m: number; s: number } | null>(null);
  React.useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, nextDropDate(now).getTime() - now.getTime());
      const s = Math.floor(diff / 1000);
      setParts({ d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return parts;
}

const pad = (n: number) => n.toString().padStart(2, "0");

export function Countdown() {
  const t = useCountdown();

  return (
    <section aria-labelledby="cd-heading" className="py-section">
      <Container>
        <div className="panel overflow-hidden bg-ink">
          <div className="grid items-center gap-8 p-6 md:grid-cols-[1.2fr_1fr] md:p-10">
            <div>
              <p className="spec-line flex items-center gap-2 text-muted">
                <DragonStar className="h-4 w-4" /> Weekly drop
              </p>
              <h2 id="cd-heading" className="mt-3 font-poster text-d-lg uppercase leading-none dbz-outline md:text-d-xl">
                Next drop lands<br />Saturday, noon.
              </h2>
              <p className="mt-4 max-w-md text-muted">
                Numbered, printed in-house, and gone when they&apos;re gone. Set a reminder — restocks aren&apos;t a thing here.
              </p>
              <div className="mt-6">
                <Button asChild size="lg">
                  <Link href="/shop?sort=new">Preview the line</Link>
                </Button>
              </div>
            </div>

            <ul className="grid grid-cols-4 gap-2 md:gap-3" aria-label="Time until next drop">
              {[
                { k: "Days", v: t?.d },
                { k: "Hrs", v: t?.h },
                { k: "Min", v: t?.m },
                { k: "Sec", v: t?.s },
              ].map((cell) => (
                <li key={cell.k} className="rounded-md border-2 border-line-strong bg-surface p-3 text-center">
                  <span className="block font-mono text-3xl font-bold tabular text-paper md:text-4xl">
                    {cell.v == null ? "--" : pad(cell.v)}
                  </span>
                  <span className="spec-line mt-1 block text-faint">{cell.k}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
