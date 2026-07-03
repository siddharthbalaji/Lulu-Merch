import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * Which mark to render:
   *   "wordmark" — the full LULU · MERCH logotype (top of page, footer).
   *   "mark"     — the compact swirl monogram (header on scroll, tight spaces).
   */
  variant?: "wordmark" | "mark";
  className?: string;
  priority?: boolean;
}

/**
 * Brand logo. Renders the supplied artwork (never a re-typeset wordmark) so the
 * mark on screen is always the real, inked brand asset. Both files are trimmed,
 * transparent PNGs sized for retina; next/image handles responsive delivery.
 */
export function Logo({ variant = "wordmark", className, priority = false }: LogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src="/brand/lulu-mark.png"
        alt="Lulu Merch"
        width={512}
        height={535}
        priority={priority}
        className={cn("h-full w-auto select-none", className)}
      />
    );
  }
  return (
    <Image
      src="/brand/lulu-wordmark.png"
      alt="Lulu Merch Co."
      width={1200}
      height={273}
      priority={priority}
      className={cn("h-full w-auto select-none", className)}
    />
  );
}
