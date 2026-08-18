<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { motion, useTransform } from 'motion-v';
import { useTickerItem } from 'motion-plus-vue';

const props = defineProps<{
  eager: boolean;
  src: string;
  srcset: string;
  alt: string;
  title: string;
  description: string;
  tape: number;
  tilt: number;
}>();

// `offset` is this print's distance in pixels from the carousel's centre, so
// every value below is a mapping of position rather than of elapsed time.
// This lives in its own single-file component because a `template` string on
// an inline defineComponent needs Vue's runtime template compiler, which the
// Astro integration does not ship — an SFC is compiled at build time instead.
const { offset } = useTickerItem()!;

const SPAN = 900;
// --max-width-narrow in pixels. The carousel never renders a print wider than
// this, so it is what `sizes` should advertise.
const NARROW_MEASURE_PX = 512;
// Blur radius stays small on purpose: compositor cost scales with radius times
// layer area, and 24 prints each carry their own layer while drifting.
const BLUR_PX = 4;
const LIFT_PX = 28;

// Motion writes every value below as an inline style, which the global reduce
// block in global.css cannot reach: it only zeroes CSS animation and
// transition durations. So the opt-out is read here instead.
const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Under reduce a print holds `resting` at every offset, so it pages across
// without turning, shrinking, lifting or fading — the instant swap the shelf
// and the page transitions already make.
const track = <T extends number | string>(input: number[], output: T[], resting: T) =>
  useTransform(offset, input, reduced ? input.map(() => resting) : output);

// The centred print sits square and its neighbours keep the collage's tilt,
// so photographs read as laid down on a page rather than filed upright.
const rotate = track([-SPAN, 0, SPAN], [props.tilt, 0, -props.tilt], 0);
const scale = track([-SPAN, 0, SPAN], [0.72, 1, 0.72], 1);
const opacity = track([-SPAN, -SPAN * 0.5, 0, SPAN * 0.5, SPAN], [0, 0.55, 1, 0.55, 0], 1);
// Blur is the expensive part of this effect: 24 prints each carrying their
// own blurred layer measured GPU D on mobile against B on desktop. Small
// screens show one print at a time anyway, with no neighbours to push back,
// so they get the scale and fade without it. The guard on window is for the
// server pass, where this component is rendered but never runs.
const blurAffordable =
  typeof window !== 'undefined' && window.matchMedia('(min-width: 48rem)').matches;

const filter = track(
  [-SPAN, 0, SPAN],
  blurAffordable
    ? [`blur(${BLUR_PX}px)`, 'blur(0px)', `blur(${BLUR_PX}px)`]
    : ['blur(0px)', 'blur(0px)', 'blur(0px)'],
  'blur(0px)'
);
const y = track([-SPAN, 0, SPAN], [LIFT_PX, 0, LIFT_PX], 0);

// The carousel lays all twenty-five prints out at once, close enough together
// that the browser counts every one as near the viewport and fetches it on
// mount — `loading="lazy"` buys nothing here, and the page pulled 1.6 MB of
// photographs to show one. A print asks for its file once it comes within a
// screen and a half of the centre, and never gives it back: dropping a src on
// the way out would refetch it on the way in.
// A screen and a half of drift, or the width of the window if that is wider:
// past SPAN a print is transparent and has nothing to show, but under reduced
// motion it holds full opacity at every offset, so on a wide display the
// outermost print is visible and must not be an empty box.
const LOAD_WITHIN_PX = Math.max(SPAN * 1.5, typeof window === 'undefined' ? 0 : window.innerWidth);
// The prints that open the carousel hold theirs from the first render.
// Waiting on the offset to report costs them a frame, and a frame here is the
// difference between the photograph painting with the carousel and after it.
const requested = ref(props.eager || Math.abs(offset.get()) < LOAD_WITHIN_PX);
let stopWatching = () => {};

onMounted(() => {
  if (requested.value) return;
  stopWatching = offset.on('change', (distance: number) => {
    if (Math.abs(distance) >= LOAD_WITHIN_PX) return;
    requested.value = true;
    stopWatching();
  });
});

onUnmounted(() => stopWatching());
</script>

<template>
  <motion.figure class="carousel-print" :style="{ rotate, scale, opacity, filter, y }">
    <span :class="['carousel-tape', 'carousel-tape--' + tape]" aria-hidden="true"></span>
    <!--
      alt carries the real description again: this carousel is now the page's
      only presentation of these photographs, so it is the accessible copy
      rather than a decorative second one.
      sizes matters: with width descriptors and no sizes the browser assumes
      100vw and picks the largest variant of each, for prints that are never
      wider than the narrow measure. Out of range the empty span holds the box
      open at the same ratio, so nothing shifts when the file arrives.
    -->
    <img
      v-if="requested"
      :src="src"
      :srcset="srcset"
      :sizes="`(min-width: 48rem) ${NARROW_MEASURE_PX}px, 100vw`"
      :alt="alt"
      loading="lazy"
      decoding="async"
      draggable="false"
    />
    <span v-else class="carousel-pending" aria-hidden="true"></span>
    <figcaption>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </figcaption>
  </motion.figure>
</template>

<!-- Not scoped: PlacesCarousel renders the first print as plain markup before
     this island mounts, and it wears the same box. One set of rules, two
     renderings — the class names are specific enough to stay out of the way. -->
<style>
.carousel-print {
  position: relative;
  width: 100%;
  margin: 0;
  padding: var(--space-sm);
  border-radius: var(--radius-print);
  background: var(--color-paper-raised);
  box-shadow: var(--shadow-paper);
}

.carousel-print img,
.carousel-pending {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.carousel-print figcaption {
  padding-top: var(--space-xs);
  text-align: center;
}

.carousel-print figcaption h2 {
  margin: 0;
  color: var(--color-soft-charcoal);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 500;
  letter-spacing: var(--tracking-tight);
}

.carousel-print figcaption p {
  margin: var(--space-2xs) 0 0;
  color: var(--color-caption-ink);
  font-size: var(--text-sm);
  font-style: italic;
  line-height: var(--leading-normal);
}

/* The same washi tape the collage prints wear, so a photograph looks the
   same whether it is pinned to the page or held in the carousel. */
.carousel-tape {
  position: absolute;
  z-index: 1;
  height: calc(var(--hero-tape-height) * 0.72);
  background: url('../assets/home/tape-washi.png') center / cover no-repeat;
  box-shadow: var(--shadow-tape);
  clip-path: polygon(
    0 8%, 1.5% 0, 98% 3%, 100% 10%, 98.8% 32%, 100% 52%, 98.5% 78%, 100% 94%,
    97.5% 100%, 2% 97%, 0 88%, 1.2% 66%, 0 42%, 1% 18%
  );
  opacity: 0.9;
}

.carousel-tape--0 {
  top: calc(var(--hero-tape-height) * -0.34);
  left: var(--space-lg);
  width: calc(var(--hero-tape-width) * 0.6);
  transform: rotate(-11deg);
}

.carousel-tape--1 {
  top: calc(var(--hero-tape-height) * -0.32);
  right: var(--space-xl);
  width: calc(var(--hero-tape-width) * 0.52);
  transform: rotate(8deg);
}

.carousel-tape--2 {
  top: calc(var(--hero-tape-height) * -0.38);
  left: 50%;
  width: calc(var(--hero-tape-width) * 0.72);
  transform: translateX(-50%) rotate(-2.5deg);
}
</style>
