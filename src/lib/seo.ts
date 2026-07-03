import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Base metadata shared by every route. Page-level metadata spreads/overrides
 * this. `metadataBase` lets Next resolve relative OG/canonical URLs.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // Browser-tab title. `default` is what shows on the homepage tab; `template`
  // wraps sub-page titles (e.g. "Shop all — Lulu Merch").
  title: {
    default: "Lulu Merch",
    template: "%s — Lulu Merch",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "anime merch",
    "gaming merch",
    "oversized t-shirts",
    "anime hoodies",
    "streetwear",
    "limited edition drops",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    creator: "@lulumerch",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/** Organization structured data for the site root. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.x,
      siteConfig.social.youtube,
    ],
  };
}
