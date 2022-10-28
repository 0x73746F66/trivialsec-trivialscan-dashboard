<template>
    <loadingComponent class="loading" :class="{ inactive: !loading }" />
    <ValidationMessage
        v-if="errorMessage.length > 0"
        class="justify-content-start"
        :message="errorMessage"
        :type="errorMessageType"
    />
    <CollapseableSection
      :section="chartSections"
      label="complicance-chart"
      special-classes="w-lg-75"
      column-style=true
    >
        <template v-for="(comp, index) in compData" :key="index" #[comp.label]>
        <TimeScaleCustomChart
            :label="comp.label"
            :ranges="comp.ranges"
            :chartData="comp.data"
        />
        </template>
    </CollapseableSection>
</template>

<script>
import CollapseableSection from "@/components/general/CollapseableSection.vue";
import TimeScaleCustomChart from "@/components/general/TimeScaleCustomChart.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";

export default {
  components: {
    CollapseableSection,
    TimeScaleCustomChart,
    ValidationMessage,
    loadingComponent,
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
      chartSections: [],
      chartData: {},
      compData: [],
    }
  },
  created() {
    this.fetchDashboard();
  },
  methods: {
    async fetchDashboard() {
      this.loading = true
      const response = await Api.get("/dashboard/compliance").catch(error => {
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
      this.chartSections = data.map(item => item.label)
      this.compData = []
      for (const comp of data) {
        if (comp.data.week) {
          comp.data.week = comp.data.week.sort((x, y) => x.timestamp - y.timestamp)
        }
        if (comp.data.month) {
          comp.data.month = comp.data.month.sort((x, y) => x.timestamp - y.timestamp)
        }
        if (comp.data.year) {
          comp.data.year = comp.data.year.sort((x, y) => x.timestamp - y.timestamp)
        }
        this.compData.push(comp)
      }
      console.log('this.compData');
      console.log(this.compData);
      this.loading = false
    }
  },
  computed: {
    initCompData() {
      return this.compliance[0].data;
    },
    chartData() {
      return this.compData.PCIS.month;
    }
  }
}
</script>

<style scoped lang="scss">
    .chart {
      svg {
        width: 100%;
      }
    }
    .compliance-section{
      margin-right: spacers("sm");
      @media (max-width: $breakpoint-lg) {
        margin-right: 0;
      }
    }
  </style>
