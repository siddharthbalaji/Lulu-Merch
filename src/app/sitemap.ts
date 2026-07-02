import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Only live routes are listed. Category, product, and drop routes are added
 * here as their feature branches ship, keeping the sitemap truthful.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
