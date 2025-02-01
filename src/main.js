import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './scss/main.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
