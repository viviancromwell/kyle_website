<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Carousel } from 'motion-plus-vue';
import CarouselPrint from './CarouselPrint.vue';

interface Slide {
  src: string;
  srcset: string;
  alt: string;
  title: string;
  description: string;
  tape: number;
  tilt: number;
}

// Astro cannot pass astro:assets components across an island boundary, so the
// page pre-optimises each photograph and hands over plain src/srcset strings.
defineProps<{ slides: Slide[] }>();

// Motion+ takes these as plain numbers rather than CSS values, so they cannot
// be var(--*) references. They are carousel geometry — how far apart the
// prints sit, and how far outside the viewport the component keeps items
// mounted — not design values, and they are named here rather than inlined.
const CAROUSEL_GAP = 32;
const CAROUSEL_SAFE_MARGIN = 300;

// The section is rendered hidden and only revealed once the component has
// actually mounted. Astro server-renders this markup, so without the gate a
// failed or blocked bundle would leave a tall transparent block above the
// collage: Motion+ holds its list at opacity 0 until it can measure on the
// client, and client:visible defers the JS, not the HTML.
const ready = ref(false);
onMounted(() => {
  // Wide screens only. Twenty-four slides stay mounted at once so the ticker
  // can measure them, and every one is a composited layer — that measured GPU
  // D on mobile against B on desktop. The carousel is decorative and the
  // collage below carries the same photographs, so a phone loses nothing by
  // not rendering it, and a phone is where the memory actually hurts.
  ready.value = window.matchMedia('(min-width: 48rem)').matches;
});
</script>

<template>
  <!--
    aria-hidden, deliberately. This is a second presentation of the same 24
    places the collage below already lists, and a drag carousel with no
    focusable children is not operable by keyboard. Rather than ship an
    inoperable widget and announce every photograph twice, the carousel is
    decorative and the collage remains the accessible copy. Nothing in here
    is focusable, so it cannot be tabbed into and then lost.
  -->
  <section
    v-if="ready"
    class="places-carousel-section"
    aria-hidden="true"
  >
    <Carousel
      class="places-carousel"
      item-size="fill"
      :overflow="true"
      :gap="CAROUSEL_GAP"
      :safe-margin="CAROUSEL_SAFE_MARGIN"
    >
      <CarouselPrint v-for="(slide, index) in slides" :key="index" v-bind="slide" />
    </Carousel>
  </section>
</template>

<style scoped>
.places-carousel-section {
  width: 100%;
  max-width: var(--max-width-narrow);
  margin-inline: auto;
  padding-block: var(--space-2xl);
}

.places-carousel {
  width: 100%;
}

.places-carousel :deep(li) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
