/**
 * Catalog data layer — the real Lulu Merch product set, powering the trending
 * grid, listing page, product pages, cart, and franchise navigation.
 *
 * Product imagery is the brand's own mockup photography (hosted on Cloudinary),
 * grouped by franchise line. Where a second studio shot exists it becomes the
 * card's hover/alternate image (Jakob's Law: shoppers expect an alt view on
 * hover). Fields are genuine attributes so the spec-line carries information,
 * and we still show honest demand signals (units claimed / edition size / stock)
 * rather than fabricated star ratings — there are no invented reviews anywhere.
 */

import type { GarmentKind } from "@/features/home/collection";

export type Category = "apparel" | "accessories" | "collectibles";

export type Availability = "in-stock" | "low" | "waitlist";

export interface Colorway {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Fallback technical flat if the photo fails to load. */
  kind: GarmentKind;
  category: Category;
  /** Franchise line — the category label used in navigation. */
  line: string;
  /** Primary product photo. */
  image: string;
  /** Optional alternate shot, shown on hover. */
  altImage?: string;
  /** Product class, shown in the spec-line. */
  className: string;
  /** Material / construction spec. */
  spec: string;
  price: number;
  compareAt?: number;
  sizes: string[];
  colorways: Colorway[];
  availability: Availability;
  gender: "unisex" | "men" | "women";
  /** Honest demand signal used for trending ordering — units claimed. */
  claimed: number;
  editionSize: number;
  limited?: boolean;
  isNew?: boolean;
}

const c = {
  ink: { name: "Ink", hex: "#141416" },
  bone: { name: "Bone", hex: "#E9E5DC" },
  kame: { name: "Kame Red", hex: "#CC232A" },
  saiyan: { name: "Saiyan Gold", hex: "#FFDA00" },
  flame: { name: "Ember", hex: "#E49D31" },
  slate: { name: "Slate", hex: "#3A3B40" },
} satisfies Record<string, Colorway>;

const CDN = "https://res.cloudinary.com/dxqucwyyo/image/upload";

/** Standard apparel defaults, so each product only declares what differs. */
const TEE = ["XS", "S", "M", "L", "XL", "XXL"];

type Draft = Omit<Product, "kind" | "category" | "gender" | "sizes"> &
  Partial<Pick<Product, "kind" | "category" | "gender" | "sizes">>;

const tee = (d: Draft): Product => ({
  kind: "tee",
  category: "apparel",
  gender: "unisex",
  sizes: TEE,
  ...d,
});

