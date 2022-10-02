<script setup>
import ReportDetail from "@/components/ReportDetail.vue";
</script>

<script>
export default {
  data() {
    return {
      loading: false,
      report: null,
      error: null,
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
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
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
    },
  },
};
</script>

<template>
  <main>
    <ReportDetail />
  </main>
</template>

<style>
.about {
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .about {
    min-height: 90vh;
    margin: 10vh 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
<style scoped>
div {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text);
}
</style>
