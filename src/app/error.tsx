"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

/**
 * Route-level error boundary. States what happened and offers the one action
 * that fixes it (retry) — errors don't apologize or stay vague.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Hook a real reporter (Sentry, etc.) in here per environment.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="spec-line text-danger">Something broke</p>
      <h1 className="mt-5 max-w-[18ch] font-poster text-d-lg uppercase dbz-outline md:text-d-xl">
        We hit a snag loading this page.
      </h1>
      <p className="mt-4 max-w-prose text-lg text-muted">
        It&apos;s on us, not you. Try again — if it keeps happening, the store
        will be back shortly.
      </p>
      <div className="mt-8">
        <Button size="lg" onClick={reset}>
          Try again
        </Button>
      </div>
    </Container>
  );
}
