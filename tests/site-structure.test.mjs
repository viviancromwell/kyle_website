import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const layout = await readFile(new URL('../src/layouts/Base.astro', import.meta.url), 'utf8');
const bookshelf = await readFile(
  new URL('../src/components/Bookshelf.astro', import.meta.url),
  'utf8',
);
const about = await readFile(new URL('../src/pages/about.astro', import.meta.url), 'utf8');
const chocolatePage = await readFile(new URL('../src/pages/chocolate.astro', import.meta.url), 'utf8');
const countriesPage = await readFile(new URL('../src/pages/countries.astro', import.meta.url), 'utf8');
const placesPage = await readFile(new URL('../src/pages/places.astro', import.meta.url), 'utf8');
const poemsPage = await readFile(new URL('../src/pages/poems.astro', import.meta.url), 'utf8');
const tokens = await readFile(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');

test('main navigation exposes only the personal atlas sections', () => {
  const navigation = layout.match(/<div class="nav-links">([\s\S]*?)<\/div>/)?.[1] ?? '';
  const links = navigation.match(/<a /g) ?? [];

  assert.equal(links.length, 3);

  for (const [href, label] of [
    ['/countries/', 'Visited Countries'],
    ['/places/', 'Interesting Places'],
    ['/about/', 'About Me'],
  ]) {
    assert.match(navigation, new RegExp(`href="${href}"[^>]*>${label}</a>`));
  }

  assert.doesNotMatch(navigation, /Work|Portraits|Maternity|Events|href="\/work\//);
});

test('the About Me route introduces Kyle and carries the retired hobby archives', () => {
  assert.match(about, /political science/i);
  assert.match(about, /chess/i);
  assert.match(about, /href="\/chocolate\/"/);
  assert.match(about, /href="\/poems\/"/);
  assert.match(about, /kylecromwell2023/);

  // First person: the site is Kyle speaking, never narrated about him.
  assert.doesNotMatch(about, /\bKyle (is|was|has|loves|studies|enjoys)\b/);

  // The archives stay secondary: reachable from About, never in the main nav.
  assert.doesNotMatch(layout, /href="\/(chocolate|poems)\//);
});

test('all personal atlas routes and the supplied reference exist', async () => {
  for (const route of ['countries', 'places', 'about', 'chocolate', 'poems']) {
    await access(new URL(`../src/pages/${route}.astro`, import.meta.url));
  }

  await access(
    new URL(
      '../src/assets/design/reference/kyle-purple-dashboard-reference.png',
      import.meta.url,
    ),
  );
});

test('the Visited Countries page renders the migrated regional country data', async () => {
  assert.match(countriesPage, /import \{ visitedCountryRegions \} from '\.\.\/data\/visitedCountries\.mjs';/);
  assert.match(countriesPage, /visitedCountryRegions\.map/);
  assert.match(bookshelf, /href="\/countries\/"/);

  const { visitedCountryRegions } = await import(
    new URL('../src/data/visitedCountries.mjs', import.meta.url)
  );
  const countryNames = visitedCountryRegions.flatMap((region) => region.countries);

  assert.equal(visitedCountryRegions.length, 7);
  assert.equal(countryNames.length, 49);

  for (const country of [
    'United Kingdom',
    'Hong Kong (2006)',
    'Puerto Rico',
    'Ecuador',
    'Jordan',
    'New Zealand',
    'Tanzania',
    'Ireland',
  ]) {
    assert.ok(countryNames.includes(country), `Expected migrated list to include ${country}`);
  }
});

test('the Interesting Places page renders all migrated writing and local images', async () => {
  assert.match(placesPage, /import \{ interestingPlaces \} from '\.\.\/data\/interestingPlaces\.mjs';/);
  assert.match(placesPage, /interestingPlaces\.map/);
  assert.match(placesPage, /import \{ Image \} from 'astro:assets';/);
  assert.match(placesPage, /loading="lazy"/);
  assert.match(bookshelf, /href="\/places\/"/);

  const { interestingPlaces } = await import(
    new URL('../src/data/interestingPlaces.mjs', import.meta.url)
  );

  assert.equal(interestingPlaces.length, 25);
  assert.equal(new Set(interestingPlaces.map((place) => place.image)).size, 25);

  for (const place of interestingPlaces) {
    assert.ok(place.title);
    assert.ok(place.description);
    assert.doesNotMatch(place.image, /^https?:/);
    await access(new URL(`../src/assets/places/${place.image}`, import.meta.url));
  }

  for (const title of [
    'Mostar Bridge, Bosnia',
    'Nazca Lines, Peru',
    'Batu Caves, Malaysia',
    'Machu Picchu Peru',
    'Leshan Giant Buddha China',
    'Temple of concordia, Sicily Italy',
  ]) {
    assert.ok(
      interestingPlaces.some((place) => place.title === title),
      `Expected migrated gallery to include ${title}`,
    );
  }
});

test('the Poems page renders both Poetry posts with local artwork', async () => {
  assert.match(poemsPage, /import \{ poems \} from '\.\.\/data\/poems\.mjs';/);
  assert.match(poemsPage, /poems\.map/);
  assert.match(poemsPage, /import \{ Image \} from 'astro:assets';/);
  assert.match(poemsPage, /loading="lazy"/);

  const { poems } = await import(new URL('../src/data/poems.mjs', import.meta.url));

  assert.deepEqual(
    poems.map((poem) => poem.title),
    ['Out of Time', 'The Cost of War'],
  );

  for (const poem of poems) {
    assert.ok(poem.published);
    assert.ok(poem.lines.length > 1);
    assert.doesNotMatch(poem.image, /^https?:/);
    await access(new URL(`../src/assets/poems/${poem.image}`, import.meta.url));
  }

  assert.equal(poems[0].lines[0], 'A fog of dazzling color, it’s hard to turn away.');
  assert.equal(poems[1].lines.at(-1), 'Revenge is artificial sweetener.');
});

test('the Chocolate page renders the complete archive with local images', async () => {
  assert.match(chocolatePage, /import \{ chocolateArchive \} from '\.\.\/data\/chocolateArchive\.mjs';/);
  assert.match(chocolatePage, /chocolateArchive\.editions\.map/);
  assert.match(chocolatePage, /import \{ Image \} from 'astro:assets';/);
  assert.match(chocolatePage, /loading="lazy"/);

  const { chocolateArchive } = await import(
    new URL('../src/data/chocolateArchive.mjs', import.meta.url)
  );

  assert.equal(chocolateArchive.headline, 'Come to the dark side. We have chocolate.');
  assert.equal(chocolateArchive.about.length, 3);
  assert.equal(chocolateArchive.editions.length, 6);
  assert.equal(
    chocolateArchive.editions.flatMap((edition) => edition.images).length + 1,
    13,
  );

  for (const image of [
    chocolateArchive.aboutImage,
    ...chocolateArchive.editions.flatMap((edition) => edition.images),
  ]) {
    assert.doesNotMatch(image.file, /^https?:/);
    assert.doesNotMatch(image.alt, /\b(image|photo|picture)\b/i);
    await access(new URL(`../src/assets/chocolate/${image.file}`, import.meta.url));
  }

  for (const title of [
    '2022 Fundraising for Ukraine',
    '2022 Valentine’s Edition',
    'Spring 2021 Silent Auction Edition',
    '2020 Fall Edition',
  ]) {
    assert.ok(
      chocolateArchive.editions.some((edition) => edition.title === title),
      `Expected chocolate archive to include ${title}`,
    );
  }
});

test('the token system uses neutral light surfaces with purple reserved for accents', () => {
  assert.match(tokens, /--color-bg:\s*oklch\(0\.985 0\.003 290\);/);
  assert.match(tokens, /--color-surface:\s*oklch\(1 0 0\);/);
  assert.match(tokens, /--color-text:\s*oklch\(0\.2 0\.012 290\);/);
  assert.match(tokens, /--color-accent:\s*var\(--color-field-violet\);/);

  const atmosphere = tokens.match(/--gradient-atmosphere:([\s\S]*?);/)?.[1] ?? '';
  assert.doesNotMatch(atmosphere, /radial-gradient/);
});
