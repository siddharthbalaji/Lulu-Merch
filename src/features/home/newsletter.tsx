"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DragonStar } from "@/components/ui/star";

/**
 * Newsletter — minimal, premium, honest.
 *
 * UX rationale (Laws of UX):
 *   Hick's Law — one field, one action; nothing to decide but "in or not".
 *   Fitts's Law — a large input and an equally large submit target.
 *   Peak-End — a crisp confirmation state ends the page on a satisfying note.
 *   Doherty — inline validation responds instantly; no full-page reload.
 * Front-end only: this validates and confirms locally. Wire the handler to your
 * ESP (Klaviyo / Mailchimp) in `onSubmit` — no data leaves the browser here.
 */
export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setStatus("error");
      return;
    }
    // TODO: POST to your email provider here.
    setStatus("done");
  };

  return (
    <section aria-labelledby="nl-heading" className="border-t-2 border-line-strong bg-ink py-section">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="spec-line flex items-center justify-center gap-2">
            <DragonStar className="h-4 w-4" /> First look
          </p>
          <h2 id="nl-heading" className="mt-3 font-poster text-d-lg uppercase dbz-outline md:text-d-xl">
            Get the drop alert
          </h2>
          <p className="mt-3 text-muted">
            One email per drop. Sizes, numbers, and the on-sale time — nothing else. Unsubscribe in one tap.
          </p>

          {status === "done" ? (
            <p className="mx-auto mt-8 inline-flex items-center gap-2 rounded-md border-2 border-line-strong bg-saiyan px-5 py-3 font-semibold text-saiyan-ink shadow-hard">
              <Check className="h-5 w-5" aria-hidden /> You&apos;re on the list. See you Saturday.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="flex-1 text-left">
                <label htmlFor="nl-email" className="sr-only">Email address</label>
                <input
                  id="nl-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "nl-error" : undefined}
                  className="h-12 w-full rounded border-2 border-line-strong bg-surface px-4 text-base text-paper outline-none placeholder:text-faint focus-visible:border-kame"
                />
                {status === "error" && (
                  <p id="nl-error" className="mt-1.5 text-caption text-kame">
                    Enter a valid email address.
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded border-2 border-line-strong bg-kame px-6 font-semibold text-on-brand shadow-hard transition-transform duration-150 ease-brand hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                Notify me
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
