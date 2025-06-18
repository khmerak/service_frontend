<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow p-4">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Aside from "@/components/Aside.vue";
</script>
<style scoped>
header {
  height: -10vh;
  margin-bottom: -60px;
}
main, footer {
  width: 100%;
  margin: 0 auto;
}
</style>
