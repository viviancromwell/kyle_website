import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// Vue is here for one thing: Motion+'s Carousel component, which ships for
// React and Vue only. It runs as an island, so the framework travels with
// that component alone and every other page stays static HTML.
export default defineConfig({
  integrations: [vue()],
});
