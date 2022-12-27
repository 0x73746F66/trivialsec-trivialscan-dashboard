<template>
  <ValidationMessage
    v-if="errorMessage.length > 0"
    class="justify-content-start"
    :message="errorMessage"
    :type="errorMessageType"
  />
  <LoadingComponent class="loading" v-if="loading" />
  <div
    v-for="(summary, index) in summaries"
    :key="index"
    class="margin-bottom-sm"
  >
    <template v-if="summary">
      <SummaryItem :report="summary" @deleteReport.once="handleDeleteReport" />
    </template>
  </div>
</template>
<script setup>
import LoadingComponent from "@/components/general/LoadingComponent.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import SummaryItem from "@/components/general/SummaryItem.vue";
import moment from "moment";
</script>

<script>
export default {
  components: {
    LoadingComponent,
    ValidationMessage,
    SummaryItem,
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
      summaries: [],
    };
  },
  created() {
    const channel = window.pusher.subscribe(
      localStorage.getItem("/account/name"),
    );
    channel.bind("trivial-scanner-status", (data) => {
      if (data?.status === "Complete") {
        data.refId = this.shortReportId(data.report_id);
        data.dateAgo = moment.utc(data.date).fromNow();
        this.summaries.unshift(data);
      }
    });
  },
  mounted() {
    this.fetchSummaries();
  },
  methods: {
    shortReportId(reportId) {
      return reportId.replace(/[\W_]+/g, "").slice(0, 11);
    },
    handleDeleteReport(reportId) {
      for (const [index, summary] of this.summaries.entries()) {
        if (summary.report_id === reportId) {
          setTimeout(() => this.summaries.splice(index, 1), 5000);
          break;
        }
      }
    },
    async fetchSummaries() {
      this.loading = true;
      try {
        const response = await Api.get(`/reports`);
        if (response.status !== 200) {
          this.errorMessage = `${response.status} ${response.statusText}`;
          this.errorMessageType = "error";
          this.loading = false;
          return;
        }
        const data = await response.json();
        this.summaries = data.map((summary) => {
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