export const products: Product[] = [
  // ————— Dragon Ball (flagship line) —————
  tee({
    slug: "dragon-ball-classic-tee",
    name: "Dragon Ball Classic Tee",
    line: "Dragon Ball",
    image: `${CDN}/v1783074438/Dragon_Ball_puodxe.png`,
    altImage: `${CDN}/v1783074434/Dragon_Ball_2_cneqto.png`,
    className: "Oversized tee",
    spec: "240 GSM combed cotton · drop shoulder",
    price: 1299,
    colorways: [c.ink, c.bone, c.kame],
    availability: "in-stock",
    claimed: 268,
    editionSize: 300,
    limited: true,
    isNew: true,
  }),
  tee({
    slug: "dragon-ball-kanji-tee",
    name: "Dragon Ball Kanji Tee",
    line: "Dragon Ball",
    image: `${CDN}/v1783074437/Dragon_Ball_3_nnhnm7.png`,
    className: "Boxy tee",
    spec: "220 GSM ring-spun cotton · ribbed collar",
    price: 1199,
    colorways: [c.bone, c.kame, c.saiyan],
    availability: "in-stock",
    claimed: 231,
    editionSize: 400,
    isNew: true,
  }),
  tee({
    slug: "dragon-ball-saiyan-tee",
    name: "Dragon Ball Saiyan Tee",
    line: "Dragon Ball",
    image: `${CDN}/v1783074438/Dragon_Ball_4_wxwxz1.png`,
    className: "Heavyweight tee",
    spec: "260 GSM heavy cotton · reinforced neck",
    price: 1349,
    colorways: [c.ink, c.saiyan],
    availability: "low",
    claimed: 189,
    editionSize: 300,
    isNew: true,
  }),
  tee({
    slug: "dragon-ball-kame-tee",
    name: "Dragon Ball Kame Tee",
    line: "Dragon Ball",
    image: `${CDN}/v1783074437/Dragon_Ball_5_sqdpne.png`,
    className: "Classic tee",
    spec: "200 GSM combed cotton · side-seamed",
    price: 1099,
    compareAt: 1299,
    colorways: [c.bone, c.kame],
    availability: "in-stock",
    claimed: 118,
    editionSize: 500,
  }),

  // ————— Naruto —————
  tee({
    slug: "naruto-tee",
    name: "Naruto Tee",
    line: "Naruto",
    image: `${CDN}/v1783074438/Narutoo_yviqo9.png`,
    className: "Oversized tee",
    spec: "240 GSM combed cotton · drop shoulder",
    price: 1299,
    colorways: [c.ink, c.flame, c.bone],
    availability: "in-stock",
    claimed: 204,
    editionSize: 300,
    isNew: true,
  }),
  tee({
    slug: "pain-tee",
    name: "Pain Tee",
    line: "Naruto",
    image: `${CDN}/v1783074439/Pain_ago9q6.png`,
    className: "Heavyweight tee",
    spec: "260 GSM heavy cotton · reinforced neck",
    price: 1349,
    colorways: [c.ink, c.kame],
    availability: "low",
    claimed: 176,
    editionSize: 250,
  }),
  tee({
    slug: "sasuke-tee",
    name: "Sasuke Tee",
    line: "Naruto",
    image: `${CDN}/v1783074439/Sasuke_pifrfa.png`,
    className: "Boxy tee",
    spec: "220 GSM ring-spun cotton · ribbed collar",
    price: 1249,
    colorways: [c.ink, c.slate, c.bone],
    availability: "in-stock",
    claimed: 158,
    editionSize: 400,
  }),
  tee({
    slug: "sharingan-tee",
    name: "Sharingan Tee",
    line: "Naruto",
    image: `${CDN}/v1783074442/Sharingan_vr73ga.png`,
    className: "Classic tee",
    spec: "200 GSM combed cotton · side-seamed",
    price: 1099,
    colorways: [c.ink, c.kame],
    availability: "in-stock",
    claimed: 142,
    editionSize: 500,
    isNew: true,
  }),

  // ————— One Piece —————
  tee({
    slug: "one-piece-tee",
    name: "One Piece Tee",
    line: "One Piece",
    image: `${CDN}/v1783074441/Onepiece_mu69gv.png`,
    className: "Oversized tee",
    spec: "240 GSM combed cotton · drop shoulder",
    price: 1299,
    colorways: [c.bone, c.kame, c.ink],
    availability: "in-stock",
    claimed: 197,
    editionSize: 300,
    isNew: true,
  }),
  tee({
    slug: "luffy-tee",
    name: "Luffy Tee",
    line: "One Piece",
    image: `${CDN}/v1783074442/Luffy_uplmmp.png`,
    className: "Boxy tee",
    spec: "220 GSM ring-spun cotton · ribbed collar",
    price: 1249,
    colorways: [c.kame, c.bone],
    availability: "in-stock",
    claimed: 171,
    editionSize: 350,
  }),
  tee({
    slug: "sanji-tee",
    name: "Sanji Tee",
    line: "One Piece",
    image: `${CDN}/v1783074441/Sanji_lbi6ny.png`,
    altImage: `${CDN}/v1783074442/Sanji2_scmzmv.png`,
    className: "Heavyweight tee",
    spec: "260 GSM heavy cotton · reinforced neck",
    price: 1349,
    colorways: [c.ink, c.saiyan],
    availability: "low",
    claimed: 133,
    editionSize: 250,
  }),
  tee({
    slug: "zoro-tee",
    name: "Zoro Tee",
    line: "One Piece",
    image: `${CDN}/v1783074443/Zoro_fcgax1.png`,
    className: "Oversized tee",
    spec: "240 GSM combed cotton · drop shoulder",
    price: 1299,
    colorways: [c.ink, c.slate],
    availability: "in-stock",
    claimed: 149,
    editionSize: 300,
  }),
  tee({
    slug: "zoro-sanji-tee",
    name: "Zoro & Sanji Tee",
    line: "One Piece",
    image: `${CDN}/v1783074447/ZoroSanji_arqfio.png`,
    className: "Heavyweight tee",
    spec: "260 GSM heavy cotton · twin-print back",
    price: 1399,
    compareAt: 1599,
    colorways: [c.ink, c.kame],
    availability: "low",
    claimed: 121,
    editionSize: 200,
    limited: true,
  }),

  // ————— Demon Slayer —————
  tee({
    slug: "demon-slayer-tee",
    name: "Demon Slayer Tee",
    line: "Demon Slayer",
    image: `${CDN}/v1783074432/Demonslayer1_bzytln.png`,
    altImage: `${CDN}/v1783074432/Demonslayer2_r81dru.png`,
    className: "Oversized tee",
    spec: "240 GSM combed cotton · drop shoulder",
    price: 1299,
    colorways: [c.ink, c.kame, c.bone],
    availability: "in-stock",
    claimed: 186,
    editionSize: 300,
    isNew: true,
  }),
  tee({
    slug: "demon-slayer-haori-tee",
    name: "Demon Slayer Haori Tee",
    line: "Demon Slayer",
    image: `${CDN}/v1783074445/Demonslayer3_hepypg.png`,
    className: "Boxy tee",
    spec: "220 GSM ring-spun cotton · ribbed collar",
    price: 1249,
    colorways: [c.bone, c.kame],
    availability: "in-stock",
    claimed: 164,
    editionSize: 400,
  }),
  tee({
    slug: "demon-slayer-nichirin-tee",
    name: "Demon Slayer Nichirin Tee",
    line: "Demon Slayer",
    image: `${CDN}/v1783074433/Demonslayer4_vyludl.png`,
    className: "Heavyweight tee",
    spec: "260 GSM heavy cotton · reinforced neck",
    price: 1349,
    colorways: [c.ink, c.saiyan],
    availability: "low",
    claimed: 138,
    editionSize: 250,
  }),

  // ————— Bleach —————
  tee({
    slug: "bleach-tee",
    name: "Bleach Tee",
    line: "Bleach",
    image: `${CDN}/v1783074435/Bleach_duow2e.png`,
    altImage: `${CDN}/v1783074435/Bleach_2_ezylvw.png`,
    className: "Oversized tee",
    spec: "240 GSM combed cotton · drop shoulder",
    price: 1299,
    colorways: [c.ink, c.bone, c.kame],
    availability: "in-stock",
    claimed: 152,
    editionSize: 350,
    isNew: true,
  }),

  // ————— Death Note —————
  tee({
    slug: "death-note-tee",
    name: "Death Note Tee",
    line: "Death Note",
    image: `${CDN}/v1783074434/Deathnote_kphdjh.png`,
    altImage: `${CDN}/v1783074432/Deathnote2_tfnmnz.png`,
    className: "Heavyweight tee",
    spec: "260 GSM heavy cotton · reinforced neck",
    price: 1349,
    colorways: [c.ink, c.bone],
    availability: "in-stock",
    claimed: 147,
    editionSize: 300,
  }),

  // ————— Berserk —————
  tee({
    slug: "berserk-tee",
    name: "Berserk Tee",
    line: "Berserk",
    image: `${CDN}/v1783074434/Berserk_aneuyp.png`,
    altImage: `${CDN}/v1783074433/Berserk2_olmahv.png`,
    className: "Oversized tee",
    spec: "260 GSM heavy cotton · drop shoulder",
    price: 1399,
    colorways: [c.ink, c.slate],
    availability: "low",
    claimed: 159,
    editionSize: 250,
    isNew: true,
  }),

  // ————— Black Clover —————
  tee({
    slug: "black-clover-tee",
    name: "Black Clover Tee",
    line: "Black Clover",
    image: `${CDN}/v1783074437/BlackClover_eoun5v.png`,
    className: "Boxy tee",
    spec: "220 GSM ring-spun cotton · ribbed collar",
    price: 1199,
    colorways: [c.ink, c.kame, c.bone],
    availability: "in-stock",
    claimed: 96,
    editionSize: 500,
  }),

  // ————— One Punch Man —————
  tee({
    slug: "one-punch-man-tee",
    name: "One Punch Man Tee",
    line: "One Punch Man",
    image: `${CDN}/v1783074443/OPM_jyk3fh.png`,
    className: "Classic tee",
    spec: "200 GSM combed cotton · side-seamed",
    price: 1099,
    colorways: [c.saiyan, c.bone, c.kame],
    availability: "in-stock",
    claimed: 128,
    editionSize: 500,
    isNew: true,
  }),
];

