"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DragonStar } from "@/components/ui/star";
import { featuredDrop } from "./collection";
import { GarmentFlat } from "./garments";

/**
 * Homepage hero — statement + the featured drop as an inked cut-sheet panel.
 *
 * UX rationale (Laws of UX):
 *   Peak-End           — the first impression gets the craft.
 *   Aesthetic-Usability — a precise white frame with heavy inking reads as premium.
 *   Von Restorff        — one gold highlight + one red CTA pull the eye; nothing else shouts.
 *   Serial Position     — primary CTA first, secondary second; key facts open and close.
 *   Hick's Law          — exactly two calls to action.
 *   Fitts's Law         — large CTAs; the whole plate is one tap target to the drop.
 *   Doherty Threshold   — the load reveal is <400ms and never blocks interaction.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } } };
const rise: Variants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

export function Hero() {
  const drop = featuredDrop;
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const plateY = reduce ? 0 : rawY;

  return (
    <section ref={sectionRef} aria-labelledby="hero-heading" className="border-b-2 border-line-strong">
      <Container className="py-12 md:py-16 lg:py-20">
        <motion.div
          className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
          variants={stagger}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <div>
            <motion.p variants={rise} className="spec-line flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1.5 text-paper">
                <DragonStar className="h-4 w-4" /> {drop.vol} · {drop.name}
              </span>
              <span className="tick" />
              <span>Drop {drop.dropNo}</span>
              <span className="tick" />
              <span>{drop.editionSize} numbered sets</span>
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={rise}
              className="mt-5 font-poster text-[clamp(2.75rem,9vw,5.5rem)] uppercase leading-[0.92] tracking-tight text-paper"
            >
              Wear what<br />you <span className="mark-gold">main</span>.
            </motion.h1>

            <motion.p variants={rise} className="mt-6 max-w-prose text-lg text-muted">
              {drop.blurb}
            </motion.p>

            <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/shop">
                  Shop the collection
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/shop?category=apparel">See the full range</Link>
              </Button>
            </motion.div>

            <motion.p variants={rise} className="spec-line mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-2 text-paper">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden /> In stock
              </span>
              <span className="tick" />
              <span>Ships in 48h</span>
              <span className="tick" />
              <span className="tabular">{drop.claimed}/{drop.editionSize} claimed</span>
            </motion.p>
          </div>

          <motion.div variants={rise} style={reduce ? undefined : { y: plateY }}>
            <HeroPlate />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function HeroPlate() {
  const drop = featuredDrop;
  const hero = drop.pieces.find((p) => p.kind === drop.hero) ?? drop.pieces[0]!;

  return (
    <Link
      href="/shop"
      aria-label={`Shop ${drop.name} ${drop.vol}`}
      className="panel panel-hover group block p-5 md:p-6"
    >
      <div className="flex items-center justify-between">
        <span className="spec-line">Featured collection</span>
        <span className="spec-line inline-flex items-center gap-1 rounded-sm border-2 border-line-strong bg-kame px-2 py-1 text-[0.6rem] leading-none text-on-brand">
          <DragonStar className="h-3 w-3" /> New drop
        </span>
      </div>

      <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden rounded border-2 border-line-strong bg-elevated">
        <Corner className="left-2 top-2 border-l-2 border-t-2" />
        <Corner className="right-2 top-2 border-r-2 border-t-2" />
        <Corner className="bottom-2 left-2 border-b-2 border-l-2" />
        <Corner className="bottom-2 right-2 border-b-2 border-r-2" />

        <div className="absolute inset-0 flex items-center justify-center p-8">
          <GarmentFlat
            kind={drop.hero}
            title={`${hero.name}, ${hero.spec}`}
            className="h-full w-auto transition-transform duration-500 ease-brand group-hover:scale-[1.03]"
          />
        </div>

        <div className="absolute right-3 top-1/3 flex items-center gap-2">
          <span className="spec-line text-[0.6rem] text-faint">{hero.spec.split(" ").slice(0, 2).join(" ")}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden />
        </div>
        <div className="absolute bottom-1/3 left-3 flex items-center gap-2">
          <span className="h-px w-6 bg-line-strong" aria-hidden />
          <span className="spec-line tabular text-[0.6rem] text-faint">{drop.dropNo}/{drop.editionSize}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="font-display text-d-sm font-semibold leading-none text-paper">
            {drop.name} <span className="text-muted">{drop.vol}</span>
          </p>
          <p className="spec-line mt-2">{hero.name} · {hero.className}</p>
        </div>
        <span className="spec-line inline-flex items-center gap-1.5 text-paper transition-transform duration-300 ease-brand group-hover:translate-x-0.5">
          Shop <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

function Corner({ className }: { className?: string }) {
  return <span aria-hidden className={`pointer-events-none absolute h-4 w-4 border-line-strong ${className ?? ""}`} />;
}
