<script setup>
import HostDetail from "../components/HostDetail.vue";
</script>

<script>
export default {
  data() {
    return {
      loading: false,
      host: {},
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
      this.loading = true
      try {
        const response = await Api.get(`/host/${this.$route.params.hostname}?port=${this.$route.params.port}`)
        if (response.status !== 200) {
          this.errorMessage = "An error occured: Page couldn't be loaded"
          this.errorMessageType = "error"
          this.loading = false
          return;
        }
        this.host = await response.json()
      } catch (error) {
        this.errorMessage = error.name === 'AbortError' ? "Request timed out, please try refreshing the page." : `${error.name} ${error.message}. Couldn't complete this action.`
        this.errorMessageType = "error"
      }
      this.loading = false
    },
  },
};
</script>

<template>
  <main>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="host">
      <HostDetail v-bind="host" />
    </div>
  </main>
</template>

<style scoped>
.host {
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .host {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-text);
    line-height: 1.5rem;
  }
}
</style>
