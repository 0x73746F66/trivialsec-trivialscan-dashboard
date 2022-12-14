<template>
  <main>
    <div class="container font-color-light padding-top-xl padding-bottom-xl">
      <div
        class="w-100 d-flex align-items-lg-center flex-column flex-lg-row justify-content-between margin-bottom-sm"
      >
        <div class="d-inline-block w-100 position-relative">
          <SearchForm />
        </div>
      </div>

      <div class="d-flex flex-wrap router-link-container">
        <RouterLink
            to="/dashboard"
            class="pill font-color-light margin-right-sm text-decoration-none"
            >
          Dashboard
        </RouterLink>
        <RouterLink
            to="/reports"
            class="pill font-color-light margin-right-sm text-decoration-none"
            >
          Reports
        </RouterLink>
        <RouterLink
            to="/hosts"
            class="pill font-color-light margin-right-sm text-decoration-none"
            >
          Hosts
        </RouterLink>
        <RouterLink
            to="/findings"
            class="pill font-color-light margin-right-sm text-decoration-none"
            >
          Findings
        </RouterLink>
        <RouterLink
            to="/certificate-issues"
            class="pill font-color-light margin-right-sm text-decoration-none"
            >
          Certificates
        </RouterLink>
      </div>

      <div class="w-100 margin-bottom-md">
        <div class="d-flex flex-column margin-bottom-md">
          <h2 class="font-xl-sb">Report Summaries</h2>
          <span class="font-sm font-color-primary"
            >Trivial Scanner uploaded reports</span
          >
        </div>

        <Summary />
      </div>
    
    </div>
  </main>
</template>

<script setup>
import SearchForm from "@/components/forms/SearchForm.vue";
import Summary from "@/components/general/Summary.vue";

</script>

<script>
export default {
  components: {
    SearchForm,
    Summary,
  },
};
</script>

<style scoped lang="scss">
.router-link-container {
  @extend .font-xs;
  .pill {
    background: transparent;
    border: 1px solid color("primary");
  }
  .router-link {
    &-active {
      background: color("primary");
    }
  }
}
</style>
