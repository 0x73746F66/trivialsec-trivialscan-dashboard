<template>
  <div class="container font-color-light margin-top-lg margin-bottom-xl">
    <div class="d-flex flex-column flex-lg-row margin-bottom-sm">
      <div class="d-inline-block w-100 position-relative">
        <SearchForm />
      </div>
    </div>
    <div class="margin-top-sm" v-if="host">
      <ValidationMessage
        v-if="errorMessage.length > 0"
        class="justify-content-start"
        :message="errorMessage"
        :type="errorMessageType"
      />
      <LoadingComponent class="loading" v-if="loading" />
      <HostDetailView :host="host" />
      <h3 class="heading">Scanner Reports</h3>
      <div
        v-for="(summary, index) in reports"
        :key="index"
        class="margin-bottom-sm"
      >
        <template v-if="summary">
          <SummaryItem
            :report="summary"
            @deleteReport.once="handleDeleteReport"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingComponent from "@/components/general/LoadingComponent.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import HostDetailView from "@/components/general/HostDetailView.vue";
import SummaryItem from "@/components/general/SummaryItem.vue";
import SearchForm from "@/components/forms/SearchForm.vue";
import moment from "moment";

export default {
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
      host: {},
      reports: [],
    };
  },
  components: {
    LoadingComponent,
    ValidationMessage,
    HostDetailView,
    SummaryItem,
    SearchForm,
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
      { immediate: true },
    );
  },
  methods: {
    shortReportId(reportId) {
      return reportId.replace(/[\W_]+/g, "").slice(0, 11);
    },
    handleDeleteReport(reportId) {
      for (const [index, summary] of this.reports.entries()) {
        if (summary.report_id === reportId) {
          setTimeout(() => this.reports.splice(index, 1), 5000);
          break;
        }
      }
    },
    async fetchData() {
      this.loading = true;
      try {
        const response = await Api.get(
          `/host/${this.$route.params.hostname}?port=${this.$route.params.port}`,
        );
        if (response.status !== 200) {
          this.errorMessage = "An error occurred: Page couldn't be loaded";
          this.errorMessageType = "error";
          this.loading = false;
          return;
        }
        const data = await response.json();
        this.host = data.host;
        this.reports = data.reports.map((summary) => {
          summary.refId = this.shortReportId(summary.report_id);
          summary.dateAgo = moment.utc(summary.date).fromNow();
          return summary;
        });
      } catch (error) {
        this.errorMessage =
          error.name === "AbortError"
            ? "Request timed out, please try refreshing the page."
            : `${error.name} ${error.message}. Couldn't complete this action.`;
        this.errorMessageType = "error";
      }
      this.loading = false;
    },
  },
};
</script>
