<script setup lang="ts">
import { useCarousel } from 'motion-plus-vue';

// Drag is a mouse and touch affordance only. Once the carousel is the sole
// presentation of these photographs, it has to be operable without a pointer,
// which means real buttons — Motion+ gives the paging API but no controls.
const { paginationState, totalPages, nextPage, prevPage } = useCarousel();
</script>

<template>
  <div class="carousel-controls">
    <button
      type="button"
      class="carousel-control"
      :disabled="!paginationState.isPrevActive"
      @click="prevPage"
    >
      <span aria-hidden="true">←</span>
      <span class="visually-hidden">Previous photographs</span>
    </button>

    <p class="carousel-position" aria-live="polite">
      {{ paginationState.current + 1 }} of {{ totalPages }}
    </p>

    <button
      type="button"
      class="carousel-control"
      :disabled="!paginationState.isNextActive"
      @click="nextPage"
    >
      <span aria-hidden="true">→</span>
      <span class="visually-hidden">More photographs</span>
    </button>
  </div>
</template>

<style scoped>
.carousel-controls {
  display: flex;
  gap: var(--space-md);
  align-items: center;
  justify-content: center;
  padding-top: var(--space-lg);
}

/* Meets the 2.75rem touch target the rest of the journal uses. */
.carousel-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--hero-touch-target);
  height: var(--hero-touch-target);
  border: var(--border-width) solid var(--color-paper-line);
  border-radius: var(--radius-pill);
  color: var(--color-aubergine);
  background: var(--color-paper-raised);
  box-shadow: var(--shadow-note);
  font-size: var(--text-lg);
  cursor: pointer;
  transition:
    transform var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.carousel-control:hover:not(:disabled) {
  border-color: var(--color-field-violet);
  transform: translateY(var(--hover-lift));
}

.carousel-control:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-focus);
  outline-offset: var(--space-2xs);
}

.carousel-control:disabled {
  cursor: default;
  opacity: 0.4;
}

.carousel-position {
  margin: 0;
  min-width: 5rem;
  color: var(--color-caption-ink);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-align: center;
  text-transform: uppercase;
  /* Tabular figures so the count cannot shift the arrows as it changes. */
  font-variant-numeric: tabular-nums;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
