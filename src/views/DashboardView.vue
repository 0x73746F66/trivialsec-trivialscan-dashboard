<template>
  <main>
    <div class="container font-color-light padding-top-xl padding-bottom-xl">
      <LoadingComponent class="loading" v-if="loading" />

      <div
        class="w-100 d-flex align-items-lg-center flex-column flex-lg-row justify-content-between margin-bottom-sm"
      >
        <div class="d-inline-block w-100 position-relative">
          <SearchForm />
        </div>
      </div>

      <CollapseableSection
        @section-change="showSection"
        :section="['Dashboard', 'Reports', 'Hosts', 'Findings', 'Certificates']"
        label="dashboard-template"
      >
        <template v-if="showDashboard" v-slot:Dashboard>
          <div class="d-flex flex-column">
            <div
              class="w-100 margin-bottom-md position-relative compliance-section"
            >
              <div class="d-flex">
                <h2 class="font-xl-sb margin-right-sm">Compliance History</h2>
              </div>
              <div
                class="position-relative bg-dark-40 border-radius-sm padding-sm d-flex flex-lg-row flex-column justify-content-evenly"
              >
                <ComplianceCharts />
              </div>
            </div>
            <div
              class="w-100 margin-bottom-md position-relative used-chart-section d-flex flex-column"
            >
              <div class="d-flex">
                <h2 class="font-xl-sb margin-right-sm">Plan Quotas</h2>
                <div class="w-75">
                  <QuestionComponent
                    label="question-total-available"
                    content="Compliance History Compliance History Compliance History Compliance HistoryCompliance History Compliance History Compliance History Compliance History"
                  />
                </div>
                <!-- :content="quotasTooltip" -->
              </div>
              <div
                class="d-flex flex-lg-row flex-column h-100 bg-dark-40 border-radius-sm padding-sm justify-content-around"
              >
                <ValidationMessage
                  v-if="errorMessage.length > 0"
                  class="justify-content-start"
                  :message="errorMessage"
                  :type="errorMessageType"
                />

                <CollapseableSection
                  :section="quotaSections"
                  label="used-chart"
                  special-classes="w-lg-75 w-100"
                  :column-style="true"
                >
                  <template v-slot:Monitoring>
                    <PieChart
                      :inUse="quotas?.monitoring.used"
                      :available="
                        Math.max(quotas?.active.total - quotas?.active.used, 0)
                      "
                      v-if="
                        quotas.monitoring.used > 0 ||
                        quotas.monitoring.total > 0
                      "
                    />
                    <div
                      class="pie-chart-legend font-color-light"
                      v-if="
                        quotas.monitoring.used > 0 ||
                        quotas.monitoring.total > 0
                      "
                    >
                      <span class="font-base font-color-light">Monitoring</span>
                      <span
                        class="font-xs font-color-light d-flex align-items-center"
                      >
                        <span class="square primary margin-right-xs"></span> In
                        Use: {{ quotas?.monitoring.used }}
                      </span>
                      <span
                        class="font-xs font-color-light d-flex align-items-center"
                      >
                        <span class="square secondary margin-right-xs"></span>
                        Available:
                        {{ quotas?.monitoring.total - quotas?.monitoring.used }}
                      </span>
                    </div>
                  </template>

                  <template v-slot:Active>
                    <PieChart
                      :inUse="quotas?.active.used"
                      :available="
                        Math.max(quotas?.active.total - quotas?.active.used, 0)
                      "
                      v-if="quotas.active.used > 0 || quotas.active.total > 0"
                    />
                    <div
                      class="pie-chart-legend font-color-light"
                      v-if="quotas.active.used > 0 || quotas.active.total > 0"
                    >
                      <span class="font-base font-color-light">Active</span>
                      <span
                        class="font-xs font-color-light d-flex align-items-center"
                      >
                        <span class="square primary margin-right-xs"></span> In
                        Use: {{ quotas?.active.used }}
                      </span>
                      <span
                        class="font-xs font-color-light d-flex align-items-center"
                      >
                        <span class="square secondary margin-right-xs"></span>
                        Available:
                        {{
                          Math.max(
                            quotas?.active.total - quotas?.active.used,
                            0
                          )
                        }}
                      </span>
                    </div>
                  </template>

                  <template v-slot:Passive>
                    <PieChart
                      :inUse="quotas?.passive.used"
                      :available="
                        Math.max(
                          quotas?.passive.total - quotas?.passive.used,
                          0
                        )
                      "
                      v-if="quotas.passive.used > 0 || quotas.passive.total > 0"
                    />
                    <div
                      class="pie-chart-legend font-color-light"
                      v-if="quotas.passive.used > 0 || quotas.passive.total > 0"
                    >
                      <span class="font-base font-color-light">Passive</span>
                      <span
                        class="font-xs font-color-light d-flex align-items-center"
                      >
                        <span class="square primary margin-right-xs"></span> In
                        Use: {{ quotas?.passive.used }}
                      </span>
                      <span
                        class="font-xs font-color-light d-flex align-items-center"
                      >
                        <span class="square secondary margin-right-xs"></span>
                        Available:
                        {{
                          Math.max(
                            quotas?.passive.total - quotas?.passive.used,
                            0
                          )
                        }}
                      </span>
                    </div>
                  </template>
                </CollapseableSection>
              </div>
            </div>
          </div>
        </template>

        <template v-if="showReports" v-slot:Reports>
          <div class="w-100 margin-bottom-md">
            <div class="d-flex flex-column margin-bottom-md">
              <h2 class="font-xl-sb">Report Summaries</h2>
              <span class="font-sm font-color-primary"
                >Trivial Scanner uploaded reports</span
              >
            </div>

            <Summary />
          </div>
        </template>

        <template v-if="showHosts" v-slot:Hosts>
          <div class="w-100 margin-bottom-md">
            <h2 class="font-xl-sb margin-bottom-md">Hostname & IP Addresses</h2>
            <HostsList />
          </div>
        </template>

        <template v-if="showFindings" v-slot:Findings>
          <div class="w-100 margin-bottom-md">
            <div class="d-flex flex-column margin-bottom-md">
              <h2 class="font-xl-sb">Vulnerabilities & Exposures</h2>
              <span class="font-sm font-color-primary"
                >Security is hard, that's why this list is prioritising quick
                wins; Issues that have an easy fix but pose real and trivial to
                exploit risk if left in the current state</span
              >
            </div>
            <IssuesList />
          </div>
        </template>

        <template v-if="showCertificates" v-slot:Certificates>
          <div class="w-100 margin-bottom-md">
            <div class="d-flex flex-column margin-bottom-md">
              <h2 class="font-xl-sb">Certificate Issues</h2>
              <span class="font-sm font-color-primary"
                >Encryption of the internet is based on inherent trust and
                complicated configuration, here are some issues we
                observed:</span
              >
            </div>
            <CertificateList />
          </div>
        </template>
      </CollapseableSection>
    </div>
  </main>
