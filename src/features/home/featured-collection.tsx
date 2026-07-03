"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { formatPrice } from "@/lib/format";
import {
  featuredDrop,
  statusLabel,
  type CollectionPiece,
  type PieceStatus,
} from "./collection";
import { GarmentFlat } from "./garments";

/**
 * Featured-collection band — the drop's pieces as compact cut-sheet cards.
 *
 * UX rationale (Laws of UX):
 *   Law of Similarity   — uniform cards read instantly as one collection.
 *   Law of Proximity    — name, class, price, and colorways sit as one block per card.
 *   Miller's Law        — three pieces, not a wall; the full grid is the listing page's job.
 *   Fitts's Law         — each whole card is the tap target.
 *   Von Restorff        — the status chip is the one colored mark, so scarcity stands out.
 *   Goal Gradient       — a single "View the drop" exit keeps momentum toward the catalogue.
 *   Doherty Threshold   — on-scroll reveals are brief and staggered, never blocking.
 * This is intentionally *not* the trending grid — that (with quick-add,
 * wishlist, alternate images) belongs to the product-listing branch.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const statusDot: Record<PieceStatus, string> = {
  "in-stock": "bg-success",
  low: "bg-warning",
  waitlist: "bg-faint",
};

export function FeaturedCollection() {
  const reduce = useReducedMotion();
  const drop = featuredDrop;

  return (
    <section aria-labelledby="collection-heading" className="border-t border-line py-section">
      <Container>
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> Featured collection
            </p>
            <h2
              id="collection-heading"
              className="mt-3 font-display text-d-md font-bold text-paper md:text-d-lg"
            >
              {drop.name} <span className="text-muted">· {drop.vol}</span>
            </h2>
          </div>
          <Link
            href="/shop?sort=new"
            className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-paper"
          >
            View the drop
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <motion.ul
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={grid}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
        >
          {drop.pieces.map((piece) => (
            <motion.li key={piece.slug} variants={card}>
              <PieceCard piece={piece} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

function PieceCard({ piece }: { piece: CollectionPiece }) {
  return (
    <Link
      href="/shop?sort=new"
      className="group flex h-full flex-col rounded-lg border border-line bg-surface/50 p-4 transition-colors duration-300 ease-brand hover:border-line-strong"
    >
      {/* stage */}
      <div className="relative aspect-square w-full overflow-hidden rounded border border-line bg-ink/40">
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[piece.status]}`} aria-hidden />
          <span className="spec-line text-[0.6rem] text-muted">{statusLabel[piece.status]}</span>
        </span>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <GarmentFlat
            kind={piece.kind}
            title={`${piece.name}, ${piece.spec}`}
            className="h-full w-auto transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
          />
        </div>
      </div>

      {/* meta */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight text-paper">
            {piece.name}
          </h3>
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
        <span className="spec-line ml-auto text-[0.6rem] text-faint">
          {piece.colorways.length} colorways
        </span>
      </div>
    </Link>
  );
}
