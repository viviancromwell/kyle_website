# House Rules

This is a student portfolio site for the AI-Native Design Studio course.

- Every color, font size, spacing, and radius value comes from `src/styles/tokens.css` via `var(--*)`. Never hardcode hex colors or px sizes in page styles.
- No CSS frameworks, no JS frameworks. Vanilla HTML/CSS/JS inside Astro.
- One exception: **Motion** (`motion`) is allowed for scroll-linked and gesture animation. It is a library, not a framework — no components, no runtime, no build step. Reach for CSS first; use Motion where CSS cannot express the effect with the same control, as with scroll-linked parallax. Keep animations on compositor properties so they stay S-tier.
- `PRODUCT.md` and `DESIGN.md` at the repo root describe what this site is and how it should look. Read them before any design work.
- Full rules (images, assets, accessibility) live in the `design-rules` skill — they are mandatory.
- Semantic HTML, mobile-first, WCAG AA contrast.
