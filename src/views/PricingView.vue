<template>
  <div>
    <div
      class="container-fluid padding-top-xl padding-bottom-md bg-dark-20 pricing-container px-0"
      ref="pricingContainer"
    >
      <div class="container">
        <PricingComponent />
        <span class="margin-top-sm d-block font-xxs font-color-light"
          >* Self-managed refers to Trivial Scanner running on your self-hosted
          and on-prem servers, your cloud, or your client computers, and
          connecting to Trivial Security SaaS services.</span
        >
      </div>
    </div>

    <div class="container padding-bottom-xl padding-top-xl" v-if="!logged_in">
      <LoginOrRegister loginModalId="loginModal" registerModalId="registerLogin" />
    </div>
  </div>
</template>

<script setup>
import PricingComponent from "@/components/general/PricingComponent.vue"
import LoginOrRegister from "@/components/general/LoginOrRegister.vue"
</script>

<script>

export default {
  components: {
    PricingComponent,
    LoginOrRegister,
  },
  data() {
    return {
      logged_in: false,
    };
  },
  created() {
    this.logged_in = !!localStorage.getItem("/session/key");
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
</style>
