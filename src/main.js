import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from "pinia";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import axios from "axios";

// Load token safely
const token = JSON.parse(localStorage.getItem("user"))?.token;

// Optional: you can use this axiosInstance globally, or move it to a plugin
const axiosInstance = axios.create({
  baseURL: 'https://a.khmercleaningservice.us/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
