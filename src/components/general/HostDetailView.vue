<template>
  <div v-if="host">
    <LoadingComponent class="loading" v-if="loading" />
    <ValidationMessage
      v-if="errorMessage?.length > 0"
      class="justify-content-start"
      :message="errorMessage"
      :type="errorMessageType"
    />
    <div class="d-flex flex-column flex-lg-row justify-content-between">
      <span class="font-color-light font-base-b">
        <div class="d-flex flex-column">
          <span class="margin-right-sm">
            {{ host.transport?.hostname }}:{{ host.transport?.port }}
            <span class="font-color-light font-sm">
              {{ host.transport?.peer_address }}
            </span>
            <p class="font-color-light font-xs">Updated {{ lastUpdated }}</p>
          </span>
        </div>
      </span>
      <div class="d-flex align-items-center">
        <Toggle
          :defaultChecked="host.monitoring_enabled"
          @change="hostToggleChange($event, host.transport?.hostname)"
        />
        <span class="font-color-light font-sm-b margin-left-xs"
          >Monitoring</span
        >
        <CustomPill
          class="margin-left-xs"
          :label="host.monitoring_enabled === true ? 'Active' : 'Inactive'"
          :type="host.monitoring_enabled === true ? 'success' : 'danger'"
        />
      </div>
    </div>
    <div class="row margin-bottom-xxs">
      <div class="col-6">
        <h3 class="font-color-secondary font-sm-sb margin-top-sm">
          <IconTarget class="target-icon" color="e2c878" />
          Protocol
        </h3>
        <p class="margin-bottom-xs">
          <span class="font-sm-sb font-color-light"> Negotiated: </span>
          <span class="font-color-base font-color-light">
            {{ host.tls?.protocol?.negotiated }}
          </span>
        </p>
        <p class="margin-bottom-xs">
          <span class="font-sm-sb font-color-light"> Preferred: </span>
          <span class="font-color-base font-color-light">
            {{ host.tls?.protocol?.preferred }}
          </span>
        </p>
        <div class="margin-bottom-xs">
          <span class="font-sm-sb font-color-light"> Offered: </span>
          <div class="d-flex flex-column">
            <span
              class="font-color-base font-color-light"
              v-for="(offered, offeredIndex) in host.tls?.protocol?.offered"
              :key="offeredIndex"
            >
              {{ offered }}
            </span>
          </div>
        </div>
      </div>
      <div
        class="col-6 d-flex flex-column margin-bottom-sm bg-dark-60 border-radius-sm padding-sm"
      >
        <h3 class="font-color-light font-sm-sb">Certificates</h3>
        <span
          v-for="(sha1_fingerprint, certIndex) in uniqueCertificates(
            host.tls?.certificates,
          )"
          :key="certIndex"
          class="font-color-secondary font-sm word-break"
        >
          <a
            target="_blank"
            class="text-decoration-none font-color-secondary d-flex"
            :href="`/certificate/${sha1_fingerprint}`"
          >
            <IconCertificate
              color="e2c878"
              class="cert-icon margin-right-sm"
            /><span title="See Certificate details">{{
              sha1_fingerprint
            }}</span>
          </a>
        </span>
      </div>
    </div>
    <div class="row">
      <div v-if="host.tls?.client.expected_client_subjects.length">
        <div class="col-6">
          <span
            class="font-color-base font-color-light"
            v-for="(subject, subjectIndex) in host.tls?.client
              ?.expected_client_subjects"
            :key="subjectIndex"
          >
            {{ subject }}
          </span>
        </div>
      </div>
      <div class="col-6">
        <h3 class="font-color-secondary font-sm-sb">
          <IconTarget class="target-icon" color="e2c878" />
          Cipher
          <span
            class="font-color-light font-sm"
            :title="`${host.tls?.cipher.offered_rfc.join('\n')}`"
          >
            ({{ host.tls?.cipher.offered_rfc.length }} offered)
          </span>
        </h3>
        <p class="margin-bottom-xs font-color-light">
          <span class="font-sm-sb">Negotiated:</span>
          <span class="font-sm">{{ host.tls?.cipher.negotiated }}</span>
        </p>
        <p class="margin-bottom-xs font-color-light">
          <span class="font-sm-sb">Negotiated Bits:</span>
          <span class="font-sm">{{ host.tls?.cipher.negotiated_bits }}</span>
        </p>
      </div>
      <div class="col-lg-6 col-12">
        <h3 class="font-color-secondary font-sm-sb margin-top-sm">
          <IconTarget class="target-icon" color="e2c878" />
          Session Resumption
        </h3>
        <p class="margin-bottom-xs">
          <span class="font-sm-sb font-color-light"> Cache Mode: </span>
          <span class="font-color-base font-color-light">
            {{ host.tls?.session_resumption.cache_mode }}
          </span>
        </p>
        <p class="margin-bottom-xs">
          <span class="font-sm-sb font-color-light"> Ticket Hint: </span>
          <span class="font-color-base font-color-light text-capitalize">
            {{ host.tls?.session_resumption.ticket_hint }}
          </span>
        </p>
        <p class="margin-bottom-xs">
          <span class="font-sm-sb font-color-light"> Tickets: </span>
          <span class="font-color-base font-color-light text-capitalize">
            {{ host.tls?.session_resumption.tickets }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import moment from "moment";
import IconTarget from "@/components/icons/IconTarget.vue";
import IconCertificate from "@/components/icons/IconCertificate.vue";
import Toggle from "@/components/general/Toggle.vue";
import CustomPill from "@/components/general/CustomPill.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import LoadingComponent from "@/components/general/LoadingComponent.vue";
</script>

<script>
export default {
  components: {
    IconTarget,
    IconCertificate,
    Toggle,
    CustomPill,
    ValidationMessage,
    LoadingComponent,
  },
  props: ["host"],
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
    };
  },
  methods: {
    uniqueCertificates(sha1Fingerprints) {
      const uniq = new Set(sha1Fingerprints);
      return [...uniq];
    },
    commonNameFromSubject(subject) {
      if (typeof subject !== "string" || subject.indexOf("CN=") === -1) {
        return subject;
      }
      return subject
        .split(",")
        .filter((p) => p.trim().startsWith("CN="))
        .join("")
        .replace(/CN=/g, "");
    },
    async hostToggleChange(e, hostname) {
      this.loading = true;
      try {
        if (e.target.checked === true) {
          const response = await Api.get(`/scanner/monitor/${hostname}`);
          if (response.status !== 200) {
            this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`;
            this.errorMessageType = "error";
            this.loading = false;
            e.target.checked = false;
            return;
          }
          this.errorMessage = `Monitoring host.`;
          this.errorMessageType = "success";
          this.host.monitoring_enabled = true;
        } else {
          const response = await Api.get(`/scanner/deactivate/${hostname}`);
          if (response.status !== 200) {
            this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`;
            this.errorMessageType = "error";
            this.loading = false;
            e.target.checked = false;
            return;
          }
          this.errorMessage = `No longer monitoring host.`;
          this.errorMessageType = "success";
          this.host.monitoring_enabled = false;
        }
      } catch (error) {
        this.errorMessage =
          error.name === "AbortError"
            ? "Request timed out, please try refreshing the page."
            : `${error.name} ${error.message}. Couldn't complete this action.`;
        this.errorMessageType = "error";
        e.target.checked = false;
      }
      this.loading = false;
    },
  },
  computed: {
    lastUpdated() {
      return moment.utc(this.host.last_updated).fromNow();
    },
  },
};
</script>
<style scoped lang="scss">
.report {
  &-item {
    cursor: pointer;
    z-index: 10;
    height: 20px;
  }
}

.cert-icon,
.target-icon {
  height: 25px;
  width: 25px;
}

.link-icon {
  height: 20px;
  width: 20px;
}

.modal-icon-report-close {
  width: 25px;
  height: 25px;
  // transform: rotate(180deg);
}

.pill {
  color: color("light");
  background: color("primary");
  border: 1px solid color("primary");

  &.collapsed {
    background: none;
    color: color("primary");
    border: 1px solid color("primary");
  }
}

.truncate-ellipsis {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filter-results {
  background: color("dark-60");
  backdrop-filter: blur(8px);
  height: 60px;
  // position: sticky;
  // top: 65px;
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  label {
    cursor: pointer;
  }
}

.custom-checkbox {
  appearance: unset;
  width: 15px;
  height: 15px;
  background: color("light-20");
  transition: 0.2s linear;
  border-radius: 5px;
  cursor: pointer;

  &:checked {
    background: rgb(26, 187, 156);
    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
      content: "\2713";
      color: color("dark");
      line-height: 15px;
      font-size: 10px;
    }
  }
}
</style>
