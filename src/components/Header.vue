<script setup>
import {computed} from 'vue';
import LayoutSelector from './LayoutSelector.vue';
import ThemeSelector from './ThemeSelector.vue';

const reload = () => window.location.reload();
const getLogo = computed(() => `${window.staticPath}/img/logo.png`);
</script>

<template>
  <header class="d-flex align-items-center justify-content-between px-2">
    <!-- Logo -->
    <a href="#" @click.prevent="reload()" class="text-decoration-none d-flex align-items-center">
      <img :src="getLogo" alt="logo" class="logo">
      <span class="d-none d-md-block">SFCC Dev Console</span>
    </a>

    <div class="d-flex align-items-center">

      <!-- Layout Selector -->
      <layout-selector/>

      <!-- Theme Selector -->
      <theme-selector/>
    </div>
  </header>
</template>
