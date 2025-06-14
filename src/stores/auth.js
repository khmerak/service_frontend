import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null, // token if you use token (optional)
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async initialize() {
      // Optionally, load user on app start if token exists
      if (this.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        await this.fetchUser();
      }
    },

    async login(credentials) {
      try {
        this.loading = true;

        // Step 1: Get CSRF cookie before login (Sanctum requirement)
        await axios.get(
          "https://a.khmercleaningservice.us/sanctum/csrf-cookie",
          {
            withCredentials: true,
          }
        );

        // Step 2: Login (send credentials)
        const response = await axios.post(
          "https://a.khmercleaningservice.us/api/login",
          credentials,
          { withCredentials: true }
        );

        // If you receive token from API, save it (optional)
        if (response.data.token) {
          this.token = response.data.token;
          localStorage.setItem("token", this.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.token}`;
        }

        // Step 3: Fetch authenticated user data
        await this.fetchUser();

        this.loading = false;
        return true;
      } catch (error) {
        this.loading = false;
        console.error("Login error:", error.response?.data || error.message);
        throw error;
      }
    },

    async fetchUser() {
      try {
        const response = await axios.get(
          "https://a.khmercleaningservice.us/api/user",
          {
            withCredentials: true, // very important for cookie auth
            headers: this.token
              ? { Authorization: `Bearer ${this.token}` }
              : {},
          }
        );
        this.user = response.data;
      } catch (error) {
        console.error(
          "Fetch user error:",
          error.response?.data || error.message
        );
        this.logout();
      }
    },

    async logout() {
      try {
        await axios.post(
          "https://a.khmercleaningservice.us/api/logout",
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
      }
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});
