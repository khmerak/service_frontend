import { defineStore } from "pinia";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    loading: false, // general loading flag
    addingItemIds: [], // track items currently adding (to disable add button)
    updatingItemIds: [], // track items being updated (for quantity updates)
  }),

  getters: {
    totalPrice: (state) =>
      state.items.reduce(
        (total, item) => total + item.quantity * parseFloat(item.product.price),
        0
      ),
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    isLoading: (state) => state.loading,
    isAdding: (state) => (id) => state.addingItemIds.includes(id),
    isUpdating: (state) => (id) => state.updatingItemIds.includes(id),
  },

  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        const res = await axios.get(`${API_BASE}/cart`, {
          headers: getAuthHeaders(),
        });
        this.items = res.data;
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      } finally {
        this.loading = false;
      }
    },

    async addItem(product) {
      const existingItem = this.items.find((i) => i.product_id === product.id);

      if (existingItem) {
        if (this.addingItemIds.includes(existingItem.id)) {
          return;
        }
        this.addingItemIds.push(existingItem.id);

        try {
          const newQuantity = existingItem.quantity + 1;

          await this.updateQuantity({
            id: existingItem.id,
            quantity: newQuantity,
          });

          // Instead of local update, fetch fresh cart data from backend:
          await this.fetchItems();
        } catch (err) {
          console.error("Failed to add quantity:", err);
          throw err;
        } finally {
          this.addingItemIds = this.addingItemIds.filter(
            (id) => id !== existingItem.id
          );
        }
      } else {
        this.loading = true;
        try {
          const payload = {
            product_id: product.id,
            price: product.price,
            quantity: 1,
          };
          const res = await axios.post(`${API_BASE}/cart`, payload, {
            headers: getAuthHeaders(),
          });
          this.items.push(res.data);
        } catch (err) {
          console.error("Failed to add item to cart:", err);
          throw err;
        } finally {
          this.loading = false;
        }
      }
    },

    async removeItem(id) {
      this.loading = true;
      try {
        await axios.delete(`${API_BASE}/cart/${id}`, {
          headers: getAuthHeaders(),
        });

        this.items = this.items.filter((item) => item.id !== id);
      } catch (err) {
        console.error("Failed to remove item:", err);
      } finally {
        this.loading = false;
      }
    },

    async updateQuantity(item) {
      if (this.updatingItemIds.includes(item.id)) return;

      this.updatingItemIds.push(item.id);
      try {
        console.log("Sending update to backend:", item); // ✅ Check if this logs
        await axios.put(
          `${API_BASE}/cart/${item.id}`,
          { quantity: item.quantity },
          { headers: getAuthHeaders() }
        );
      } catch (err) {
        console.error("Failed to update quantity:", err);
      } finally {
        this.updatingItemIds = this.updatingItemIds.filter(
          (id) => id !== item.id
        );
      }
    },
  },
});
