// src/plugins/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://a.khmercleaningservice.us/", // or your backend URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
