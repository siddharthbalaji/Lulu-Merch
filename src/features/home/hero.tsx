"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { featuredDrop } from "./collection";
import { GarmentFlat } from "./garments";

/**
 * Homepage hero — statement + the featured drop as an annotated cut-sheet.
 *
 * UX rationale (Laws of UX):
 *   Peak-End           — this is the first impression; the peak gets the craft.
 *   Aesthetic-Usability — a precise, minimal frame reads as trustworthy.
 *   Von Restorff        — one iris mark (headline underline, primary CTA) pulls the eye.
 *   Serial Position     — primary CTA first, secondary second; key facts open & close the manifest.
 *   Hick's Law          — exactly two calls to action, no more.
 *   Fitts's Law         — large CTAs; the whole plate is one big tap target to the drop.
 *   Law of Proximity    — manifest facts and status facts are grouped, tick-separated.
 *   Doherty Threshold   — the load reveal is <400ms and never blocks interaction.
 * The category routes resolve to the designed 404 until their branches ship —
 * the established foundation pattern.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Hero() {
  const drop = featuredDrop;
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Subtle plate parallax; neutralized under reduced-motion.
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const plateY = reduce ? 0 : rawY;

  return (
    <section ref={sectionRef} aria-labelledby="hero-heading">
      <Container className="py-14 md:py-20 lg:py-24">
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
          variants={stagger}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          {/* Statement */}
          <div>
            <motion.p variants={rise} className="spec-line flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-paper">
                {drop.vol} · {drop.name}
              </span>
              <span className="tick" />
              <span>Drop {drop.dropNo}</span>
              <span className="tick" />
              <span>{drop.editionSize} numbered sets</span>
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={rise}
              className="mt-6 max-w-[15ch] font-display text-d-xl font-bold text-paper md:text-d-2xl"
            >
              Wear what you{" "}
              <span className="relative whitespace-nowrap">
                main
                <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-iris" />
              </span>
              .
            </motion.h1>

            <motion.p variants={rise} className="mt-6 max-w-prose text-lg text-muted">
              {drop.blurb}
            </motion.p>

            <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/drops">
                  Shop the collection
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/apparel">See the full range</Link>
              </Button>
            </motion.div>

            {/* Honest status — grouped facts, not a fake countdown. */}
            <motion.p variants={rise} className="spec-line mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-2 text-paper">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                In stock
              </span>
              <span className="tick" />
              <span>Ships in 48h</span>
              <span className="tick" />
              <span className="tabular">
                {drop.claimed}/{drop.editionSize} claimed
              </span>
            </motion.p>
          </div>

          {/* Featured-collection plate (cut-sheet). */}
          <motion.div variants={rise} style={reduce ? undefined : { y: plateY }}>
            <HeroPlate />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * The signature element: the drop's hero garment presented as a tech-pack
 * cut-sheet — corner registration ticks, spec callouts on thin leaders, a
 * NEW DROP marker, and a baseline spec bar. The whole panel links to the drop.
 */
function HeroPlate() {
  const drop = featuredDrop;
  const hero = drop.pieces.find((p) => p.kind === drop.hero) ?? drop.pieces[0]!;

  return (
    <Link
      href="/drops"
      aria-label={`Shop ${drop.name} ${drop.vol}`}
      className="group block rounded-lg border border-line bg-surface/60 p-5 shadow-panel transition-colors duration-300 ease-brand hover:border-line-strong md:p-6"
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="spec-line">Featured collection</span>
        <span className="spec-line rounded-sm bg-iris px-2 py-1 text-[0.6rem] leading-none text-iris-contrast">
          New drop
        </span>
      </div>

      {/* cut-sheet stage */}
      <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden rounded border border-line bg-ink/40">
        {/* registration ticks */}
        <Corner className="left-2 top-2 border-l border-t" />
        <Corner className="right-2 top-2 border-r border-t" />
        <Corner className="bottom-2 left-2 border-b border-l" />
        <Corner className="bottom-2 right-2 border-b border-r" />

        {/* garment */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <GarmentFlat
            kind={drop.hero}
            title={`${hero.name}, ${hero.spec}`}
            className="h-full w-auto transition-transform duration-500 ease-brand group-hover:scale-[1.03]"
          />
        </div>

        {/* spec callouts */}
        <div className="absolute right-3 top-1/3 flex items-center gap-2">
          <span className="spec-line text-[0.6rem] text-faint">{hero.spec.split(" ").slice(0, 2).join(" ")}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden />
        </div>
        <div className="absolute bottom-1/3 left-3 flex items-center gap-2">
          <span className="h-px w-6 bg-line-strong" aria-hidden />
          <span className="spec-line tabular text-[0.6rem] text-faint">
            {drop.dropNo}/{drop.editionSize}
          </span>
        </div>
      </div>

      {/* baseline spec bar */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="font-display text-d-sm font-semibold leading-none text-paper">
            {drop.name} <span className="text-muted">{drop.vol}</span>
          </p>
          <p className="spec-line mt-2">{hero.name} · {hero.className}</p>
        </div>
        <span className="spec-line inline-flex items-center gap-1.5 text-paper transition-transform duration-300 ease-brand group-hover:translate-x-0.5">
          Shop
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-4 w-4 border-line-strong ${className ?? ""}`}
    />
  );
}
