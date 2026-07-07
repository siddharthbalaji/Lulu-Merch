/**
 * Featured-collection data for the homepage hero + collection band.
 *
 * This is the store's inaugural house capsule — an original Lulu design, not a
 * licensed franchise (the brief bars copyrighted artwork in mockups). Every
 * field is a real product attribute — weight, cut, colorways, edition size —
 * so the spec-line/HUD voice carries information, never filler. Product pages
 * and live inventory arrive with the product-detail branch; until then these
 * describe the drop honestly without pretending to be purchasable SKUs.
 */

export type GarmentKind = "tee" | "hoodie" | "varsity";

export type PieceStatus = "in-stock" | "low" | "waitlist";

export interface Colorway {
  name: string;
  /** Swatch color. Neutral to the theme; used only as a small chip. */
  hex: string;
}

export interface CollectionPiece {
  slug: string;
  name: string;
  kind: GarmentKind;
  /** Product class, shown in the spec-line voice. */
  className: string;
  /** Material / construction spec. */
  spec: string;
  /** Price in whole rupees. */
  price: number;
  colorways: Colorway[];
  status: PieceStatus;
}

export interface FeaturedDrop {
  /** Volume label, e.g. "Vol. 01". */
  vol: string;
  name: string;
  /** Zero-padded drop number, e.g. "001". */
  dropNo: string;
  /** ISO date the drop went live — used for the manifest + future JSON-LD. */
  releasedOn: string;
  /** Numbered edition size. */
  editionSize: number;
  /** Units already claimed (honest scarcity, not a fake countdown). */
  claimed: number;
  blurb: string;
  /** Which garment fronts the hero plate. */
  hero: GarmentKind;
  pieces: CollectionPiece[];
}

const colorways = {
  ink: { name: "Ink", hex: "#0B0B0D" },
  bone: { name: "Bone", hex: "#E9E5DC" },
  iris: { name: "Iris", hex: "#7C5CFC" },
  charcoal: { name: "Charcoal", hex: "#2A2A30" },
} satisfies Record<string, Colorway>;

export const featuredDrop: FeaturedDrop = {
  vol: "Vol. 01",
  name: "Nocturne",
  dropNo: "001",
  releasedOn: "2026-06-20",
  editionSize: 300,
  claimed: 214,
  blurb:
    "The house capsule. Heavyweight staples cut oversized, printed in-house, and numbered by hand. Sold as it drops — no restock, no second run.",
  hero: "hoodie",
  pieces: [
    {
      slug: "nocturne-oversized-tee",
      name: "Nocturne Tee",
      kind: "tee",
      className: "Oversized tee",
      spec: "240 GSM combed cotton",
      price: 1299,
      colorways: [colorways.ink, colorways.bone, colorways.iris],
      status: "in-stock",
    },
    {
      slug: "nocturne-pullover-hoodie",
      name: "Nocturne Hoodie",
      kind: "hoodie",
      className: "Pullover hoodie",
      spec: "400 GSM brushed fleece",
      price: 2799,
      colorways: [colorways.ink, colorways.charcoal, colorways.iris],
      status: "low",
    },
    {
      slug: "nocturne-varsity-jacket",
      name: "Nocturne Varsity",
      kind: "varsity",
      className: "Varsity jacket",
      spec: "Wool-blend body · leather sleeves",
      price: 4499,
      colorways: [colorways.ink, colorways.bone],
      status: "waitlist",
    },
  ],
};

/** Short, human status label + tone for a piece. */
export const statusLabel: Record<PieceStatus, string> = {
  "in-stock": "In stock",
  low: "Low stock",
  waitlist: "Waitlist",
};
