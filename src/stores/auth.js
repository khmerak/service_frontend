import { defineStore } from "pinia";
import api from "@/plugins/axios"; // use the instance with correct baseURL

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async initialize() {
      if (this.token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        await this.fetchUser();
      }
    },

    async login(credentials) {
  try {
    this.loading = true;

    const response = await api.post("/api/login", credentials);

    if (response.data.token) {
      this.token = response.data.token;
      localStorage.setItem("token", this.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
    }

    await this.fetchUser();
    this.loading = false;
    return true;
  } catch (error) {
    this.loading = false;
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
}
,
    async fetchUser() {
      try {
        const response = await api.get("/api/users");
        this.user = response.data;
      } catch (error) {
        console.error("Fetch user error:", error.response?.data || error.message);
        this.logout();
      }
    },

    async logout() {
      try {
        await api.post("/api/logout");
      } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
      }
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    },
  },
});
