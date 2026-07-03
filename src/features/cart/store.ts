"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/features/catalog/products";

/** Free-shipping threshold in whole rupees (drives the progress bar). */
export const FREE_SHIPPING_THRESHOLD = 1500;

export interface CartLine {
  slug: string;
  name: string;
  price: number;
  size: string;
  color: string;
  kind: Product["kind"];
  image?: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  open: boolean;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (slug: string, size: string, color: string) => void;
  setQty: (slug: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const sameLine = (a: CartLine, slug: string, size: string, color: string) =>
  a.slug === slug && a.size === size && a.color === color;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      add: (line, qty = 1) =>
        set((s) => {
          const idx = s.lines.findIndex((l) =>
            sameLine(l, line.slug, line.size, line.color)
          );
          if (idx >= 0) {
            const next = [...s.lines];
            const existing = next[idx]!;
            next[idx] = { ...existing, qty: existing.qty + qty };
            return { lines: next, open: true };
          }
          return { lines: [...s.lines, { ...line, qty }], open: true };
        }),
      remove: (slug, size, color) =>
        set((s) => ({
          lines: s.lines.filter((l) => !sameLine(l, slug, size, color)),
        })),
      setQty: (slug, size, color, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) =>
              sameLine(l, slug, size, color)
                ? { ...l, qty: Math.max(1, qty) }
                : l
            )
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
      openCart: () => set({ open: true }),
      closeCart: () => set({ open: false }),
    }),
    { name: "lulu-cart", partialize: (s) => ({ lines: s.lines }) }
  )
);

// Derived selectors — kept out of the store so components subscribe narrowly.
export const cartCount = (lines: CartLine[]) =>
  lines.reduce((n, l) => n + l.qty, 0);

export const cartSubtotal = (lines: CartLine[]) =>
  lines.reduce((n, l) => n + l.price * l.qty, 0);
