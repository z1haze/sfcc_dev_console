<script setup>
import {ref, computed} from 'vue';
import {storeToRefs} from 'pinia';
import {showMessage} from '../util.js';
import {TOOLTIP_DELAY} from '../constants.js';
import {useDefaultStore} from '../stores.js';

const store = useDefaultStore();
const {result, getJSON} = storeToRefs(store);
const copied = ref(false);
const copyError = ref(false);

const getClipboard = computed(() => {
  if (copied.value) {
    return 'fa fa-check';
  } else if (copyError.value) {
    return 'fa fa-exclamation-triangle';
  }

  return 'fa fa-clipboard';
});

const clipboardSuccessHandler = () => {
  copied.value = true;
  copyError.value = false;

  showMessage('success', 'Copied to Clipboard');

  setTimeout(() => {
    copied.value = false;
  }, 3000);
};

const clipboardErrorHandler = (err) => {
  copied.value = false;
  copyError.value = true;

  showMessage('error', err.message);

  setTimeout(() => {
    copyError.value = false;
  }, 3000);
}
</script>

<template>
  <button class="btn" :disabled="!result"
          v-clipboard:copy="getJSON"
          v-clipboard:success="clipboardSuccessHandler"
          v-clipboard:error="clipboardErrorHandler"
          v-tooltip="{ content: 'Copy to Clipboard', delay: { show: TOOLTIP_DELAY } }">
    <i :class="getClipboard" aria-hidden="true"/>
  </button>
</template>