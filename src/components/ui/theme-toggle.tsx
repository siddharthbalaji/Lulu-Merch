"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Toggles light/dark. Renders a stable placeholder until mounted to avoid a
 * hydration mismatch (server can't know the resolved theme).
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-[1.15rem] w-[1.15rem]" aria-hidden />
        ) : (
          <Moon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
        )
      ) : (
        <span className="h-[1.15rem] w-[1.15rem]" aria-hidden />
      )}
    </Button>
  );
}
