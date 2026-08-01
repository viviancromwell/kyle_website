# Homepage Bookshelf Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage notepad cards and About tab with three closed books on a drawn shelf (two-stage reveal nav), moving the photo prints to the left column.

**Architecture:** New `src/components/Bookshelf.astro` (markup + reveal script) shared by `index.astro` and `/showcase`. Books are plain `<a>` links; JS intercepts the first activation to open (aria-expanded), second navigates. All geometry via new tokens; 3D turn is pure CSS transforms. Old destination-card and About-tab CSS is deleted.

**Tech Stack:** Astro 5, vanilla CSS/JS, node:test. Spec: `docs/superpowers/specs/2026-08-01-homepage-bookshelf-design.md`.

**Ground rules (from repo + Vivian):**
- Every value via `var(--*)` from `tokens.css` (degrees and `1px` borders exempt, matching existing code).
- Whisper-Shadow Rule: shadow opacity ≤ 0.09. Motion ≤ 400ms (`--duration-slow`).
- Vivian must eyeball localhost BEFORE the visual-milestone commits (Tasks 3 and 6). Do not commit those without her OK.
- Known spec deviation: no portrait asset exists for About; its cover ships label-only. Flagged to Vivian.

---

## Task 0: Worktree setup

**Files:** none (environment)

- [ ] **Step 1: Install deps in the worktree**

```bash
cd /Users/vivian/kyle_website-worktrees/homepage-bookshelf && npm ci
```

Expected: clean install, no errors.

- [ ] **Step 2: Start the dev server on port 4322** (main checkout already serves 4321; never serve or touch that tree)

```bash
npm run dev -- --port 4322
```

Expected: `Local http://localhost:4322/`. Leave running (background).

- [ ] **Step 3: Baseline tests pass**

```bash
npm test
```

Expected: all 3 tests in `tests/` PASS.

---

## Task 1: Bookshelf tokens (TDD)

**Files:**
- Modify: `tests/home-hero.test.mjs` (third test, after line 42)
- Modify: `src/styles/tokens.css` (insert after line 98, `--hero-touch-target`, before the Motion block)

- [ ] **Step 1: Add failing token assertions** to the end of the `tokens define the approved palette…` test:

```js
  assert.match(source, /--book-height:/);
  assert.match(source, /--book-height-about:/);
  assert.match(source, /--book-spine-width:/);
  assert.match(source, /--book-spine-width-about:/);
  assert.match(source, /--book-cover-width:/);
  assert.match(source, /--book-lift:/);
  assert.match(source, /--shelf-ledge-thickness:/);
  assert.match(source, /--shelf-perspective:/);
  assert.match(source, /--shadow-book-board:/);
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test`
Expected: FAIL, `--book-height` not matched.

- [ ] **Step 3: Add tokens** to `tokens.css` in the journal-dimensions section (after `--hero-touch-target: 2.75rem;`):

```css
  --book-height: clamp(13rem, 22vw, 17rem);
  --book-height-about: clamp(11rem, 18.5vw, 14rem);
  --book-spine-width: clamp(3.25rem, 5vw, 3.75rem);
  --book-spine-width-about: 2.75rem;
  --book-cover-width: clamp(9rem, 40vw, 12.5rem);
  --book-lift: -2.5rem;
  --shelf-ledge-thickness: 0.4rem;
  --shelf-perspective: 70rem;
```

And in the Elevation block (after `--shadow-tape`, same charcoal base, 0.09 cap):

```css
  --shadow-book-board: inset 0 0.35rem 0.35rem -0.2rem oklch(0.2556 0.0159 307.77 / 0.09), inset 0 -0.35rem 0.35rem -0.2rem oklch(0.2556 0.0159 307.77 / 0.09);
```

Rationale: About spine fixed at 2.75rem = 44px minimum touch target; primary spines ≥ 3.25rem.

- [ ] **Step 4: Run to verify pass**

