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

      <div class="d-flex router-link-container">
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
          <h2 class="font-xl-sb">Vulnerabilities & Exposures</h2>
          <span class="font-sm font-color-primary"
            >Security is hard, that's why this list is prioritising quick wins;
            Issues that have an easy fix but pose real and trivial to exploit
            risk if left in the current state</span
          >
        </div>
        <IssuesList />
      </div>
    </div>
  </main>
</template>

<script setup>
import SearchForm from "@/components/forms/SearchForm.vue";
import IssuesList from "@/components/general/IssuesList.vue";
</script>

<script>
export default {
  components: {
    SearchForm,
    IssuesList,
  },
};
</script>

<style scoped lang="scss">
.router-link-container {
  font-size: sizes("xs");
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
@media screen and (min-width: 100px) and (max-width: 980px) {
  .router-link-container {
    flex-wrap: wrap;
    flex-direction: column;
  }
}
</style>
