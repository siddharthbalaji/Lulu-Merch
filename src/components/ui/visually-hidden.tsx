import * as React from "react";

/** Hides content visually while keeping it available to assistive tech. */
export function VisuallyHidden({
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
      {...props}
    >
      {children}
    </span>
  );
}
