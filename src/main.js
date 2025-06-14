import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://a.khmercleaningservice.us/api',
  headers: {
    Authorization: `Bearer ${this.token}`,
  },
}); // Adjust to your Laravel server URL
const app = createApp(App)

app.use(createPinia());
app.use(router)
app.mount('#app')

