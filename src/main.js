import { createApp } from 'vue'
import App from './App.vue'

import StyleDefines from './assets/StyleDefines.json'
import Database from './assets/database.js'

Database.init()
 
Database.init().then(() => {
    const app = createApp(App)
    app.provide('$styles', StyleDefines)
    app.provide('$database', Database)
    app.mount('#app')
})