// ————— selectors —————

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/** Trending = ranked by honest demand (share of edition claimed). */
export const trending = (limit = 4): Product[] =>
  [...products]
    .sort((a, b) => b.claimed / b.editionSize - a.claimed / a.editionSize)
    .slice(0, limit);

export const newArrivals = (limit = 6): Product[] =>
  products.filter((p) => p.isNew).slice(0, limit);

export const relatedTo = (slug: string, limit = 4): Product[] => {
  const p = productBySlug(slug);
  if (!p) return products.slice(0, limit);
  const sameLine = products.filter((x) => x.slug !== slug && x.line === p.line);
  const rest = products.filter(
    (x) => x.slug !== slug && x.line !== p.line,
  );
  return [...sameLine, ...rest].slice(0, limit);
};

/** Distinct franchise lines, flagship first, for navigation. */
export const lines = (): string[] => {
  const seen = new Set<string>();
  for (const p of products) seen.add(p.line);
  return Array.from(seen);
};

export const availabilityLabel: Record<Availability, string> = {
  "in-stock": "In stock",
  low: "Low stock",
  waitlist: "Waitlist",
};

export const availabilityDot: Record<Availability, string> = {
  "in-stock": "bg-success",
  low: "bg-warning",
  waitlist: "bg-faint",
};
