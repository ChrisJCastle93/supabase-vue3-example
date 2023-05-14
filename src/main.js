import { createApp } from 'vue'
import { createPinia } from "pinia";
import router from '@/router/router.js'
import '@/assets/stylesheets/main.css'
import App from './App.vue'
import './registerServiceWorker'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
