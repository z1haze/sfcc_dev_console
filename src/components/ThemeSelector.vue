<script setup>
import {watch} from 'vue';
import {storeToRefs} from 'pinia';
import {useDefaultStore} from '../stores.js';
import {TOOLTIP_DELAY} from '../constants.js';

const store = useDefaultStore();
const {theme} = storeToRefs(store);

const themes = [
  {
    label: 'Light',
    value: 'vs'
  },
  {
    label: 'Dark',
    value: 'vs-dark'
  }
];

watch(theme, (v) => {
  document.documentElement.classList = v;
  localStorage.setItem('theme', v);
}, {immediate: true})
</script>

<template>
  <div class="theme-selector d-flex align-items-center">
    <span>Theme:</span>
    <select v-model="theme" v-tooltip="{ content: 'Change Theme', delay: { show: TOOLTIP_DELAY } }">
      <option v-for="option in themes" :key="option.value" :value="option.value" :selected="option.label === theme">{{ option.label }}</option>
    </select>
  </div>
</template>