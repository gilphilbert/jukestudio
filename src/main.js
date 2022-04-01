import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import StyleDefines from './assets/StyleDefines.json'
import Database from './assets/database.js'
 
const app = createApp(App)
app.use(router)
app.provide('$styles', StyleDefines)
app.provide('$database', Database)
app.mount('#app')