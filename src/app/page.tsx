import { Hero } from "@/features/home/hero";
import { Categories } from "@/features/home/categories";
import { Trending } from "@/features/home/trending";
import { FeaturedCollection } from "@/features/home/featured-collection";
import { Franchises } from "@/features/home/franchises";
import { Gaming, Movies } from "@/features/home/coming-soon";
import { ManyMore } from "@/features/home/many-more";
import { Countdown } from "@/features/home/countdown";
import { Community } from "@/features/home/community";
import { Newsletter } from "@/features/home/newsletter";

/**
 * Homepage — a Server Component composing the merchandising sections as client
 * islands (each opts into motion only where it needs it).
 *
 * Section order follows the Serial-Position Effect and Peak-End Rule: the hero
 * anchors the top, high-intent navigation (categories → trending) comes early
 * where attention is highest, the drop story and franchises build the middle,
 * and the countdown → community → newsletter close on momentum rather than a
 * dead end. Miller's Law keeps each band to one job.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Trending />
      <FeaturedCollection />
      <Franchises />
      <Gaming />
      <Movies />
      <ManyMore />
      <Countdown />
      <Community />
      <Newsletter />
    </>
  );
}
