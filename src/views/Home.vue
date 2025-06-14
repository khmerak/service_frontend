<template>
  <MainLayout>
    <section
      class="container-fluid my-5 d-flex flex-column flex-md-row align-items-center border-bottom fade-in"
      style="min-height: 70vh"
    >
      <div class="w-100 w-md-50 px-3 px-md-5 mb-4 mb-md-0 fade-in">
        <h1 class="mb-4 typewriter">Welcome to Our Cleaning Services</h1>
        <p class="mb-5">
          We provide top-notch cleaning services tailored to your needs. Whether
          it's residential or commercial, our team is dedicated to delivering a
          spotless environment for you.
        </p>
        <div>
          <a href="#" class="btn btn-primary btn-lg me-2 mb-2 mb-md-0"
            >Get Started</a
          >
          <a href="#" class="btn btn-outline-secondary btn-lg">Learn More</a>
        </div>
      </div>

      <div
        class="w-100 w-md-50 d-flex align-items-center justify-content-center"
      >
        <img
          src="/images/cleaning.jpg"
          alt="Cleaning Service"
          class="img-fluid animated-image"
          style="max-height: 60vh; object-fit: cover"
        />
      </div>
    </section>

    <section class="container my-5">
      <h1 class="text-center mb-4 fade-in">Professional Cleaning Services</h1>
      <div class="row justify-content-center g-4 border-0 p-4 rounded-3">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3"
          v-for="(item, index) in services"
          :key="item.id"
        >
          <div
            class="d-flex flex-column align-items-center text-center border border-primary rounded-4 p-4 shadow-sm animate__animated animate__fadeInUp"
            :class="`animate__delay-${index}s`"
          >
            <img
              :src="`https://a.khmercleaningservice.us/storage/${item.image}`"
              alt="Service Image"
              class="mb-3 object-fit-contain"
              style="width: 200px"
            />
            <h3 class="fw-normal text-capitalize">
              {{ item.service_name }}
            </h3>
            <p class="mb-3">
              {{
                item.description
                  ? item.description.slice(0, 30) + "..."
                  : "No description available."
              }}
            </p>
            <router-link to="/services" class="btn btn-primary mt-3 px-4 py-2">
              Read More
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-primary text-white py-5 text-center fade-in">
      <h1 class="fs-3 fw-bold px-3">
        Bringing the best into Cambodia Because quality matters. Your
        satisfaction is our priority.
      </h1>
    </section>

    <section class="container my-5">
      <h3
        class="text-center text-primary mb-3 fade-in"
        style="font-family: 'Dancing Script'"
      >
        See how it works!
      </h3>
      <h1 class="text-center fw-semibold mb-4 fade-in">
        Easy Steps For A Clean And Healthy Environment
      </h1>
      <div class="row g-4">
        <div class="col-md-6" v-for="(step, index) in steps" :key="index">
          <div
            class="card h-100 p-3 shadow-sm"
            :class="index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'"
          >
            <h4 class="text-primary">Step {{ step.number }}</h4>
            <h5>{{ step.title }}</h5>
            <p>{{ step.description }}</p>
            <a
              href="#"
              class="text-primary fs-2 text-end d-block text-decoration-none"
              >></a
            >
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import MainLayout from "../layouts/MainLayout.vue";

const router = useRouter();
const services = ref([]);

const fetchServices = async () => {
  try {
    const response = await axios.get("https://a.khmercleaningservice.us/api/get_services");
    services.value = response.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
  }
};

onMounted(() => {
  fetchServices();

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
    ".fade-in, .slide-in-left, .slide-in-right, .animated-image"
  );
  elements.forEach((el) => observer.observe(el));
});

const steps = [
  {
    number: 1,
    title: "Providing Us With Your Cleaning Details",
    description:
      "Just provide us the timing you want and we will schedule according to your needs.",
  },
  {
    number: 2,
    title: "Pick the Suitable Plan For Your House",
    description:
      "We inspect the area and prepare for disinfection, taking your concerns into account.",
  },
  {
    number: 3,
    title: "Online Scheduling In Just a Few Clicks",
    description: "Schedule online quickly and easily with just a few steps.",
  },
  {
    number: 4,
    title: "Cleaning With Care & Leave Quickly",
    description:
      "We clean with care and efficiency, leaving your space spotless.",
  },
];

const goToService = (id) => {
  router.push(`/services/${id}`);
};
</script>

<style scoped>
.fade-in,
.slide-in-left,
.slide-in-right,
.animated-image {
  opacity: 0;
  transition: opacity 1s ease, transform 1s ease;
}

.fade-in.animate {
  opacity: 1;
  transform: translateY(0);
}

.slide-in-left.animate {
  opacity: 1;
  transform: translateX(0);
}

.slide-in-right.animate {
  opacity: 1;
  transform: translateX(0);
}

.animated-image.animate {
  opacity: 1;
  transform: scale(1);
}

.fade-in {
  transform: translateY(30px);
}

.slide-in-left {
  transform: translateX(-50px);
}

.slide-in-right {
  transform: translateX(50px);
}

.animated-image {
  transform: scale(0.9);
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blinkCaret {
  50% {
    border-color: transparent;
  }
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 0.15em solid #000;
  width: 0;
  animation: typing 3s steps(40, end) forwards,
    blinkCaret 0.75s step-end infinite;
}
</style>
