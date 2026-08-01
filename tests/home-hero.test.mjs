import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readProjectFile = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage exposes the approved notebook hero destinations', async () => {
  const source = await readProjectFile('src/pages/index.astro');

  assert.match(source, /class="home-hero-journal"/);
  assert.match(source, /class="home-hero-kicker"/);
  assert.match(source, /class="home-hero-intro"/);
  assert.match(source, /class="home-destination home-destination--countries"/);
  assert.match(source, /class="home-destination home-destination--places"/);
  assert.match(source, /href="\/countries\/"/);
  assert.match(source, /href="\/places\/"/);
  assert.match(source, /href="\/about\/"/);
  assert.match(source, /class="home-journal-band"/);
  assert.match(source, /<FieldRoutes variant="light" \/>/);
  assert.match(source, /<FieldRoutes variant="dark" \/>/);
});

test('homepage hero uses real travel assets with descriptive alternatives', async () => {
  const source = await readProjectFile('src/pages/index.astro');

  assert.match(source, /machu-picchu-peru\.jpeg/);
  assert.match(source, /mostar-bridge-bosnia\.jpeg/);
  assert.doesNotMatch(source, /alt="[^"]*(image|photo|picture)[^"]*"/i);
  assert.match(source, /loading="eager"/);
});

test('tokens define the approved palette and two-family typography system', async () => {
  const source = await readProjectFile('src/styles/tokens.css');

  assert.match(source, /--color-paper:\s*oklch\(0\.9486 0\.0165 79\.35\);/);
  assert.match(source, /--color-aubergine:\s*oklch\(0\.2924 0\.0488 293\.35\);/);
  assert.match(source, /--color-field-violet:\s*oklch\(0\.4502 0\.1397 295\.24\);/);
  assert.match(source, /--color-collegiate-coral:/);
  assert.match(source, /--font-display:\s*"Cormorant SC"/);
  assert.match(source, /--font-body:\s*"Avenir Next"/);
  assert.doesNotMatch(source, /--font-note:/);
  assert.match(source, /--book-height:/);
  assert.match(source, /--book-height-about:/);
  assert.match(source, /--book-spine-width:/);
  assert.match(source, /--book-spine-width-about:/);
  assert.match(source, /--book-cover-width:/);
  assert.match(source, /--book-lift:/);
  assert.match(source, /--shelf-ledge-thickness:/);
  assert.match(source, /--shelf-perspective:/);
  assert.match(source, /--shadow-book-board:/);
});

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
