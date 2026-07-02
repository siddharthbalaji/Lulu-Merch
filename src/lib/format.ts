import { siteConfig } from "@/config/site";

/**
 * Format a whole-rupee amount as INR (e.g. 1299 → "₹1,299"). No decimals —
 * the catalogue prices in whole rupees. Kept here because pricing display is
 * shared surface (hero, listing, cart, checkout all read it).
 */
const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: siteConfig.currency,
  maximumFractionDigits: 0,
});

export function formatPrice(rupees: number): string {
  return inr.format(rupees);
}
