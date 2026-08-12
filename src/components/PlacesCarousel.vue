<script setup lang="ts">
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
</script>

<template>
  <Carousel
    class="places-carousel"
    item-size="fill"
    :overflow="true"
    :gap="32"
    :safe-margin="300"
  >
    <CarouselPrint v-for="(slide, index) in slides" :key="index" v-bind="slide" />
  </Carousel>
</template>

<style scoped>
.places-carousel {
  width: 100%;
  max-width: 30rem;
  margin-inline: auto;
}

.places-carousel :deep(li) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
