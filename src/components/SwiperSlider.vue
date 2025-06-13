<!-- SwiperGallery.vue -->
<template>
  <swiper
    :spaceBetween="50"
    :centeredSlides="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="false"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(img, index) in images" :key="index">
      <img :src="img" alt="" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

defineProps({
  images: {
    type: Array,
    required: true
  }
});

const modules = [Autoplay, Pagination, Navigation];
</script>

<style scoped>
.mySwiper {
  width: 100%;
}
 img {
  display: block;
  width: 100%;
  height: 76vh;
  object-fit: contain;
}
</style>
