<template>
  <header>
    <Navbar />
  </header>

  <RouterView />

  <Footer />
</template>

<script>
  import { RouterLink, RouterView } from "vue-router";
  import MainHeading from "./components/MainHeading.vue";
  import Footer from "./components/layout/Footer.vue"
  import Navbar from "./components/layout/Navbar.vue"
  export default {
    components: {Footer, Navbar},
  }
</script>

<style lang="scss">
  @import "./assets/forms";
</style>
