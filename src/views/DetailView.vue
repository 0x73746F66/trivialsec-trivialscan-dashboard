<template>
  <main>
    <loadingComponent class="loading" :class="{ inactive: !loading }" />
    <div class="container padding-top-xl">
      <ValidationMessage :message="message" :type="messageType" class="justify-content-start" />
    </div>
    <div class="report" v-if="Object.keys(report).length > 0">
      <ReportDetail v-bind="report" />
    </div>
  </main>
</template>

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
      this.loading = true
      try {
        const response = await Api.get(`/report/${this.$route.params.report_id}?full_certs=1&full_hosts=1`, { timeout: 30000 })
        if (response.status === 204) {
          this.message = "No reports available"
          this.messageType = "warning"
          this.loading = false
          return;
        } else if (response.status !== 200) {
          this.message = "An error occured: Page couldn't be loaded"
          this.messageType = "error"
          this.loading = false
          return;
        }
        const data = await response.json()
        data.evaluations = data.evaluations.sort((a, b) => {
          aRule = `${a.group_id}.${a.rule_id}`
          bRule = `${b.group_id}.${b.rule_id}`
          return aRule.toLowerCase().localeCompare(bRule.toLowerCase())
        })
        this.report = data
      } catch (error) {
        this.errorMessage = error.name === 'AbortError' ? "Request timed out, please try refreshing the page." : `${error.name} ${error.message}. Couldn't complete this action.`
        this.errorMessageType = "error"
      }
      this.loading = false
    },
  },
};
</script>

<style scoped>

</style>
