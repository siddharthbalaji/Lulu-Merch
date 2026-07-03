import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — the primary interactive primitive.
 * Fitts's Law: generous, consistent hit areas (min 44px tall at `md`+).
 * Radius is intentionally tight (brief bans over-rounded).
 */
const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded font-semibold " +
    "transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-brand " +
    "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary — Kame red, black keyline, hard offset shadow that presses in on click.
        primary:
          "border-2 border-line-strong bg-kame text-on-brand shadow-hard " +
          "hover:bg-kame-strong hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-lg " +
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
        // Secondary — Saiyan gold on black text, same inked frame.
        secondary:
          "border-2 border-line-strong bg-saiyan text-saiyan-ink shadow-hard " +
          "hover:-translate-x-px hover:-translate-y-px hover:shadow-hard-lg " +
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
        // Outline — inked frame on the white canvas.
        outline:
          "border-2 border-line-strong bg-surface text-paper " +
          "hover:bg-elevated active:translate-y-px",
        ghost: "text-muted hover:bg-paper/[0.06] hover:text-paper active:translate-y-px",
        link: "font-medium text-kame underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element as the button (e.g. an <a> or Next <Link>). */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
