<template>
  <div class="container font-color-light padding-top-xl padding-bottom-xl">
    <h1 class="font-xxxl-b margin-bottom-sm">Dashboard</h1>
    <div class="d-flex flex-column flex-lg-row">
      <div class="w-100 margin-bottom-md position-relative compliance-section">
        <div class="d-flex">
          <h2 class="font-xl-sb margin-right-sm">Compliance</h2>
          <QuestionComponent
              label="question-compliance"
              content="something about compliance"
            />
        </div>
        <div class="position-relative bg-dark-40 border-radius-sm padding-sm">
          <ComplianceCharts />
        </div>
      </div>
      <div class="w-100 margin-bottom-md position-relative used-chart-section d-flex flex-column">
        <div class="d-flex">
          <h2 class="font-xl-sb margin-right-sm">Total Available</h2>

          <QuestionComponent
            label="question-total-available"
            :content="quotasTooltip"
          />
        </div>
        <div class="d-flex flex-column h-100 bg-dark-40 border-radius-sm padding-sm">
          <loadingComponent class="loading" :class="{ inactive: !loading }" />
          <ValidationMessage
              v-if="errorMessage.length > 0"
              class="justify-content-start"
              :message="errorMessage"
              :type="errorMessageType"
          />

          <CollapseableSection :section="quotaSections" label="used-chart" special-classes="">
            <template v-slot:Monitoring>
              <Gauge :inUse="quotas?.monitoring.used" :available="quotas?.monitoring.total" />
            </template>
            <template v-slot:Active>
              <Gauge :inUse="quotas?.active.used" :available="quotas?.active.total" />
            </template>
            <template v-slot:Passive>
              <Gauge :inUse="quotas?.passive.used" :available="quotas?.passive.total" />
            </template>
          </CollapseableSection>
        </div>
      </div>
    </div>

    <div class="w-100 margin-bottom-md">
      <h2 class="font-xl-sb margin-bottom-md">Hosts</h2>
      <HostsList />
    </div>

    <div class="w-100 margin-bottom-md">
      <div class="d-flex flex-column margin-bottom-md">
        <h2 class="font-xl-sb">Latest Problems</h2>
        <span class="font-sm font-color-primary">Security is hard, that's why this list is prioritising quick wins; Issues that have an easy fix but pose real and trivial to exploit risk if left in the current state</span>
      </div>
      <IssuesList />
    </div>

    <div class="w-100 margin-bottom-md">
      <div class="d-flex flex-column margin-bottom-md">
        <h2 class="font-xl-sb">Certificate Issues</h2>
        <span class="font-sm font-color-primary">Encryption of the internet is based on inherent trust and complicated configuration, here are some issues we observed:</span>
      </div>

      <CertificateList />
    </div>
  </div>
</template>

<script>
import CollapseableSection from "@/components/general/CollapseableSection.vue";
import Gauge from "@/components/general/Gauge.vue";
import QuestionComponent from "@/components/general/QuestionComponent.vue";
import ComplianceCharts from "@/components/general/ComplianceCharts.vue";
import HostsList from "@/components/general/HostsList.vue";
import IssuesList from "@/components/general/IssuesList.vue";
import CertificateList from "@/components/general/CertificateList.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

export default {
  components: {
    CollapseableSection,
    Gauge,
    Swiper,
    SwiperSlide,
    QuestionComponent,
    ComplianceCharts,
    HostsList,
    IssuesList,
    CertificateList,
    ValidationMessage,
    loadingComponent,
  },
  data() {
    return {
      loading: false,
      quotasTooltip: "",
      errorMessage: "",
      errorMessageType: "",
      quotas: {},
      quotaSections: [],
    }
  },
  created() {
    this.fetchQuotas()
  },
  setup() {
      return {
          modules: [Navigation, Pagination, Scrollbar, A11y],
      };
  },
  methods: {
    async fetchQuotas() {
      this.loading = true
      const response = await Api.get(`/dashboard/quotas`).catch(error => {
        this.errorMessage = error
        this.errorMessageType = "error"
      });
      if (response.status !== 200) {
        this.errorMessage = `${response.status} ${response.statusText}`
        this.errorMessageType = "error";
        this.loading = false
        return;
      }
      const data = await response.json();
      if (data.unlimited_monitoring === false && data.monitoring.total > 0) {
        this.quotaSections.push("Monitoring")
      }
      if (data.unlimited_scans === false) {
        if (data.passive.total > 0) {
          this.quotaSections.push("Passive")
        }
        if (data.active.total > 0) {
          this.quotaSections.push("Active")
        }
      }
      if (data.monitoring.total > 0 && data.monitoring.used < data.monitoring.total) {
        this.quotasTooltip = `Total Available: you could be monitoring ${data.monitoring.total - data.monitoring.used} more hosts`
      } else if (this.quotaSections.length > 0) {
        this.quotasTooltip = `Community Edition allows the used of self-managed scanners, and will perform one scan only when each new host it added`
      } else if (this.unlimited_monitoring === true) {
        this.quotasTooltip = `You have Unlimited host monitoring`
      } else {
        this.quotasTooltip = `This section shows how well you are utilizing Trivial Security`
      }
      this.quotas = data
      this.loading = false
    },
  },
}
</script>

<style lang="scss">
  .chart {
    svg {
      width: 100%;
    }
  }
  .used-chart-section {
    margin-left: spacers("sm");
    @media (max-width: $breakpoint-lg) {
      margin-left: 0;
    }
  }
</style>
