<template>
  <div
    class="container py-5 d-flex flex-column align-items-center justify-content-center position-relative"
    style="min-height: 70vh"
  >
    <button
      @click="goHome"
      class="btn btn-link position-absolute top-0 start-0 m-3 text-decoration-none text-primary"
      aria-label="Go back"
      style="font-size: 1.5rem"
    >
      <i class="bi bi-arrow-left"></i>
    </button>

    <div class="text-center mb-4 fade-slide-up">
      <img
        src="/images/logocleaning.png"
        alt="Simple Logo"
        style="width: 200px; height: auto"
        class="mb-3"
      />
      <h2 class="fw-bold">Sign In</h2>
      <p class="text-muted">Welcome back! Please sign in to your account.</p>
    </div>

    <form
      @submit.prevent="handleSignIn"
      class="w-100 fade-slide-up delay-1"
      style="max-width: 400px"
    >
      <div class="mb-3">
        <label for="email" class="form-label fw-semibold">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="form.email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="mb-4">
        <label for="password" class="form-label fw-semibold">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="form.password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
        {{ isLoading ? "Signing In..." : "Sign In" }}
      </button>

      <div class="text-center mt-3">
        <small>
          Don't have an account?
          <a href="/signup" class="text-primary">Register here</a>
        </small>
      </div>

      <div v-if="errors.length" class="alert alert-danger mt-3">
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const isLoading = ref(false);
const errors = ref([]);

const form = reactive({
  email: "",
  password: "",
});
// In your SignIn.vue component
import { useAuthStore } from "@/stores/auth";

async function handleSignIn() {
  const authStore = useAuthStore();
  isLoading.value = true;
  errors.value = [];

  if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.value.push("Please enter a valid email address.");
    isLoading.value = false;
    return;
  }
  if (!form.password || form.password.length < 6) {
    errors.value.push("Password must be at least 6 characters long.");
    isLoading.value = false;
    return;
  }

  try {
    console.log("Sending payload:", form);
    const response = await axios.post("https://a.khmercleaningservice.us/api/login", form, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response:", response.data);
    authStore.setToken(response.data.token);
    await authStore.fetchUser(); // Fetch user data after login
    alert(response.data.message);
    form.email = "";
    form.password = "";
    router.push("/");
  } catch (error) {
    console.error("Error:", error.response || error);
    if (error.response) {
      const message =
        error.response.data.message || `Server error: ${error.response.status}`;
      errors.value.push(message);
      if (error.response.data.errors) {
        for (const key in error.response.data.errors) {
          errors.value.push(...error.response.data.errors[key]);
        }
      }
    } else {
      errors.value.push(
        "No response from server. Check if the server is running."
      );
    }
  } finally {
    isLoading.value = false;
  }
}

function goHome() {
  router.push("/");
}
</script>

<style scoped>
form {
  background: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.fade-slide-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeSlideUp 0.8s ease forwards;
}

.delay-1 {
  animation-delay: 0.3s;
}

@keyframes fadeSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
