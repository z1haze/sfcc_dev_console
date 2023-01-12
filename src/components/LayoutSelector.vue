<script setup>
import {storeToRefs} from 'pinia';
import {useDefaultStore} from '../stores.js';
import {TOOLTIP_DELAY} from '../constants.js';

const store = useDefaultStore();
const {layout} = storeToRefs(store);

const switchLayout = (value) => {
  layout.value = value;

  localStorage.setItem('layout', value);
}
</script>

<template>
  <div class="d-flex mr-8 gap-2 layout-selector">
    <!-- Left Panel Button -->
    <button class="layout-switch left" :class="{ 'active': layout === 'left' }" @click="switchLayout('left')" v-tooltip="{ content: 'Left Column Only', delay: { show: TOOLTIP_DELAY } }">
      <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 46.15">
        <path d="M23.71 27.73V15.28h-4.24v15.99h11.06v-3.54h-6.82z"/>
        <path d="M48.59 3.14a4.65 4.65 0 00-3.4-1.42H4.81a4.65 4.65 0 00-3.4 1.42A4.62 4.62 0 000 6.53v36.54a4.66 4.66 0 001.41 3.4 4.64 4.64 0 003.4 1.41h40.38A4.81 4.81 0 0050 43.07V6.53a4.62 4.62 0 00-1.41-3.39zm-2.44 39.93a1 1 0 01-1 1H4.81a1 1 0 01-1-1V9.42h42.3z" transform="translate(0 -1.72)"/>
      </svg>
    </button>

    <!-- Split Panel Button -->
    <button class="layout-switch split" :class="{ 'active': layout === 'split' }" @click="switchLayout('split')" v-tooltip="{ content: 'Split View', delay: { show: TOOLTIP_DELAY } }">
      <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 46.15">
        <path d="M48.59 3.14a4.65 4.65 0 00-3.4-1.42H4.81a4.65 4.65 0 00-3.4 1.42A4.62 4.62 0 000 6.53v36.54a4.66 4.66 0 001.41 3.4 4.64 4.64 0 003.4 1.41h40.38A4.81 4.81 0 0050 43.07V6.53a4.62 4.62 0 00-1.41-3.39zM23.08 44H4.81a1 1 0 01-1-1V9.42h19.27zm23.07-1a1 1 0 01-1 1H26.92V9.42h19.23z" transform="translate(0 -1.72)"/>
        <path d="M13.09 26.15v-8.1h-2.75v10.4h7.19v-2.3h-4.44z"/>
        <path d="M41 30.18l-2.27-4.06a3.16 3.16 0 001.69-3c0-2.59-1.92-3.36-4.16-3.36h-3.92v10.42h2.76v-3.49h1l1.79 3.49zM35.1 22h.9c1.09 0 1.66.29 1.66 1.18s-.57 1.38-1.66 1.38h-.9z" transform="translate(0 -1.72)"/>
      </svg>
    </button>

    <!-- Right Panel Button -->
    <button class="layout-switch right" :class="{ 'active': layout === 'right' }" @click="switchLayout('right')" v-tooltip="{ content: 'Right Column Only', delay: { show: TOOLTIP_DELAY } }">
      <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 46.15">
        <path d="M48.59 3.14a4.65 4.65 0 00-3.4-1.42H4.81a4.65 4.65 0 00-3.4 1.42A4.62 4.62 0 000 6.53v36.54a4.66 4.66 0 001.41 3.4 4.64 4.64 0 003.4 1.41h40.38A4.81 4.81 0 0050 43.07V6.53a4.62 4.62 0 00-1.41-3.39zm-2.44 39.93a1 1 0 01-1 1H4.81a1 1 0 01-1-1V9.42h42.3z" transform="translate(0 -1.72)"/>
        <path d="M31.62 33l-3.49-6.23a4.87 4.87 0 002.6-4.6c0-4-2.95-5.17-6.39-5.17h-6v16h4.23v-5.37h1.53L26.9 33zm-9-12.65H24c1.67 0 2.56.44 2.56 1.82s-.89 2.12-2.56 2.12h-1.39z" transform="translate(0 -1.72)"/>
      </svg>
    </button>
  </div>
</template>