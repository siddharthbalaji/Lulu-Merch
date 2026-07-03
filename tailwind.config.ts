import type { Config } from "tailwindcss";

/**
 * Lulu Merch design tokens.
 *
 * Colors are declared as CSS custom properties in `globals.css` (channel form,
 * e.g. `12 12 14`) and consumed here through `rgb(var(--token) / <alpha-value>)`
 * so every color supports Tailwind opacity modifiers (`bg-ink/60`) and both
 * themes swap by toggling a single class on <html>. Dark is the default theme.
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        // Surfaces (dark-first)
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        elevated: "rgb(var(--color-elevated) / <alpha-value>)",
        // Text
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        faint: "rgb(var(--color-faint) / <alpha-value>)",
        // Lines
        line: "rgb(var(--color-line) / <alpha-value>)",
        "line-strong": "rgb(var(--color-line-strong) / <alpha-value>)",
        // Brand accents — Dragon Ball palette, used with restraint.
        kame: {
          DEFAULT: "rgb(var(--color-kame) / <alpha-value>)",
          soft: "rgb(var(--color-kame-soft) / <alpha-value>)",
          strong: "rgb(var(--color-kame-strong) / <alpha-value>)",
        },
        saiyan: {
          DEFAULT: "rgb(var(--color-saiyan) / <alpha-value>)",
          ink: "rgb(var(--color-saiyan-ink) / <alpha-value>)",
        },
        flame: "rgb(var(--color-flame) / <alpha-value>)",
        "on-brand": "rgb(var(--color-on-brand) / <alpha-value>)",
        // Back-compat alias — maps to Kame red so untouched code stays on-brand.
        iris: {
          DEFAULT: "rgb(var(--color-iris) / <alpha-value>)",
          soft: "rgb(var(--color-iris-soft) / <alpha-value>)",
          strong: "rgb(var(--color-iris-strong) / <alpha-value>)",
          contrast: "rgb(var(--color-iris-contrast) / <alpha-value>)",
        },
        // Functional (kept quiet)
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
      fontFamily: {
        // Poster face — the Dragon Ball Z "Saiyan Sans" logotype when present
        // (dropped into /public/fonts, see globals.css), falling back to Anton
        // so headings keep their heavy impact until the .ttf is installed.
        poster: ['"Saiyan Sans"', "var(--font-poster)", "var(--font-display)", "Impact", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Utility / spec-line labels
        "label": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.14em" }],
        "caption": ["0.75rem", { lineHeight: "1.1rem", letterSpacing: "0.01em" }],
        // Body scale
        "sm": ["0.8125rem", { lineHeight: "1.35rem" }],
        "base": ["0.9375rem", { lineHeight: "1.6rem" }],
        "lg": ["1.0625rem", { lineHeight: "1.7rem" }],
        // Display scale (tight tracking, set on the display face)
        "d-sm": ["1.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "d-md": ["2rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "d-lg": ["2.75rem", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "d-xl": ["3.75rem", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "d-2xl": ["5rem", { lineHeight: "0.94", letterSpacing: "-0.04em" }],
      },
      spacing: {
        // 4px base is inherited; add a few intentional layout rhythms.
        "section": "clamp(4rem, 9vw, 8rem)",
        "gutter": "clamp(1.25rem, 4vw, 3rem)",
      },
      borderRadius: {
        // Restrained — the brief bans over-rounded surfaces.
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        // Hard, flat offset shadows — the inked comic-panel look, no blur/glow.
        hard: "3px 3px 0 0 rgb(var(--color-line-strong))",
        "hard-lg": "5px 5px 0 0 rgb(var(--color-line-strong))",
        // Low, believable elevation for subtle surfaces.
        soft: "0 1px 2px rgb(0 0 0 / 0.06), 0 8px 24px -14px rgb(0 0 0 / 0.18)",
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        // A single, deliberate easing used across micro-interactions.
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s var(--ease-brand) both",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
