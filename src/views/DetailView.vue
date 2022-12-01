<template>
  <main>
    <LoadingComponent class="loading" :class="{ inactive: !loading }" />
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
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import LoadingComponent from "@/components/general/LoadingComponent.vue";
</script>

<script>
export default {
  components: {
    ReportDetail,
    ValidationMessage,
    LoadingComponent,
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
        const response = await Api.get(`/report/${this.$route.params.report_id}`, { timeout: 60000 })
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
          const aRule = `${a.group_id.toString().padStart(3, '0')}.${a.rule_id.toString().padStart(4, '0')}`
          const bRule = `${b.group_id.toString().padStart(3, '0')}.${b.rule_id.toString().padStart(4, '0')}`
          return aRule.localeCompare(bRule)
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