Run: `npm test` — Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add tests/home-hero.test.mjs src/styles/tokens.css
git commit -m "Add bookshelf geometry and board-shadow tokens"
```

---

## Task 2: Bookshelf component (TDD)

**Files:**
- Create: `src/components/Bookshelf.astro`
- Modify: `tests/home-hero.test.mjs` (new test at end of file)
- Modify: `src/styles/global.css` (new block after `.home-hero-intro`, line 421)

- [ ] **Step 1: Write the failing test** (append to `tests/home-hero.test.mjs`):

```js
test('bookshelf renders three book links with the reveal contract', async () => {
  const source = await readProjectFile('src/components/Bookshelf.astro');

  assert.match(source, /class="book book--countries"/);
  assert.match(source, /class="book book--places"/);
  assert.match(source, /class="book book--about"/);
  assert.match(source, /href="\/countries\/"/);
  assert.match(source, /href="\/places\/"/);
  assert.match(source, /href="\/about\/"/);
  assert.match(source, /aria-expanded="false"/);
  assert.match(source, /class="home-shelf-ledge"/);
  assert.doesNotMatch(source, /home-destination/);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test` — Expected: FAIL, cannot read `src/components/Bookshelf.astro`.

- [ ] **Step 3: Create `src/components/Bookshelf.astro`**

Cover images are decorative (aria-hidden cover duplicating the spine title), so `alt=""` is deliberate and correct; the design-rules alt requirement applies to content imagery. `loading="eager"` so a cover is never blank mid-reveal.

```astro
---
import { Image } from 'astro:assets';
import mostarBridge from '../assets/places/mostar-bridge-bosnia.jpeg';
import machuPicchu from '../assets/places/machu-picchu-peru.jpeg';
---

<nav class="home-shelf reveal reveal--late" aria-label="Explore Kyle's journal">
  <div class="home-shelf-row">
    <a class="book book--countries" href="/countries/" aria-expanded="false">
      <span class="book-inner">
        <span class="book-spine"><span class="book-spine-title">Visited Countries</span></span>
        <span class="book-cover" aria-hidden="true">
          <Image class="book-cover-print" src={mostarBridge} alt="" widths={[240, 360]} sizes="12.5rem" loading="eager" />
          <span class="book-cover-label">
            <span class="book-cover-title">Visited Countries</span>
            <span class="book-cover-open">Open →</span>
          </span>
        </span>
      </span>
    </a>

    <a class="book book--places" href="/places/" aria-expanded="false">
      <span class="book-inner">
        <span class="book-spine"><span class="book-spine-title">Interesting Places</span></span>
        <span class="book-cover" aria-hidden="true">
          <Image class="book-cover-print" src={machuPicchu} alt="" widths={[240, 360]} sizes="12.5rem" loading="eager" />
          <span class="book-cover-label">
            <span class="book-cover-title">Interesting Places</span>
            <span class="book-cover-open">Open →</span>
          </span>
        </span>
      </span>
    </a>

    <a class="book book--about" href="/about/" aria-expanded="false">
      <span class="book-inner">
        <span class="book-spine"><span class="book-spine-title">About Me</span></span>
        <span class="book-cover" aria-hidden="true">
          <span class="book-cover-label">
            <span class="book-cover-title">About Me</span>
            <span class="book-cover-open">Open →</span>
          </span>
        </span>
      </span>
    </a>
  </div>
  <span class="home-shelf-ledge" aria-hidden="true"></span>
</nav>

<script>
  const shelf = document.querySelector('.home-shelf');
  const books = shelf ? [...shelf.querySelectorAll('.book')] : [];
  const closeAll = () => books.forEach((book) => book.setAttribute('aria-expanded', 'false'));

  books.forEach((book) => {
    book.addEventListener('click', (event) => {
      if (book.getAttribute('aria-expanded') === 'true') return;
      event.preventDefault();
      closeAll();
      book.setAttribute('aria-expanded', 'true');
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('.book')) return;
    closeAll();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });
</script>
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test` — Expected: PASS.

- [ ] **Step 5: Add bookshelf CSS** to `src/styles/global.css`, directly after the `.home-hero-intro` rule (line 421), before `.home-destinations`:

```css
/* Bookshelf: three cloth-bound journals on a drawn ledge. First activation
   lifts and turns the book to its cover (aria-expanded), second navigates.
   The About volume is thinner, shorter, and hinges the opposite way so its
   cover opens inward over the shelf, never past the page edge. */
.home-shelf {
  position: relative;
  z-index: 2;
  display: grid;
  grid-area: shelf;
  align-content: end;
  justify-content: center;
  perspective: var(--shelf-perspective);
}

.home-shelf-row {
  display: flex;
  gap: var(--space-xs);
  align-items: flex-end;
  padding-inline: var(--space-lg);
}

.home-shelf-ledge {
  height: var(--shelf-ledge-thickness);
  border: var(--border-width) solid var(--color-paper-line);
  border-radius: var(--radius-print);
  background: var(--color-paper-raised);
  box-shadow: var(--shadow-note);
}

.book {
  position: relative;
  display: block;
  width: var(--book-spine-width);
  height: var(--book-height);
  text-decoration: none;
}

.book--about {
  width: var(--book-spine-width-about);
  height: var(--book-height-about);
}

.book[aria-expanded="true"] {
  z-index: 3;
}

.book-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: right center;
  transform-style: preserve-3d;
  transition: transform var(--duration-slow) var(--ease-out);
}

.book--about .book-inner {
  transform-origin: left center;
}

.book-spine,
.book-cover {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-print);
  backface-visibility: hidden;
}

.book-spine {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-note), var(--shadow-book-board);
}

