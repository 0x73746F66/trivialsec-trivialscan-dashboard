<script setup>
import ReportListItem from "@/components/ReportListItem.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";
</script>

<script>
export default {
  components: {
    ReportListItem,
    ValidationMessage,
    loadingComponent,
  },
  data() {
    return {
      message: "",
      messageType: "",
      loading: false,
      reports: [],
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
  mounted() {},
  methods: {
    async fetchData() {
      this.loading = true;
      const response = await Api.get("/reports").catch(error => {
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
      this.reports = await response.json();
      this.loading = false;
    },
  },
};
</script>

<template>
  <main>
    <loadingComponent class="loading" :class="{ inactive: !loading }" />
    <div class="summary">
      <ValidationMessage
        v-if="this.message.length > 0"
        class="justify-content-start"
        :message="this.message"
        :type="this.messageType"
      />
      {{ $log(reports) }}
      <ul>
          <ReportListItem v-if="reports" v-for="report in reports" v-bind="report" />
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
}

@media (min-width: 1024px) {
  main {
    min-height: 90vh;
    margin: 10vh 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
  }
}
.summary {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text);
}
</style>
