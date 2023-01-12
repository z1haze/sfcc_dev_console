<script setup>
import {storeToRefs} from 'pinia';
import {useDefaultStore} from '../stores.js';

const store = useDefaultStore();

store.loadTabs();

const {tabs, activeTab} = storeToRefs(store);

const saveTabs = () => localStorage.setItem('tabs', JSON.stringify(tabs.value));

const removeTab = (i) => {
  if (tabs.value.length > 1) {
    tabs.value.splice(i, 1);
    saveTabs();
  }
};

const addNewTab = () => {
  tabs.value.push({label: 'new tab', value: ''});
  saveTabs();
};

const updateLabel = (text, i) => {
  tabs.value[i].label = text;
  saveTabs();
};

const selectTab = (i) => {
  activeTab.value = i;
  localStorage.setItem('activeTab', i);
}
</script>

<template>
  <div class="tabs">
    <div v-for="(tab, i) of tabs" class="tab p-2 d-inline-block" :class="{'active': i === activeTab}">
      <button type="button" :disabled="tabs.length <= 1" @click="removeTab(i)"><i class="fa fa-close mr-3" aria-hidden="true"/></button>
      <button type="button" class="pr-2" @click="selectTab(i)">
        <span @keydown.enter.prevent="$event.target.blur()"
              @keydown.tab.prevent="$event.target.blur()"
              @input="updateLabel($event.target.innerText, i)"
              v-text="tab.label"
              :contenteditable="activeTab === i"
        ></span>
      </button>
    </div>

    <button type="button" @click="addNewTab" class="p-2 ml-2"><i class="fa fa-plus" aria-hidden="true"/></button>
  </div>
</template>