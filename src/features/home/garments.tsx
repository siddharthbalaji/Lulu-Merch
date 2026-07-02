import type { GarmentKind } from "./collection";
import { cn } from "@/lib/utils";

/**
 * Garment "technical flats" — the front-view cut-sheet line drawings apparel
 * studios use in a tech pack. Chosen deliberately over stock photography or
 * generated art: they're original, on-brand (the collector/spec-sheet voice),
 * theme-aware, and weigh nothing (no image bytes → keeps LCP/Lighthouse high).
 *
 * All faces are token-driven via Tailwind fill/stroke utilities, so they read
 * correctly in both themes. `title`/`role` make each one an accessible image.
 */

interface GarmentProps {
  className?: string;
  title?: string;
}

const svgBase =
  "h-full w-full [stroke-linejoin:round] [stroke-linecap:round]";

function Tee({ className, title = "Oversized tee, technical flat" }: GarmentProps) {
  return (
    <svg
      viewBox="0 0 280 320"
      className={cn(svgBase, className)}
      role="img"
      aria-label={title}
    >
      <path
        className="fill-elevated stroke-line-strong"
        strokeWidth={2.5}
        d="M88 40 L120 40 Q140 60 160 40 L192 40 L246 74 L232 150 L204 134 L210 300 Q140 314 70 300 L76 134 L48 150 L34 74 Z"
      />
      {/* collar rib */}
      <path className="fill-none stroke-faint" strokeWidth={2} d="M120 40 Q140 62 160 40" />
      <path className="fill-none stroke-line-strong" strokeWidth={1.4} d="M116 44 Q140 70 164 44" />
      {/* sleeve + bottom hems */}
      <path className="fill-none stroke-faint" strokeWidth={2} d="M232 150 L216 144 M48 150 L64 144" />
      <path className="fill-none stroke-faint" strokeWidth={2} d="M70 288 Q140 302 210 288" />
    </svg>
  );
}

function Hoodie({ className, title = "Pullover hoodie, technical flat" }: GarmentProps) {
  return (
    <svg
      viewBox="0 0 280 320"
      className={cn(svgBase, className)}
      role="img"
      aria-label={title}
    >
      <path
        className="fill-elevated stroke-line-strong"
        strokeWidth={2.5}
        d="M92 78 L188 78 L246 108 L230 170 L206 156 L210 292 Q140 306 70 292 L74 156 L50 170 L34 108 Z"
      />
      {/* hood */}
      <path
        className="fill-ink stroke-line-strong"
        strokeWidth={2.5}
        d="M92 78 Q140 20 188 78 Q166 94 140 94 Q114 94 92 78 Z"
      />
      <path className="fill-none stroke-faint" strokeWidth={2} d="M108 80 Q140 50 172 80" />
      {/* kangaroo pocket */}
      <path className="fill-none stroke-faint" strokeWidth={2} d="M96 196 L184 196 L176 246 L104 246 Z" />
      {/* drawstrings + iris aglets */}
      <path className="fill-none stroke-faint" strokeWidth={2.5} d="M130 90 L128 140 M150 90 L152 140" />
      <circle className="fill-iris" cx={128} cy={144} r={3.5} />
      <circle className="fill-iris" cx={152} cy={144} r={3.5} />
      {/* cuff + hem ribbing */}
      <path className="fill-none stroke-faint" strokeWidth={2} d="M50 170 L74 156 M230 170 L206 156" />
      <path className="fill-none stroke-faint" strokeWidth={2} d="M70 282 Q140 296 210 282" />
    </svg>
  );
}

function Varsity({ className, title = "Varsity jacket, technical flat" }: GarmentProps) {
  return (
    <svg
      viewBox="0 0 280 320"
      className={cn(svgBase, className)}
      role="img"
      aria-label={title}
    >
      {/* contrast sleeves */}
      <path
        className="fill-ink stroke-line-strong"
        strokeWidth={2.5}
        d="M92 74 L40 100 L36 250 Q57 262 78 250 L96 150 Z"
      />
      <path
        className="fill-ink stroke-line-strong"
        strokeWidth={2.5}
        d="M188 74 L240 100 L244 250 Q223 262 202 250 L184 150 Z"
      />
      {/* body */}
      <path
        className="fill-elevated stroke-line-strong"
        strokeWidth={2.5}
        d="M92 74 L188 74 L184 150 L188 292 Q140 304 92 292 L96 150 Z"
      />
      {/* ribbed collar */}
      <path
        className="fill-ink stroke-line-strong"
        strokeWidth={2.5}
        d="M100 74 Q140 92 180 74 L176 58 Q140 74 104 58 Z"
      />
      {/* snap placket */}
      <path className="fill-none stroke-faint" strokeWidth={2} d="M140 80 L140 290" />
      <circle className="fill-faint" cx={140} cy={110} r={3} />
      <circle className="fill-faint" cx={140} cy={152} r={3} />
      <circle className="fill-faint" cx={140} cy={194} r={3} />
      <circle className="fill-faint" cx={140} cy={236} r={3} />
      {/* chest patch */}
      <rect className="fill-none stroke-faint" strokeWidth={2} x={108} y={120} width={20} height={24} rx={2} />
      {/* iris ribbing: hem + cuffs */}
      <path className="fill-none stroke-iris" strokeWidth={2.5} d="M92 280 Q140 292 188 280" />
      <path className="fill-none stroke-faint" strokeWidth={1.4} d="M92 288 Q140 300 188 288" />
      <path className="fill-none stroke-iris" strokeWidth={2.5} d="M36 240 Q57 250 78 240 M202 240 Q223 250 244 240" />
    </svg>
  );
}

const registry: Record<GarmentKind, (p: GarmentProps) => React.JSX.Element> = {
  tee: Tee,
  hoodie: Hoodie,
  varsity: Varsity,
};

/** Renders the technical flat for a given garment kind. */
export function GarmentFlat({
  kind,
  ...props
}: GarmentProps & { kind: GarmentKind }) {
  const Flat = registry[kind];
  return <Flat {...props} />;
}
