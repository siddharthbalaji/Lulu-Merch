"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { primaryNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCart, cartCount } from "@/features/cart/store";

/**
 * Persistent shell chrome inherited by every route.
 *
 * UX rationale (Laws of UX):
 *   Jakob's Law    — a centered-logotype fashion header is a learned pattern for
 *                    premium apparel stores; nav + cart sit exactly where users expect.
 *   Hick's Law     — five curated primary links; the long-tail IA lives in the footer.
 *   Fitts's Law    — 44px+ tap targets on every control; the cart is a large target.
 *   Progressive Disclosure — on scroll the second nav row collapses and the full
 *                    LULU · MERCH wordmark swaps to the compact mark, reclaiming
 *                    vertical space for the content the user scrolled toward.
 *   Doherty Threshold — the swap is a sub-300ms crossfade; nothing blocks input.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const reduceMotion = useReducedMotion();

  // Scroll state with HYSTERESIS. The header changes height when `scrolled`
  // flips; because the header is sticky, that height change shifts layout,
  // which can move the scroll position back across a single threshold and
  // flip the state again — the "twitch" the user reported. Two separated
  // thresholds (enter >80, exit <24) create a dead zone so one height change
  // can never trigger the opposite flip. rAF throttling coalesces the burst
  // of scroll events into one state read per frame.
  React.useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > 80) return true;
        if (prev && y < 24) return false;
        return prev;
      });
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-ink/95 backdrop-blur-sm transition-shadow duration-300 ease-brand",
        "border-b-2 border-line-strong"
      )}
    >
      <AnnouncementTicker />

      <Container
        className={cn(
          "relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 transition-[height] duration-300 ease-brand",
          scrolled ? "h-16" : "h-20"
        )}
      >
        {/* Left cluster: menu (mobile) + inline nav (desktop, on scroll) + search */}
        <div className="flex items-center gap-1 justify-self-start">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </Button>

          {/* On scroll the primary nav moves inline to the left of the mark. */}
          <nav
            aria-label="Primary"
            className={cn(
              "hidden items-center gap-1 transition-opacity duration-200",
              scrolled ? "lg:flex" : "lg:hidden"
            )}
          >
            {primaryNav.slice(0, 4).map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <Button asChild variant="ghost" size="icon" className="hidden lg:inline-flex">
            <Link href="/shop" aria-label="Search products">
              <Search className="h-[1.15rem] w-[1.15rem]" aria-hidden />
            </Link>
          </Button>
        </div>

        {/* Center brand — wordmark → compact mark on scroll.
            Both marks share ONE box and crossfade in place (opacity only),
            while the box animates between two fixed sizes. Nothing reflows,
            so the swap reads as a smooth dissolve instead of a jump, and the
            `py-1.5` keeps the artwork off the keyline border. */}
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="justify-self-center rounded-sm py-1.5 outline-none focus-visible:outline-2 focus-visible:outline-kame"
        >
          <span className="sr-only">{siteConfig.name} — home</span>
          <span
            aria-hidden
            className={cn(
              "relative block transition-[width,height] duration-300 ease-brand",
              scrolled
                ? "h-10 w-12 md:h-11 md:w-14"
                : "h-11 w-[210px] md:h-[3.25rem] md:w-[248px]"
            )}
          >
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-brand",
                scrolled ? "opacity-0" : "opacity-100"
              )}
            >
              <Logo variant="wordmark" priority className="h-full w-auto" />
            </span>
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-brand",
                scrolled ? "opacity-100" : "opacity-0"
              )}
            >
              <Logo variant="mark" className="h-full w-auto" />
            </span>
          </span>
        </Link>

        {/* Right cluster: theme + cart */}
        <div className="flex items-center gap-1 justify-self-end">
          <ThemeToggle />
          <CartButton />
        </div>
      </Container>

      {/* Second row: centered primary nav (hidden once scrolled). */}
      <div
        className={cn(
          "hidden overflow-hidden border-t border-line transition-[max-height,opacity] duration-300 ease-brand lg:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-14 opacity-100"
        )}
      >
        <Container>
          <nav aria-label="Categories" className="flex h-12 items-center justify-center gap-2">
            {primaryNav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </Container>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary (mobile)"
            className="overflow-hidden border-t-2 border-line-strong bg-ink lg:hidden"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="py-2">
              <ul className="flex flex-col divide-y divide-line">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 text-base font-medium text-paper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/shop"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 text-base font-medium text-kame"
                  >
                    Shop all
                  </Link>
                </li>
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center rounded px-3 py-2 text-sm font-medium text-paper transition-colors hover:text-kame"
    >
      {label}
      <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-[3px] scale-x-0 bg-kame transition-transform duration-200 ease-brand group-hover:scale-x-100" />
    </Link>
  );
}

/** Cart trigger + live count. Count is gated on mount to avoid hydration drift. */
function CartButton() {
  const lines = useCart((s) => s.lines);
  const openCart = useCart((s) => s.openCart);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const count = mounted ? cartCount(lines) : 0;

  return (
    <Button variant="ghost" size="icon" aria-label={`Open cart, ${count} items`} onClick={openCart}>
      <span className="relative inline-flex">
        <ShoppingBag className="h-[1.2rem] w-[1.2rem]" aria-hidden />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-line-strong bg-kame px-1 text-[0.6rem] font-bold leading-none text-on-brand tabular">
            {count}
          </span>
        )}
      </span>
    </Button>
  );
}

/** Slim announcement ticker — real logistics + drop facts, not marketing fluff. */
function AnnouncementTicker() {
  const items = [
    "Free shipping over ₹1,500",
    "Vol. 01 · Nocturne — numbered to 300 sets",
    "Ships in 48h across India",
    "No restock. No second run.",
  ];
  return (
    <div className="overflow-hidden border-b border-line bg-line-strong text-ink">
      <div className="mx-auto flex w-max animate-marquee items-center gap-8 py-1.5 pr-8 motion-reduce:animate-none">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="spec-line flex items-center gap-8 text-ink/90">
            {t}
            <span className="h-1 w-1 rounded-full bg-kame" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
