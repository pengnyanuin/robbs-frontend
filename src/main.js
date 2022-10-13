import './assets/scss/bootstrap.scss';
import './assets/scss/app.scss';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AuthService from "@/services/auth.service";

const app = createApp(App)

app.use(router)

app.mount('#app')
