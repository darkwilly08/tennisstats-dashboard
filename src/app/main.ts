import { createApp } from 'vue'
import './style.css'
import App from '../App.vue'
import router from './router'
import { initWebViewAuth } from '@/shared/services/firebase'

// Initialize Flutter InAppWebView authentication listener
initWebViewAuth()

const app = createApp(App)
app.use(router)
app.mount('#app')