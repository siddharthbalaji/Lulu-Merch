import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { baseMetadata, organizationJsonLd } from "@/lib/seo";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartDrawer } from "@/features/cart/cart-drawer";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e10" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: next-themes writes the theme class on <html>
    // before hydration, which would otherwise trip a mismatch warning.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          // Organization structured data for the site root.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <ThemeProvider>
          <SkipLink />
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <CartDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
