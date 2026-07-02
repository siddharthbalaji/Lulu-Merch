import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { footerNav, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

/**
 * Footer carries the deep IA (Hick's Law: keep the header light, put the long
 * tail here). Columns group by task — Shop / Support / Company — so scanning
 * is fast (Law of Proximity + Law of Similarity).
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-section border-t border-line">
      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Premium gaming and anime apparel — built for the people who
              actually finish the game and the season. Made to be worn, not
              boxed.
            </p>
          </div>

          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="spec-line mb-4">{col.title}</h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="spec-line text-faint">
            © {year} {siteConfig.name} <span className="tick mx-2" /> Shipped
            worldwide
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={siteConfig.social.instagram}
              aria-label="Lulu Merch on Instagram"
              className="text-muted transition-colors hover:text-paper"
            >
              <Instagram className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href={siteConfig.social.youtube}
              aria-label="Lulu Merch on YouTube"
              className="text-muted transition-colors hover:text-paper"
            >
              <Youtube className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
