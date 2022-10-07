import './assets/scss/bootstrap.scss';
import './assets/scss/app.scss';
import { createApp } from 'vue'
import App from './App.vue'
import AblyApp from './Ably.vue'
import router from './router'

// const app = createApp(App)
const app = createApp(AblyApp)

app.use(router)

app.mount('#app')

