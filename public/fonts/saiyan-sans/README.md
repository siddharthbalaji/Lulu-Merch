# Saiyan Sans (Dragon Ball Z display font)

This folder holds the **Saiyan Sans** font used for the poster/display headings
and the DBZ logotype treatment.

- Font: **Saiyan Sans** by Ben Palmer — 100% free (dafont.com/saiyan-sans.font)
- Expected file: `Saiyan-Sans.ttf` (the regular weight)

## Install it

From the project root, run:

```bash
npm run fonts
```

This downloads the free archive from dafont and drops `Saiyan-Sans.ttf` here.
`src/app/globals.css` references it via `@font-face`, so once the file exists
every `font-poster` heading renders in the DBZ face automatically. If the file
is missing, headings fall back to **Anton**, so the site still builds and looks
intentional either way.
