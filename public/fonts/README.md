# Local fonts

Drop licensed `.woff2` files here to use the brief's first-choice faces:

- `ClashDisplay-Variable.woff2` → display role
- `Geist-Variable.woff2` → body role (optional; Inter is the current default)

Then switch the matching import in `src/lib/fonts.ts` from `next/font/google`
to `next/font/local`, e.g.:

```ts
import localFont from "next/font/local";

export const fontDisplay = localFont({
  src: "../../public/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-display",
  display: "swap",
});
```

Everything downstream reads the `--font-*` CSS variables, so no component
changes are needed.
