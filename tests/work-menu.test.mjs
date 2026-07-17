import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const layout = await readFile(new URL('../src/layouts/Base.astro', import.meta.url), 'utf8');
const workPage = await readFile(new URL('../src/pages/work/index.astro', import.meta.url), 'utf8');
const showcase = await readFile(new URL('../src/pages/showcase.astro', import.meta.url), 'utf8');

const categories = ['portraits', 'maternity', 'events'];

test('the main navigation links to each work category', () => {
  assert.match(layout, /aria-label="Work categories"/);

  for (const category of categories) {
    assert.match(layout, new RegExp(`href="/work/#${category}"`));
  }
});

test('the Work page provides a destination for each category link', () => {
  for (const category of categories) {
    assert.match(workPage, new RegExp(`id="${category}"`));
  }
});

test('the design-system showcase documents the Work menu', () => {
  assert.match(showcase, /id="component-work-menu"/);
});
