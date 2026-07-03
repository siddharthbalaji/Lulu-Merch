"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { DragonStar } from "@/components/ui/star";
import {
  useCart,
  cartSubtotal,
  FREE_SHIPPING_THRESHOLD,
  type CartLine,
} from "./store";

/**
 * Guest checkout (front-end demonstration flow).
 *
 * UX rationale (Laws of UX):
 *   Goal Gradient — a persistent order summary + free-shipping progress keeps
 *                   the finish line visible.
 *   Hick's Law — one guest form, payment method chosen from a short radio set.
 *   Fitts's Law — full-width primary CTA; inputs are comfortably tall.
 *   Feedback — inline validation and a clear success state on submit.
 *   Postel's Law — accepts input leniently, validates the essentials only.
 * Note: this is a designed demonstration — no live payment is processed.
 */
const SHIPPING_FLAT = 79;

type Fields = {
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin: string;
};

const empty: Fields = { email: "", name: "", phone: "", address: "", city: "", state: "", pin: "" };

const PAYMENTS = [
  { id: "upi", label: "UPI", note: "GPay · PhonePe · Paytm" },
  { id: "card", label: "Card", note: "Visa · Mastercard · RuPay" },
  { id: "wallet", label: "Wallet", note: "Amazon Pay · Mobikwik" },
  { id: "cod", label: "Cash on delivery", note: "₹49 handling" },
] as const;

