# Homepage Bookshelf Redesign

**Date:** 2026-08-01
**Status:** Approved by Vivian (brainstorm 2026-08-01)
**Scope:** `src/pages/index.astro`, `src/styles/tokens.css`, `src/styles/global.css`, `src/pages/showcase.astro`, `DESIGN.md`, `tests/home-hero.test.mjs`

## Summary

Replace the homepage's notepad destination cards and About tab with a shelf of
three closed books standing upright on the right side of the hero. The photo
prints move to the left column below the copy. Hovering a book gives a small
tip; clicking lifts it off the shelf and turns it to face the viewer, showing
its front cover; a second click navigates. Books become the primary navigation
objects, staying inside the field-journal north star: books are journal
objects too.

## Layout

Two-column hero on desktop, unchanged grounds.

- **Left column:** name (Display), kicker, intro at the top, exactly as today.
  Below the copy: the travel print and field note collage. They may overlap
  each other (rotation and tape as today) but never the copy. The field note
  keeps descending into the aubergine band, now from the left side.
- **Right column:** a thin drawn shelf ledge holding the three books. Ledge is
  a `var(--color-paper-line)` stroke with `var(--shadow-tape)`, full width of
  the column. Books stand on it, spines facing out, in order: Visited
  Countries, Interesting Places, About Me.
- **Band:** unchanged (copy, archive links, glimpse print on the right). The
  per-visit Fisher-Yates shuffle keeps feeding all three figures.

## The Book Component

Each book is an `<a>` to its page. Cloth-bound journal, one role color each,
all existing tokens, zero new colors:

| Book | Cloth | Text on cloth |
|---|---|---|
| Visited Countries | `--color-field-violet` | `--color-on-aubergine` |
| Interesting Places | `--color-collegiate-coral` | `--color-on-aubergine` |
| About Me | `--color-aubergine` | `--color-on-aubergine` |

- **Spine (resting state):** vertical Cormorant SC title in
  `writing-mode: vertical-rl`, matching the About tab's rotated-label
  precedent. Subtle top and bottom "board" edges in the cloth color darkened
  via the existing shadow vocabulary, no new tints.
- **Front cover (revealed state):** same cloth ground, a pasted
  `--color-paper-raised` label (`--radius-note`, `--shadow-note`) carrying the
  Cormorant title and an "Open →" line, plus a small tipped-in photo print
  (`--radius-print`, white border) from that section's images. About Me uses
  Kyle's portrait.
- **About Me hierarchy:** thinner spine and shorter height than the two
  primaries. The shelf metaphor carries the "About stays quieter" rule from
  PRODUCT.md; no rule change.
- **Geometry tokens (new, in `tokens.css`):** book height, primary spine
  width, About spine width, About height, cover width, shelf ledge thickness.
  Values land in tokens first, styles consume `var(--*)` only.

## Interaction

Two-stage reveal. One book open at a time.

1. **Hover** (hover-capable pointers only): small tip forward, slight lift.
   Within the existing hover vocabulary, under 400ms.
2. **First activation** (click, tap, or Enter): `preventDefault`, book rises
   off the shelf and rotates to face the viewer showing the front cover.
   `aria-expanded="true"` on the link. Esc or a click outside drops it back.
   Opening one book closes any other.
3. **Second activation:** normal navigation to the page.

- **No JS:** plain links, direct navigation. The reveal is enhancement only;
  navigation is never gated.
- **Motion cap:** the rise-and-turn is a single transform transition at 400ms
  or less. The DESIGN.md motion rule stands unamended.
- **Reduced motion:** state swaps instantly, no rise, no turn.

## Responsive

- **Desktop:** two columns as above, at the hero's existing two-column
  breakpoint.
- **Below the two-column breakpoint:** copy, then the shelf full width (three
  narrow spines fit small screens), then the prints, then the band. Tap to
  reveal, tap again to navigate, so nothing depends on hover.
- Book tap targets stay at or above 44px effective width including padding.

## Accessibility

- Books are semantic links inside the existing `<nav>` with the current
  aria-label. `aria-expanded` reflects reveal state.
- Keyboard: focusable in order, Enter twice to navigate, Esc closes, global
  violet focus ring visible in both states.
- Contrast: `--color-on-aubergine` on aubergine is the system's verified dark
  pairing. Violet and coral cloth are new text grounds: verify both against AA
  at implementation; any cloth that fails gets its spine title on a small
  paper label instead of bare cloth. Cover titles always sit on the Paper
  Raised label, never bare cloth.
- Revealed cover imagery carries the place or portrait alt; spine titles are
  the accessible names.

## System Changes

- **Retired:** notepad destination cards (`.home-destination*`) and the About
  tab (`.home-about-tab*`) from the homepage, `global.css`, and `/showcase`.
- **Added to `/showcase`:** a Bookshelf section (nav entry, live demo in a
  `.ds-demo` block, one-line usage note) in the same change as the tokens.
- **DESIGN.md:** components section replaces Notepad Panel and About Tab with
  Bookshelf and Book entries; regenerate via `/impeccable document` so words,
  values, and picture agree.
- **Tests:** update `tests/home-hero.test.mjs` structural assertions: three
  book links with correct hrefs present in SSR output, About book present and
  marked secondary, no `.home-destination` remnants.

## Out of Scope

- Interior page redesigns (Two-Family Rule migration continues separately).
- Chocolate and Poems archive links (stay in the band).
- Any new colors or grounds (Closed-Ground Rule; propose, never apply).

## Process Notes

- Work happens on branch `homepage-bookshelf` in
  `~/kyle_website-worktrees/homepage-bookshelf`, dev server served from the
  worktree for Vivian's visual review before any commit.
- Codex adversarial review on the branch diff before PR creation.
