---
name: Kyle Cromwell — Personal Journal
description: A warm field-journal collage for a college student's personal atlas
colors:
  warm-paper: "oklch(0.9486 0.0165 79.35)"
  paper-raised: "oklch(0.975 0.009 84.58)"
  paper-muted: "oklch(0.9 0.014 84.58)"
  paper-line: "oklch(0.82 0.018 285)"
  soft-charcoal: "oklch(0.2556 0.0159 307.77)"
  deep-aubergine: "oklch(0.2924 0.0488 293.35)"
  field-violet: "oklch(0.4502 0.1397 295.24)"
  field-violet-soft: "oklch(0.72 0.07 295.24)"
  collegiate-coral: "oklch(0.5356 0.1971 30.4)"
  collegiate-coral-soft: "oklch(0.6985 0.1589 36.85)"
  on-aubergine: "oklch(0.94 0.015 84.58)"
  on-aubergine-muted: "oklch(0.78 0.025 310)"
  caption-ink: "oklch(0.5 0.02 60)"
  route-light: "oklch(0.82 0.012 79.35)"
  route-dark: "oklch(0.42 0.05 295.24)"
typography:
  display:
    fontFamily: "Cormorant SC, Georgia, Times New Roman, serif"
    fontSize: "clamp(3.25rem, 5.4vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Cormorant SC, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 1.9vw, 1.85rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.045em"
  kicker:
    fontFamily: "Cormorant SC, Georgia, Times New Roman, serif"
    fontSize: "clamp(1rem, 1.3vw, 1.25rem)"
    fontWeight: 600
    letterSpacing: "0.18em"
  body:
    fontFamily: "Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.55
  label:
    fontFamily: "Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.12em"
rounded:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  note: "0.4rem"
  print: "0.2rem"
  pill: "999rem"
spacing:
  2xs: "0.25rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "3rem"
  2xl: "6rem"
  3xl: "9rem"
components:
  destination-card:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.soft-charcoal}"
    rounded: "{rounded.note}"
    padding: "clamp(1.25rem, 2.2vw, 2.25rem)"
  about-tab:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.deep-aubergine}"
    rounded: "{rounded.note}"
    width: "4.5rem"
  archive-link:
    backgroundColor: "{colors.deep-aubergine}"
    textColor: "{colors.on-aubergine}"
  journal-band:
    backgroundColor: "{colors.deep-aubergine}"
    textColor: "{colors.on-aubergine}"
---

# Design System: Kyle Cromwell — Personal Journal

## 1. Overview

**Creative North Star: "The College Field Journal"**

Everything on this site behaves like a physical object in a well-kept travel
journal: cream notepads with spiral-binding keyholes, photographic prints with
white borders and washi tape, ruled note paper, dashed map routes with ring
nodes and crosses, and one deep aubergine "journal cover" band with a stitched
diamond lattice. Warmth and tactility come from material detail, never from
aging effects. The approved calibration mock lives at
`design/directions/03-direction-v5.png`; its palette and materials are the
source this system was sampled from, and the washi tape texture
(`src/assets/home/tape-washi.png`) is literally cropped from it.

The system explicitly rejects the antique and the corporate in equal measure:
no parchment, sepia, vignettes, or distressed textures on one side; no SaaS
cards, dashboard shells, or hero-metric templates on the other. Slight,
controlled rotation (1 to 4.5 degrees) and deliberate overlap between objects
carry the collage feel; compositions cross section boundaries (the field note
descends into the band, the band print rises to meet it).

**Key Characteristics:**
- Materials are sampled or hand-drawn, never synthesized generically
- Asymmetric collage layout with controlled overlap across section boundaries
- Closed set of grounds: Warm Paper, Paper Raised, Deep Aubergine
- Color is role-coded: violet = countries, coral = places
- Motion is restrained: entrance and hover only, nothing over 400ms

## 2. Colors

A warm cream field with two saturated role accents and one committed dark band.

