# Homepage Hero Calibration Plan

## Approved direction

Use `design/directions/03-direction-v5.png` as the north-star mock.

Carry forward:

- Horizontal contemporary notebook composition
- Creamy paper ground with a quiet mapped-line pattern
- Literata display type and Atkinson Hyperlegible Next body type
- Field Violet and Collegiate Coral accents
- Two prominent notebook navigation panels
- Quiet attached About Me tab
- Machu Picchu travel print and Mostar bridge field-note cluster
- Deep Aubergine lower journal band with Chocolate and Poems links

Do not literalize:

- Rasterized interface text
- Invented metadata
- Desktop overlaps that would make mobile content unreadable
- Artificially aged parchment, vignette, or sepia treatment

## Scope

Build only the homepage hero and the named tokens it needs. Keep the rest of the site intact.

## Implementation

1. Add a structural hero test using Node's built-in test runner.
2. Replace the current orbit and portal grid with semantic links and figures.
3. Add hero-only named tokens and responsive styles.
4. Apply a home-route body class so the calibration hero can use the full canvas without changing internal pages.
5. Verify test, build, accessibility basics, and desktop/tablet/mobile compositions.

## Responsive behavior

- Desktop: two-column editorial hero with overlapping travel print and notebook note.
- Tablet: preserve two destination panels while reducing overlap.
- Mobile: stack the title, imagery, navigation panels, and journal band in reading order.

## Verification

- Homepage returns successfully from the Astro dev server.
- Primary navigation links are keyboard accessible and at least 44px tall.
- All raster assets have descriptive alt text and above-the-fold images load eagerly.
- Production build passes without errors.
- Compare live screenshots at desktop, tablet, and mobile with the approved mock.
