import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DragonStar } from "@/components/ui/star";

/**
 * 404. An empty screen is an invitation to act — so this points somewhere
 * useful instead of apologizing.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="spec-line flex items-center gap-2">
        <DragonStar className="h-4 w-4" /> Error <span className="tick mx-1" /> 404
      </p>
      <h1 className="mt-5 max-w-[16ch] font-poster text-d-lg uppercase tracking-tight text-paper md:text-d-xl">
        This drop hasn&apos;t landed.
      </h1>
      <p className="mt-4 max-w-prose text-lg text-muted">
        The page you&apos;re after either moved or hasn&apos;t gone live yet.
        Head back and pick up where you left off.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/shop?sort=new">See new drops</Link>
        </Button>
      </div>
    </Container>
  );
}
