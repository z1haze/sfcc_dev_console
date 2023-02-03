<script setup>
import {ref, watch} from 'vue';
import {storeToRefs} from 'pinia';

import AppHeader from './components/Header.vue';
import EditorActionsLeft from './components/EditorActionsLeft.vue';
import EditorActionsRight from './components/EditorActionsRight.vue';
import Editor from './components/Editor.vue';
import {Splitpanes, Pane} from 'splitpanes';
import {JsonTreeView} from 'json-tree-view-vue3';

import {checkForUpdate, showMessage} from './util.js';
import {useDefaultStore} from './stores.js';

const store = useDefaultStore();
const {theme, layout, plainJSON, getJSON, result} = storeToRefs(store);

const lpane = ref(localStorage.getItem('lpane') || 50);
const rpane = ref(localStorage.getItem('rpane') || 50);

const lastUpdateCheck = localStorage.getItem('lastUpdateCheck');

// Check for updates no more than once a week
if (!lastUpdateCheck || (new Date().getTime()) - parseInt(lastUpdateCheck) > 604800000) {
  checkForUpdate()
      .catch((e) => showMessage('error', e.message));
}

/**
 * Watch for layout changes, and adjust panes accordingly
 */
watch(layout, () => {
  switch (layout.value) {
    case 'left':
      lpane.value = 100;
      rpane.value = 0;
      break;
    case 'right':
      lpane.value = 0;
      rpane.value = 100;
      break;
    default:
      lpane.value = 50;
      rpane.value = 50;
  }

  // store current pane positions after updating
  localStorage.setItem('lpane', lpane.value);
  localStorage.setItem('rpane', rpane.value);
});

/**
 * When the pane resize event is fired, updated positions
 * in local storage to preserve state
 * @param event
 */
const onResizePanes = (event) => {
  localStorage.setItem('lpane', event[0].size);
  localStorage.setItem('rpane', 100 - event[0].size);
}

const windowWidth = ref(document.body.clientWidth);
window.addEventListener('resize', () => windowWidth.value = document.body.clientWidth);
</script>

<template>
  <!-- Top Bar Header -->
  <app-header/>

  <splitpanes :horizontal="windowWidth <= 768" class="default-theme" @resize="onResizePanes">
    <pane v-if="lpane > 0" min-size="25" :size="lpane" class="left-pane d-flex flex-column">
      <!-- Editor Actions Left -->
      <editor-actions-left/>

      <!-- Monaco Editor -->
      <editor/>
    </pane>

    <pane v-if="rpane > 0" min-size="25" :size="rpane" class="right-pane d-flex flex-column">
      <!-- Editor Actions Left -->
      <editor-actions-right/>

      <!-- Output -->
      <div class="output p-2" v-if="result">
        <pre v-if="plainJSON" ref="outputPlain">{{ getJSON }}</pre>
        <JsonTreeView v-else :data="getJSON" :max-depth="10" root-key="result"
                      :color-scheme="theme === 'vs' ? 'light' : 'dark'"/>
      </div>
    </pane>
  </splitpanes>

  <DialogsWrapper />
</template>
