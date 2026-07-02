import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

/**
 * Three type roles, exposed as CSS variables so faces can be swapped in one
 * place without touching components:
 *   --font-display  headings, brand voice        (Space Grotesk)
 *   --font-sans     body & UI                     (Inter)
 *   --font-mono     data, spec-lines, prices      (JetBrains Mono)
 *
 * NOTE: The brief's first-choice faces are Geist (body) and Clash Display
 * (display). Geist ships in newer next/font/google catalogs; Clash Display is
 * a Fontshare face. To swap either in, drop the licensed .woff2 into
 * /public/fonts and switch the import here to next/font/local — nothing else
 * changes because everything downstream reads the CSS variables above.
 */

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
