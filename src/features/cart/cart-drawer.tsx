"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GarmentFlat } from "@/features/home/garments";
import { formatPrice } from "@/lib/format";
import {
  FREE_SHIPPING_THRESHOLD,
  cartSubtotal,
  useCart,
} from "./store";

/**
 * Slide-in cart drawer.
 *
 * UX rationale (Laws of UX):
 *   Goal Gradient   — a free-shipping progress bar shows how close the shopper
 *                     is to a reward, nudging basket size without dark patterns.
 *   Peak-End        — checkout is the exit peak: one unmistakable red CTA.
 *   Fitts's Law     — full-width qty steppers and checkout button.
 *   Doherty         — spring-in under 300ms; body scroll locks so focus stays here.
 *   Aesthetic-Usability — the inked panel language carries through to the overlay.
 */
export function CartDrawer() {
  const open = useCart((s) => s.open);
  const closeCart = useCart((s) => s.closeCart);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const reduce = useReducedMotion();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Lock scroll + Escape to close while open.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeCart]);

  const subtotal = mounted ? cartSubtotal(lines) : 0;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* scrim */}
          <button
            aria-label="Close cart"
            className="absolute inset-0 bg-line-strong/40 backdrop-blur-[1px]"
            onClick={closeCart}
          />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-2 border-line-strong bg-ink"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b-2 border-line-strong px-5 py-4">
              <h2 className="font-display text-lg font-bold text-paper">
                Your bag
                <span className="ml-2 spec-line text-muted">
                  {lines.reduce((n, l) => n + l.qty, 0)} items
                </span>
              </h2>
              <Button variant="ghost" size="icon" aria-label="Close cart" onClick={closeCart}>
                <X className="h-5 w-5" aria-hidden />
              </Button>
            </div>

            {/* free-shipping progress (Goal Gradient) */}
            {lines.length > 0 && (
              <div className="border-b border-line px-5 py-3">
                <p className="spec-line text-paper">
                  {remaining > 0 ? (
                    <>
                      <span className="tabular text-kame">{formatPrice(remaining)}</span> away
                      from free shipping
                    </>
                  ) : (
                    <>Free shipping unlocked ★</>
                  )}
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full border border-line-strong bg-elevated">
                  <div
                    className="h-full bg-kame transition-[width] duration-500 ease-brand"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )}

            {/* lines */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-line-strong">
                    <ShoppingBag className="h-7 w-7 text-muted" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-paper">Your bag is empty</p>
                    <p className="mt-1 text-sm text-muted">Nothing claimed yet. The drop won&apos;t wait.</p>
                  </div>
                  <Button asChild variant="primary" onClick={closeCart}>
                    <Link href="/shop">Browse the shop</Link>
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {lines.map((l) => (
                    <li
                      key={`${l.slug}-${l.size}-${l.color}`}
                      className="flex gap-3 border-b border-line pb-4 last:border-0"
                    >
                      <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded border-2 border-line-strong bg-elevated p-2">
                        {l.image ? (
                          <Image
                            src={l.image}
                            alt={l.name}
                            fill
                            sizes="80px"
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <GarmentFlat kind={l.kind} title={l.name} className="h-full w-auto" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate font-display text-sm font-semibold text-paper">{l.name}</p>
                          <span className="font-mono text-sm tabular text-paper">
                            {formatPrice(l.price * l.qty)}
                          </span>
                        </div>
                        <p className="spec-line mt-1 text-faint">
                          {l.size} · {l.color}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded border-2 border-line-strong">
                            <button
                              className="grid h-8 w-8 place-items-center text-muted hover:text-paper"
                              aria-label={`Decrease ${l.name} quantity`}
                              onClick={() => setQty(l.slug, l.size, l.color, l.qty - 1)}
                            >
                              <Minus className="h-3.5 w-3.5" aria-hidden />
                            </button>
                            <span className="w-8 text-center text-sm tabular">{l.qty}</span>
                            <button
                              className="grid h-8 w-8 place-items-center text-muted hover:text-paper"
                              aria-label={`Increase ${l.name} quantity`}
                              onClick={() => setQty(l.slug, l.size, l.color, l.qty + 1)}
                            >
                              <Plus className="h-3.5 w-3.5" aria-hidden />
                            </button>
                          </div>
                          <button
                            className="text-caption text-faint underline-offset-2 hover:text-kame hover:underline"
                            onClick={() => remove(l.slug, l.size, l.color)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* footer */}
            {lines.length > 0 && (
              <div className="border-t-2 border-line-strong px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="spec-line text-muted">Subtotal</span>
                  <span className="font-mono text-lg font-semibold tabular text-paper">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-caption text-faint">Taxes and shipping calculated at checkout.</p>
                <Button asChild size="lg" className="mt-4 w-full">
                  <Link href="/checkout" onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
                <button
                  className="mt-2 w-full text-center text-sm text-muted hover:text-paper"
                  onClick={closeCart}
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
