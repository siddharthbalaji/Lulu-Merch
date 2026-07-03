"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DragonStar } from "@/components/ui/star";
import { formatPrice } from "@/lib/format";
import { featuredDrop } from "./collection";
import { products } from "@/features/catalog/products";

/**
 * Homepage hero — statement + the flagship piece as an inked cut-sheet panel.
 *
 * UX rationale (Laws of UX):
 *   Peak-End           — the first impression gets the craft.
 *   Aesthetic-Usability — a precise white frame with heavy inking reads as premium.
 *   Von Restorff        — the DBZ logotype headline + one red CTA pull the eye.
 *   Serial Position     — primary CTA first, secondary second; key facts open and close.
 *   Hick's Law          — exactly two calls to action.
 *   Fitts's Law         — large CTAs; the whole plate is one tap target to the product.
 *   Doherty Threshold   — the load reveal is <400ms and never blocks interaction.
 *
 * Spacing is tuned so the primary CTA sits above the fold on phones, laptops,
 * and desktops alike: the text column comes first in source order (so on a
 * stacked mobile layout the headline + CTA lead), and the vertical rhythm is
 * tighter at the top than the original.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } } };
const rise: Variants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

// Real flagship product for the hero plate (studio photo, not an SVG mock).
const heroProduct =
  products.find((p) => p.slug === "dragon-ball-classic-tee") ?? products[0]!;

export function Hero() {
  const drop = featuredDrop;
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const plateY = reduce ? 0 : rawY;

  return (
    <section ref={sectionRef} aria-labelledby="hero-heading" className="border-b-2 border-line-strong">
      <Container className="py-7 md:py-12 lg:py-16">
        <motion.div
          className="grid items-center gap-8 md:gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
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
              className="mt-3 font-poster text-[clamp(2.4rem,7.5vw,5rem)] uppercase leading-[1.02] tracking-tight md:mt-4"
            >
              <span className="dbz-title block">Wear what</span>
              <span className="dbz-title-red block">you main.</span>
            </motion.h1>

            <motion.p variants={rise} className="mt-4 max-w-prose text-base text-muted md:mt-5 md:text-lg">
              {drop.blurb}
            </motion.p>

            <motion.div variants={rise} className="mt-6 flex flex-wrap items-center gap-3">
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

            <motion.p variants={rise} className="spec-line mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
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
  const p = heroProduct;

  return (
    <Link
      href={`/product/${p.slug}`}
      aria-label={`Shop ${p.name}`}
      className="panel panel-hover group block p-4 md:p-5"
    >
      <div className="flex items-center justify-between">
        <span className="spec-line">Featured piece</span>
        <span className="spec-line inline-flex items-center gap-1 rounded-sm border-2 border-line-strong bg-kame px-2 py-1 text-[0.6rem] leading-none text-on-brand">
          <DragonStar className="h-3 w-3" /> New drop
        </span>
      </div>

      <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden rounded border-2 border-line-strong bg-elevated">
        <Corner className="left-2 top-2 border-l-2 border-t-2" />
        <Corner className="right-2 top-2 border-r-2 border-t-2" />
        <Corner className="bottom-2 left-2 border-b-2 border-l-2" />
        <Corner className="bottom-2 right-2 border-b-2 border-r-2" />

        <Image
          src={p.image}
          alt={`${p.name} — ${p.line}`}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
          className="object-contain p-6 transition-transform duration-500 ease-brand group-hover:scale-[1.03]"
        />

        <div className="pointer-events-none absolute right-3 top-1/3 flex items-center gap-2">
          <span className="spec-line text-[0.6rem] text-faint">{p.spec.split(" ").slice(0, 2).join(" ")}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden />
        </div>
        <div className="pointer-events-none absolute bottom-1/3 left-3 flex items-center gap-2">
          <span className="h-px w-6 bg-line-strong" aria-hidden />
          <span className="spec-line tabular text-[0.6rem] text-faint">{p.claimed}/{p.editionSize}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="font-display text-d-sm font-semibold leading-none text-paper">
            {p.name}
          </p>
          <p className="spec-line mt-2">{p.line} · {p.className}</p>
        </div>
        <span className="font-mono text-lg font-semibold tabular text-paper">{formatPrice(p.price)}</span>
      </div>
    </Link>
  );
}

function Corner({ className }: { className?: string }) {
  return <span aria-hidden className={`pointer-events-none absolute z-10 h-4 w-4 border-line-strong ${className ?? ""}`} />;
}
