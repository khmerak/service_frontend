<template>
  <div class="container my-5">
    <button @click="goBack" class="btn btn-link mb-4">
      <i class="bi bi-arrow-left"></i>
    </button>

    <h2 class="mb-4">Checkout</h2>

    <div class="row">
      <!-- Billing Form -->
      <div class="col-md-7">
        <div class="card shadow-sm p-4">
          <h5 class="mb-3">Billing Information</h5>
          <form @submit.prevent="submitOrder">
            <div class="mb-3">
              <label class="form-label">Full Name</label>
              <input
                v-model="form.name"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Phone Number</label>
              <input
                v-model="form.phone"
                type="tel"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Address</label>
              <textarea
                v-model="form.address"
                class="form-control"
                rows="3"
                required
              ></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Payment Method</label>
              <select v-model="form.payment" class="form-select" required>
                <option value="">Select</option>
                <option value="cod">Cash on Delivery</option>
                <option value="paypal">PayPal</option>
                <option value="credit_card">Credit Card</option>
              </select>
            </div>
            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="loading"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Confirm Order
            </button>
          </form>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="col-md-5 mt-4 mt-md-0">
        <div class="card shadow-sm p-4">
          <h5 class="mb-3">Order Summary</h5>
          <ul class="list-group mb-3">
            <li
              v-for="item in cartStore.items"
              :key="item.id"
              class="list-group-item d-flex justify-content-between"
            >
              <div>{{ item.product.product_name }} × {{ item.quantity }}</div>
              <strong
                >${{ (item.product.price * item.quantity).toFixed(2) }}</strong
              >
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>${{ cartStore.totalPrice.toFixed(2) }}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const loading = ref(false);

import axios from "axios";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const form = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
  payment: "",
});

const submitOrder = async () => {
  if (cartStore.items.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  loading.value = true;
  try {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      payment: form.payment,
      cart: cartStore.items,
    };

    const token = localStorage.getItem("token");
    await axios.post("http://127.0.0.1:8000/api/checkout", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Order placed successfully!");
    // Optional: clear cart
    // await cartStore.clearCart();
    window.location.href = "/products"; // or order success page
  } catch (error) {
    console.error("Order failed:", error);
    alert("Something went wrong.");
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  window.location.href = "/cart";
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
