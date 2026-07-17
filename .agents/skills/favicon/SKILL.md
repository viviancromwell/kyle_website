---
name: favicon
description: Generate a complete set of favicons from a source image and update HTML. Use when setting up favicons for a web project.
argument-hint: [path to source image]
---

Generate a complete set of favicons from the source image at `$1` and update the project's HTML with the appropriate link tags.

## Prerequisites

First, verify ImageMagick v7+ is installed by running:
```bash
which magick
```

If not found, stop and instruct the user to install it:
- **macOS**: `brew install imagemagick`
- **Linux**: `sudo apt install imagemagick`

## Step 1: Validate Source Image

1. Verify the source image exists at the provided path: `$1`
2. Check the file extension is a supported format (PNG, JPG, JPEG, SVG, WEBP, GIF)
3. If the file doesn't exist or isn't a valid image format, report the error and stop

Note whether the source is an SVG file - if so, it will also be copied as `favicon.svg`.

## Step 2: Detect Project Type and Static Assets Directory

Detect the project type and determine where static assets should be placed. Check in this order:

| Framework | Detection | Static Assets Directory |
|-----------|-----------|------------------------|
| **Rails** | `config/routes.rb` exists | `public/` |
| **Next.js** | `next.config.*` exists | `public/` |
| **Gatsby** | `gatsby-config.*` exists | `static/` |
| **SvelteKit** | `svelte.config.*` exists | `static/` |
| **Astro** | `astro.config.*` exists | `public/` |
| **Hugo** | `hugo.toml` or `config.toml` with Hugo markers | `static/` |
| **Jekyll** | `_config.yml` with Jekyll markers | Root directory |
| **Vite** | `vite.config.*` exists | `public/` |
| **Create React App** | `package.json` has `react-scripts` dependency | `public/` |
| **Vue CLI** | `vue.config.*` exists | `public/` |
| **Angular** | `angular.json` exists | `src/assets/` |
| **Static HTML** | `index.html` in root | Same directory as `index.html` |

**Important**: If existing favicon files are found, use their location as the target directory.

## Step 3: Determine App Name

Find the app name from these sources (in priority order):
1. Existing `site.webmanifest` - extract `name` field
2. `package.json` - extract `name` field
3. Directory name as fallback

## Step 4: Generate Favicon Files

Run these ImageMagick commands (replace `[STATIC_DIR]` with detected directory):

```bash
# favicon.ico (multi-resolution: 16x16, 32x32, 48x48)
magick "$1" \( -clone 0 -resize 16x16 \) \( -clone 0 -resize 32x32 \) \( -clone 0 -resize 48x48 \) -delete 0 -alpha on -background none [STATIC_DIR]/favicon.ico

# favicon-96x96.png
magick "$1" -resize 96x96 -background none -alpha on [STATIC_DIR]/favicon-96x96.png

# apple-touch-icon.png (180x180)
magick "$1" -resize 180x180 -background none -alpha on [STATIC_DIR]/apple-touch-icon.png

# web-app-manifest-192x192.png
magick "$1" -resize 192x192 -background none -alpha on [STATIC_DIR]/web-app-manifest-192x192.png

# web-app-manifest-512x512.png
magick "$1" -resize 512x512 -background none -alpha on [STATIC_DIR]/web-app-manifest-512x512.png

# favicon.svg (only if source is SVG)
cp "$1" [STATIC_DIR]/favicon.svg
```

## Step 5: Create/Update site.webmanifest

Create or update `[STATIC_DIR]/site.webmanifest` with icons configuration.

## Step 6: Update HTML/Layout Files

Based on detected project type, update the appropriate file with favicon link tags.

### For Next.js Projects

Update the `metadata` export in layout file to include icons configuration:

```typescript
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: { title: '[APP_NAME]' },
};
```

## Step 7: Summary

Report: detected project type, static assets directory, files generated, app name used, and layout file updated.