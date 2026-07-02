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
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded font-medium " +
    "transition-[background-color,border-color,color,transform] duration-200 ease-brand " +
    "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 " +
    "active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "bg-iris text-iris-contrast hover:bg-iris-strong",
        secondary:
          "bg-elevated text-paper border border-line-strong hover:border-paper/40 hover:bg-elevated/70",
        outline:
          "border border-line-strong text-paper hover:border-paper/50 hover:bg-paper/[0.03]",
        ghost: "text-muted hover:bg-paper/[0.05] hover:text-paper",
        link: "text-paper underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
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
