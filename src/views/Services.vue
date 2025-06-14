<template>
  <MainLayout>
    <!-- Hero Banner -->
    <div class="position-relative text-center ad overflow-hidden">
      <img
        src="/images/portrait3.png"
        alt="Banner"
        class="img-fluid animate__animated animate__zoomIn"
      />
      <h1
        class="position-absolute animate__animated animate__fadeInDown"
        style="
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3.5rem;
          color: blue;
        "
      >
        Service & Prices
      </h1>
      <p
        class="position-absolute animate__animated animate__fadeInUp animate__delay-1s"
        style="top: 55%; left: 50%; transform: translate(-50%, -50%)"
      >
        We don’t just clean, we refresh, renew,<br />
        <strong class="text-primary">
          and restore your space to its best self
        </strong>
      </p>
    </div>

    <!-- Section Heading -->
    <div
      class="find-out text-center my-5 animate__animated animate__fadeInDown animate__delay-2s"
    >
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
            <div class="ms-md-4">
              <p class="fw-normal " style="opacity: 0.6;">{{ item.service_category.service_category_name }}</p>
              <h3 class="fw-normal capitalize ">
                {{ item.service_name }}
              </h3>
              <p class="mb-3">{{ item.description ?? 'No description available.' }}</p>
              <h4 class="text-primary">Size: {{ item.type }} | ${{ item.price }}</h4>
              <router-link to="/contactus" class="btn btn-primary mt-3 px-4 py-2">
                Request a quote
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

/* Custom Styling */
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
