<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// Import required modules for Swiper
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const authStore = useAuthStore();

onMounted(() => {
  authStore.initialize(); // Restore axios header with token from localStorage
  authStore.fetchUser();  // Fetch user info if token exists
});

// export Swiper modules to use in components (if needed)
const modules = [Autoplay, Pagination, Navigation];
</script>
