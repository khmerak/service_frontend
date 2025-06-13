<template>
  <MainLayout>
    <!-- Hero Section -->
    <div class="about position-relative text-white overflow-hidden">
      <img
        src="/public/images/zarla1.png"
        alt="about us"
        class="img-fluid rounded-4 w-100"
      />
      <div
        class="position-absolute top-50 start-0 translate-middle-y ps-5 animate-item fade-left"
      >
        <h1 class="display-3 fw-light">
          Contact <span class="text-primary">US</span>
        </h1>
        <p class="fs-5 mt-3 d-none d-md-block">
          We use specialize and quality equipment tools for cleaning
        </p>
      </div>
    </div>

    <div class="form bg-primary py-5 rounded-4 animate-item fade-up">
      <div class="text-center text-white mb-5">
        <h1 class="fw-light display-5">Request An Estimate</h1>
      </div>
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6 text-white">
            <h3>
              Your Clients & Employees Deserve A Clean, Safe And Healthy
              Environment!!
            </h3>
            <p class="mt-3">
              Hire Someone to clean your home can feel a big decision...
            </p>
            <a href="#" class="btn btn-light text-primary fw-semibold"
              >→ Our Products</a
            >
            <p class="mt-3">
              We do everything we can to make our services affordable...
            </p>
          </div>

          <div class="col-md-6">
            <form class="bg-white p-4 rounded-4 shadow animate-item fade-right">
              <h2 class="text-center fw-normal">Fill out the form</h2>
              <p class="text-muted text-center">
                For a cleaning that meets your highest standards...
              </p>

              <div class="row g-3">
                <div class="col-md-6">
                  <label for="services" class="form-label"
                    >Choose your service</label
                  >
                  <select id="services" class="form-select">
                    <option>Dust Cleaning</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="weekly" class="form-label"
                    >Type of cleaning</label
                  >
                  <select id="weekly" class="form-select">
                    <option>Weekly Regular</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="facility" class="form-label">Facility type</label>
                  <select id="facility" class="form-select">
                    <option>Office</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="facility-name" class="form-label"
                    >Facility Name</label
                  >
                  <select id="facility-name" class="form-select">
                    <option>Ocean Gate</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="room" class="form-label">Room(s)?</label>
                  <select id="room" class="form-select">
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="hallway" class="form-label">Hallway(s)?</label>
                  <select id="hallway" class="form-select">
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="staircase" class="form-label"
                    >Staircase(s)?</label
                  >
                  <select id="staircase" class="form-select">
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>

              <div class="mt-4">
                <p>Do you have all the necessary cleaning supplies?</p>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="supplies"
                    id="yes"
                    value="Yes"
                    checked
                  />
                  <label class="form-check-label" for="yes">Yes</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="supplies"
                    id="no"
                    value="No"
                  />
                  <label class="form-check-label" for="no">No</label>
                </div>
              </div>

              <div class="text-center mt-4">
                <button type="submit" class="btn btn-primary px-5 py-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Info Section -->
    <div class="info container my-5 animate-item fade-up">
      <div class="row g-4">
        <div class="col-md-6">
          <div class="border border-primary rounded-4 p-4 shadow-sm">
            <h3 class="text-primary">Address</h3>
            <p>
              House Cleanning Services <br />
              #25, National Road 2,<br />
              Sangkat Chak Angrae Leu,<br />
              Khan Mean Chey,<br />
              Phnom Penh, Cambodia 12354
            </p>
          </div>
          <div class="border border-primary rounded-4 p-4 mt-3 shadow-sm">
            <h2 class="text-primary">Phone</h2>
            <h5>
              Cellcard:
              <span class="text-primary text-decoration-underline"
                >+855 12 686 252</span
              >
            </h5>
            <h5>
              Smart:
              <span class="text-primary text-decoration-underline"
                >+855 15 686 252</span
              >
            </h5>
            <h5>
              Hotline:
              <span class="text-primary text-decoration-underline"
                >+855 23 885 008</span
              >
            </h5>
            <h5>
              Email:
              <span class="text-primary text-decoration-underline"
                >info@housecleaning.com</span
              >
            </h5>
          </div>
        </div>

        <div class="col-md-6">
          <form
            class="border border-primary rounded-4 p-4 shadow-sm animate-item fade-left"
          >
            <h2 class="text-primary">More Information</h2>
            <p class="text-muted">
              If you wish to request a quote or ask for additional information,
              please fill in the contact form and we will reply you shortly.
            </p>
            <div class="mb-3">
              <label for="name" class="form-label">Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="textarea" class="form-label"
                >Please give us more information</label
              >
              <textarea
                id="textarea"
                name="textarea"
                class="form-control"
                rows="3"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted } from "vue";
import MainLayout from "../layouts/MainLayout.vue";

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document
    .querySelectorAll(".animate-item")
    .forEach((el) => observer.observe(el));
});
</script>

<style scoped>
.about {
  height: 500px;
}

/* Animation styles */
.animate-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.7s ease;
}

.animate-item.fade-left {
  transform: translateX(-30px);
}

.animate-item.fade-right {
  transform: translateX(30px);
}

.animate-item.fade-up {
  transform: translateY(30px);
}

.animate-item.animate {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
