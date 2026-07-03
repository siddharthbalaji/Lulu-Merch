"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, LayoutGrid, Rows3, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "./product-card";
import {
  products,
  lines as allLines,
  availabilityLabel,
  availabilityDot,
  type Availability,
  type Product,
} from "./products";

/**
 * Shop / product-listing view.
 *
 * UX rationale (Laws of UX):
 *   Jakob's Law — a left filter rail + sort control + grid is the pattern every
 *                 shopper already knows; we don't reinvent it.
 *   Hick's Law — filters are grouped and limited to attributes we actually
 *                stock (franchise, size, availability), so choices stay scannable.
 *   Von Restorff — active filters surface as removable red-keyed chips.
 *   Fitts's Law — filter rows and the view toggle are large tap targets.
 *   Feedback — a live result count updates as filters change.
 *   Aesthetic-Usability — the inked panel language carries over from the home page.
 */

export type SortKey = "trending" | "new" | "price-asc" | "price-desc";

export interface ShopInitial {
  line?: string;
  sort?: SortKey;
  limited?: boolean;
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const AVAIL: Availability[] = ["in-stock", "low", "waitlist"];

const sortLabels: Record<SortKey, string> = {
  trending: "Trending",
  new: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

function toggle<T>(set: Set<T>, v: T): Set<T> {
  const next = new Set(set);
  next.has(v) ? next.delete(v) : next.add(v);
  return next;
}

export function ShopClient({ initial }: { initial: ShopInitial }) {
  const router = useRouter();
  const [lines, setLines] = React.useState<Set<string>>(
    new Set(initial.line ? [initial.line] : []),
  );
  const [sizes, setSizes] = React.useState<Set<string>>(new Set());
  const [avail, setAvail] = React.useState<Set<Availability>>(new Set());
  const [limitedOnly, setLimitedOnly] = React.useState(!!initial.limited);
  const [sort, setSort] = React.useState<SortKey>(initial.sort ?? "trending");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [sheetOpen, setSheetOpen] = React.useState(false);

  // Keep the URL shareable without forcing a Suspense boundary (no useSearchParams).
  React.useEffect(() => {
    const p = new URLSearchParams();
    if (lines.size === 1) {
      const only = [...lines][0];
      if (only) p.set("line", only);
    }
    if (sort !== "trending") p.set("sort", sort);
    if (limitedOnly) p.set("limited", "1");
    const qs = p.toString();
    router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  }, [lines, sort, limitedOnly, router]);

  const filtered = React.useMemo(() => {
    let list = products.filter((p) => {
      if (lines.size && !lines.has(p.line)) return false;
      if (limitedOnly && !p.limited) return false;
      if (avail.size && !avail.has(p.availability)) return false;
      if (sizes.size && !p.sizes.some((s) => sizes.has(s))) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "new":
          return Number(!!b.isNew) - Number(!!a.isNew);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return b.claimed / b.editionSize - a.claimed / a.editionSize;
      }
    });
    return list;
  }, [lines, sizes, avail, limitedOnly, sort]);

  const activeCount =
    lines.size + sizes.size + avail.size + (limitedOnly ? 1 : 0);

  const clearAll = () => {
    setLines(new Set());
    setSizes(new Set());
    setAvail(new Set());
    setLimitedOnly(false);
  };

  const filters = (
    <div className="flex flex-col gap-7">
      <FilterGroup label="Franchise">
        {allLines().map((l) => (
          <CheckRow
            key={l}
            checked={lines.has(l)}
            onClick={() => setLines((s) => toggle(s, l))}
            label={l}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Size">
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSizes((prev) => toggle(prev, s))}
              aria-pressed={sizes.has(s)}
              className={cn(
                "min-w-[2.5rem] rounded border-2 px-2 py-1.5 text-sm font-semibold transition-colors",
                sizes.has(s)
                  ? "border-line-strong bg-ink text-paper"
                  : "border-line text-muted hover:border-line-strong",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Availability">
        {AVAIL.map((a) => (
          <CheckRow
            key={a}
            checked={avail.has(a)}
            onClick={() => setAvail((s) => toggle(s, a))}
            label={
              <span className="inline-flex items-center gap-2">
                <span className={cn("h-1.5 w-1.5 rounded-full", availabilityDot[a])} />
                {availabilityLabel[a]}
              </span>
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Drop">
        <CheckRow
          checked={limitedOnly}
          onClick={() => setLimitedOnly((v) => !v)}
          label="Limited editions only"
        />
      </FilterGroup>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      {/* desktop filter rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-paper">Filters</h2>
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-sm font-medium text-kame hover:underline">
                Clear ({activeCount})
              </button>
            )}
          </div>
          {filters}
        </div>
      </aside>

      <div>
        {/* toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-line-strong pb-4">
          <p className="text-sm text-muted">
            <span className="font-mono font-semibold tabular text-paper">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSheetOpen(true)}
              className="inline-flex items-center gap-2 rounded border-2 border-line-strong px-3 py-2 text-sm font-semibold text-paper lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
              {activeCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-kame px-1 text-xs text-on-brand">
                  {activeCount}
                </span>
              )}
            </button>

            <label className="sr-only" htmlFor="sort">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded border-2 border-line-strong bg-surface px-3 py-2 text-sm font-semibold text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kame"
            >
              {Object.entries(sortLabels).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>

            <div className="hidden items-center rounded border-2 border-line-strong sm:inline-flex">
              <ViewToggle active={view === "grid"} onClick={() => setView("grid")} label="Grid view">
                <LayoutGrid className="h-4 w-4" />
              </ViewToggle>
              <ViewToggle active={view === "list"} onClick={() => setView("list")} label="List view">
                <Rows3 className="h-4 w-4" />
              </ViewToggle>
            </div>
          </div>
        </div>

        {/* active chips */}
        {activeCount > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {[...lines].map((l) => (
              <Chip key={`l-${l}`} onRemove={() => setLines((s) => toggle(s, l))}>{l}</Chip>
            ))}
            {[...sizes].map((s) => (
              <Chip key={`s-${s}`} onRemove={() => setSizes((p) => toggle(p, s))}>Size {s}</Chip>
            ))}
            {[...avail].map((a) => (
              <Chip key={`a-${a}`} onRemove={() => setAvail((s) => toggle(s, a))}>{availabilityLabel[a]}</Chip>
            ))}
            {limitedOnly && <Chip onRemove={() => setLimitedOnly(false)}>Limited only</Chip>}
          </div>
        )}

        {/* results */}
        {filtered.length === 0 ? (
          <div className="panel mt-6 flex flex-col items-center gap-3 p-12 text-center">
            <p className="font-display text-lg font-semibold text-paper">Nothing matches those filters</p>
            <p className="text-sm text-muted">Try loosening a filter or two.</p>
            <button onClick={clearAll} className="mt-2 font-semibold text-kame hover:underline">
              Clear all filters
            </button>
          </div>
        ) : view === "grid" ? (
          <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-6 flex flex-col gap-3">
            {filtered.map((p) => (
              <li key={p.slug}>
                <ListRow product={p} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* mobile filter sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setSheetOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col border-r-2 border-line-strong bg-surface">
            <div className="flex items-center justify-between border-b-2 border-line-strong p-4">
              <h2 className="font-display text-lg font-semibold text-paper">Filters</h2>
              <button onClick={() => setSheetOpen(false)} aria-label="Close filters" className="grid h-10 w-10 place-items-center rounded-full border-2 border-line-strong">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{filters}</div>
            <div className="flex gap-2 border-t-2 border-line-strong p-4">
              <button onClick={clearAll} className="flex-1 rounded border-2 border-line-strong py-2.5 text-sm font-semibold text-paper">
                Clear
              </button>
              <button onClick={() => setSheetOpen(false)} className="flex-1 rounded border-2 border-line-strong bg-kame py-2.5 text-sm font-semibold text-on-brand">
                Show {filtered.length}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="spec-line mb-3 text-faint">{label}</h3>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function CheckRow({
  checked,
  onClick,
  label,
}: {
  checked: boolean;
  onClick: () => void;
  label: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={checked}
      className="group flex items-center gap-2.5 py-1 text-left text-sm text-paper"
    >
      <span
        className={cn(
          "grid h-5 w-5 shrink-0 place-items-center rounded border-2 transition-colors",
          checked ? "border-line-strong bg-kame text-on-brand" : "border-line group-hover:border-line-strong",
        )}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className="text-muted group-hover:text-paper">{label}</span>
    </button>
  );
}

function ViewToggle({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        "grid h-9 w-9 place-items-center transition-colors",
        active ? "bg-ink text-paper" : "text-muted hover:text-paper",
      )}
    >
      {children}
    </button>
  );
}

function Chip({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-line-strong bg-surface py-1 pl-3 pr-1.5 text-xs font-semibold text-paper">
      {children}
      <button onClick={onRemove} aria-label="Remove filter" className="grid h-5 w-5 place-items-center rounded-full text-muted hover:bg-kame hover:text-on-brand">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function ListRow({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="panel panel-hover group flex items-center gap-4 overflow-hidden p-3">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded border-2 border-line-strong bg-elevated sm:h-28 sm:w-28">
        <Image src={product.image} alt={`${product.name} — ${product.line}`} fill sizes="112px" className="object-contain p-2" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {product.isNew && <span className="spec-line rounded-sm border-2 border-line-strong bg-saiyan px-1.5 py-0.5 text-[0.55rem] text-saiyan-ink">New</span>}
          <span className="spec-line text-faint">{product.line}</span>
        </div>
        <h3 className="mt-1 truncate font-display text-lg font-semibold text-paper">{product.name}</h3>
        <p className="spec-line mt-0.5 text-faint">{product.className} · {product.spec}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className={cn("h-1.5 w-1.5 rounded-full", availabilityDot[product.availability])} />
          <span className="spec-line text-muted">{availabilityLabel[product.availability]}</span>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <span className="font-mono text-base font-semibold tabular text-paper">{formatPrice(product.price)}</span>
        {product.compareAt && (
          <span className="block font-mono text-xs tabular text-faint line-through">{formatPrice(product.compareAt)}</span>
        )}
      </div>
    </Link>
  );
}
