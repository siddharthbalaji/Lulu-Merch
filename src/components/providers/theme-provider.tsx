"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

/**
 * Light-first theming — the store is a clean white canvas by default, with a
 * supported dark theme. `value` maps the resolved theme to an <html> class so
 * our token blocks (`.light` / `.dark`) apply. `disableTransitionOnChange`
 * prevents a flash of animated colors when switching.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      value={{ light: "light", dark: "dark" }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
