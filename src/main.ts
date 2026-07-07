import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 全局样式
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
