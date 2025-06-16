<template>
  <div class="container py-5">
    <h2 class="mb-4">My Profile</h2>

    <div class="row">
      <!-- User Info -->
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <img
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(
                authStore.user?.name || 'User'
              )}`"
              alt="Avatar"
              class="rounded-circle mb-3"
              style="width: 100px; height: 100px"
            />
            <h5 class="card-title">{{ authStore.user?.name || "User" }}</h5>
            <p class="card-text mb-1">
              <strong>Email:</strong> {{ authStore.user?.email || "N/A" }}
            </p>
            <p class="card-text">
              <strong>Phone:</strong> {{ authStore.user?.phone || "N/A" }}
            </p>
            <div class="d-flex align-items-center justify-content-center-center">
              <button @click="goHome" class="btn btn-primary mx-4">
              Back
              </button>
              <button @click="handleLogout" class="btn btn-outline-danger mx-3">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items Table -->
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-3">My Order Items</h5>

            <div class="table-responsive">
              <table
                class="table table-bordered table-hover"
                v-if="!loading && !error"
              >
                <thead class="table-light">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in flattenedOrderItems"
                    :key="item.id"
                  >
                    <td>
                      {{
                        item.order?.invoice
                          ? "INV" +
                            item.order.invoice.id.toString().padStart(3, "0")
                          : "#" + item.order?.id
                      }}
                    </td>
                    <td>{{ item.order?.order_date || "N/A" }}</td>
                    <td>{{ item.product?.product_name || "Product" }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.price }} USD</td>
                    <td>{{ (item.price * item.quantity).toFixed(2) }} USD</td>
                    <td>
                      <span
                        :class="[
                          'badge',
                          item.order?.status === 'paid'
                            ? 'bg-success'
                            : 'bg-warning',
                        ]"
                      >
                        {{ item.order?.status || "unknown" }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="flattenedOrderItems.length === 0">
                    <td colspan="7" class="text-center text-muted">
                      No order items found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="loading" class="text-center my-4">
              Loading order items...
            </div>
            <div v-if="error" class="alert alert-danger">
              Error loading: {{ error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const authStore = useAuthStore();
const router = useRouter();

const orders = ref([]);
const loading = ref(false);
const error = ref(null);

// Flatten order_items with reference to their parent order
const flattenedOrderItems = computed(() => {
  return orders.value.flatMap((order) =>
    (order.order_items || []).map((item) => ({
      ...item,
      order: order, // add the parent order reference
    }))
  );
});

onMounted(async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get("https://a.khmercleaningservice.us/api/orders", {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    orders.value = response.data;
  } catch (err) {
    console.error("Error loading orders:", err);
    error.value = err.response?.data?.message || err.message || "Unknown error";
  } finally {
    loading.value = false;
  }
});

function goHome() {
  router.push("/");
}

const handleLogout = async () => {
  await authStore.logout();
  router.push("/");
};

</script>

<style scoped>
@media screen and (max-width: 768px) and (orientation: landscape) {
  table {
    font-size: 0.85rem;
  }

  td,
  th {
    padding: 0.4rem;
    vertical-align: middle;
  }

  .card-body h5 {
    font-size: 1.1rem;
  }
  .table-responsive {
    overflow-x: auto;
  }
}
</style>
