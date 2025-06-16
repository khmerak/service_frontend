<template>
  <MainLayout>
    <!-- Hero Banner -->
    <div class="position-relative text-center overflow-hidden hero-banner">
      <img
        src="/images/portrait3.png"
        alt="Banner"
        class="img-fluid w-100 object-fit-cover"
      />
      <div class="hero-text position-absolute text-white text-center">
        <h1 class="animate__animated animate__fadeInDown">
          Service <span class="text-primary">& Prices</span>
        </h1>
        <p class="animate__animated animate__fadeInUp animate__delay-1s">
          We don’t just clean, we refresh, renew,<br />
          <strong class="text-primary">and restore your space to its best self</strong>
        </p>
      </div>
    </div>

    <!-- Section Heading -->
    <div class="find-out text-center my-5 animate__animated animate__fadeInDown animate__delay-2s">
      <h3>Find out our service range</h3>
      <h2>Professional Cleaning Services</h2>
    </div>

    <!-- Services -->
    <div class="container service">
      <div class="row g-4">
        <div class="col-12" v-for="(item, index) in services" :key="item.id">
          <div
            class="d-flex flex-column flex-md-row align-items-center border border-primary rounded-4 p-4 shadow-sm animate__animated animate__fadeInUp"
            :class="`animate__delay-${index}s`"
          >
            <img
              :src="`https://a.khmercleaningservice.us/storage/${item.image}`"
              alt="Service Image"
              class="img-fluid rounded mb-3 mb-md-0 object-fit-contain"
              style="width: 200px"
            />
            <div class="ms-md-4 text-center text-md-start">
              <p class="fw-normal text-secondary mb-1">
                {{ item.service_category.service_category_name }}
              </p>
              <h3 class="fw-normal text-capitalize">
                {{ item.service_name }}
              </h3>
              <p class="mb-3">
                {{ item.description ?? 'No description available.' }}
              </p>
              <h4 class="text-primary">
                Size: {{ item.type }} | ${{ item.price }}
              </h4>
              <router-link to="/contactus" class="btn btn-primary mt-3 px-4 py-2">
                Request a Quote
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MainLayout from '../layouts/MainLayout.vue'

const services = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('https://a.khmercleaningservice.us/api/services')
    services.value = response.data
  } catch (error) {
    console.error('Failed to fetch services:', error)
  }
})
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

/* Hero Section */
.hero-banner {
  height: auto;
  max-height: 80vh;
  position: relative;
}

.hero-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

.hero-text {
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  padding: 0 1rem;
}

.hero-text h1 {
  font-size: 3.5rem;
  color: #ffffff;
  font-weight: 600;
}

.hero-text p {
  font-size: 1.25rem;
  margin-top: 1rem;
  color: #f8f9fa;
}

@media (max-width: 767.98px) {
  .hero-text h1 {
    font-size: 1.4rem;
  }

  .hero-text p {
    font-size: 0.5rem;
  }
}

/* Section Titles */
.find-out h3 {
  font-size: 1.75rem;
  color: #10669f;
  font-family: "Dancing Script", cursive;
}

.find-out h2 {
  color: #10669f;
  font-size: 2.5rem;
  font-weight: 300;
}
</style>
