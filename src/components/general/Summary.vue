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
      <div class="row row-cols-auto">
        <ValidationMessage
          v-if="delMessages[summary.refId]?.length > 0"
          class="justify-content-start"
          :message="delMessages[summary.refId]"
          :type="delMessageTypes[summary.refId]"
        />
        <span class="col-6">
          <span class="font-sm-sb margin-right-xxs">
            {{ summary?.category }}
          </span>
          <span class="font-xs">{{ summary.dateAgo }}</span>
        </span>
        <span class="col-6 justify-content-end align-items-end text-right">
          <div class="delete-client-modal">
            <Modal
              :id="`deleteReport${index}`"
              label="delete-report-header"
              :dialogClass="summary.refId"
            >
              <template v-slot:button="buttonProps">
                <button class="btn-delete" v-bind="buttonProps">
                  <IconTrash class="trash-icon" />
                </button>
              </template>
              <template v-slot:modalTitle>
                <h5 class="delete-report-header font-base font-color-light">
                  Are you sure you want to delete this report?
                </h5>
              </template>
              <template v-slot:modalContent>
                <form @submit.prevent="deleteReport($event)">
                  <input
                    type="hidden"
                    name="ReportId"
                    :value="summary.report_id"
                  />
                  <button
                    data-bs-dismiss="modal"
                    type="submit"
                    class="btn-outline-danger-full font-color-danger font-sm"
                  >
                    Yes
                  </button>
                </form>
              </template>
            </Modal>
          </div>
        </span>
        <span class="col-6 d-flex">
          <span v-if="summary?.project_name" class="font-base">
            <span class="font-base-sb margin-right-xxs">Project:</span
            >{{ summary?.project_name }}
          </span>
        </span>
      </div>
      <div class="row">
        <div
          class="col-6 d-flex nowrap flex-column justify-content-start align-items-start margin-bottom-sm"
        >
          <span v-for="(target, index) in summary.targets" :key="index">
            <IconTarget
              class="summary-icon-targets margin-right-xxs"
              color="e2c878"
            />
            <a
              target="_blank"
              :href="`/hostname/${target.transport.hostname}/${target.transport.port}`"
              class="font-color-secondary"
              >{{ target.transport.hostname }}:{{ target.transport.port }}</a
            >
          </span>
          <span
            v-if="summary?.certificates.length > 0"
            class="margin-bottom-xxs font-sm"
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
        </div>
        <div
          class="col-6 d-flex flex-column justify-content-end align-items-end"
        >
          <div class="font-sm text-right">
            <span class="margin-right-xxs">{{ summary?.type }}</span>
            <span class="font-color-secondary">v{{ summary?.version }}</span>
          </div>
          <div v-if="summary?.client_name" class="font-sm text-right">
            <span v-if="summary?.client" class="margin-right-xxs">
              {{ summary.client.operating_system }}
              {{ summary.client.architecture }}
            </span>
            <span class="font-color-secondary">
              {{ summary.client_name }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-6 d-flex flex-column justify-content-start align-items-start"
        >
          <div class="d-flex">
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
            <div
              v-if="summary?.results.info > 0"
              class="summary-pill info hide-lg"
            >
              <IconInfo class="summary-icon" color="" />
              <span class="font-color-dark">{{ summary.results.info }}</span>
              <span class="summary-pill-legend margin-left-xxs"
                >Informational</span
              >
            </div>
          </div>
        </div>
        <div
          class="col-6 d-flex flex-column justify-content-end align-items-end"
        >
          <a
            :href="`/result/${summary?.report_id}/detail`"
            class="font-color-primary text-decoration-none"
          >
            <span class="hide-lg">Read More</span>
            <IconArrowPrimary class="summary-icon-next mr-0" color="1abb9c" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Modal from "@/components/general/Modal.vue";
import checkIcon from "@/components/icons/checkIcon.vue";
import IconError from "@/components/icons/IconError.vue";
import IconWarning from "@/components/icons/IconWarning.vue";
import IconInfo from "@/components/icons/IconInfo.vue";
import IconTarget from "@/components/icons/IconTarget.vue";
import IconCertificate from "@/components/icons/IconCertificate.vue";
import IconArrowPrimary from "@/components/icons/IconArrowPrimary.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import LoadingComponent from "@/components/general/LoadingComponent.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import moment from "moment";
</script>

<script>
export default {
  components: {
    Modal,
    checkIcon,
    IconError,
    IconWarning,
    IconInfo,
    IconTarget,
    IconCertificate,
    IconArrowPrimary,
    IconTrash,
    LoadingComponent,
    ValidationMessage,
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
      summaries: [],
      delMessages: {},
      delMessageTypes: {},
    };
  },
  mounted() {
    this.fetchSummaries();
  },
  methods: {
    shortReportId(reportId) {
      return reportId.replace(/[\W_]+/g, "").slice(0, 11);
    },
    async deleteReport(event) {
      const reportId = event.target.elements["ReportId"].value;
      const refId = this.shortReportId(reportId);
      this.loading = true;
      try {
        const response = await Api.delete(`/report/${reportId}`);
        if (response.status != 202) {
          this.delMessages[refId] =
            "Something went wrong. Report couldn't be deleted.";
          this.delMessageTypes[refId] = "error";
          this.loading = false;
          return;
        }
        this.delMessages[refId] = `This report was deleted`;
        this.delMessageTypes[refId] = "success";
        for (const [index, summary] of this.summaries.entries()) {
          if (summary.report_id === reportId) {
            setTimeout(() => this.summaries.splice(index, 1), 5000);
            break;
          }
        }
      } catch (error) {
        this.delMessages[refId] =
          error.name === "AbortError"
            ? "Request timed out, please try refreshing the page."
            : `${error.name} ${error.message}. Couldn't complete this action.`;
        this.delMessageTypes[refId] = "error";
      }
      this.loading = false;
    },
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
<style scoped lang="scss">
@media (min-width: breakpoints("sm")) {
}
.trash-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.btn-delete {
  border: none;
  background: none;
  border-radius: 50%;
  transition: 0.2s linear;
  height: 40px;
  width: 40px;
  svg {
    width: 30px;
  }
  &:hover {
    background: color("danger");
  }
}
</style>
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
