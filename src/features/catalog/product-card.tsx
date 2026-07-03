"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { DragonStar } from "@/components/ui/star";
import { useCart } from "@/features/cart/store";
import { useWishlist } from "./wishlist";
import {
  availabilityDot,
  availabilityLabel,
  type Product,
} from "./products";

/**
 * Product card — the catalogue's atomic unit.
 *
 * UX rationale (Laws of UX):
 *   Law of Similarity — every card is identical in structure, so a grid reads as one set.
 *   Law of Proximity  — name, class, price and swatches sit as a single block.
 *   Fitts's Law       — the whole card links to the PDP; quick-add + wishlist are 40px targets.
 *   Von Restorff      — the status dot and any "limited" star are the only colour, so scarcity pops.
 *   Progressive Disclosure — quick-add appears on hover/focus; the full size+colour picker is the PDP's job.
 *   Aesthetic-Usability — the inked panel + alternate-flat swap reward attention without noise.
 */
export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const wished = useWishlist((s) => s.slugs.includes(product.slug));
  const toggleWish = useWishlist((s) => s.toggle);
  const soldOut = product.availability === "waitlist";

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (soldOut) return;
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: product.sizes[Math.floor(product.sizes.length / 2)] ?? product.sizes[0] ?? "M",
      color: product.colorways[0]?.name ?? "Default",
      kind: product.kind,
      image: product.image,
    });
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group panel panel-hover flex h-full flex-col overflow-hidden"
    >
      {/* stage */}
      <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-line-strong bg-elevated">
        {/* corner flags */}
        <div className="absolute left-0 top-0 z-10 flex flex-col items-start gap-1 p-2">
          {product.isNew && (
            <span className="spec-line rounded-sm border-2 border-line-strong bg-saiyan px-1.5 py-0.5 text-[0.55rem] leading-none text-saiyan-ink">
              New
            </span>
          )}
          {product.limited && (
            <span className="spec-line inline-flex items-center gap-1 rounded-sm border-2 border-line-strong bg-ink px-1.5 py-0.5 text-[0.55rem] leading-none text-paper">
              <DragonStar className="h-3 w-3" /> Limited
            </span>
          )}
        </div>

        {/* wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWish(product.slug);
          }}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-2 top-2 z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-line-strong bg-ink text-muted transition-colors hover:text-kame"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-kame text-kame")} aria-hidden />
        </button>

        {/* garment — real product photo, alternate shot on hover */}
        <Image
          src={product.image}
          alt={`${product.name} — ${product.line}, ${product.spec}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn(
            "object-contain p-5 transition-opacity duration-300",
            product.altImage && "group-hover:opacity-0",
          )}
        />
        {product.altImage && (
          <Image
            src={product.altImage}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* quick add (hover/focus reveal) */}
        {!soldOut && (
          <div className="absolute inset-x-2 bottom-2 z-10 translate-y-2 opacity-0 transition-all duration-200 ease-brand group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <button
              onClick={quickAdd}
              className="flex w-full items-center justify-center gap-1.5 rounded border-2 border-line-strong bg-ink py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-kame hover:text-on-brand"
            >
              <Plus className="h-4 w-4" aria-hidden /> Quick add
            </button>
          </div>
        )}
      </div>

      {/* meta */}
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold leading-tight text-paper">
              {product.name}
            </h3>
            <p className="spec-line mt-1 text-faint">{product.line} · {product.className}</p>
          </div>
          <div className="text-right">
            <span className="font-mono text-sm font-semibold tabular text-paper">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="block font-mono text-[0.7rem] tabular text-faint line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
        </div>

        {/* sizes + status */}
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <div className="flex flex-wrap gap-1" aria-label="Available sizes">
            {product.sizes.slice(0, 5).map((s) => (
              <span key={s} className="spec-line rounded-sm border border-line px-1.5 py-0.5 text-[0.55rem] text-muted">
                {s}
              </span>
            ))}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5">
            <span className={cn("h-1.5 w-1.5 rounded-full", availabilityDot[product.availability])} aria-hidden />
            <span className="spec-line text-[0.55rem] text-muted">{availabilityLabel[product.availability]}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
