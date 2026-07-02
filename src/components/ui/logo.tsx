import { cn } from "@/lib/utils";

interface LogoProps {
  /** Compact hides the descriptor tag (mobile / tight spaces). */
  compact?: boolean;
  className?: string;
}

/**
 * Wordmark: display "LULU" set tight, paired with a mono descriptor that
 * carries the collector/spec-sheet voice. No icon gimmick — the type is the mark.
 */
export function Logo({ compact = false, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="font-display text-[1.35rem] font-bold leading-none tracking-[-0.04em] text-paper">
        LULU
      </span>
      {!compact && (
        <span className="spec-line text-[0.6rem] leading-none text-muted">
          MERCH·CO
        </span>
      )}
    </span>
  );
}
