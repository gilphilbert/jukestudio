import { createApp } from 'vue'
import App from './App.vue'

import StyleDefines from './assets/StyleDefines.json'
import Database from './assets/database.js'
import Printer from './assets/printer.js'

Printer.init(Database)
 
Database.init().then(() => {
    const app = createApp(App)
    app.provide('$styles', StyleDefines)
    app.provide('$database', Database)
    app.provide('$printer', Printer)
    app.mount('#app')
})