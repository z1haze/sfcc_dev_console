import { createApp } from 'vue';
import {createPinia} from 'pinia';
import FloatingVue from 'floating-vue';
import VueClipboard from 'vue3-clipboard';

import './scss/dev_console.scss';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(FloatingVue);
app.use(VueClipboard, {
    autoSetContainer: true
});

app.mount('#app');
