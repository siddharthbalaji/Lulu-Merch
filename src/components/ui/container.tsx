import * as React from "react";
import { cn } from "@/lib/utils";

/** Centered max-width wrapper matching the Tailwind container tokens. */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1360px] px-5 md:px-8 lg:px-12",
        className
      )}
      {...props}
    />
  );
}
