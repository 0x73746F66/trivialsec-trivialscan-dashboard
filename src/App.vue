<template>
  <Navbar />

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>

  <Footer ref="footer" />
</template>

<script setup>
import Footer from "@/components/layout/Footer.vue";
import Navbar from "@/components/layout/Navbar.vue";
</script>
<script>
export default {
  components: { Footer, Navbar },
};
</script>

<style lang="scss">
@import "@swiper-base/swiper";
@import "@swiper/navigation/navigation";
@import "@swiper/scrollbar/scrollbar";
@import "@swiper/a11y/a11y";
@import "@swiper/pagination/pagination";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
