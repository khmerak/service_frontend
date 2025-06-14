<template>
  <div class="container my-5">
    <div
      id="loadingSpinner"
      style="
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
      "
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <button
      @click="goHome"
      class="btn btn-link position-absolute top-0 start-0 m-3 text-decoration-none text-primary"
      aria-label="Go back"
      style="font-size: 1.5rem"
    >
      <i class="bi bi-arrow-left"></i>
    </button>

    <h2>Your Cart</h2>

    <div v-if="cartStore.items.length === 0" class="alert alert-info">
      Your cart is empty.
    </div>

    <div v-else>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartStore.items" :key="item.id">
            <td>
              <img
                :src="getProductImage(item.product.image)"
                alt="Product"
                width="50"
                class="me-2"
              />
              {{ item.product.product_name }}
            </td>
            <td>${{ parseFloat(item.product.price).toFixed(2) }}</td>
            <td>
              <input
                type="number"
                v-model.number="item.quantity"
                @input="debounceQuantityUpdate(item)"
                min="1"
              />
              <span
                v-if="cartStore.isUpdating(item.id)"
                class="text-muted ms-2"
              >
                Updating...
              </span>
            </td>
            <td>${{ (item.quantity * item.product.price).toFixed(2) }}</td>
            <td>
              <button
                class="btn btn-danger btn-sm"
                @click="confirmRemove(item.id, item.product.product_name)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-end">
        <h4>Total: ${{ totalPrice.toFixed(2) }}</h4>
        <button
          @click="gotoCheckout"
          class="btn btn-success"
          :disabled="cartStore.items.length === 0"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const router = useRouter();

const gotoCheckout = () => {
  router.push("/checkout"); // or the route name if using named routes
};
// Load cart on mount
onMounted(() => {
  cartStore.fetchItems();
});

const goHome = () => {
  window.location.href = "/products";
};

const getProductImage = (path) =>
  path?.startsWith("http") ? path : `https://a.khmercleaningservice.us/storage/${path}`;

// Manage timeout for each item's debounced update
const quantityTimers = ref({});

function debounceQuantityUpdate(item) {
  if (quantityTimers.value[item.id]) {
    clearTimeout(quantityTimers.value[item.id]);
  }
  quantityTimers.value[item.id] = setTimeout(() => {
    cartStore.updateQuantity(item);
  }, 500);
}

const removeFromCart = async (id) => {
  try {
    await cartStore.removeItem(id);
    alert("Item removed from cart.");
  } catch (error) {
    alert("Failed to remove item.");
    console.error(error);
  }
};

const confirmRemove = (id, name) => {
  if (confirm(`Are you sure you want to remove "${name}" from the cart?`)) {
    removeFromCart(id);
  }
};

const totalPrice = computed(() => cartStore.totalPrice);
</script>

<style scoped>
.table {
  width: 100%;
}
.btn-success:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
