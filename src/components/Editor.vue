<script setup>
import {reactive} from 'vue';
import {storeToRefs} from 'pinia';

import MonacoEditor from 'vue-monaco-cdn';

import {useDefaultStore} from '../stores.js';
const store = useDefaultStore();
const {theme, tabs, activeTab, editor, result} = storeToRefs(store);

const editorOptions = reactive({
  automaticLayout: true,
  fontLigatures: true,
  minimap: {enabled: false},
  scrollBeyondLastLine: false,
  selectOnLineNumbers: true,
  showGlyphMargin: false,
  smoothScrolling: true,
  lineDecorationsWidth: 20,
  padding: {
    top: 10,
    bottom: 10
  }
});

const editorDidMount = (m) => {
  editor.value = m;

  // Add Clear Results Command to Editor
  editor.value.addAction({
    id: 'dev-console-clear',
    label: 'Clear Results',
    keybindings: [
      monaco.KeyMod.Alt | monaco.KeyCode.KeyR
    ],
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: 'dev_console',
    contextMenuOrder: 3,
    run: () => result.value = null
  });
}
</script>

<template>
  <monaco-editor
      v-model="tabs[activeTab].value"
      class="editor flex-grow-1"
      language="javascript"
      :theme="theme"
      :options="editorOptions"
      @editorDidMount="editorDidMount"
  />
</template>