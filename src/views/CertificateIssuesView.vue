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
          <h2 class="font-xl-sb">Certificate Issues</h2>
          <span class="font-sm font-color-primary"
            >Encryption of the internet is based on inherent trust and
            complicated configuration, here are some issues we
            observed:</span
          >
        </div>
        <CertificateList />
      </div>
    
    </div>
  </main>
</template>

<script setup>
import SearchForm from "@/components/forms/SearchForm.vue";
import CertificateList from "@/components/general/CertificateList.vue";

</script>

<script>
export default {
  components: {
    SearchForm,
    CertificateList,
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
    };
  },
};
</script>

<style lang="scss">
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
