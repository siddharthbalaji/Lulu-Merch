import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { ShopClient, type ShopInitial, type SortKey } from "@/features/catalog/shop-client";

export const metadata: Metadata = {
  title: "Shop all",
  description:
    "Every Lulu Merch piece in rotation — Dragon Ball, Naruto, One Piece, Demon Slayer and more, in original heavyweight cotton. Filter by franchise, size and availability.",
  alternates: { canonical: "/shop" },
};

const SORTS: SortKey[] = ["trending", "new", "price-asc", "price-desc"];

/**
 * Product-listing page. A Server Component that reads the URL's searchParams
 * and seeds the client filter view — so a link like /shop?line=Dragon+Ball
 * lands pre-filtered, and no useSearchParams Suspense boundary is required.
 */
export default function ShopPage({
  searchParams,
}: {
  searchParams: { line?: string; sort?: string; limited?: string; category?: string };
}) {
  const initial: ShopInitial = {
    line: searchParams.line,
    sort: SORTS.includes(searchParams.sort as SortKey)
      ? (searchParams.sort as SortKey)
      : undefined,
    limited: searchParams.limited === "1" || searchParams.category === "limited",
  };

  return (
    <div className="py-10 md:py-14">
      <Container>
        <header className="mb-8 border-b-2 border-line-strong pb-6">
          <p className="spec-line flex items-center gap-2">
            <DragonStar className="h-4 w-4" /> The full range
          </p>
          <h1 className="mt-3 font-poster text-d-lg uppercase tracking-tight text-paper md:text-d-xl">
            Shop all
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Heavyweight cotton, printed in-house, cut for everyday wear. Filter by franchise, size,
            or what&rsquo;s still in stock.
          </p>
        </header>
        <ShopClient initial={initial} />
      </Container>
    </div>
  );
}
