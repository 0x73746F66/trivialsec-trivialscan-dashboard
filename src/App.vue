<template>
    <Navbar />

    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>

    <Footer ref="footer" />
    <div class="position-relative">
        <div class="toast-container position-fixed bottom-0 end-0"></div>
    </div>
</template>

<script setup>
import Footer from '@/components/layout/Footer.vue'
import Navbar from '@/components/layout/Navbar.vue'
</script>
<script>
export default {
    components: { Footer, Navbar }
}
</script>

<style lang="scss">
@import '@swiper-base/swiper';
@import '@swiper/navigation/navigation';
@import '@swiper/scrollbar/scrollbar';
@import '@swiper/a11y/a11y';
@import '@swiper/pagination/pagination';
@import '@bootstrap/toasts';
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
