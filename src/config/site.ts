/**
 * Single source of truth for brand identity, canonical URLs, and navigation.
 * Header, footer, and SEO metadata all read from here so labels and routes
 * stay consistent (Jakob's Law: one vocabulary, learned once).
 */

export const siteConfig = {
  name: "Lulu Merch Co.",
  shortName: "Lulu",
  tagline: "Gaming & anime, worn well.",
  description:
    "Lulu Merch Co. makes premium gaming and anime apparel — oversized tees, hoodies, and limited drops built for collectors, not costume bins.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lulumerch.co",
  locale: "en_IN",
  currency: "INR",
  social: {
    instagram: "https://instagram.com/lulumerch",
    x: "https://x.com/lulumerch",
    youtube: "https://youtube.com/@lulumerch",
  },
} as const;

/** Primary navigation. Kept to a short, scannable set (Hick's Law). */
export interface NavItem {
  label: string;
  href: string;
  /** Marks in-development destinations while feature branches land. */
  soon?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: "New Drops", href: "/drops", soon: true },
  { label: "Apparel", href: "/apparel", soon: true },
  { label: "Anime", href: "/anime", soon: true },
  { label: "Gaming", href: "/gaming", soon: true },
  { label: "Accessories", href: "/accessories", soon: true },
];

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export const footerNav: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "New Drops", href: "/drops", soon: true },
      { label: "Apparel", href: "/apparel", soon: true },
      { label: "Accessories", href: "/accessories", soon: true },
      { label: "Limited Edition", href: "/limited", soon: true },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & delivery", href: "/help/shipping", soon: true },
      { label: "Returns", href: "/help/returns", soon: true },
      { label: "Size guide", href: "/help/sizing", soon: true },
      { label: "Track order", href: "/orders/track", soon: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about", soon: true },
      { label: "Careers", href: "/careers", soon: true },
      { label: "Privacy", href: "/legal/privacy", soon: true },
      { label: "Terms", href: "/legal/terms", soon: true },
    ],
  },
];
