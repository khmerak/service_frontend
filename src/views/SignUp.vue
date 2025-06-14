<template>
  <div
    class="container py-5 d-flex flex-column align-items-center justify-content-center position-relative"
    style="min-height: 70vh"
  >
    <!-- Back Button -->
    <button
      @click="goHome"
      class="btn btn-link position-absolute top-0 start-0 m-3 text-decoration-none text-primary"
      aria-label="Go back"
      style="font-size: 1.5rem"
    >
      <i class="bi bi-arrow-left"></i>
    </button>

    <!-- Logo -->
    <div class="text-center mb-4 fade-slide-up">
      <img
        src="/images/logocleaning.png"
        alt="Simple Logo"
        style="width: 200px; height: auto"
        class="mb-3"
      />
      <h2 class="fw-bold">Sign Up</h2>
      <p class="text-muted">Create a new account to get started.</p>
    </div>

    <!-- Sign-up Form -->
    <form
      @submit.prevent="handleSignUp"
      class="w-100 fade-slide-up delay-1"
      style="max-width: 400px"
    >
      <div class="mb-3">
        <label for="name" class="form-label fw-semibold">Name</label>
        <input
          type="text"
          id="name"
          class="form-control"
          v-model="form.name"
          placeholder="Enter your name"
          required
        />
      </div>

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

      <div class="mb-3">
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

      <div class="mb-4">
        <label for="password_confirmation" class="form-label fw-semibold"
          >Confirm Password</label
        >
        <input
          type="password"
          id="password_confirmation"
          class="form-control"
          v-model="form.password_confirmation"
          placeholder="Confirm your password"
          required
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary w-100"
        :disabled="isLoading"
      >
        {{ isLoading ? "Signing Up..." : "Sign Up" }}
      </button>

      <div class="text-center mt-3">
        <small>
          Already have an account?
          <a href="/signin" class="text-primary">Sign in here</a>
        </small>
      </div>

      <!-- Error Messages -->
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
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

async function handleSignUp() {
  isLoading.value = true;
  errors.value = [];

  try {
    const response = await axios.post("https://a.khmercleaningservice.us/api/register", form);
    alert(response.data.message);
    // Clear form
    form.name = "";
    form.email = "";
    form.password = "";
    form.password_confirmation = "";
    // Redirect to sign-in or dashboard
    router.push("/signin");
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errorMessages = error.response.data.errors;
      for (const key in errorMessages) {
        errors.value.push(...errorMessages[key]);
      }
    } else {
      errors.value.push("An unexpected error occurred. Please try again.");
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

/* Animations */
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