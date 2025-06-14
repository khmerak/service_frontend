import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import axios from "axios";

axios.defaults.baseURL = "https://a.khmercleaningservice.us/"; // Adjust to your Laravel server URL
const app = createApp(App)
authStore.initialize();
authStore.fetchUser();

app.use(createPinia());
app.use(router)
app.mount('#app')

