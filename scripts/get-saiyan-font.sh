#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Fetch the Saiyan Sans DBZ font (Ben Palmer — 100% free, dafont.com) and
# install it at public/fonts/saiyan-sans/. Run once after cloning:
#
#     npm run fonts
#
# The font is referenced by globals.css via @font-face; once this file is in
# place every `font-poster` heading renders in the Dragon Ball Z face. Until
# then headings fall back to Anton, so the site works either way.
# ---------------------------------------------------------------------------
set -euo pipefail

DEST="public/fonts/saiyan-sans"
URL="https://dl.dafont.com/dl/?f=saiyan_sans"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "→ Downloading Saiyan Sans from dafont…"
if command -v curl >/dev/null 2>&1; then
  curl -fL -A "Mozilla/5.0" "$URL" -o "$TMP/saiyan.zip"
elif command -v wget >/dev/null 2>&1; then
  wget -q -U "Mozilla/5.0" "$URL" -O "$TMP/saiyan.zip"
else
  echo "✗ Need curl or wget installed." >&2; exit 1
fi

echo "→ Unzipping…"
mkdir -p "$DEST"
if command -v unzip >/dev/null 2>&1; then
  unzip -o -j "$TMP/saiyan.zip" -d "$DEST" >/dev/null
else
  # Fallback to Python if unzip is unavailable.
  python3 - "$TMP/saiyan.zip" "$DEST" <<'PY'
import sys, zipfile, os
zf, dest = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(zf) as z:
    for n in z.namelist():
        if n.lower().endswith(('.ttf', '.otf')):
            data = z.read(n)
            open(os.path.join(dest, os.path.basename(n)), 'wb').write(data)
PY
fi

# The regular weight is the one @font-face expects.
if [ -f "$DEST/Saiyan-Sans.ttf" ]; then
  echo "✓ Installed $DEST/Saiyan-Sans.ttf"
else
  # Normalise whatever the archive named the regular face.
  reg="$(ls "$DEST" | grep -iE 'saiyan.?sans( ?left)?\.ttf$' | grep -viE 'oblique' | head -n1 || true)"
  if [ -n "$reg" ] && [ "$reg" != "Saiyan-Sans.ttf" ]; then
    cp "$DEST/$reg" "$DEST/Saiyan-Sans.ttf"
    echo "✓ Installed $DEST/Saiyan-Sans.ttf (from \"$reg\")"
  fi
fi

echo "Done. Restart 'npm run dev' to see the DBZ headings."
