<template>
    <div>
        <div class="d-flex flex-column flex-lg-row justify-content-between">
            <span class="font-color-secondary font-sm-b">
                <div class="d-flex flex-column">
                    <CustomPill
                        class="margin-bottom-xs"
                        :label="host?.scanning_status?.monitoring === true ? 'Active' : 'Inactive' "
                        :type="host?.scanning_status?.monitoring === true ? 'success' : 'danger' "
                    />
                    <span class="margin-right-sm"><IconTarget class="target-icon" color="e2c878" /> {{host?.transport?.hostname}}:{{host?.transport?.port}}</span>
                    <p class="font-color-light font-sm">
                        Peer Address: {{host?.transport?.peer_address}}
                    </p>
                    <div class="d-flex">
                    <span class="font-color-light font-sm-b margin-right-xs">Monitoring</span>
                        <Toggle
                            :defaultChecked="host?.scanning_status?.monitoring"
                            @change="hostToggleChange($event, host?.transport?.hostname)"
                        />
                    </div>
                </div>
            </span>
            <p class="font-color-light font-xs">
                Updated {{lastUpdated}}
                <br>
                <span class="font-color-light" v-if="host?.scanning_status?.queue_status">
                    {{ host?.scanning_status?.queue_status }} {{ queueTimestamp }}
                </span>
            </p>
        </div>
        <div class="row margin-bottom-xxs">
            <div class="col-6">
                <h3 class="font-color-secondary font-sm-sb margin-top-sm">
                <IconTarget class="target-icon" color="e2c878" />
                Protocol
                </h3>
                <p class="margin-bottom-xs">
                <span class="font-sm-sb font-color-light">
                    Negotiated:
                </span>
                <span class="font-color-base font-color-light">
                    {{host?.tls?.protocol?.negotiated}}
                </span>
                </p>
                <p class="margin-bottom-xs">
                <span class="font-sm-sb font-color-light">
                    Preferred:
                </span>
                <span class="font-color-base font-color-light">
                    {{host?.tls?.protocol?.preferred}}
                </span>
                </p>
                <div class="margin-bottom-xs">
                <span class="font-sm-sb font-color-light">
                    Offered:
                </span>
                <div class="d-flex flex-column">
                    <span
                    class="font-color-base font-color-light"
                    v-for="(offered, offeredIndex) in host?.tls?.protocol?.offered"
                    :key="offeredIndex"
                    >
                    {{offered}}
                    </span>
                </div>
                </div>
            </div>
            <div class="col-6 d-flex flex-column margin-bottom-sm bg-dark-60 border-radius-sm padding-sm">
                <h3 class="font-color-light font-sm-sb">Certificates</h3>
                <span
                    v-for="(sha1_fingerprint, certIndex) in uniqueCertificates(host?.tls?.certificates)"
                    :key=certIndex
                    class="font-color-secondary font-sm word-break"
                >
                <a
                    target="_blank"
                    class="text-decoration-none font-color-secondary d-flex"
                    :href="`/certificate/${sha1_fingerprint}`"
                >
                    <IconCertificate color="e2c878" class="cert-icon margin-right-sm" /><span title="See Certificate details">{{ sha1_fingerprint }}</span>
                </a>
                </span>
            </div>
        </div>
        <div class="row">
            <div v-if="host?.tls?.client.expected_client_subjects.length">
                <div class="col-6">
                <span
                    class="font-color-base font-color-light"
                    v-for="(subject, subjectIndex) in host?.tls?.client?.expected_client_subjects"
                    :key="subjectIndex"
                >
                    {{subject}}
                </span>
                </div>
            </div>
        <div class="col-6">
            <h3 class="font-color-secondary font-sm-sb">
            <IconTarget class="target-icon" color="e2c878" />
            Cipher
            <span
                class="font-color-light font-sm"
                :title="`${host?.tls?.cipher.offered_rfc.join('\n')}`"
            >
                ({{ host?.tls?.cipher.offered_rfc.length }} offered)
            </span>
            </h3>
            <p class="margin-bottom-xs font-color-light">
            <span class="font-sm-sb">Negotiated:</span> <span class="font-sm">{{host?.tls?.cipher.negotiated}}</span>
            </p>
            <p class="margin-bottom-xs font-color-light">
            <span class="font-sm-sb">Negotiated Bits:</span> <span class="font-sm">{{host?.tls?.cipher.negotiated_bits}}</span>
            </p>
        </div>
        <div class="col-lg-6 col-12">
            <h3 class="font-color-secondary font-sm-sb margin-top-sm">
            <IconTarget class="target-icon" color="e2c878" />
            Session Resumption
            </h3>
            <p class="margin-bottom-xs">
            <span class="font-sm-sb font-color-light">
                Cache Mode:
            </span>
            <span class="font-color-base font-color-light">
                {{host?.tls?.session_resumption.cache_mode}}
            </span>
            </p>
            <p class="margin-bottom-xs">
            <span class="font-sm-sb font-color-light">
                Ticket Hint:
            </span>
            <span class="font-color-base font-color-light text-capitalize">
                {{host?.tls?.session_resumption.ticket_hint}}
            </span>
            </p>
            <p class="margin-bottom-xs">
            <span class="font-sm-sb font-color-light">
                Tickets:
            </span>
            <span class="font-color-base font-color-light text-capitalize">
                {{host?.tls?.session_resumption.tickets}}
            </span>
            </p>
        </div>
        </div>
    </div>
</template>
<script>
    import moment from "moment";
    import IconTarget from "@/components/icons/IconTarget.vue";
    import IconCertificate from "@/components/icons/IconCertificate.vue";
    import Toggle from "@/components/general/Toggle.vue"
    import CustomPill from "@/components/general/CustomPill.vue";

    export default {
        components: {
            IconTarget,
            IconCertificate,
            Toggle,
            CustomPill,
        },
        props: [
            'host'
        ],
        methods: {
            uniqueCertificates(sha1Fingerprints){
                const uniq = new Set(sha1Fingerprints)
                return [...uniq]
            },
            commonNameFromSubject(subject) {
                if (typeof subject !== 'string' || subject.indexOf('CN=') === -1) {
                    return subject
                }
                return subject.split(',').filter(p => p.trim().startsWith('CN=')).join('').replace(/CN=/g, '')
            },
            // getCertificate(sha1_fingerprint) {
            //     return host.tls.certificates.filter(cert => cert.sha1_fingerprint === sha1_fingerprint).pop()
            // },
        },
        computed: {
            lastUpdated() {
            return moment.utc(this.host.last_updated).fromNow()
            },
            queueTimestamp() {
            return moment.utc(this.host.scanning_status.queued_timestamp).fromNow()
            }
        },
    };
</script>
<style lang="scss">
    .report {
  &-item {
    cursor: pointer;
    z-index: 10;
    height: 20px;
  }
}

.cert-icon, .target-icon {
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
  background: color('dark-60');
  backdrop-filter: blur(8px);
  height: 60px;
  // position: sticky;
  // top: 65px;
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
  background: color('light-20');
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