</template>

<script setup>
import LoadingComponent from "@/components/general/LoadingComponent.vue";
import CollapseableSection from "@/components/general/CollapseableSection.vue";
import QuestionComponent from "@/components/general/QuestionComponent.vue";
import ComplianceCharts from "@/components/general/ComplianceCharts.vue";
import HostsList from "@/components/general/HostsList.vue";
import IssuesList from "@/components/general/IssuesList.vue";
import CertificateList from "@/components/general/CertificateList.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import PieChart from "@/components/general/PieChart.vue";
import SearchForm from "@/components/forms/SearchForm.vue";
import Summary from "@/components/general/Summary.vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
</script>

<script>
export default {
  components: {
    CollapseableSection,
    Swiper,
    SwiperSlide,
    QuestionComponent,
    ComplianceCharts,
    HostsList,
    IssuesList,
    CertificateList,
    ValidationMessage,
    LoadingComponent,
    PieChart,
    SearchForm,
    Summary,
  },
  data() {
    return {
      showDashboard: true,
      showReports: false,
      showHosts: false,
      showFindings: false,
      showCertificates: false,
      loading: false,
      quotasTooltip: "",
      errorMessage: "",
      errorMessageType: "",
      quotas: {},
      quotaSections: [],
    };
  },
  created() {
    this.fetchQuotas();
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  methods: {
    showSection(section) {
      this.showDashboard = false;
      this.showReports = false;
      this.showHosts = false;
      this.showFindings = false;
      this.showCertificates = false;
      this[`show${section}`] = true;
    },
    async fetchQuotas() {
      this.loading = true;
      try {
        const response = await Api.get(`/dashboard/quotas`, { timeout: 30000 });
        if (response.status !== 200) {
          this.errorMessage = `${response.status} ${response.statusText}`;
          this.errorMessageType = "error";
          this.loading = false;
          return;
        }
        const data = await response.json();
        if (data?.unlimited_monitoring === false && data.monitoring.total > 0) {
          this.quotaSections.push("Monitoring");
        }
        if (data?.unlimited_scans === false) {
          if (data.passive.total > 0) {
            this.quotaSections.push("Passive");
          }
          if (data?.active.total > 0) {
            this.quotaSections.push("Active");
          }
        }
        if (
          data?.monitoring.total > 0 &&
          data.monitoring.used < data.monitoring.total
        ) {
          this.quotasTooltip = `Total Available: you could be monitoring ${
            data.monitoring.total - data.monitoring.used
          } more hosts`;
        } else if (this.quotaSections.length > 0) {
          this.quotasTooltip = `Community Edition allows the used of self-managed scanners, and will perform one scan only when each new host it added`;
        } else if (this.unlimited_monitoring === true) {
          this.quotasTooltip = `You have Unlimited host monitoring`;
        } else {
          this.quotasTooltip = `This section shows how well you are utilizing Trivial Security`;
        }
        this.quotas = data;
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
<style scoped lang="scss">
@import "@swiper/navigation/navigation";
@import "@swiper/scrollbar/scrollbar";
@import "@swiper/a11y/a11y";
@import "@swiper/pagination/pagination";
</style>
<style lang="scss">
.chart {
  svg {
    width: 100%;
  }
}
.dashboard-dropdown {
  background: color("dark-20");
  border-bottom: 1px solid color("dark-60");
  align-items: center;
  padding: spacers("xs");

  .expand-icon {
    transform: rotate(180deg);
    width: 25px;
    height: 25px;
  }

  &.collapsed {
    .expand-icon {
      transform: rotate(0deg);
    }
  }
  &-content {
    border-bottom: 1px solid color("dark-60");
    padding: spacers("xs");
  }
}
.pie-chart-legend {
  position: absolute;
  right: spacers("sm");
  bottom: spacers("sm");
  display: flex;
  flex-direction: column;
  @extend .font-xs;
  @extend .font-color-light;
  .square {
    width: 15px;
    height: 15px;
    display: inline-block;

    &.primary {
      background: color("primary");
    }
    &.secondary {
      background: color("secondary");
    }
  }
}
</style>
