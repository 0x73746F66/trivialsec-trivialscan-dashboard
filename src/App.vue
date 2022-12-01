<template>
  <header>
    <Navbar :isNavbarHidden="isNavbarHidden" />
  </header>

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>

  <Footer ref="footer" />
</template>

<script>
import Footer from "./components/layout/Footer.vue";
import Navbar from "./components/layout/Navbar.vue";
export default {
  components: { Footer, Navbar },
  data() {
    return {
      isNavbarHidden: false,
    };
  },
  created() {
    window.addEventListener("scroll", this.unFixNavbar);
  },
  unmounted() {
    window.removeEventListener("scroll", this.unFixNavbar);
  },
  methods: {
    unFixNavbar() {
      if (
        document.body.offsetHeight >
        window.innerHeight + this.$refs.footer.$el.clientHeight
      ) {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - this.$refs.footer.$el.clientHeight
        ) {
          this.isNavbarHidden = true;
        } else {
          this.isNavbarHidden = false;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
