# List available recipes.
default:
    @just --list

# Install dependencies (bun).
install:
    bun install

# Start the Hexo dev server at http://localhost:4000.
serve:
    bun run server

# Generate the static site into ./dist.
build:
    bun run build

# Remove generated files (dist/, db.json, public/).
clean:
    bun run clean

# Create a new post. Usage: just new "post title"
new title:
    bunx hexo new "{{title}}"

# Create a new draft. Usage: just draft "title"
draft title:
    bunx hexo new draft "{{title}}"

# Regenerate per-theme CSS variants used by the runtime theme switcher.
themes:
    ./build-all-themes.sh

# Run markdownlint over all posts.
lint:
    bunx markdownlint-cli2 'source/_posts/*.md'

# Initialize / refresh the cactus theme git submodule.
submodule:
    git submodule update --init --recursive

# Update the cactus theme submodule to its latest remote commit.
update-theme:
    git submodule update --remote themes/cactus

# Full pre-deploy workflow: clean, rebuild theme CSS, build the site.
release: clean themes build
    @echo "Site built to ./dist"
