import { Hero } from "@/features/home/hero";
import { FeaturedCollection } from "@/features/home/featured-collection";

/**
 * Homepage. A Server Component that composes the merchandising sections as
 * client islands (each opts into motion only where it needs to). This branch
 * ships the hero and the featured-collection band; categories, the trending
 * grid, new-drops magazine layout, franchises, community, and newsletter land
 * in the home-sections branch.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
    </>
  );
}
