<template>
  <MainLayout>
    <main class="position-relative">
      <!-- Hero Section -->
      <div class="position-relative hero-section overflow-hidden">
        <img src="/images/zarla.png" alt="about us" class="img-fluid w-100 animated-image" />
        <h1 class="position-absolute text-white fw-light fade-in"
            style="top: 13%; left: 10%; font-size: 4rem; letter-spacing: 10px;">
          ABOUT <span class="text-primary fw-bold">US</span>
        </h1>
        <p class="position-absolute text-white fw-medium fade-in delay-1"
           style="top: 28%; left: 9%; font-size: 1.25rem;">
          From dust to sparkle, we’ve got every inch covered—so you can enjoy a fresh, clean start.
        </p>
      </div>

      <!-- Info Section -->
      <div class="container my-5">
        <div class="row align-items-center">
          <div class="col-md-6 fade-in">
            <h3 class="text-uppercase text-secondary">Highest Standards to a Growing Demand</h3>
            <h1 class="mb-4">Because <span class="text-primary">Quality is necessary</span></h1>
            <p>
              Cambodia saw strong, uninterrupted growth for most of the past two decades. Booming Real Estate sector
              led to a high demand for related services such as cleaning, pest or termite control, & landscaping.
            </p>
            <p>
              Our company was established to dedicate our services to our clients, from property developers to facility
              managers. Our passion for excellence leads us to continuously invest in improving our internal processes,
              our employees and our relationship with every single business we serve.
            </p>
            <a href="#" class="btn btn-primary mt-3">Check Out Our Services</a>
          </div>
          <div class="col-md-6 text-center scale-in delay-1">
            <img src="/images/Al-Sakhama.png" alt="check" class="img-fluid" />
          </div>
        </div>
      </div>

      <!-- Why Section -->
      <section class="bg-primary text-white text-center py-5 fade-in">
        <div class="container">
          <h1 class="mb-3">Why House Cleaning Service in Cambodia?</h1>
          <p class="fw-medium">
            Our best features to be the right solution for your commercial cleaning, gardening, security,
            pest & termite control needs.
          </p>
        </div>
      </section>
    </main>

    <!-- Features Section -->
    <section class="container my-5">
      <div class="row g-4">
        <div
          class="col-md-6 col-lg-3"
          v-for="(feature, index) in features"
          :key="index"
          :class="`scale-in delay-${index}`"
        >
          <div class="card h-100 text-center p-4 bg-primary text-white shadow-sm">
            <img
              :src="feature.image"
              class="mx-auto mb-3"
              :style="{ width: feature.customWidth || '100px' }"
              :alt="feature.title"
            />
            <h5 class="fw-bold">{{ feature.title }}</h5>
            <p class="small">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import MainLayout from "../layouts/MainLayout.vue";

const features = [
  {
    title: "Highly Trained Employees",
    image: "/images/images.png",
    description:
      "Our crew members are extensively trained and follow strict procedures to ensure the job is done right.",
  },
  {
    title: "Security and Safety",
    image: "/images/119.png",
    description:
      "All crew members go through a background check, are vaccinated, and wear a formal uniform.",
  },
  {
    title: "Quality Control",
    image: "/images/361.png",
    description:
      "We monitor performance via random inspections by our quality control department.",
  },
  {
    title: "Insurance & Liability",
    image: "/images/382032.png",
    description:
      "All crew members are insured to provide complete peace of mind during our services.",
    customWidth: "130px",
  },
];

// Scroll-triggered animation
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  const elements = document.querySelectorAll(
    ".fade-in, .scale-in, .animated-image"
  );
  elements.forEach((el) => observer.observe(el));
});
</script>

<style scoped>
/* Initial hidden state */
.fade-in,
.scale-in,
.animated-image {
  opacity: 0;
  transition: opacity 1s ease, transform 1s ease;
}

/* Final state */
.fade-in.animate {
  opacity: 1;
  transform: translateY(0);
}

.scale-in.animate {
  opacity: 1;
  transform: scale(1);
}

.animated-image.animate {
  opacity: 1;
  transform: scale(1);
}

/* Initial transform */
.fade-in {
  transform: translateY(30px);
}

.scale-in {
  transform: scale(0.95);
}

.animated-image {
  transform: scale(1.1);
}

/* Delay classes */
.delay-0 {
  transition-delay: 0s;
}
.delay-1 {
  transition-delay: 0.4s;
}
.delay-2 {
  transition-delay: 0.8s;
}
.delay-3 {
  transition-delay: 1.2s;
}
.delay-4 {
  transition-delay: 1.6s;
}
</style>
