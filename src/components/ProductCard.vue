<template>
  <div ref="cardRef" :class="['card-item', { visible: isVisible }]">
    <img
      :src="imageUrl"
      :alt="product.product_name || 'Product Image'"
      class="img-fluid rounded-3"
      style="max-height: 200px; object-fit: cover"
    />

    <h3 class="text-start py-2 text-muted" style="font-size: 14px">
      {{ product.category?.category_name }}
    </h3>
    <h4 class="text-start fw-bold" style="font-size: 18px">
      {{ product.product_name }}
    </h4>
    <p class="text-start text-success fw-semibold">${{ product.price }}</p>

    <div class="d-flex justify-content-between align-items-center mt-3">
      <button
        class="btn btn-primary"
        @click="addToCart"
        :disabled="cartStore.isAdding(product.id)"
      >
        Add to cart
      </button>

      <i
        class="fa fa-heart text-danger cursor-pointer"
        title="Favorite"
        aria-label="Add to favorites"
        role="button"
        tabindex="0"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const imageUrl = computed(() => {
  return props.product.image?.startsWith("http")
    ? props.product.image
    : `http://127.0.0.1:8000/storage/${props.product.image}`;
});

const isVisible = ref(false);
const cardRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  if (cardRef.value) {
    observer.observe(cardRef.value);
  }
});

const addToCart = async () => {
  try {
    await cartStore.addItem(props.product);
    alert(`${props.product.product_name} has been added to the cart!`);
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add to cart.");
  }
};
</script>
