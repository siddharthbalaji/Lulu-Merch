import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/features/catalog/products";

/**
 * Sitemap covers every live route: home, the shop listing, and one entry per
 * product. Kept truthful — only routes that actually render are listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...products.map((p) => ({
      url: `${siteConfig.url}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
