<template>
  <main>
    <div class="container">
      <LoadingComponent class="loading" v-if="loading" />
      <ValidationMessage
        v-if="errorMessage.length > 0"
        class="justify-content-start"
        :message="errorMessage"
        :type="errorMessageType"
      />
      <div
        class="certificate padding-top-xl padding-bottom-xl"
        v-if="Object.keys(certificate).length > 0"
      >
        <Certificate v-bind="certificate" />
      </div>
    </div>
  </main>
</template>

<script setup>
import Certificate from "@/components/general/Certificate.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import LoadingComponent from "@/components/general/LoadingComponent.vue";
</script>

<script>
export default {
  components: {
    ValidationMessage,
    LoadingComponent,
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
      certificate: {},
    };
  },
  created() {
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
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const response = await Api.get(
          `/certificate/${this.$route.params.sha1_fingerprint}`
        );
        if (response.status !== 200) {
          this.errorMessage = `${response.status}: ${response.statusText}`;
          this.errorMessageType = "error";
          this.loading = false;
          return;
        }
        this.certificate = await response.json();
      } catch (error) {
        this.message =
          error.name === "AbortError"
            ? "Request timed out, please try refreshing the page."
            : `${error.name} ${error.message}. Couldn't complete this action.`;
        this.messageType = "error";
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.report {
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .report {
    min-height: 90vh;
    margin: 10vh 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
  }
}
div {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text);
}
</style>
