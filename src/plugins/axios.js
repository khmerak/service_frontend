import axios from "axios";

const api = axios.create({
  baseURL: "https://a.khmercleaningservice.us", // your production base URL
  withCredentials: true, // send cookies for Sanctum auth
});

export default api;
