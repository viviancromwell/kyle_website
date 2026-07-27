---
target: the homepage
total_score: 33
p0_count: 0
p1_count: 1
timestamp: 2026-07-27T15-44-35Z
slug: src-pages-index-astro
---
Method: dual-agent (A: critique2-a · B: critique2-b)

# Design Health Score — 33/40 (Good), up from 23/40

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Blank white prints between swap-hide and decode; no loading affordance |
| 2 | Match System / Real World | 4 | Journal metaphor consistent; caption punctuation varies (source data) |
| 3 | User Control and Freedom | 4 | Clean exits, reduced motion honored |
| 4 | Consistency and Standards | 3 | Alt pattern differs SSR vs post-swap; separator strands at wraps |
| 5 | Error Prevention | 4 | Dead-tap label fixed |
| 6 | Recognition Rather Than Recall | 4 | Labeled role-colored panels |
| 7 | Flexibility and Efficiency | 3 | About tab visual order precedes tab order (deliberate tradeoff) |
| 8 | Aesthetic and Minimalist Design | 3 | 378px dead column at 820; caption detaches from print at 390 |
| 9 | Error Recovery | 2 | Undecoded image leaves a permanent empty print |
| 10 | Help and Documentation | 4 | n/a-adjusted free pass |
| **Total** | | **33/40** | (29/32 excluding n/a items) |

# Anti-Patterns Verdict

Not slop (both agents). Detector: 1 finding, the known single-font false positive (counts webfonts only; three families render). Console clean, zero overflow, all alts present pre-swap, focus-visible rules verified per-element. All run-1 fixes verified holding: mobile panel order, band affordances, caption token contrast, coral focus scoping, tab focus slide-out.

# Priority Issues

- [P1] Mobile caption spill: at 390 the band print's caption paints on aubergine at 2.35:1 (AA fail) and the travel print's detaches onto paper. Root cause verified: height: 100% on the three figure imgs; height: auto fixes with zero layout shift.
- [P2] Swap hides images before replacements decode → blank prints; SSR trio + shuffle trio = 6 downloads for 3 slots; warm-cache fade may never run (opacity 0→1 within one frame). Fix: decode in a detached Image first, then swap+fade (rAF), never hide early.
- [P2] Post-swap alt === caption (double announcement, descriptive alt lost). Fix: swapped alt="" with figcaption naming, SSR keeps rich alts.
- [P2] 378px dead column at 820 (min(100svh,58rem) stretch in the 48-72rem range). Fix: apply the fill-height only at ≥72rem.
- [P3] Interpunct separators strand at line wraps (390/820). Fix: generate via ::before on links.
- [P3] Low-res pool sources soft in large slots (6 of 25 under 960px; worst 145px wide). Partial fix only without re-exported assets; update stale width/height metadata in the swap.
- [P3] Footer LinkedIn 47x17 tap target; nav aria-label duplicates visible "Older archives" span (double announcement).
- [P3] About tab visual order precedes tab order (WCAG 2.4.3 friction; DOM order deliberately encodes PRODUCT.md hierarchy).

# Persona Red Flags

Casey (mobile) worst-served: caption spill, unreadable band caption, stranded separator, softest photos. Jordan: possible blank prints at first paint, otherwise gets the point in 3s. Riley: JS-off is arguably the best experience (richer alts, no swap flash); slow network is the worst case (shown images queue behind discarded ones at opacity 0).

# Minor Observations

- Caption punctuation inconsistent in source data (comma vs no comma).
- A routes "x" accent reads as a close button near the panel gap at 820.
- Field note grayscale/multiply reads washed at mobile size (matches DESIGN.md, intentional).
- Unused 'Machu Picchu, Peru' fallback in index.astro:85 (lookup always succeeds).

# Questions to Consider

1. Kyle wrote real sentences for all 25 places; the homepage shows none of them. Craft is proven; curiosity (the PRODUCT.md voice target) is not. Could one line of his own writing live on the page?
2. The shuffle costs double download, a blank frame, and the alt regression to vary a page most visitors see once. Would the same mechanism server-side, or a per-build rotation, buy the same feeling for free?
