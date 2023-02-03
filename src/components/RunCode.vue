<script setup>
const props = defineProps({
  maxDepth: Number,
});

import {ref, watch} from 'vue';
import {storeToRefs} from 'pinia';
import {TOOLTIP_DELAY} from '../constants.js';
import {runCode, showMessage} from '../util.js';
import {useDefaultStore} from '../stores.js';

const store = useDefaultStore();
const {result, executionTime, logs, layout, tabs, activeTab, editor} = storeToRefs(store);
const processing = ref(false);

const run = async () => {
  const code = tabs.value[activeTab.value].value;

  if (!code) return;

  localStorage.setItem('tabs', JSON.stringify(tabs.value));
  processing.value = true;
  store.clearResult();

  try {
    const response = await runCode(code, props.maxDepth);

    if (response) {
      result.value = response.result;
      executionTime.value = response.executionTime || 1;
      logs.value = response.logs;

      if (layout.value !== 'split') {
        layout.value = 'split';
      }
    }
  } catch (e) {
    showMessage('error', e.message);
  }

  processing.value = false;
}

watch(editor, () => {
  if (!editor) return;

  editor.value.addAction({
    id: 'dev-console-run',
    label: 'Run Code',
    keybindings: [
      monaco.KeyMod.Alt | monaco.KeyCode.KeyX
    ],
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: 'dev_console',
    contextMenuOrder: 2,
    run
  });
})
</script>

<template>
  <button :disabled="!tabs[activeTab].value || processing" @click="run" class="btn"
          v-tooltip="{ content: 'Run Code ( alt+x )', delay: { show: TOOLTIP_DELAY } }">
    <i :class="[processing ? 'fa fa-spinner spin' : 'fa fa-play']" aria-hidden="true"/>
  </button>
</template>