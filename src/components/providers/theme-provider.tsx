"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

/**
 * Dark-first theming. `value` maps the resolved theme to an <html> class so our
 * token blocks (`.dark` / `.light`) apply. `disableTransitionOnChange` prevents
 * a flash of animated colors when switching.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      value={{ light: "light", dark: "dark" }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
