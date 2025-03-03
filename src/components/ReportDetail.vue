<template>
    <div class="container">
        <div class="row position-relative">
            <LoadingComponent
                class="loading"
                :class="{ inactive: !loading }"
                :active="loading"
            />
            <div class="col-12 col-lg-6">
                <h1 class="font-xl">{{ category }} Report</h1>
                <div class="d-block">
                    <span class="font-base-sb margin-right-xxs">{{
                        type
                    }}</span>
                    <span class="font-base font-color-primary">
                        v<span class="hover-help" :title="generator">{{
                            version
                        }}</span>
                    </span>
                </div>
                <div class="d-block">
                    Analyzed
                    <time
                        class="hover-help"
                        :title="`Trivial Scanner completed; ${moment(date)}`"
                        :datetime="moment.utc(date).toISOString()"
                    >
                        {{ moment(date).fromNow() }}
                    </time>
                    (took
                    <span
                        class="hover-help"
                        :title="`Trivial Scanner execution duration in ${execution_duration_seconds} seconds`"
                        >{{ scanDuration }}s</span
                    >)
                </div>

                <div v-if="targets">
                    <h3 class="font-lg margin-top-sm">Targets</h3>
                    <div class="d-flex flex-column">
                        <span
                            v-for="(t, id) in targets"
                            :key="id"
                            class="font-color-secondary cursor-pointer margin-bottom-xs d-flex align-items-center"
                            data-bs-toggle="modal"
                            :data-bs-target="`#target_${id}`"
                        >
                            <span
                                class="text-decoration-none target-icon-link font-color-secondary w-100"
                            >
                                <div
                                    class="d-flex flex-column justify-content-between w-100"
                                >
                                    <div class="d-flex align-items-center">
                                        <IconTarget
                                            class="target-icon"
                                            color="e2c878"
                                        />{{ t.transport.hostname }}:{{
                                            t.transport.port
                                        }}
                                        <span
                                            class="margin-left-xxs font-color-light-60"
                                        >
                                            {{ t.transport.peer_address }}
                                        </span>
                                    </div>
                                </div>
                            </span>
                        </span>
                    </div>
                    <SlidingModal
                        v-for="(target, targetModalId) in targets"
                        :key="targetModalId"
                        :id="`target_${targetModalId}`"
                    >
                        <template #header>
                            <div
                                class="modal-header border-0 d-flex justify-content-start"
                            >
                                <button
                                    type="button"
                                    class="btn-close m-0 p-0"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <IconArrowPrimary
                                        color="ffffff"
                                        class="modal-icon-report-close"
                                    />
                                </button>
                            </div>
                        </template>
                        <template #content>
                            <div class="modal-body">
                                <ValidationMessage
                                    :message="errorMessageScanHost"
                                    :type="errorMessageTypeScanHost"
                                />
                                <div
                                    class="d-flex flex-column flex-lg-row justify-content-between"
                                >
                                    <span
                                        class="font-color-secondary font-base-b"
                                    >
                                        <IconTarget
                                            class="target-icon"
                                            color="e2c878"
                                        />
                                        {{ target.transport.hostname }}:{{
                                            target.transport.port
                                        }}
                                        <p class="font-color-light font-sm">
                                            Peer Address:
                                            {{ target.transport.peer_address }}
                                        </p>
                                    </span>
                                    <p class="font-color-light">
                                        Updated
                                        {{
                                            moment
                                                .utc(target.last_updated)
                                                .fromNow()
                                        }}
                                    </p>
                                    <div class="d-flex flex-sm-row">
                                        <div
                                            class="font-base font-color-light margin-bottom-md"
                                        >
                                            <div class="d-flex flex-sm-row">
                                                <span
                                                    class="font-color-light font-base-b margin-top-xxs margin-right-xs"
                                                    >Monitoring</span
                                                >
                                                <Toggle
                                                    :defaultChecked="
                                                        target.monitoring_enabled
                                                    "
                                                    @change="
                                                        hostToggleChange(
                                                            $event,
                                                            target.transport
                                                                .hostname
                                                        )
                                                    "
                                                />
                                            </div>
                                            <CustomPill
                                                class=""
                                                :label="
                                                    target.monitoring_enabled ===
                                                    true
                                                        ? 'Active'
                                                        : 'Inactive'
                                                "
                                                :type="
                                                    target.monitoring_enabled ===
                                                    true
                                                        ? 'success'
                                                        : 'danger'
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="row margin-bottom-xxs">
                                    <div
                                        class="col-lg-6 col-12 d-flex flex-column margin-bottom-sm"
                                    >
                                        <h3
                                            class="font-color-light font-base-sb"
                                        >
                                            Certificates
                                        </h3>
                                        <span
                                            v-if="target?.tls?.certificates"
                                            v-for="(
                                                sha1_fingerprint, certIndex
                                            ) in uniqueCertificates(
                                                target.tls.certificates
                                            )"
                                            :key="certIndex"
                                            class="font-color-secondary font-sm word-break"
                                        >
                                            <RouterLink
                                                class="text-decoration-none font-color-secondary"
                                                :to="`/certificate/${sha1_fingerprint}`"
                                            >
                                                <IconCertificate
                                                    color="e2c878"
                                                    class="cert-icon margin-right-sm"
                                                /><span
                                                    class="hover-help"
                                                    data-bs-toggle="modal"
                                                    title="See Certificate details"
                                                    >{{
                                                        commonNameFromSubject(
                                                            getCertificate(
                                                                sha1_fingerprint
                                                            ).subject
                                                        )
                                                    }}</span
                                                >
                                            </RouterLink>
                                        </span>
                                    </div>
                                    <div class="col-lg-6 col-12">
                                        <h3
                                            class="font-color-secondary font-base-sb margin-top-sm"
                                        >
                                            <IconTarget
                                                class="target-icon"
                                                color="e2c878"
                                            />
                                            Protocol
                                        </h3>
                                        <p class="margin-bottom-sm">
                                            <span
                                                class="font-base-sb font-color-light"
                                            >
                                                Negotiated:
                                            </span>
                                            <span
                                                class="font-color-base font-color-light"
                                            >
                                                {{
                                                    target.tls?.protocol
                                                        .negotiated
                                                }}
                                            </span>
                                        </p>
                                        <p class="margin-bottom-sm">
                                            <span
                                                class="font-base-sb font-color-light"
                                            >
                                                Preferred:
                                            </span>
                                            <span
                                                class="font-color-base font-color-light"
                                            >
                                                {{
                                                    target.tls?.protocol
                                                        .preferred
                                                }}
                                            </span>
                                        </p>
                                        <div class="margin-bottom-sm">
                                            <span
                                                class="font-base-sb font-color-light"
                                            >
                                                Offered:
                                            </span>
                                            <div class="d-flex flex-column">
                                                <span
                                                    class="font-color-base font-color-light"
                                                    v-for="(
                                                        offered, offeredIndex
                                                    ) in target.tls?.protocol
                                                        .offered"
                                                    :key="offeredIndex"
                                                >
                                                    {{ offered }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="col-lg-6 col-12"
                                        v-if="
                                            target.tls.client
                                                .expected_client_subjects.length
                                        "
                                    >
                                        <span
                                            class="font-color-base font-color-light"
                                            v-for="(
                                                subject, subjectIndex
                                            ) in target.tls.client
                                                .expected_client_subjects"
                                            :key="subjectIndex"
                                        >
                                            {{ subject }}
                                        </span>
                                    </div>
                                    <div class="col-lg-6 col-12">
                                        <h3
                                            class="font-color-secondary font-base-sb"
                                        >
                                            <IconTarget
                                                class="target-icon"
                                                color="e2c878"
                                            />
                                            Cipher
                                            <span
                                                class="font-color-light font-sm hover-help"
                                                :title="`${target.tls.cipher.offered_rfc?.join(
                                                    '\n'
                                                )}`"
                                            >
                                                ({{
                                                    target.tls.cipher
                                                        .offered_rfc?.length
                                                }}
                                                offered)
                                            </span>
                                        </h3>
                                        <p
                                            class="margin-bottom-sm font-color-light"
                                        >
                                            <span class="font-base-sb"
                                                >Negotiated:</span
                                            >
                                            <span class="font-base">{{
                                                target.tls.cipher.negotiated
                                            }}</span>
                                        </p>
                                        <p
                                            class="margin-bottom-sm font-color-light"
                                        >
                                            <span class="font-base-sb"
                                                >Negotiated Bits:</span
                                            >
                                            <span class="font-base">{{
                                                target.tls.cipher
                                                    .negotiated_bits
                                            }}</span>
                                        </p>
                                    </div>
                                    <div class="col-lg-6 col-12">
                                        <h3
                                            class="font-color-secondary font-base-sb margin-top-sm"
                                        >
                                            <IconTarget
                                                class="target-icon"
                                                color="e2c878"
                                            />
                                            Session Resumption
                                        </h3>
                                        <p class="margin-bottom-sm">
                                            <span
                                                class="font-base-sb font-color-light"
                                            >
                                                Cache Mode:
                                            </span>
                                            <span
                                                class="font-color-base font-color-light"
                                            >
                                                {{
                                                    target.tls
                                                        .session_resumption
                                                        .cache_mode
                                                }}
                                            </span>
                                        </p>
                                        <p class="margin-bottom-sm">
                                            <span
                                                class="font-base-sb font-color-light"
                                            >
                                                Ticket Hint:
                                            </span>
                                            <span
                                                class="font-color-base font-color-light text-capitalize"
                                            >
                                                {{
                                                    target.tls
                                                        .session_resumption
                                                        .ticket_hint
                                                }}
                                            </span>
                                        </p>
                                        <p class="margin-bottom-sm">
                                            <span
                                                class="font-base-sb font-color-light"
                                            >
                                                Tickets:
                                            </span>
                                            <span
                                                class="font-color-base font-color-light text-capitalize"
                                            >
                                                {{
                                                    target.tls
                                                        .session_resumption
                                                        .tickets
                                                }}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </SlidingModal>
                </div>

                <ReportScoreResults :results="results" v-if="results" />
            </div>

            <div class="col-12 col-lg-6" v-if="certificates">
                <ReportCertificates :slicedCerts="slicedCerts" />
            </div>
            <div class="col-12 col-lg-6" v-else>
                <h3 class="font-color-light font-lg margin-top-sm">
                    Certificates
                </h3>
                <div
                    class="d-flex flex-column font-color-light bg-dark-40 padding-sm border-radius-sm"
                >
                    No Certificates Observed
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import moment from 'moment'
import IconLink from '@/components/icons/IconLink.vue'
import IconTarget from '@/components/icons/IconTarget.vue'
import ReportScoreResults from '@/components/general/ReportScoreResults.vue'
import ExpandSection from '@/components/general/ExpandSection.vue'
import Dropdown from '@/components/general/Dropdown.vue'
import IconClose from '@/components/icons/IconClose.vue'
import ThreatIcon from '@/components/icons/ThreatIcon.vue'
import IconCertificate from '@/components/icons/IconCertificate.vue'
import Toggle from '@/components/general/Toggle.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import IconArrowPrimary from '@/components/icons/IconArrowPrimary.vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import CustomPill from '@/components/general/CustomPill.vue'
import SlidingModal from '@/components/general/SlidingModal.vue'
import ReportCertificates from '@/components/general/ReportCertificates.vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
</script>

<script>
export default {
    components: {
        IconLink,
        IconTarget,
        ReportScoreResults,
        ExpandSection,
        Dropdown,
        IconClose,
        ThreatIcon,
        IconCertificate,
        Toggle,
        ValidationMessage,
        LoadingComponent,
        IconArrowPrimary,
        CustomPill,
        SlidingModal,
        IconChevron,
        ReportCertificates
    },
    props: [
        'generator',
        'type',
        'category',
        'version',
        'account_name',
        'client_name',
        'project_name',
        'targets',
        'date',
        'execution_duration_seconds',
        'score',
        'results',
        'certificates',
        'results_uri',
        'config',
        'flags'
    ],
    data() {
        return {
            loading: false,
            errorMessage: '',
            errorMessageType: '',
            errorMessageScanHost: '',
            errorMessageTypeScanHost: ''
        }
    },
    setup() {
        return {
            modules: [Navigation, Pagination, Scrollbar, A11y]
        }
    },
    methods: {
        async hostToggleChange(e, hostname) {
            this.loading = true
            try {
                if (e.target.checked === true) {
                    const response = await Api.get(
                        `/scanner/monitor/${hostname}`
                    )
                    if (response.status !== 200) {
                        this.errorMessageScanHost = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageTypeScanHost = 'error'
                        this.loading = false
                        e.target.checked = false
                        return
                    }
                    this.errorMessageScanHost = `Monitoring host.`
                    this.errorMessageTypeScanHost = 'success'
                    for (const target of this.targets) {
                        if (hostname === target.transport.hostname) {
                            target.monitoring_enabled = true
                        }
                    }
                } else {
                    const response = await Api.get(
                        `/scanner/deactivate/${hostname}`
                    )
                    if (response.status !== 200) {
                        this.errorMessageScanHost = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageTypeScanHost = 'error'
                        this.loading = false
                        e.target.checked = false
                        return
                    }
                    this.errorMessageScanHost = `No longer monitoring host.`
                    this.errorMessageTypeScanHost = 'success'
                    for (const target of this.targets) {
                        if (hostname === target.transport.hostname) {
                            target.monitoring_enabled = false
                        }
                    }
                }
            } catch (error) {
                this.errorMessageScanHost =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageTypeScanHost = 'error'
                e.target.checked = false
            }
            this.loading = false
        },
        swiperNext() {
            this.$refs.certificateSwiper
        },
        commonNameFromSubject(subject) {
            if (typeof subject !== 'string' || subject.indexOf('CN=') === -1) {
                return subject
            }
            return subject
                .split(',')
                .filter((p) => p.trim().startsWith('CN='))
                .join('')
                .replace(/CN=/g, '')
        },
        getCertificate(sha1_fingerprint) {
            return this.certificates
                .filter((cert) => cert.sha1_fingerprint === sha1_fingerprint)
                .pop()
        },
        uniqueCertificates(sha1Fingerprints) {
            const uniq = new Set(sha1Fingerprints)
            return [...uniq]
        }
    },
    computed: {
        slicedCerts() {
            let certificate_chains = []
            function next_certs(SKI, arr) {
                for (const cert of cert_list) {
                    if (cert.authority_key_identifier === SKI) {
                        arr.push(cert)
                        next_certs(cert.subject_key_identifier, arr)
                    }
                }
            }
            let cert_list = this.certificates.slice()
            for (const cert of cert_list) {
                if (cert.type === 'root') {
                    let chain = [cert]
                    cert_list = cert_list.filter((item) => item !== cert)
                    next_certs(cert.subject_key_identifier, chain)
                    certificate_chains.push(chain.reverse())
                }
            }
            return certificate_chains
        },
        scanDuration() {
            return Math.floor(this.execution_duration_seconds)
        }
    }
}
</script>
<style scoped lang="scss">
.report-item {
    cursor: pointer;
    z-index: 10;
    height: 20px;
}
.cert-icon,
.target-icon {
    height: 25px;
    width: 25px;
}
.pill {
    color: color('light');
    background: color('primary');
    border: 1px solid color('primary');

    &.collapsed {
        background: none;
        color: color('primary');
        border: 1px solid color('primary');
    }
}
.link-icon {
    height: 20px;
    width: 20px;
}

.custom-swiper-button {
    position: relative;
    border-radius: radius('sm');
    padding: 0 spacers('xs');
    background: color('dark-60');
    color: color(light);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s linear;
    border: 1px solid color('dark');

    &:hover {
        border: 1px solid color('secondary');
        color: color('secondary');
    }

    &:disabled {
        color: color('light-20');
        background: none;
        border: 1px solid color('light-20');
        display: none;
    }
}

.expand-icon {
    transform: rotate(180deg);
    width: 25px;
    height: 25px;
}

.collapsed .expand-icon {
    transform: rotate(0deg);
}

.modal-icon-report-close {
    width: 25px;
    height: 25px;
}
</style>
