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
      <HostDetailView
        :host="host"
        :external_refs="external_refs"
        :versions="versions"
        :params="params"
      />
      <h4 class="heading">Scanner Reports</h4>
      <div v-if="reports.length > 0">
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
      <div v-else class="font-color-danger font-base-sb">
        No matching scanner reports on your account
      </div>
    </div>
  </div>
</template>

<script setup>
import LoadingComponent from "@/components/general/LoadingComponent.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import HostDetailView from "@/components/general/HostDetailView.vue";
import SummaryItem from "@/components/general/SummaryItem.vue";
import SearchForm from "@/components/forms/SearchForm.vue";
import moment from "moment";
</script>

<script>
export default {
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
      host: {},
      external_refs: {},
      reports: [],
      versions: [],
    };
  },
  components: {
    LoadingComponent,
    ValidationMessage,
    HostDetailView,
    SummaryItem,
    SearchForm,
  },
  mounted() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.params = this.$route.params;
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
        let url = `/host/${this.$route.params.hostname}?port=${this.$route.params.port}`;
        if (
          !!this.$route.params.version &&
          this.$route.params.version !== "latest"
        ) {
          url += `&last_updated=${moment
            .utc(this.$route.params.version)
            .toISOString()}`;
        }
        const response = await Api.get(url);
        if (response.status !== 200) {
          this.errorMessage = "An error occurred: Page couldn't be loaded";
          this.errorMessageType = "error";
          this.loading = false;
          return;
        }
        const data = await response.json();
        this.host = data.host;
        this.versions = data.versions
          .map((version) => {
            if (version === "latest") {
              return {
                value: version,
                port: 443,
                date: "99999999",
                label: "latest",
              };
            }
            const versionParts = version.split("/");
            return {
              value: version,
              port: versionParts[0],
              date: versionParts[1],
              label: moment.utc(versionParts[1]).format("L"),
            };
          })
          .sort((a, b) => b.date.localeCompare(a.date));
        this.external_refs = data.external_refs;
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
