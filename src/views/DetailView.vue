<script setup>
import moment from "moment";
import CryptoJS from "crypto-js";
import ReportDetail from "@/components/ReportDetail.vue";
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
        this.fetchData();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  methods: {
    fetchData() {
      this.loading = true;
      const req_url = `${this.api_url}/report/${this.$route.params.report_id}`;
      console.log(req_url);
      const ts = moment().utc().unix();
      const url = new URL(req_url);
      const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${
        url.pathname
      }\n${ts}`;
      console.log(canonical_string);
      const hash = CryptoJS.algo.HMAC.create(
        CryptoJS.algo.SHA512,
        localStorage.getItem("/session/key")
      );
      hash.update(canonical_string);
      const mac = hash.finalize();
      const header = `HMAC id="${localStorage.getItem(
        "/member/email"
      )}", mac="${mac}", ts="${ts}"`;
      console.log(header);

      fetch(req_url, {
        headers: {
          Authorization: header,
        },
        method: "GET",
      })
        .then((response) => response.text())
        .then((result) => {
          this.report = JSON.parse(result);
          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
        });
    },
  },
};
</script>

<template>
  <main>
    <div v-if="loading" class="loading">Loading...</div>
    {{ $log(report) }}
    <div v-if="error" class="error">{{ error }}</div>

    <div class="report">
      <ReportDetail v-bind="report" />
    </div>
  </main>
</template>

<style scoped></style>
