<script setup>
import ReportDetail from "@/components/ReportDetail.vue";
import ReportSummary from "@/components/ReportSummary.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";
</script>

<script>
export default {
  components: {
    ReportSummary,
    ReportDetail,
    ValidationMessage,
    loadingComponent,
  },
  data() {
    return {
      loading: false,
      message: "",
      messageType: "",
      report: {},
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
      const response = await Api.get(`/report/${this.$route.params.report_id}`).catch(error => {
        this.message = error;
        this.messageType = "error";
        this.loading = false;
      });
      if (response.status === 204) {
        this.message = "No reports available";
        this.messageType = "warning";
        this.loading = false;
        return;
      } else if (response.status !== 200) {
        this.message = "An error occured";
        this.messageType = "error";
        this.loading = false;
        return;
      }
      this.report = await response.json();
      this.loading = false;
    },
  },
};
</script>

<template>
  <main>
    <loadingComponent class="loading" :class="{ inactive: !loading }" />
    {{ $log(report) }}

    <div class="report">
      <ValidationMessage
        v-if="this.message.length > 0"
        class="justify-content-start"
        :message="this.message"
        :type="this.messageType"
      />
      <ReportDetail v-bind="report" />
    </div>
  </main>
</template>

<style scoped>

</style>
