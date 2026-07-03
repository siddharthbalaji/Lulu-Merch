import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CheckoutClient } from "@/features/cart/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure guest checkout for your Lulu Merch order.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <div className="py-10 md:py-14">
      <Container>
        <h1 className="mb-8 font-poster text-d-lg uppercase tracking-tight text-paper md:text-d-xl">
          Checkout
        </h1>
        <CheckoutClient />
      </Container>
    </div>
  );
}
