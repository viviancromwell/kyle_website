---
name: design-rules
description: Mandatory design rules for this portfolio site. ALWAYS follow these rules when editing CSS, HTML, Astro components, or managing images/assets. Enforces design tokens, image handling, asset organization, and accessibility.
---

# Design Rules

These rules are mandatory for all changes in this repo.

## Design Tokens (from `src/styles/tokens.css`)

- **All** colors, font sizes, spacing, radii must use `var(--*)` tokens.
- **Never hardcode** `#hex`, `rgb()`, `px` font-size, `px` margin/padding/gap values in page styles.
- Allowed exceptions: `0`, `1px` (borders), `100%`, `auto`, `50%` (centering), z-index, structural calc values.
- New design values get added to `tokens.css` first, then used via `var(--*)`.

## Images

- All images live in `src/assets/<section>/` subfolders. Never create image folders elsewhere.
- All images must have descriptive `alt` text. Never use the words "image", "photo", or "picture" in alt text — screen readers already announce images.
- Hero and above-the-fold images: `loading="eager"`. Everything else: `loading="lazy"`.

## Layout

- Max page width: `var(--max-width-page)`, centered.
- Mobile-first responsive design using `min-width` breakpoints.
- No CSS frameworks. No inline styles in HTML.

## Code Conventions

- Class naming: `.component-element` pattern (e.g. `.work-list`, `.swatch-chip`).
- Vanilla HTML/CSS/JS only — no JavaScript frameworks.
- When creating new pages, check existing pages first and replicate their patterns.

## Accessibility

- WCAG AA contrast is mandatory: 4.5:1 for body text, 3:1 for large text.
- Semantic HTML elements (`nav`, `main`, `header`, `article`, `section`, `figure`).
- All interactive elements keyboard accessible; visible focus states.

## Showcase Page

- `/showcase` (src/pages/showcase.astro) is the living design-system page. It renders tokens straight from `tokens.css` — never hardcode values there.
- **When you build a new reusable component, add a demo section for it on `/showcase`** (its own `<section>` with a nav entry, a live example in a `.ds-demo` block, and a one-line usage note). The showcase must always reflect the real component inventory.
- **Three artifacts must always agree**: `DESIGN.md` (the words), `tokens.css` (the values), `/showcase` (the picture). After any change to `tokens.css`, update `DESIGN.md` to match — `/impeccable document` regenerates it from the code.

## Design Direction

- `PRODUCT.md` and `DESIGN.md` at the repo root define what this site is and how it should feel. Read them before design work; they win over generic best practice.
