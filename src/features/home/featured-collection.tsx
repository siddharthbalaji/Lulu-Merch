"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { formatPrice } from "@/lib/format";
import { featuredDrop } from "./collection";
import {
  products,
  availabilityLabel,
  availabilityDot,
  type Product,
} from "@/features/catalog/products";

/**
 * Featured-collection band — the flagship Dragon Ball capsule, shown as real
 * studio photography (no SVG mockups) with genuine attributes: class, spec,
 * colorways, price, and honest stock status.
 *
 * UX rationale (Laws of UX):
 *   Law of Similarity   — uniform cards read instantly as one collection.
 *   Law of Proximity    — name, class, price, and colorways sit as one block per card.
 *   Von Restorff        — the status chip is the one colored mark, so scarcity stands out.
 *   Goal Gradient       — a single "View the drop" exit keeps momentum toward the catalogue.
 *   Doherty Threshold   — on-scroll reveals are brief and staggered, never blocking.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const card: Variants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

// The featured capsule = the flagship line's first three pieces (real photos).
const featuredPieces = products.filter((p) => p.line === "Dragon Ball").slice(0, 3);

export function FeaturedCollection() {
  const reduce = useReducedMotion();
  const drop = featuredDrop;

  return (
    <section aria-labelledby="collection-heading" className="border-t border-line py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> Featured collection
            </p>
            <h2 id="collection-heading" className="mt-3 font-poster text-d-lg uppercase tracking-tight text-paper md:text-d-xl">
              Dragon Ball <span className="text-muted">· {drop.vol}</span>
            </h2>
          </div>
          <Link
            href="/shop?line=Dragon+Ball"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-paper transition-colors hover:text-kame"
          >
            View the drop
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <motion.ul
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={grid}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
        >
          {featuredPieces.map((piece) => (
            <motion.li key={piece.slug} variants={card}>
              <PieceCard piece={piece} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

function PieceCard({ piece }: { piece: Product }) {
  return (
    <Link
      href={`/product/${piece.slug}`}
      className="group flex h-full flex-col rounded-lg border-2 border-line-strong bg-surface p-4 shadow-hard transition-transform duration-150 ease-brand hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-lg"
    >
      {/* stage — real product photo, alternate shot on hover if present */}
      <div className="relative aspect-square w-full overflow-hidden rounded border-2 border-line-strong bg-elevated">
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${availabilityDot[piece.availability]}`} aria-hidden />
          <span className="spec-line text-[0.6rem] text-muted">{availabilityLabel[piece.availability]}</span>
        </span>
        <Image
          src={piece.image}
          alt={`${piece.name} — ${piece.line}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cnImg(piece.altImage)}
        />
        {piece.altImage && (
          <Image
            src={piece.altImage}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </div>

      {/* meta */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight text-paper">{piece.name}</h3>
          <p className="spec-line mt-1.5">{piece.className}</p>
        </div>
        <span className="font-mono text-sm tabular text-paper">{formatPrice(piece.price)}</span>
      </div>

      <p className="mt-3 text-caption text-faint">{piece.spec}</p>

      {/* colorways */}
      <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
        <span className="sr-only">Colorways:</span>
        {piece.colorways.map((c) => (
          <span
            key={c.name}
            title={c.name}
            className="h-4 w-4 rounded-sm border border-line-strong"
            style={{ backgroundColor: c.hex }}
          >
            <span className="sr-only">{c.name}</span>
          </span>
        ))}
        <span className="spec-line ml-auto text-[0.6rem] text-faint">{piece.colorways.length} colorways</span>
      </div>
    </Link>
  );
}

function cnImg(hasAlt?: string) {
  return "object-contain p-6 transition-opacity duration-300" + (hasAlt ? " group-hover:opacity-0" : "");
}
