#!/bin/bash

THEMES=("dark" "light" "white" "classic")
CONFIG_FILE="_config.cactus.yml"
BACKUP_FILE="_config.cactus.yml.backup"

# Create css directory in source if it doesn't exist
mkdir -p source/css

# Backup original config
cp "$CONFIG_FILE" "$BACKUP_FILE"

echo "Building all theme variants..."

for theme in "${THEMES[@]}"; do
  echo "Building $theme theme..."
  
  # Update colorscheme in config
  sed -i "s/^colorscheme:.*/colorscheme: $theme/" "$CONFIG_FILE"
  
  # Clean and build
  bun run clean > /dev/null 2>&1
  bun run build > /dev/null 2>&1
  
  # Copy the generated CSS to source directory with theme-specific name
  if [ -f "dist/css/style.css" ]; then
    cp "dist/css/style.css" "source/css/style-$theme.css"
    echo "✓ Generated style-$theme.css"
  fi
done

# Restore original config
mv "$BACKUP_FILE" "$CONFIG_FILE"

# Final build with original config
echo "Building final site..."
bun run clean > /dev/null 2>&1
bun run build > /dev/null 2>&1

echo "✓ All theme variants generated!"
echo "✓ Theme CSS files saved to source/css/"
