import { cn } from "@/lib/utils";

/**
 * The Dragon Ball star — the brand's one recurring glyph, lifted from the
 * orange star in the logotype. An original five-point star inside a filled
 * orb; used as a bullet, a section tick, and the "drop" marker. Deliberately
 * geometric (not franchise artwork), so it stays ownable and license-clean.
 */
export function DragonStar({
  className,
  filled = true,
  title,
}: {
  className?: string;
  filled?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-4 w-4", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {filled && (
        <circle
          cx="24"
          cy="24"
          r="22"
          className="fill-flame stroke-line-strong"
          strokeWidth="2.5"
        />
      )}
      <path
        d="M24 9 L28.6 20.2 L40.6 21.1 L31.4 28.9 L34.3 40.6 L24 34.2 L13.7 40.6 L16.6 28.9 L7.4 21.1 L19.4 20.2 Z"
        className={cn(
          "stroke-line-strong",
          filled ? "fill-kame" : "fill-none"
        )}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
