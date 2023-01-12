<script setup>
import {ref} from 'vue';
import {storeToRefs} from 'pinia';
import RunCode from './RunCode.vue';
import Tabs from './Tabs.vue';
import {TOOLTIP_DELAY} from '../constants.js';
import {useDefaultStore} from '../stores.js';

const maxDepth = ref(parseInt(localStorage.getItem('maxDepth')) ||3);
const store = useDefaultStore();
const {tabs, activeTab} = storeToRefs(store);

const clearCode = () => tabs.value[activeTab.value].value = '';
</script>

<template>
  <div class="editor-actions flex-shrink-0">
    <!-- Tabs -->
    <tabs/>

    <div v-if="activeTab < tabs.length" class="d-flex align-items-center gap-2 p-2">
      <!-- Run Code Button -->
      <run-code :max-depth="maxDepth"/>

      <!-- Reset Button -->
      <button @click="clearCode" :disabled="!tabs[activeTab].value" class="btn" v-tooltip="{ content: 'Reset Editor', delay: { show: TOOLTIP_DELAY } }">
        <i class="fa fa-undo" aria-hidden="true"/>
      </button>

      <!-- Max Depth Selector -->
      <label>
        Max Depth
        <select v-model="maxDepth" v-tooltip="{ content: 'Change Max Depth', delay: { show: TOOLTIP_DELAY } }">
          <option
              v-for="(n, i) in 10"
              :key="i"
              :value="n"
              :selected="n === 3"
              v-text="n"
          />
        </select>
      </label>
    </div>
  </div>
</template>