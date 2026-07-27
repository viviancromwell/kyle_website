import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readProjectFile = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage exposes the approved notebook hero destinations', async () => {
  const source = await readProjectFile('src/pages/index.astro');

  assert.match(source, /class="home-hero-journal"/);
  assert.match(source, /class="home-destination home-destination--countries"/);
  assert.match(source, /class="home-destination home-destination--places"/);
  assert.match(source, /href="\/countries\/"/);
  assert.match(source, /href="\/places\/"/);
  assert.match(source, /href="\/about\/"/);
  assert.match(source, /class="home-journal-band"/);
});

test('homepage hero uses real travel assets with descriptive alternatives', async () => {
  const source = await readProjectFile('src/pages/index.astro');

  assert.match(source, /machu-picchu-peru\.jpeg/);
  assert.match(source, /mostar-bridge-bosnia\.jpeg/);
  assert.doesNotMatch(source, /alt="[^"]*(image|photo|picture)[^"]*"/i);
  assert.match(source, /loading="eager"/);
});

test('tokens define the approved paper, aubergine, violet, coral, and type roles', async () => {
  const source = await readProjectFile('src/styles/tokens.css');

  assert.match(source, /--color-paper:/);
  assert.match(source, /--color-aubergine:/);
  assert.match(source, /--color-field-violet:/);
  assert.match(source, /--color-collegiate-coral:/);
  assert.match(source, /--font-display:\s*"Literata"/);
  assert.match(source, /--font-body:\s*"Atkinson Hyperlegible Next"/);
});
