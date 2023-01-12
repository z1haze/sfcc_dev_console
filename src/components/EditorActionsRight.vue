<script setup>
import {storeToRefs} from 'pinia';
import ClipboardCopy from './ClipboardCopy.vue';
import {TOOLTIP_DELAY} from '../constants.js';
import {useDefaultStore} from '../stores.js';

const store = useDefaultStore();
const {result, plainJSON, executionTime} = storeToRefs(store);

const clearResult = () => {
  executionTime.value = null;
  result.value = null;
}

const togglePlainJSON = () => {
  plainJSON.value = !plainJSON.value;
  localStorage.setItem('plainJSON', plainJSON.value);
}

</script>

<template>
  <div class="editor-actions d-flex align-items-center flex-shrink-0 p-2 gap-2">
    <!-- Toggle View Button -->
    <button class="btn" :disabled="!result"
            @click="togglePlainJSON"
            v-tooltip="{ content: plainJSON ? 'Switch to Tree View' : 'Switch to JSON View', delay: { show: TOOLTIP_DELAY } }">
      <i :class="[plainJSON ? 'fa fa-code' : 'fa fa-list-ul']" aria-hidden="true"/>
    </button>

    <!-- Clipboard Button -->
    <clipboard-copy/>

    <!-- Clear Button -->
    <button class="btn" :disabled="!result"
            @click="clearResult"
            v-tooltip="{ content: 'Clear Results', delay: { show: TOOLTIP_DELAY } }">
      <i class="fa fa-trash" aria-hidden="true"/>
    </button>

    <!-- Run Time -->
    <div v-if="executionTime !== null" class="ml-2 font-weight-bold execution-time">
      <span>Run Time:</span> {{ executionTime.toLocaleString() }} ms
    </div>
  </div>
</template>