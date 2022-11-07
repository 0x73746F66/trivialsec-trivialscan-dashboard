<template>
  <div class="container">
    <div class="certificate padding-top-xl padding-bottom-xl">
      <Certificate v-bind="certificate" />
    </div>
  </div>
</template>

<script setup>
import Certificate from "@/components/general/Certificate.vue";
</script>

<script>
export default {
  data() {
    return {
      loading: false,
      certificate: {},
    };
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const response = await Api.get(`/certificate/${this.$route.params.sha1_fingerprint}`).catch(error => {
        this.message = error;
        this.messageType = "error";
        this.loading = false;
      });
      if (response.status !== 200) {
        this.message = "Your message was sent. Thank you!";
        this.messageType = "success";
        this.loading = false;
        return;
      }
      this.certificate = await response.json();
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.report {
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .report {
    min-height: 90vh;
    margin: 10vh 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
  }
}
div {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text);
}
</style>
