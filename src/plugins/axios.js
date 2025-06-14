import axios from 'axios';

const api = axios.create({
  baseURL: 'https://a.khmercleaningservice.us', // ✅ Important!
  withCredentials: true, // 🔒 Required for Sanctum (CSRF + cookies)
});

export default api;
