import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";
import { ProductCard } from "@/features/catalog/product-card";
import { ProductDetail } from "@/features/catalog/product-detail";
import { products, productBySlug, relatedTo } from "@/features/catalog/products";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = productBySlug(params.slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: `${product.name} — ${product.line}. ${product.className}, ${product.spec}. ${formatPrice(product.price)}.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${siteConfig.name}`,
      description: `${product.className}, ${product.spec}.`,
      images: [{ url: product.image }],
    },
  };
}

/**
 * Product detail page. Server Component: resolves the product, renders the
 * interactive buy box (client), a related-products rail, a breadcrumb for
 * orientation (Serial-Position / wayfinding), and Product structured data for
 * SEO. 404s cleanly on an unknown slug.
 */
export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productBySlug(params.slug);
  if (!product) notFound();

  const related = relatedTo(product.slug, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image, product.altImage].filter(Boolean),
    description: `${product.className}, ${product.spec}.`,
    brand: { "@type": "Brand", name: siteConfig.name },
    category: product.line,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability:
        product.availability === "waitlist"
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
      url: `${siteConfig.url}/product/${product.slug}`,
    },
  };

  return (
    <div className="py-8 md:py-12">
      <Container>
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-paper">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <Link href="/shop" className="hover:text-paper">Shop</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <Link href={`/shop?line=${encodeURIComponent(product.line)}`} className="hover:text-paper">{product.line}</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="truncate text-paper">{product.name}</span>
        </nav>

        <ProductDetail product={product} />

        {/* related */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-16 border-t-2 border-line-strong pt-10">
            <p className="spec-line flex items-center gap-2">
              <DragonStar className="h-4 w-4" /> Pairs well with
            </p>
            <h2 id="related-heading" className="mt-3 font-poster text-d-lg uppercase dbz-outline">
              You might also like
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