export function CheckoutClient() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const subtotal = cartSubtotal(lines);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;

  const [f, setF] = React.useState<Fields>(empty);
  const [pay, setPay] = React.useState<(typeof PAYMENTS)[number]["id"]>("upi");
  const [errors, setErrors] = React.useState<Partial<Record<keyof Fields, string>>>({});
  const [placed, setPlaced] = React.useState(false);

  const codFee = pay === "cod" && subtotal > 0 ? 49 : 0;
  const total = subtotal + shipping + codFee;

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) next.email = "Enter a valid email";
    if (f.name.trim().length < 2) next.name = "Required";
    if (!/^\d{10}$/.test(f.phone.replace(/\D/g, ""))) next.phone = "10-digit phone";
    if (f.address.trim().length < 6) next.address = "Required";
    if (f.city.trim().length < 2) next.city = "Required";
    if (f.state.trim().length < 2) next.state = "Required";
    if (!/^\d{6}$/.test(f.pin)) next.pin = "6-digit PIN";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) {
      const first = document.querySelector<HTMLInputElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setPlaced(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className="panel mx-auto flex max-w-lg flex-col items-center gap-4 p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-kame" aria-hidden />
        <h1 className="font-poster text-3xl uppercase tracking-tight text-paper">Order placed</h1>
        <p className="text-muted">
          Thanks, {f.name.split(" ")[0] || "friend"} — a confirmation is on its way to{" "}
          <span className="font-medium text-paper">{f.email}</span>. This is a demonstration checkout,
          so no payment was taken and nothing will ship.
        </p>
        <Button asChild variant="primary" className="mt-2">
          <Link href="/shop">Keep shopping</Link>
        </Button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="panel mx-auto flex max-w-lg flex-col items-center gap-4 p-10 text-center">
        <ShoppingBag className="h-12 w-12 text-muted" aria-hidden />
        <h1 className="font-poster text-3xl uppercase tracking-tight text-paper">Your cart is empty</h1>
        <p className="text-muted">Add a piece or two and they&rsquo;ll show up here.</p>
        <Button asChild variant="primary" className="mt-2">
          <Link href="/shop">Browse the shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      {/* form */}
      <div className="flex flex-col gap-8">
        <Section title="Contact">
          <Field label="Email" error={errors.email}>
            <Input value={f.email} onChange={set("email")} type="email" placeholder="you@email.com" invalid={!!errors.email} autoComplete="email" />
          </Field>
        </Section>

        <Section title="Shipping address">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" error={errors.name}>
              <Input value={f.name} onChange={set("name")} placeholder="Full name" invalid={!!errors.name} autoComplete="name" />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <Input value={f.phone} onChange={set("phone")} placeholder="10-digit number" invalid={!!errors.phone} inputMode="numeric" autoComplete="tel" />
            </Field>
          </div>
          <Field label="Address" error={errors.address}>
            <Input value={f.address} onChange={set("address")} placeholder="House no., street, area" invalid={!!errors.address} autoComplete="street-address" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="City" error={errors.city}>
              <Input value={f.city} onChange={set("city")} invalid={!!errors.city} autoComplete="address-level2" />
            </Field>
            <Field label="State" error={errors.state}>
              <Input value={f.state} onChange={set("state")} invalid={!!errors.state} autoComplete="address-level1" />
            </Field>
            <Field label="PIN code" error={errors.pin}>
              <Input value={f.pin} onChange={set("pin")} invalid={!!errors.pin} inputMode="numeric" autoComplete="postal-code" />
            </Field>
          </div>
        </Section>

        <Section title="Payment">
          <div className="grid gap-3 sm:grid-cols-2">
            {PAYMENTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPay(p.id)}
                aria-pressed={pay === p.id}
                className={cn(
                  "flex items-center justify-between rounded border-2 px-4 py-3 text-left transition-colors",
                  pay === p.id ? "border-kame bg-kame/5" : "border-line-strong hover:bg-elevated",
                )}
              >
                <span>
                  <span className="block font-semibold text-paper">{p.label}</span>
                  <span className="spec-line text-faint">{p.note}</span>
                </span>
                <span className={cn("grid h-5 w-5 place-items-center rounded-full border-2", pay === p.id ? "border-kame" : "border-line")}>
                  {pay === p.id && <span className="h-2.5 w-2.5 rounded-full bg-kame" />}
                </span>
              </button>
            ))}
          </div>
        </Section>
      </div>

      {/* summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="panel p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-paper">
            <DragonStar className="h-4 w-4" /> Order summary
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {lines.map((l) => (
              <SummaryLine key={`${l.slug}-${l.size}-${l.color}`} line={l} />
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
            {codFee > 0 && <Row label="COD handling" value={formatPrice(codFee)} />}
            <div className="flex items-center justify-between border-t border-line pt-3">
              <dt className="font-display text-base font-semibold text-paper">Total</dt>
              <dd className="font-mono text-lg font-semibold tabular text-paper">{formatPrice(total)}</dd>
            </div>
          </dl>

          <Button onClick={placeOrder} variant="primary" size="lg" className="mt-5 w-full">
            Place order · {formatPrice(total)}
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-faint">
            <Lock className="h-3.5 w-3.5" aria-hidden /> Demonstration checkout — no payment is taken
          </p>
        </div>
      </aside>
    </div>
  );
}

function SummaryLine({ line }: { line: CartLine }) {
  return (
    <li className="flex gap-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded border-2 border-line-strong bg-elevated">
        {line.image ? (
          <Image src={line.image} alt={line.name} fill sizes="56px" className="object-contain p-1" />
        ) : (
          <span className="grid h-full w-full place-items-center text-xs text-faint">{line.qty}×</span>
        )}
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-line-strong bg-ink px-1 font-mono text-[0.6rem] text-paper">
          {line.qty}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-paper">{line.name}</p>
        <p className="spec-line text-faint">{line.size} · {line.color}</p>
      </div>
      <span className="font-mono text-sm tabular text-paper">{formatPrice(line.price * line.qty)}</span>
    </li>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel p-5">
      <h2 className="mb-4 font-display text-lg font-semibold text-paper">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="spec-line mb-1.5 block text-faint">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-kame">{error}</span>}
    </label>
  );
}

function Input({
  invalid,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "h-11 w-full rounded border-2 bg-surface px-3 text-sm text-paper placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kame",
        invalid ? "border-kame" : "border-line-strong",
        className,
      )}
      {...props}
    />
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-muted">
      <dt>{label}</dt>
      <dd className="font-mono tabular text-paper">{value}</dd>
    </div>
  );
}
