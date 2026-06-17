#!/usr/bin/env bash
#
# Generate per-theme CSS variants used by the runtime theme switcher.
#
# For each colorscheme we run `hexo generate` with a temporary config that
# overrides `theme_config.colorscheme`. The compiled style.css is copied
# into source/css/style-<theme>.css so the switcher can swap stylesheets
# client-side.
#
# This script does NOT do a final site rebuild — run `just build` afterwards
# (or `bun run build`) when you actually want to produce the site.

set -euo pipefail

THEMES=(dark light white classic)
OUT_DIR="source/css"

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  sed -n '3,12p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
fi

# Resolve a runner — prefer bun, fall back to npx so the script works for
# contributors who don't have bun installed.
if command -v bun >/dev/null 2>&1; then
  RUN=(bunx)
elif command -v npx >/dev/null 2>&1; then
  RUN=(npx --no-install)
else
  echo "error: neither 'bun' nor 'npx' is on PATH" >&2
  exit 1
fi

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$OUT_DIR"

build_one() {
  local theme="$1"
  local override="$TMP/override-$theme.yml"

  cat > "$override" <<EOF
theme_config:
  colorscheme: $theme
EOF

  printf '==> [%s] generating...\n' "$theme"
  "${RUN[@]}" hexo clean
  "${RUN[@]}" hexo generate --config "_config.yml,$override"

  local src="dist/css/style.css"
  local dst="$OUT_DIR/style-$theme.css"
  if [[ ! -f "$src" ]]; then
    echo "error: $src was not produced for theme '$theme'" >&2
    return 1
  fi
  cp "$src" "$dst"
  printf '    -> %s (%s)\n' "$dst" "$(wc -c < "$dst" | tr -d ' ') bytes"
}

for theme in "${THEMES[@]}"; do
  build_one "$theme"
done

echo
echo "Done. Generated CSS files:"
ls -1 "$OUT_DIR"/style-*.css
echo
echo "Run 'just build' (or 'bun run build') to produce the final site."
