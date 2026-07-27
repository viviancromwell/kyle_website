---
target: the homepage
total_score: 23
p0_count: 1
p1_count: 4
timestamp: 2026-07-27T06-01-58Z
slug: src-pages-index-astro
---
Method: dual-agent (A: critique-a · B: critique-b)

# Design Health Score — 23/40 (Acceptable)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Caption swaps synchronously but the image fetches after; labelled blank frame (~307ms cold) |
| 2 | Match System / Real World | 3 | Intro reads as a truncated list ("countries visited, places worth remembering.") |
| 3 | User Control and Freedom | 2 | Photos aren't links; header hidden on home, footer has no nav, so the 3 panels are the only route |
| 4 | Consistency and Standards | 2 | Footer is starter-kit styling (mono/uppercase/cool grey); "Older archives" label styled identically to real links |
| 5 | Error Prevention | 1 | Shuffle can place atrocity memorials as decor (58% of loads) |
| 6 | Recognition Rather Than Recall | 3 | Panel icon+title+arrow unambiguous; only recall demand is retyping the obfuscated email |
| 7 | Flexibility and Efficiency | 2 | Mobile: first primary destination 1.3 viewport heights down |
| 8 | Aesthetic and Minimalist Design | 3 | Distinctive; dead space in panels, empty ruled area in note, 820px tape/caption collision |
| 9 | Error Recovery | 2 | Failed/slow image leaves an empty frame, no placeholder |
| 10 | Help and Documentation | 3 | Largely n/a; [at]/[dot] unexplained but conventional |
| **Total** | | **23/40** | **Acceptable** |

# Anti-Patterns Verdict

Not slop (both assessments agree). LLM review: authored materials (hand-built binding pins, tape texture cropped from the approved mock, hand-placed route data, irregular rotations, everything token-resolved). Deterministic scan: 1 finding total ("single-font" at Base.astro:1), demonstrated false positive (rule counts webfont declarations only; page renders 3 families). Console clean, no overflow at 390/820/1440, all alts present, focus styles present.

Detector-adjacent real signal: nav, footer, eyebrow/label styles render in --font-mono, contradicting DESIGN.md's two-family rule. Cormorant SC 400 is fetched but unused. Homepage has one h1 and zero h2.

Residual tells: generic staggered fade-in entrance; cool-grey --color-text-muted captions inside a warm palette; starter footer under a bespoke composition.

# Priority Issues

- [P0] Shuffle pool includes 6 memorials to mass death (Atomic Bomb Dome, Holocaust Memorial, Stolperstein, Berlin Wall, Cu Chi, Twin Tower tridents); ~58% of loads render at least one as tilted, taped, filtered decor beside "great food, video games". Fix: heroEligible flag in interestingPlaces.mjs, filter in index.astro; full set remains on /places/ with context.
- [P1] Mobile buries both primary destinations (y=1098 and y=1322 at 390x844) below the photo cluster and the About tab, contradicting PRODUCT.md prominence requirement. Fix: mobile grid order copy → destinations → media; About tab last in source.
- [P1] Caption contrast 4.35:1 (needs 4.5): --color-text-muted on --color-paper-raised; also cool hue in warm palette. Fix: use --color-text-secondary or retune muted token warm (~oklch(0.52 0.014 60)).
- [P1] Focus ring 1.80:1 in the aubergine band (needs 3:1 non-text). Fix: .home-journal-band { --color-focus: var(--color-collegiate-coral-soft) } (4.96:1).
- [P1] Labelled blank frame during image swap (also Emil finding). Fix: opacity 0 → 1 on decode in the existing shuffle script, transition var(--duration-medium) var(--ease-out).
- [P2] Footer breaks the composition at the peak-end moment and holds the only contact info; also the mono-font drift vs DESIGN.md. Fix: let the aubergine band absorb the footer on the home route; body font, on-aubergine colors; align or amend DESIGN.md two-family rule.
- [P2] "Older archives" label is visually identical to the real links beside it (guaranteed dead tap). Fix: de-emphasize label (no underline, muted).
- [P2] Note tape paints over long captions at 820px. Fix: caption z-index above tape or tape repositioned.

# Persona Red Flags

Jordan (first-timer): mobile first screen has nothing tappable; photos look like a gallery but aren't links; no nav anywhere else on the page. Casey (mobile): first tap target 1032px down; dead-tap archive label; shuffle means no landmark after refresh. Riley: JS-off passes cleanly (better alt text than the JS path); refresh mid-load shows labelled empty frames; long captions grow the note and collide with tape at 820; sort(() => Math.random() - 0.5) is a biased shuffle.

# Minor Observations

- JS swap downgrades descriptive alt text to bare titles, and alt duplicates the visible caption (double announcement). Consider aria-hidden on figcaption or richer pool alts.
- "ABOUT ME" upright stacked letters read as two stacks; mock shows rotated 90deg continuous word.
- No Open Graph / Twitter meta tags.
- Intro sentence reads truncated; meta description still promises the third clause.
- Band lost the mock's display heading, left half sparse (owner removed it deliberately).
- Field note ruled area empty; mock had handwritten word list (owner removed deliberately).
- Avenir Next has no webfont; Windows/Android get Arial.
- Fallback src assigned by the shuffle is the full-res variant (403KB); srcset saves modern browsers only.
- Biased shuffle: some places surface far more often.

# Questions to Consider

1. The most attractive element (the prints) rewards no click; what if each print linked to /places/?
2. Where does a specific thought of Kyle's appear on this page?
3. Is a random shuffle the right container for a collection heavy with historical memory, or is a fixed, sequenced trio the stronger statement?