.book-cover {
  left: 100%;
  display: grid;
  gap: var(--space-md);
  align-content: center;
  justify-items: center;
  width: var(--book-cover-width);
  padding: var(--space-md);
  box-shadow: var(--shadow-paper), var(--shadow-book-board);
  transform: rotateY(90deg);
  transform-origin: left center;
}

.book--about .book-cover {
  right: 100%;
  left: auto;
  transform: rotateY(-90deg);
  transform-origin: right center;
}

.book--countries .book-spine,
.book--countries .book-cover {
  background: var(--color-field-violet);
}

.book--places .book-spine,
.book--places .book-cover {
  background: var(--color-collegiate-coral);
}

.book--about .book-spine,
.book--about .book-cover {
  background: var(--color-aubergine);
}

.book-spine-title {
  color: var(--color-on-aubergine);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 500;
  line-height: var(--leading-tight);
  text-transform: uppercase;
  writing-mode: vertical-rl;
}

.book-cover-print {
  width: 100%;
  height: auto;
  padding: var(--space-2xs);
  border-radius: var(--radius-print);
  background: var(--color-paper-raised);
}

.book-cover-label {
  display: grid;
  gap: var(--space-2xs);
  justify-items: center;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-note);
  background: var(--color-paper-raised);
  box-shadow: var(--shadow-note);
  text-align: center;
}

.book-cover-title {
  color: var(--color-soft-charcoal);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 500;
  line-height: var(--leading-tight);
  text-transform: uppercase;
}

