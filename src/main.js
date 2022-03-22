import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import StyleDefines from './assets/StyleDefines.json'

const app = createApp(App)
app.use(router)
app.provide('StyleDefines', StyleDefines)
app.mount('#app')