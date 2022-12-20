<template>
  <button class="d-block button-prev">
    <IconChevron class="cert-icon" color="f0f0f0" />
  </button>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="10"
    :navigation="{
      nextEl: '.button-next',
      prevEl: '.button-prev',
    }"
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: false }"
  >
    <swiper-slide v-for="slide in length" :key="`slider${slide}`">
      <slot :name="`slide${slide}`"></slot>
    </swiper-slide>
  </swiper>

  <button class="d-block button-next">
    <IconChevron class="cert-icon" color="f0f0f0" />
  </button>
</template>
<script setup>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import IconChevron from "@/components/icons/IconChevron.vue";
</script>
<script>
export default {
  props: {
    length: Number,
  },
  components: {
    Swiper,
    SwiperSlide,
    IconChevron,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
};
</script>