.book-cover-open {
  color: var(--color-field-violet);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.book[aria-expanded="true"] .book-inner {
  transform: translateY(var(--book-lift)) rotateY(-84deg);
}

.book--about[aria-expanded="true"] .book-inner {
  transform: translateY(var(--book-lift)) rotateY(84deg);
}

@media (hover: hover) {
  .book[aria-expanded="false"]:hover .book-inner {
    transform: translateY(var(--hover-lift)) rotate(-1.5deg);
  }

  .book--about[aria-expanded="false"]:hover .book-inner {
    transform: translateY(var(--hover-lift)) rotate(1.5deg);
  }
}
```

Notes for the implementer:
- The hinge: `.book-inner` rotates about its right edge (`transform-origin: right center`); the cover is a face attached at `left: 100%` pre-rotated `rotateY(90deg)`, so the −84deg open leaves a 6deg sliver of spine visible (physicality). About mirrors everything.
- Reduced motion needs no extra rule: the existing global `prefers-reduced-motion` block (global.css:1315) already zeroes transition durations, giving the instant state swap the spec requires.
- Focus ring comes from the existing global `:focus-visible` treatment; do not add a custom one.

- [ ] **Step 6: Run tests, commit**

```bash
npm test
git add src/components/Bookshelf.astro src/styles/global.css tests/home-hero.test.mjs
git commit -m "Add Bookshelf component with two-stage reveal"
```

---

## Task 3: Wire into homepage, rearrange hero grid

**Files:**
- Modify: `src/pages/index.astro` (lines 1–8 imports; lines 47–73 nav)
- Modify: `src/styles/global.css` (grid areas at lines 296–306, 1156–1197, 1236–1313)
- Modify: `tests/home-hero.test.mjs` (first test)

- [ ] **Step 1: Update the first test** in `tests/home-hero.test.mjs` — replace the `home-destination` assertions:

```js
test('homepage exposes the bookshelf hero and journal band', async () => {
  const source = await readProjectFile('src/pages/index.astro');

  assert.match(source, /class="home-hero-journal"/);
  assert.match(source, /class="home-hero-kicker"/);
  assert.match(source, /class="home-hero-intro"/);
  assert.match(source, /<Bookshelf \/>/);
  assert.match(source, /class="home-journal-band"/);
  assert.match(source, /<FieldRoutes variant="light" \/>/);
  assert.match(source, /<FieldRoutes variant="dark" \/>/);
  assert.doesNotMatch(source, /home-destination/);
  assert.doesNotMatch(source, /home-about-tab/);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test` — Expected: FAIL (`<Bookshelf />` not found).

- [ ] **Step 3: Edit `src/pages/index.astro`**

Add the import after the FieldRoutes import (line 4):

```js
import Bookshelf from '../components/Bookshelf.astro';
```

Replace the entire `<nav class="home-destinations" …>…</nav>` block (lines 47–73, from `<nav class="home-destinations"` through its closing `</nav>`) with:

```astro
      <Bookshelf />
```

The `home-hero-media` block and the shuffle script stay untouched.

- [ ] **Step 4: Update the hero grid in `src/styles/global.css`**

(a) Base (mobile) — in `.home-hero-paper` (line 296), spec order copy → shelf → prints:

```css
  grid-template-areas:
    "copy"
    "shelf"
    "media";
```

(b) 48rem block (lines 1156–1186): replace the `.home-hero-paper`, `.home-destinations`, `.home-travel-print`, `.home-field-note` rules with:

```css
  .home-hero-paper {
    grid-template-areas:
      "copy shelf"
      "media shelf";
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    grid-template-rows: auto 1fr;
    align-items: start;
  }

  .home-shelf {
    align-self: end;
  }

  .home-travel-print {
    width: 68%;
    margin-left: var(--space-lg);
    justify-self: start;
  }

  .home-field-note {
    width: 60%;
    margin-top: calc(var(--space-xl) * -1);
    justify-self: end;
  }
```

(Keep `.home-hero-media { min-height: var(--hero-media-height); }` and the band rules in that block as they are.)

(c) 72rem block (lines 1243–1303): replace the `.home-hero-paper`, `.home-destinations`, `.home-about-tab`, `.home-about-tab-label`, `.home-about-tab:focus-visible`, `.home-destination`, `.home-hero-media`, `.home-travel-print`, `.home-field-note` rules with:

```css
  .home-hero-paper {
    grid-template-areas:
      "copy shelf"
      "media shelf";
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    grid-template-rows: auto 1fr;
    gap: var(--space-xl) var(--space-hero-section);
    align-items: start;
    padding-block: var(--space-xl);
  }

  .home-hero-media {
    min-height: var(--hero-media-height);
    align-self: end;
  }

  .home-travel-print {
    width: 58%;
    margin-left: 0;
  }

  .home-field-note {
    width: 52%;
    margin-top: calc(var(--space-xl) * -1);
    transform: rotate(4.5deg) translateY(var(--space-xl));
  }
```

The field note's `translateY(var(--space-xl))` is what carries it across the paper/band boundary now that it is no longer absolutely positioned; its existing `z-index: 1` and the unstacked sections (comment at global.css:288) make the crossing render correctly.

(d) Also in the 72rem + hover block (line 1200): delete the `.home-about-tab:hover` rule only; keep the rest of that media query.

(e) Add `overflow-x: clip;` to `.home-hero-paper`'s base rule (line 296) so an opened cover can never cause horizontal scroll on narrow phones (`overflow-y` stays visible for the band-crossing note).

- [ ] **Step 5: Run tests**

Run: `npm test` — Expected: PASS.

- [ ] **Step 6: Build check**

Run: `npm run build` — Expected: success, no unused-import or asset errors.

- [ ] **Step 7: STOP — Vivian eyeballs http://localhost:4322/**

Desktop and narrow viewport. She checks: shelf placement, book proportions, hover tip, two-stage reveal, About mirror-hinge, prints on the left, note dipping into the band. Apply her tweaks (values through tokens where repeated) before committing. Do NOT commit without her OK.

- [ ] **Step 8: Commit (after her OK)**

```bash
git add src/pages/index.astro src/styles/global.css tests/home-hero.test.mjs
git commit -m "Bookshelf hero: books right, prints left, two-stage reveal nav"
```

---

## Task 4: Retire notepad cards + About tab; swap showcase

**Files:**
- Modify: `src/styles/global.css` (delete retired blocks)
- Modify: `src/styles/tokens.css` (delete orphaned tokens)
- Modify: `src/pages/showcase.astro` (nav + sections)

- [ ] **Step 1: Delete retired CSS from `global.css`** (line numbers pre-Task-3; re-locate by selector):
  - `.home-destinations` block (423–429)
  - `.home-about-tab, .home-destination` shared base (431–438)
  - `.home-about-tab` + `::before` + `svg` blocks (440–477)
  - `.home-destination` block (479–491)
  - In the shared keyhole rule (496), reduce the selector to `.home-field-note::before` only — the binding stays on the field note.
  - `.home-destination::after` (510–528)
  - `.home-destination-icon`, `.home-destination-title`, `.home-destination-arrow`, `--countries`/`--places` variants (530–568)
  - The `.home-about-tab, .home-destination` hover/active state block near line 798 (read 790–830 first; delete only the retired selectors, keep any shared rules by narrowing selectors).

- [ ] **Step 2: Delete orphaned tokens.** For each of `--hero-destination-min-height`, `--hero-tab-width`, `--hero-icon-size`, `--hero-icon-stroke`, `--hero-touch-target`, `--text-hero-destination`, verify zero remaining usages before deleting:

```bash
grep -rn "hero-destination-min-height\|hero-tab-width\|hero-icon-size\|hero-icon-stroke\|hero-touch-target\|text-hero-destination" src/
```

Keep any token that still has a consumer (`--text-hero-destination` is consumed by the showcase type ramp, line 56 — it stays; retitle its role note in Step 3). Delete only true orphans, from both `tokens.css` and the token test if asserted there.

- [ ] **Step 3: Swap the showcase.** In `src/pages/showcase.astro`:

(a) Add to frontmatter imports:

```js
import Bookshelf from '../components/Bookshelf.astro';
```

(b) Replace the Journal components nav row (line 89) with:

```js
  ['Journal components', [['#component-bookshelf', 'Bookshelf'], ['#component-print', 'Travel Print'], ['#component-band', 'Band + Archives']]],
```

(c) Read lines 215–255 first, note the exact usage-note element class the panel section uses, then replace BOTH `<section id="component-panel">…</section>` and `<section id="component-tab">…</section>` with one section, mirroring that usage-note markup:

```astro
      <section id="component-bookshelf">
        <h2>Bookshelf</h2>
        <div class="ds-demo ds-demo--paper ds-demo--roomy">
          <Bookshelf />
        </div>
        <p>
          Primary homepage navigation: three cloth-bound journals on a drawn ledge, violet for
          countries, coral for places, aubergine for the thinner About volume. First activation
          lifts and turns the book to its cover; the second navigates.
        </p>
      </section>
```

(Adjust the trailing `<p>` to whatever note element the retired sections actually used.)

(d) In the showcase `<style>` block, delete rules that referenced the retired demo (`.ds-panel-demo` and any about-tab demo classes; grep the file for `panel-demo|tab` to find them). Update the type-ramp label for `--text-hero-destination` (line 56) from `'Headline · Cormorant SC 500, uppercase'` context "Visited Countries" to sample text `'Book cover title'` if the role is renamed in DESIGN.md.

- [ ] **Step 4: Tests + build**

```bash
npm test && npm run build
```

Expected: PASS / build success. If the build flags `machuPicchu`/`mostarBridge` unused in `index.astro` (they are still used by the static figures — they are not removed), leave as is.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/styles/tokens.css src/pages/showcase.astro tests/home-hero.test.mjs
git commit -m "Retire notepad cards and About tab; showcase gets Bookshelf section"
```

---

## Task 5: DESIGN.md update

**Files:**
- Modify: `DESIGN.md` (frontmatter `components:` and section 5)

- [ ] **Step 1: Frontmatter.** Replace the `destination-card:` and `about-tab:` entries under `components:` with:

```yaml
  book:
    backgroundColor: "{colors.field-violet} / {colors.collegiate-coral} / {colors.deep-aubergine}"
    textColor: "{colors.on-aubergine}"
    rounded: "{rounded.print}"
    height: "clamp(13rem, 22vw, 17rem)"
  shelf-ledge:
    backgroundColor: "{colors.paper-raised}"
    rounded: "{rounded.print}"
```

- [ ] **Step 2: Section 5.** Replace the `### Notepad Panel (destination card)` and `### About Tab` subsections with:

```markdown
### Bookshelf / Book (primary navigation)
- **Character:** three cloth-bound journals standing closed on a thin drawn ledge; books are journal objects, so the shelf stays inside the field-journal north star.
- **Cloth:** Field Violet (Visited Countries), Collegiate Coral (Interesting Places), Deep Aubergine (About Me); spine and cover titles in On Aubergine, board edges suggested with the inset book-board shadow (Whisper-Shadow compliant).
- **Spine (rest):** vertical-rl Cormorant title, print radius, Note shadow.
- **Front cover (revealed):** same cloth, a pasted Paper Raised label (Cormorant title + violet "Open →" line) and, on the two primaries, a tipped-in white-bordered print from the places pool. About has no portrait asset yet; its cover is label-only.
- **Hierarchy:** About Me is the thinner, shorter volume and hinges inward, keeping it quieter than the two primaries per PRODUCT.md.
- **States:** hover tips the book slightly (hover-capable pointers only); first activation lifts and turns it to face the viewer (`aria-expanded`, one open at a time, Esc or click-away closes); second activation navigates. Without JS the books are plain links. The turn is a single transform within the 400ms ceiling; reduced motion swaps instantly.

### Shelf Ledge
- **Character:** the thin drawn shelf the books stand on: Paper Raised bar, Paper Line border, print radius, Note shadow.
```

- [ ] **Step 3: Sweep the rest of DESIGN.md** for now-false statements: the Components list in section 1 key characteristics (none expected), the type role table if `--text-hero-destination`'s role text was retitled in Task 4, and the Do's bullet about About Me (still true; leave). Fix only what the redesign falsified.

- [ ] **Step 4: Commit**

```bash
git add DESIGN.md
git commit -m "DESIGN.md: bookshelf replaces notepad panel and about tab"
```

---

## Task 6: Contrast + keyboard verification, final pass

**Files:**
- Scratch (do not commit): `/private/tmp/claude-502/-Users-vivian/55440763-f5fb-4f2f-86a1-7e4f304f226a/scratchpad/contrast.mjs`

- [ ] **Step 1: Verify cloth contrast** (spec requirement). Write the scratch script:

```js
// WCAG contrast for the spine-title pairings (oklch -> linear sRGB -> luminance)
const oklchToLinearSrgb = (L, C, hDeg) => {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ].map((v) => Math.min(1, Math.max(0, v)));
};
const luminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const contrast = (fg, bg) => {
  const [hi, lo] = [luminance(oklchToLinearSrgb(...fg)), luminance(oklchToLinearSrgb(...bg))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const onAubergine = [0.94, 0.015, 84.58];
console.log('on-aubergine vs field-violet   ', contrast(onAubergine, [0.4502, 0.1397, 295.24]).toFixed(2));
console.log('on-aubergine vs collegiate-coral', contrast(onAubergine, [0.5356, 0.1971, 30.4]).toFixed(2));
console.log('on-aubergine vs aubergine      ', contrast(onAubergine, [0.2924, 0.0488, 293.35]).toFixed(2));
```

Run: `node <scratchpad>/contrast.mjs`

Decision rule: spine and cover titles are large text (`--text-xl` = 24px, `--text-lg` = 20px semibold-equivalent Cormorant 500 — treat `--text-lg` as normal text to be safe). Thresholds: 3:1 for the spine title, 4.5:1 for anything smaller sitting on bare cloth. The "Open →" line and cover title sit on the Paper Raised label, so cloth only carries the spine title. If any cloth fails 3:1 for its spine title, move that spine title onto a small Paper Raised label per the spec fallback. Record the three measured ratios in the commit message or PR body.

- [ ] **Step 2: Keyboard + no-JS walkthrough** on http://localhost:4322/:
  - Tab reaches all three books in order, visible focus ring in both states.
  - Enter opens; second Enter navigates; Esc closes; click-away closes; opening book B closes book A.
  - Disable JS (DevTools → Command menu → "Disable JavaScript"), reload: books navigate directly on first click.
  - iOS-style tap check in responsive mode: first tap opens (no hover trap), second tap navigates.

- [ ] **Step 3: Full verification**

```bash
npm test && npm run build
```

Expected: all PASS, build clean.

- [ ] **Step 4: Run the polish pass** (deslop + simplify on the branch diff) per Vivian's global workflow: invoke the `kyle_website:polish` skill and apply its findings.

- [ ] **Step 5: STOP — Vivian's final eyeball** of http://localhost:4322/ (homepage and /showcase, desktop + mobile widths). Apply her feedback item by item (no visual change without per-item permission). Commit fixes as they are approved.

- [ ] **Step 6: Codex adversarial review** of the branch diff BEFORE any PR (`codex exec`, one retry max if it hangs, then self-review + disclose in PR per house convention). Fix all findings, including minors.

- [ ] **After this plan:** use superpowers:finishing-a-development-branch (PR to main; Vercel auto-deploys main on merge).