### Primary
- **Field Violet** (oklch(0.4502 0.1397 295.24)): the single primary accent. Drives links, focus, route details, the Visited Countries role, the name rule, and the About tab cap. On the aubergine ground it fails contrast and is prohibited for interactive indication there.
- **Deep Aubergine** (oklch(0.2924 0.0488 293.35)): Field Violet's dark surface companion, not a competing accent. The journal-cover band and the home footer ground.

### Secondary
- **Collegiate Coral** (oklch(0.5356 0.1971 30.4)): vermillion secondary emphasis on paper, sampled from the mock's arrows and rules. Owns the Interesting Places role.
- **Collegiate Coral Soft** (oklch(0.6985 0.1589 36.85)): the coral that works on aubergine (4.96:1). Carries every link underline, ring ornament, and focus ring inside the band.

### Neutral
- **Warm Paper** (oklch(0.9486 0.0165 79.35)): the main notebook ground. Creamy and clean, never sepia, stained, or vignetted.
- **Paper Raised** (oklch(0.975 0.009 84.58)): notepads, prints, tabs, the field note.
- **Soft Charcoal** (oklch(0.2556 0.0159 307.77)): light-theme text.
- **Caption Ink** (oklch(0.5 0.02 60)): warm muted ink for print captions; replaces the cool starter gray, clears AA on Paper Raised.
- **On Aubergine / On Aubergine Muted**: text roles on the dark band.
- **Route Light / Route Dark**: the faded decorative route and lattice strokes on each ground (intentionally sub-contrast; decoration only).

### Named Rules
**The Closed-Ground Rule.** Surfaces are Warm Paper, Paper Raised, or Deep Aubergine. A token scale step is not a sanctioned surface; propose new grounds, never apply them unilaterally.

**The Dark-Band Coral Rule.** On Deep Aubergine, interactive affordances (underlines, rings, focus) are Collegiate Coral Soft, never Field Violet (1.8:1, invisible).

## 3. Typography

**Display Font:** Cormorant SC (with Georgia fallback), weights 500 and 600 only
**Body Font:** Avenir Next (system stack; Helvetica Neue, then Arial on non-Apple platforms)

**Character:** small-caps serif titles against a clean humanist sans, matching the approved direction's collegiate-notebook proportions. The notebook character comes from composition, ruled paper, tape, and rotation, never from a handwriting font.

### Hierarchy
- **Display** (500, clamp(3.25rem, 5.4vw, 5.5rem), 0.96): Kyle's name only.
- **Headline** (500, clamp(1.5rem, 1.9vw, 1.85rem), 0.96, uppercase): notepad panel titles.
- **Kicker** (600, clamp(1rem, 1.3vw, 1.25rem), 0.18em tracking, uppercase, Field Violet): the "Personal Journal" line.
- **Body** (400, 1rem, 1.55): copy and the intro; intro measures capped at 24rem.
- **Label** (600, 0.875rem, 0.12em tracking, uppercase): archive links, About tab.
- **Caption** (400 italic, 0.875rem, centered, Caption Ink): print labels under photographs.

### Named Rules
**The Two-Family Rule.** Redesigned surfaces use exactly Cormorant SC and Avenir Next. The monospace running through the interior pages' nav, footer, and labels is starter residue, slated for replacement as each page is redesigned, and must not spread to new work.

## 4. Elevation

Depth is conveyed by material stacking (overlap, rotation, tape) far more than by shadows. Shadows exist but are deliberately faint; if a shadow is noticeable, it is too strong.

### Shadow Vocabulary
- **Paper** (`0 0.5rem 1.5rem oklch(0.2556 0.0159 307.77 / 0.07)`): photographic prints; also the hover state of pressables.
- **Note** (`0 0.25rem 0.75rem oklch(0.2556 0.0159 307.77 / 0.09)`): notepads, tabs, the field note at rest.
- **Tape** (`0 0.15rem 0.4rem oklch(0.2556 0.0159 307.77 / 0.05)`): washi tape pieces.

