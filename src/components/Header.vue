<template>
  <header>
    <nav class="navbar navbar-expand-sm bg-white py-3 px-4 mb-4">
      <div class="container-sm d-flex align-items-center justify-content-between">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand">
          <img src="/images/logo.png" alt="Logo" style="width: 150px; height: auto" />
        </router-link>

        <!-- Toggler button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible content -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Navbar links -->
          <div class="navbar-nav mx-auto">
            <router-link to="/" class="nav-link px-3" exact-active-class="active">Home</router-link>
            <router-link to="/about" class="nav-link px-3" exact-active-class="active">About Us</router-link>
            <router-link to="/services" class="nav-link px-3" exact-active-class="active">Services</router-link>
            <router-link to="/products" class="nav-link px-3" exact-active-class="active">Products</router-link>
            <router-link to="/contactus" class="nav-link px-3" exact-active-class="active">Contact Us</router-link>
          </div>

          <!-- Conditional Auth Links -->
          <div class="d-flex align-items-center ms-auto mt-3 mt-sm-0">
            <template v-if="!authStore.isAuthenticated">
              <router-link to="/signin" class="btn btn-outline-primary me-2">Sign In</router-link>
              <router-link to="/signup" class="btn btn-primary me-2">Sign Up</router-link>
            </template>
            <template v-else>
              <router-link to="/profile" class="btn btn-primary me-2">
                {{ authStore.user?.name || "Profile" }}
              </router-link>
            </template>

            <router-link to="/cart" class="btn btn-outline-secondary position-relative">
              <i class="bi bi-cart"></i>
              <span
                v-if="cartStore.totalItems > 0"
                class="badge bg-primary position-absolute top-0 start-100 translate-middle"
              >
                {{ cartStore.totalItems }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";

const authStore = useAuthStore();
const cartStore = useCartStore();

onMounted(() => {
  authStore.fetchUser();
  cartStore.fetchItems(); // Load cart count on page load
});
</script>

<style scoped>
.nav-link {
  font-size:1.2rem;
  color: #333;
  transition: color 0.3s ease;
  text-decoration: none;
}
@media (max-width: 768px) {
  .nav-link {
  font-size:0.8rem;
}
}
.nav-link:hover,
.nav-link.active {
  color: #1d4ed8;
}
.badge {
  font-size: 0.75rem;
}
</style>
