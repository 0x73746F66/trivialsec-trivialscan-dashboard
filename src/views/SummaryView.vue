<script setup>
import ReportSummary from "@/components/ReportSummary.vue";
</script>

<script>
export default {
  data() {
    return {
      loading: false,
      error: null,
      report: {},
      api_url: import.meta.env.VITE_API_URL,
    };
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  mounted() {
  },
  methods: {
    fetchData() {
      this.loading = true
      // replace `getPost` with your data fetching util / API wrapper
      // const response = await fetch("https://api.npms.io/v2/search?q=vue");
      // state.test = await response.json();
      // const parsedData = JSON.parse(JsonData);
      // this.songs = parsedData.Songs

      // getPost(this.$route.params.id, (err, post) => {
      //     this.loading = false
      //     if (err) {
      //     this.error = err.toString()
      //     } else {
      //     this.post = post
      //     }
      // })
    }
  }
}
</script>

<template>
  <main>
    <div class="summary">
      <div v-if="loading" class="loading">Loading...</div>

      <div v-if="error" class="error">{{ error }}</div>

      param {{ $route.params.report_id }}
      <br />

      <ReportSummary :report="report" />
  </div>
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
}

@media (min-width: 1024px) {
  main {
    min-height: 90vh;
    margin: 10vh 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
  }
}
.summary {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text);
}
</style>
