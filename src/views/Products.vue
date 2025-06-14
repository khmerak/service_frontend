<template>
  <MainLayout>
    <!-- Slider Section -->
    <SwiperSlider :images="images" />

    <!-- Quote Section -->
    <div class="quote rounded-3">
      <h4>See How It Works!</h4>
      <h1>Clean smarter, Live better!</h1>
    </div>

    <!-- Filters -->
    <div
      class="d-flex flex-column flex-md-row gap-3 justify-content-between mt-5 align-items-center"
    >
      <!-- Category Select -->
      <select
        v-model="selectedCategory"
        class="form-select bg-light text-black rounded-2 w-100 w-md-25"
      >
        <option value="all">All</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.category_name"
        >
          {{ category.category_name }}
        </option>
      </select>

      <!-- Search Input -->
      <div class="position-relative w-100 w-md-25">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search for products..."
          class="form-control ps-5 py-2 border-primary text-primary rounded-3"
        />
        <i
          class="fa fa-search position-absolute text-primary"
          style="top: 50%; left: 15px; transform: translateY(-50%)"
        ></i>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="container mt-5">
      <div v-if="isLoading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="alert alert-info">
        No products found.
      </div>

      <div
        v-else
        class="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center"
      >
        <div
          v-for="(product, index) in filteredProducts"
          :key="index"
          class="col"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import MainLayout from "../layouts/MainLayout.vue";
import SwiperSlider from "../components/SwiperSlider.vue";
import ProductCard from "../components/ProductCard.vue";

// Images for slider
const images = [
  "/images/slider1.jpg",
  "/images/slider2.jpg",
  "/images/slider3.jpg",
  "/images/slider4.jpg",
  "/images/slider5.jpg",
  "/images/slider6.jpg",
  "/images/slider7.jpg",
  "/images/Amaciante_Sonho.jpg",
];

// State
const allProducts = ref([]);
const selectedCategory = ref("all");
const categories = ref([]);
const searchQuery = ref("");
const isLoading = ref(false);

// Fetch data on mount
onMounted(async () => {
  isLoading.value = true;
  try {
    const [productRes, categoryRes] = await Promise.all([
      axios.get("https://a.khmercleaningservice.us/api/products"),
      axios.get("https://a.khmercleaningservice.us/api/categories"),
    ]);
    allProducts.value = productRes.data;
    categories.value = categoryRes.data;
  } catch (error) {
    console.error("Error loading data:", error);
    alert("Failed to load products or categories.");
  } finally {
    isLoading.value = false;
  }
});

// Filtered products
const filteredProducts = computed(() => {
  return allProducts.value.filter((product) => {
    const productName = product.product_name?.toLowerCase() || "";
    const categoryName = product.category?.category_name?.toLowerCase() || "";

    const matchesCategory =
      selectedCategory.value === "all" ||
      categoryName.includes(selectedCategory.value.toLowerCase());

    const matchesSearch = productName.includes(searchQuery.value.toLowerCase());

    return matchesCategory && matchesSearch;
  });
});
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";

.quote {
  width: 100%;
  height: 150px;
  background: #10669f;
  margin: 30px 0 50px 0;
  text-align: center;
}
.quote h4 {
  color: #fff;
  font-family: "Dancing Script", serif;
  font-size: 20px;
}
.quote h1 {
  color: #fff;
  font-weight: 300;
  font-size: 45px;
  letter-spacing: 5px;
}
.product-grid {
  padding: 20px;
}
</style>
