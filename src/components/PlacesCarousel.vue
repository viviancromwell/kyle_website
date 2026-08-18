<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Carousel } from 'motion-plus-vue';
import CarouselPrint from './CarouselPrint.vue';
import CarouselControls from './CarouselControls.vue';

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
// Trimmed from 300. Every item inside this margin stays mounted and
// composited; now that the carousel is the only presentation of these
// photographs it renders on phones too, where that memory is scarcest.
const CAROUSEL_SAFE_MARGIN = 120;
// How many prints hold their photograph from the first render. One is on
// screen and the next two are a swipe away; the remaining twenty-two ask for
// theirs as they come within range.
const EAGER_PRINTS = 3;

// Matches CarouselPrint: the carousel never renders a print wider than the
// narrow measure, so that is what `sizes` should advertise.
const NARROW_MEASURE_PX = 512;

// The seat below is what the page shows until this mounts. Swapping only on
// mount means a blocked bundle leaves readable content in place rather than an
// empty page.
const ready = ref(false);
onMounted(() => {
  ready.value = true;
  // The collage is the page's no-JS and pre-hydration state. Marking the
  // document only once the carousel is genuinely running lets CSS retire it,
  // and display: none takes it out of the accessibility tree too, so the 24
  // places are never announced twice.
  document.documentElement.setAttribute('data-places-carousel', 'ready');
});
</script>

<template>
  <section class="places-carousel-section" aria-label="Places from my journal">
    <!--
      Until this island mounts the section holds the first print, static, in
      the box the carousel will put it in. It keeps the page's height so
      nothing shifts on hydration, and it puts the photograph in the HTML
      where the preload scanner finds it: the carousel's own markup does not
      exist until its JavaScript has run, and an image discovered that late
      costs seconds on a slow connection.
    -->
    <div v-if="!ready" class="places-carousel-seat">
      <figure class="carousel-print">
        <span :class="['carousel-tape', 'carousel-tape--' + slides[0].tape]" aria-hidden="true"></span>
        <img
          :src="slides[0].src"
          :srcset="slides[0].srcset"
          :sizes="`(min-width: 48rem) ${NARROW_MEASURE_PX}px, 100vw`"
          :alt="slides[0].alt"
          fetchpriority="high"
          draggable="false"
        />
        <figcaption>
          <h3>{{ slides[0].title }}</h3>
          <p>{{ slides[0].description }}</p>
        </figcaption>
      </figure>
    </div>

    <Carousel
      v-else
      class="places-carousel"
      item-size="fill"
      :overflow="true"
      :gap="CAROUSEL_GAP"
      :safe-margin="CAROUSEL_SAFE_MARGIN"
    >
      <CarouselPrint
        v-for="(slide, index) in slides"
        :key="index"
        :eager="index < EAGER_PRINTS"
        v-bind="slide"
      />

      <template #after>
        <CarouselControls />
      </template>
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

.places-carousel,
.places-carousel-seat {
  width: 100%;
}

.places-carousel :deep(li) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
