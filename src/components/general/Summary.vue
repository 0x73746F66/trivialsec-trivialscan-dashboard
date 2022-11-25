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
    <div
      v-if="summary"
      class="w-100 bg-dark-40 border-radius-sm d-flex flex-column padding-sm"
    >
      <div class="row margin-bottom-xs">
        <span class="col-6 d-flex font-sm text-left"
          ><span class="font-sm-sb margin-right-xxs">Scanned</span
          >{{ summary.dateAgo }}</span
        >
        <span
          class="col-6 d-flex font-color-primary justify-content-end align-items-end text-right font-xs"
          >{{ summary?.generator }} {{ summary?.version }}</span
        >
      </div>
      <div class="row">
        <div
          class="col-6 d-flex flex-column justify-content-start align-items-start"
        >
          <span v-if="summary?.project_name" class="font-base">
            <span class="font-base-sb margin-right-xxs">Project:</span
            >{{ summary?.project_name }}
          </span>
          <span v-for="(target, index) in summary.targets" :key="index">
            <IconTarget
              class="summary-icon-targets margin-right-xxs"
              color="e2c878"
            />
            <a
              :href="`/hostname/${target.transport.hostname}/${target.transport.port}`"
              class="font-color-secondary"
              >{{ target.transport.hostname }}:{{ target.transport.port }}</a
            >
          </span>
          <div class="d-flex margin-top-sm">
            <div v-if="summary?.results.fail > 0" class="summary-pill error">
              <IconError class="summary-icon" color="" />
              <span class="font-color-dark">{{ summary.results.fail }}</span>
              <span class="summary-pill-legend margin-left-xxs">Failures</span>
            </div>
            <div v-if="summary?.results.warn > 0" class="summary-pill warning">
              <IconWarning class="summary-icon" color="" />
              <span class="font-color-dark">{{ summary.results.warn }}</span>
              <span class="summary-pill-legend margin-left-xxs">Warnings</span>
            </div>
            <div v-if="summary?.results.pass > 0" class="summary-pill pass">
              <checkIcon class="summary-icon" color="" />
              <span class="font-color-dark">{{ summary.results.pass }}</span>
              <span class="summary-pill-legend margin-left-xxs">Passes</span>
            </div>
            <div v-if="summary?.results.info > 0" class="summary-pill info">
              <IconInfo class="summary-icon" color="" />
              <span class="font-color-dark">{{ summary.results.info }}</span>
              <span class="summary-pill-legend margin-left-xxs">Insights</span>
            </div>
          </div>
        </div>
        <div
          class="col-6 d-flex flex-column justify-content-end align-items-end"
        >
          <span v-if="summary?.client_name" class="font-sm margin-bottom-xs">
            <span v-if="summary?.client" class="font-sm font-color-secondary">
              {{ summary.client.operating_system }}
              {{ summary.client.architecture }}
            </span>
            {{ summary.client_name }}
          </span>
          <span
            v-if="summary?.certificates.length > 0"
            class="margin-bottom-xxs font-xs"
          >
            <IconCertificate
              class="summary-icon-certificates margin-right-xxs"
              color="e2c878"
            />
            {{ summary.certificates.length }}
            <span
              >Certificate<span v-if="summary.certificates.length > 1"
                >s</span
              ></span
            >
          </span>
          <a
            :href="`/result/${summary?.report_id}/detail`"
            class="font-color-primary text-decoration-none"
          >
            Read More
            <IconArrowPrimary class="summary-icon-next mr-0" color="1abb9c"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import checkIcon from "../icons/checkIcon.vue";
import IconError from "../icons/IconError.vue";
import IconWarning from "../icons/IconWarning.vue";
import IconInfo from "../icons/IconInfo.vue";
import IconTarget from "../icons/IconTarget.vue";
import IconCertificate from "../icons/IconCertificate.vue";
import IconArrowPrimary from "../icons/IconArrowPrimary.vue";
import LoadingComponent from "@/components/general/LoadingComponent.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import moment from "moment";

export default {
  components: {
    checkIcon,
    IconError,
    IconWarning,
    IconInfo,
    IconTarget,
    IconCertificate,
    IconArrowPrimary,
    LoadingComponent,
    ValidationMessage,
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
      summaries: [],
    };
  },
  mounted() {
    this.fetchSummaries();
  },
  methods: {
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
<style lang="scss">
.summary {
  &-icon {
    width: 25px;
    height: 25px;
    margin-right: spacers("xs");
    &-certificates,
    &-targets {
      width: 25px;
      height: 25px;
      margin-right: spacers("xxs");
    }
    &-next {
      width: 25px;
      height: 25px;
      margin-right: 0;
    }
  }
  &-pill {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    border-radius: radius("sm");
    color: color("dark");
    margin-right: spacers("sm");
    padding: spacers("xxs") spacers("xs");
    transition: 0.2s linear;
    &-legend {
      display: none;
    }

    &:hover {
      .summary-pill-legend {
        display: block;
      }
    }

    &.error {
      background: color("danger");
    }
    &.warning {
      background: color("warning");
    }
    &.pass {
      background: color("primary");
    }
    &.info {
      background: color("light-40");
    }
  }
}
</style>
