"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { ProductCard } from "@/features/catalog/product-card";
import { trending } from "@/features/catalog/products";

/**
 * Trending grid — ranked by honest demand (share of edition claimed), not a
 * fabricated "popular" badge.
 *
 * UX rationale (Laws of UX):
 *   Pareto Principle — the few pieces doing most of the work get prime real estate.
 *   Law of Similarity — a uniform four-up grid; the card does the interaction work.
 *   Doherty Threshold — staggered on-scroll reveals stay brief and never block input.
 *   Goal Gradient — a single "View all" exit keeps momentum toward the catalogue.
 */

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Trending() {
  const reduce = useReducedMotion();
  const picks = trending(4);

  return (
    <section aria-labelledby="trending-heading" className="border-t-2 border-line-strong py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> Moving fast
            </p>
            <h2 id="trending-heading" className="mt-3 font-poster text-d-lg uppercase dbz-outline md:text-d-xl">
              Trending now
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-paper transition-colors hover:text-kame"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <motion.ul
          className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
          variants={grid}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
        >
          {picks.map((p) => (
            <motion.li key={p.slug} variants={item}>
              <ProductCard product={p} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
