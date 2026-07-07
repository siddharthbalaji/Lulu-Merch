"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, Minus, Plus, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { DragonStar } from "@/components/ui/star";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/store";
import { useWishlist } from "./wishlist";
import {
  availabilityDot,
  availabilityLabel,
  type Product,
} from "./products";

/**
 * Product detail — the buy page.
 *
 * UX rationale (Laws of UX):
 *   Jakob's Law — gallery left, buy-box right; the layout shoppers expect.
 *   Fitts's Law — size/colour targets and the add-to-cart button are large.
 *   Von Restorff — the primary CTA is the one red mass on the page.
 *   Goal Gradient — a sticky buy panel keeps checkout one tap away while scrolling.
 *   Feedback — selecting size/colour and adding to cart give immediate visible response.
 *   Progressive Disclosure — shipping and size-guide detail sit behind expandable rows.
 *   Postel's Law — we default the size to the middle of the run so a one-tap add still works.
 * Social proof is honest — units claimed and edition size, never invented star ratings.
 */
export function ProductDetail({ product }: { product: Product }) {
  const gallery = React.useMemo(
    () => [product.image, ...(product.altImage ? [product.altImage] : [])],
    [product],
  );
  const [active, setActive] = React.useState(0);
  const [size, setSize] = React.useState<string>(
    product.sizes[Math.floor(product.sizes.length / 2)] ?? product.sizes[0] ?? "M",
  );
  const [color, setColor] = React.useState(product.colorways[0]?.name ?? "Default");
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  const add = useCart((s) => s.add);
  const wished = useWishlist((s) => s.slugs.includes(product.slug));
  const toggleWish = useWishlist((s) => s.toggle);
  const soldOut = product.availability === "waitlist";

  const addToCart = () => {
    if (soldOut) return;
    add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        size,
        color,
        kind: product.kind,
        image: product.image,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* gallery */}
      <div className="flex flex-col gap-3">
        <div className="panel relative aspect-[4/5] overflow-hidden bg-elevated">
          <Image
            key={active}
            src={gallery[active] ?? product.image}
            alt={`${product.name} — ${product.line}, view ${active + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain p-8"
          />
          {product.limited && (
            <span className="spec-line absolute left-3 top-3 inline-flex items-center gap-1 rounded-sm border-2 border-line-strong bg-ink px-2 py-1 text-paper">
              <DragonStar className="h-3.5 w-3.5" /> Limited edition
            </span>
          )}
        </div>
        {gallery.length > 1 && (
          <div className="flex gap-3">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                aria-label={`View ${i + 1}`}
                aria-pressed={active === i}
                className={cn(
                  "relative h-20 w-20 overflow-hidden rounded border-2 bg-elevated transition-colors",
                  active === i ? "border-kame" : "border-line hover:border-line-strong",
                )}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-contain p-1.5" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* buy box */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="spec-line flex items-center gap-2 text-faint">
          <DragonStar className="h-4 w-4" /> {product.line}
        </p>
        <h1 className="mt-2 font-poster text-4xl uppercase leading-none dbz-outline md:text-5xl">
          {product.name}
        </h1>
        <p className="mt-3 text-muted">{product.className} · {product.spec}</p>

        <div className="mt-5 flex items-end gap-3">
          <span className="font-mono text-2xl font-semibold tabular text-paper">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="mb-0.5 font-mono text-base tabular text-faint line-through">{formatPrice(product.compareAt)}</span>
          )}
          {product.compareAt && (
            <span className="mb-0.5 rounded-sm border-2 border-line-strong bg-saiyan px-1.5 py-0.5 text-xs font-bold text-saiyan-ink">
              Save {formatPrice(product.compareAt - product.price)}
            </span>
          )}
        </div>

        {/* availability status (stock counts removed) */}
        <div className="mt-5 rounded border-2 border-line-strong bg-surface p-3">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-paper">
            <span className={cn("h-2 w-2 rounded-full", availabilityDot[product.availability])} />
            {availabilityLabel[product.availability]}
          </span>
        </div>

        {/* colour */}
        <fieldset className="mt-6">
          <legend className="spec-line mb-2 text-faint">Colour — {color}</legend>
          <div className="flex flex-wrap gap-2">
            {product.colorways.map((cw) => (
              <button
                key={cw.name}
                onClick={() => setColor(cw.name)}
                aria-pressed={color === cw.name}
                aria-label={cw.name}
                title={cw.name}
                className={cn(
                  "h-9 w-9 rounded-full border-2 transition-transform",
                  color === cw.name ? "border-kame ring-2 ring-kame/30" : "border-line-strong hover:scale-105",
                )}
                style={{ backgroundColor: cw.hex }}
              />
            ))}
          </div>
        </fieldset>

        {/* size */}
        <fieldset className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <legend className="spec-line text-faint">Size</legend>
            <span className="spec-line text-faint">See size guide below</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={cn(
                  "min-w-[3rem] rounded border-2 px-3 py-2.5 text-sm font-semibold transition-colors",
                  size === s
                    ? "border-line-strong bg-ink text-paper"
                    : "border-line text-muted hover:border-line-strong hover:text-paper",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        {/* qty + add */}
        <div className="mt-7 flex items-stretch gap-3">
          <div className="inline-flex items-center rounded border-2 border-line-strong">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-12 w-11 place-items-center text-paper hover:bg-elevated">
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-mono text-base font-semibold tabular text-paper" aria-live="polite">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity" className="grid h-12 w-11 place-items-center text-paper hover:bg-elevated">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <Button onClick={addToCart} variant="primary" size="lg" disabled={soldOut} className="flex-1">
            {soldOut ? "Join the waitlist" : added ? "Added ✓" : `Add to cart · ${formatPrice(product.price * qty)}`}
          </Button>

          <button
            onClick={() => toggleWish(product.slug)}
            aria-pressed={wished}
            aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
            className="grid h-12 w-12 shrink-0 place-items-center rounded border-2 border-line-strong text-muted transition-colors hover:text-kame"
          >
            <Heart className={cn("h-5 w-5", wished && "fill-kame text-kame")} />
          </button>
        </div>

        {/* trust row */}
        <ul className="mt-6 grid grid-cols-3 gap-2 text-center">
          {[
            { icon: Truck, label: "Free over ₹1,500" },
            { icon: RotateCcw, label: "7-day returns" },
            { icon: ShieldCheck, label: "Print guarantee" },
          ].map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-1.5 rounded border border-line p-3">
              <Icon className="h-5 w-5 text-kame" aria-hidden />
              <span className="text-xs text-muted">{label}</span>
            </li>
          ))}
        </ul>

        {/* expandable detail */}
        <div className="mt-6 divide-y divide-line border-y border-line">
          <Disclosure title="Shipping & delivery" defaultOpen>
            <p>Dispatched in 2–4 business days from our facility. Free shipping on orders over ₹1,500; a flat ₹79 applies below that. Delivery is typically 3–7 days depending on your pincode.</p>
          </Disclosure>
          <Disclosure title="Size guide">
            <p>Our tees run true to a relaxed, unisex fit. If you&rsquo;re between sizes or prefer a boxier drape, size up. Measurements are chest width, laid flat.</p>
            <table className="mt-3 w-full border-collapse text-left font-mono text-xs tabular">
              <thead>
                <tr className="text-faint">
                  <th className="border border-line px-2 py-1 font-semibold">Size</th>
                  <th className="border border-line px-2 py-1 font-semibold">Chest (in)</th>
                  <th className="border border-line px-2 py-1 font-semibold">Length (in)</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                {[["XS", 19, 26], ["S", 20, 27], ["M", 21, 28], ["L", 22, 29], ["XL", 23, 30], ["XXL", 24, 31]].map((r) => (
                  <tr key={r[0]}>
                    <td className="border border-line px-2 py-1 text-paper">{r[0]}</td>
                    <td className="border border-line px-2 py-1">{r[1]}</td>
                    <td className="border border-line px-2 py-1">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Disclosure>
          <Disclosure title="Materials & care">
            <p>{product.spec}. Machine wash cold, inside out; tumble dry low. Do not iron directly over the print.</p>
          </Disclosure>
        </div>
      </div>
    </div>
  );
}

function Disclosure({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-semibold text-paper">
        {title}
        <Plus className="h-4 w-4 text-muted transition-transform group-open:rotate-45" aria-hidden />
      </summary>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </details>
  );
}
