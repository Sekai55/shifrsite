import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueMeta from 'vue-meta';
createApp(App).use(router).use(VueMeta).mount('#app')
