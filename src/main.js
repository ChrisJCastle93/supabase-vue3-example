import { createApp } from 'vue'
import '@/assets/stylesheets/main.css'
import App from './App.vue'
import router from '@/router/router.js'
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount('#app')