### Named Rules
**The Whisper-Shadow Rule.** Shadow opacity never exceeds 0.09. Depth comes from overlap and rotation, not from lift.

## 5. Components

### Notepad Panel (destination card)
- **Character:** a sheet torn from a spiral notebook, holding one destination.
- **Shape:** softly rounded (0.4rem), Paper Raised on a 1px Paper Muted border, min-height 11.5rem.
- **Binding:** keyhole strip along the top edge, inside the pad: a short curved stem descending from the edge into a soft grey shadow dot (embedded SVG tile, 1rem pitch).
- **Content:** role-colored icon (1.1 stroke) top-left, uppercase Cormorant title bottom-left with an inline arrow, and a role-colored rule with a ring node at its left end connecting directly to the line.
- **States:** hover lifts -0.25rem with the Paper shadow (hover-capable pointers only); active presses to scale(0.985); focus uses the global violet ring.

### About Tab
- **Character:** a quieter bookmark tucked behind the countries panel.
- **Form:** 4.5rem-wide vertical tab, violet cap bar, rotated continuous "About me" label (vertical-rl), circled person icon below; slides out 0.75rem on hover/focus. On mobile it is a horizontal chip placed after the panels.

### Travel Print / Field Note / Band Print
- **Character:** photographs as physical objects; each carries a centered italic Caption Ink label.
- **Travel print:** white-bordered square print, washi tape at top, rotation 1.25deg.
- **Field note:** ruled Paper Raised sheet (repeating 1px Paper Line), binding keyholes, grayscale-multiplied photo, rotation 4.5deg, descends into the band; corner tape at its lower right.
- **Band print:** wide 2:1 print straddling the band's top edge.
- **Behavior:** the three images shuffle per visit from the Interesting Places pool (Fisher-Yates), fade in on decode, and keep static SSR fallbacks for no-JS.

### Archive Links (band)
- **Style:** uppercase Label type in On Aubergine, underlined Collegiate Coral Soft with small ring ornaments at both underline ends; interpunct separators; the non-link "Older archives" label is plain On Aubergine Muted with no underline.
- **Hover:** text to Warm Paper, underline to On Aubergine.

### Journal Band + Home Footer
- **Style:** Deep Aubergine ground with the stitched diamond lattice, rings, and crosses (Route Dark); 2px Collegiate Coral Soft vertical rule beside the copy. The site footer on the home route continues the aubergine ground in body type; contact is the obfuscated email plus LinkedIn.

### Navigation (interior pages)
- **Style:** sticky pill nav from the starter shell (mono labels); functional but not yet part of this system. Redesign pending per The Two-Family Rule.

## 6. Do's and Don'ts

### Do:
- **Do** source every color, size, spacing, and radius from `src/styles/tokens.css` via `var(--*)`; new values land in tokens first.
- **Do** keep every design-token change in sync with `/showcase` in the same change.
- **Do** keep rotations between 1 and 4.5 degrees and overlaps deliberate; collage, not clutter.
- **Do** gate hover transforms behind `(hover: hover)` and keep all motion within 400ms, entrance and hover only, honoring reduced motion.
- **Do** keep About Me reachable but quieter than the two primary destinations on every breakpoint, per PRODUCT.md.

### Don't:
- **Don't** use antique parchment, medieval manuscript styling, heavy vignette, or sepia photography.
- **Don't** paint full-purple light sections; Deep Aubergine is the only committed dark ground.
- **Don't** invent fake coordinates, telemetry, archive codes, or travel facts.
- **Don't** hide navigation or gate it behind hover-only interactions.
- **Don't** build generic SaaS cards or a conventional dashboard shell.
- **Don't** put Field Violet affordances on the aubergine band (The Dark-Band Coral Rule).
- **Don't** introduce a third type family on redesigned surfaces (The Two-Family Rule).
