<script setup>
import CertificateDetail from "../components/CertificateDetail.vue";
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

<template>
  <main>
    <div v-if="loading" class="loading">Loading...</div>
    {{ $log(certificate) }}
    <div v-if="error" class="error">{{ error }}</div>

    <div class="certificate">
      <CertificateDetail v-bind="certificate" />
    </div>
  </main>
</template>

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
