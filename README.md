# Silryn's Blog

A personal blog built with [Hexo](https://hexo.io/) and the [Cactus](https://github.com/probberechts/hexo-theme-cactus) theme, featuring a dynamic theme switcher and deployed on Cloudflare Pages.

## Features

- 🎨 **Dynamic Theme Switcher** - Switch between 4 color schemes (Dark, Light, White, Classic) without page reload
- 🔍 **Local Search** - Fast client-side search functionality
- 📱 **Responsive Design** - Mobile-friendly layout
- ⚡ **Fast Deployment** - Automated deployment to Cloudflare Pages via GitHub Actions
- 🎯 **Git Submodule Theme** - Easy theme updates and version control

## Prerequisites

- [Bun](https://bun.sh/) (or Node.js)
- Git

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/silryn/blog.git
cd blog

# Initialize git submodules (for the theme)
git submodule update --init --recursive

# Install dependencies
bun install
```

### Development

```bash
# Start local development server
bun run server

# Visit http://localhost:4000
```

### Build

```bash
# Clean previous build
bun run clean

# Generate static files
bun run build

# Output will be in the dist/ directory
```

## Theme Switcher

This blog features a custom theme switcher that allows users to toggle between 4 color schemes in real-time.

### How It Works

- **Button**: A floating button in the bottom-right corner displays the current theme icon
- **Themes**: 🌙 Dark, ☀️ Light, ⚪ White, 🎨 Classic
- **Persistence**: User preference is saved in localStorage
- **Smooth Transition**: Fade effect during theme switching

### Rebuilding Theme Variants

If you update the Cactus theme or modify theme configurations, you need to regenerate all theme CSS files:

```bash
bash build-all-themes.sh
```

This script:
1. Builds the site 4 times with different `colorscheme` settings
2. Generates `style-dark.css`, `style-light.css`, `style-white.css`, `style-classic.css`
3. Saves them to `source/css/` for the theme switcher to use

**When to run this script:**
- After updating the theme submodule (`git submodule update --remote themes/cactus`)
- After modifying theme configuration in `_config.cactus.yml`
- When setting up the project for the first time (if CSS files are missing)

**Note:** The generated CSS files are committed to the repository, so you don't need to run this script for normal development or deployment.

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy-cloudflare.yml    # CI/CD configuration
├── source/                          # Source files
│   ├── _posts/                      # Blog posts
│   ├── about/                       # About page
│   ├── search/                      # Search page
│   ├── images/                      # Images (favicon, logo)
│   ├── css/                         # Custom CSS
│   │   ├── custom.css              # Custom styles
│   │   ├── style-dark.css          # Dark theme
│   │   ├── style-light.css         # Light theme
│   │   ├── style-white.css         # White theme
│   │   └── style-classic.css       # Classic theme
│   └── js/
│       └── theme-switcher.js        # Theme switching logic
├── scripts/                         # Hexo scripts
│   └── theme-switcher-injector.js   # Injects theme switcher into pages
├── themes/
│   └── cactus/                      # Theme (git submodule)
├── _config.yml                      # Hexo configuration
├── _config.cactus.yml              # Theme configuration
├── build-all-themes.sh             # Theme CSS generator script
└── package.json                     # Dependencies

```

## Writing Posts

Create a new post:

```bash
hexo new "My New Post"
```

This creates a new file in `source/_posts/`. Edit it with your content using Markdown.

### Front Matter Example

```yaml
---
title: My Post Title
date: 2026-01-15 10:00:00
tags:
  - tag1
  - tag2
categories:
  - category1
---

Your content here...
```

## Configuration

### Site Configuration (`_config.yml`)

Main Hexo configuration including site title, URL, and plugins.

### Theme Configuration (`_config.cactus.yml`)

Theme-specific settings:
- Navigation menu
- Social links
- Logo and favicon
- Color scheme (default)
- Analytics
- Comments

## Deployment

### Automatic Deployment (Recommended)

Push to the `main` branch triggers automatic deployment to Cloudflare Pages via GitHub Actions.

The workflow:
1. Checks out code with submodules
2. Sets up Bun
3. Installs dependencies
4. Adds build information to About page
5. Builds the site
6. Deploys to Cloudflare Pages

### Manual Deployment

```bash
# Build the site
bun run build

# Deploy the dist/ directory to your hosting provider
```

## Theme Updates

To update the Cactus theme:

```bash
# Update the submodule to the latest version
git submodule update --remote themes/cactus

# Regenerate theme CSS files
bash build-all-themes.sh

# Commit the changes
git add themes/cactus source/css/style-*.css
git commit -m "Update Cactus theme"
git push
```

## Customization

### Custom Styles

Add custom CSS to `source/css/custom.css`. This file is automatically loaded and won't be overwritten by theme updates.

### Custom Scripts

Add Hexo scripts to the `scripts/` directory. They will be automatically loaded during build.

## Troubleshooting

### Theme not loading

```bash
# Ensure submodules are initialized
git submodule update --init --recursive
```

### Theme switcher not working

```bash
# Regenerate theme CSS files
bash build-all-themes.sh
```

### Build errors

```bash
# Clean and rebuild
bun run clean
bun run build
```

## License

- Blog content: © Silryn
- Hexo: MIT License
- Cactus Theme: MIT License

## Links

- **Blog**: https://blog.silryn.com
- **Hexo**: https://hexo.io/
- **Cactus Theme**: https://github.com/probberechts/hexo-theme-cactus
