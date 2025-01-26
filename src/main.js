import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Toast, { POSITION } from 'vue-toastification'
import { createPinia } from 'pinia'
import 'vue-toastification/dist/index.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(autoAnimatePlugin)
app.use(router)
app.use(createPinia())
app.use(Toast, {
	position: POSITION.TOP_RIGHT,
	timeout: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: false,
})
app.mount('#app')
