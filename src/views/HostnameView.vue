<template>
    <div class="container font-color-light margin-top-lg margin-bottom-xl">
        <div class="d-flex flex-column flex-lg-row margin-bottom-sm">
            <div class="d-inline-block w-100 position-relative">
                <SearchForm />
            </div>
        </div>
        <div class="margin-top-sm" v-if="Object.keys(host).length > 0">
            <ValidationMessage
                v-if="errorMessage.length > 0"
                class="justify-content-start"
                :message="errorMessage"
                :type="errorMessageType"
            />
            <LoadingComponent class="loading" v-if="loading" />
            <div class="font-color-light" v-if="Object.keys(host).length > 0">
                <div
                    class="d-flex flex-column flex-lg-row justify-content-between"
                >
                    <span class="font-base-b">
                        <div class="d-flex flex-column">
                            <span class="margin-right-sm">
                                {{ host.transport?.hostname }}:{{
                                    host.transport?.port
                                }}
                                <span class="font-sm">
                                    {{ host.transport?.peer_address }}
                                </span>
                                <p class="font-xs">
                                    <select
                                        class="select"
                                        @change="handleVersionChange($event)"
                                    >
                                        <template
                                            v-for="(
                                                version, versionIndex
                                            ) in versions"
                                            :key="versionIndex"
                                        >
                                            <template
                                                v-if="
                                                    params?.version ===
                                                    version.value.replace(
                                                        `${version.port}/`,
                                                        ''
                                                    )
                                                "
                                            >
                                                <option
                                                    :value="version.value"
                                                    selected="selected"
                                                    class="capitalize"
                                                >
                                                    <span
                                                        v-if="
                                                            version.value !==
                                                            'latest'
                                                        "
                                                    >
                                                        {{ version.ip }} on
                                                        {{ version.port }} at
                                                        {{
                                                            version.label
                                                        }}</span
                                                    >
                                                    <span v-else>{{
                                                        version.label
                                                    }}</span>
                                                </option>
                                            </template>
                                            <template v-else>
                                                <option
                                                    :value="version.value"
                                                    class="capitalize"
                                                >
                                                    <span
                                                        v-if="
                                                            version.value !==
                                                            'latest'
                                                        "
                                                    >
                                                        {{ version.ip }} on
                                                        {{ version.port }} at
                                                        {{
                                                            version.label
                                                        }}</span
                                                    >
                                                    <span v-else>{{
                                                        version.label
                                                    }}</span>
                                                </option>
                                            </template>
                                        </template>
                                    </select>
                                    Updated {{ lastUpdated }}
                                </p>
                            </span>
                        </div>
                    </span>
                    <div class="d-flex align-items-center">
                        <Toggle
                            :defaultChecked="host.monitoring_enabled"
                            @change="
                                hostToggleChange(
                                    $event,
                                    host.transport?.hostname
                                )
                            "
                        />
                        <span class="font-sm-b margin-left-xs">Monitoring</span>
                        <CustomPill
                            class="margin-left-xs"
                            :label="
                                host.monitoring_enabled === true
                                    ? 'Active'
                                    : 'Inactive'
                            "
                            :type="
                                host.monitoring_enabled === true
                                    ? 'success'
                                    : 'danger'
                            "
                        />
                        <button
                            @click="scanHost($event, host.transport?.hostname)"
                            class="scan-host-btn margin-left-xxs flex-right"
                        >
                            Scan now
                        </button>
                    </div>
                </div>
                <div class="row margin-bottom-xxs">
                    <div class="col-lg-9 col-12 margin-bottom-xs">
                        <h3
                            class="font-color-secondary font-base-sb margin-top-sm"
                        >
                            <IconInfo class="target-icon" color="e2c878" />
                            Protocol
                        </h3>
                        <p class="margin-bottom-xs">
                            <span class="font-sm-sb"> Negotiated: </span>
                            <span class="font-color-base">
                                {{ host.tls?.protocol?.negotiated }}
                            </span>
                        </p>
                        <p class="margin-bottom-xs">
                            <span class="font-sm-sb"> Preferred: </span>
                            <span class="font-color-base">
                                {{ host.tls?.protocol?.preferred }}
                            </span>
                        </p>
                        <div class="margin-bottom-xs">
                            <span class="font-sm-sb"> Offered: </span>
                            <div class="d-flex flex-column">
                                <span
                                    class="font-color-base"
                                    v-for="(offered, offeredIndex) in host.tls
                                        ?.protocol?.offered"
                                    :key="offeredIndex"
                                >
                                    {{ offered }}
                                </span>
                            </div>
                        </div>
                        <div
                            v-if="
                                host.tls?.client.expected_client_subjects.length
                            "
                        >
                            <span
                                class="font-color-base"
                                v-for="(subject, subjectIndex) in host.tls
                                    ?.client?.expected_client_subjects"
                                :key="subjectIndex"
                            >
                                {{ subject }}
                            </span>
                        </div>
                        <h3 class="font-color-secondary font-base-sb">
                            <IconInfo class="target-icon" color="e2c878" />
                            Cipher
                            <span
                                class="font-sm hover-help"
                                :title="`${host.tls?.cipher.offered_rfc?.join(
                                    '\n'
                                )}`"
                            >
                                ({{ host.tls?.cipher.offered_rfc?.length }}
                                offered)
                            </span>
                        </h3>
                        <p class="margin-bottom-xs">
                            <span class="font-sm-sb margin-right-xxs"
                                >Negotiated:</span
                            >
                            <span class="font-sm">{{
                                host.tls?.cipher.negotiated
                            }}</span>
                        </p>
                        <p class="margin-bottom-xs">
                            <span class="font-sm-sb margin-right-xxs"
                                >Negotiated Bits:</span
                            >
                            <span class="font-sm">{{
                                host.tls?.cipher.negotiated_bits
                            }}</span>
                        </p>
                        <h3
                            class="font-color-secondary font-base-sb margin-top-sm"
                            v-if="related_domains?.length > 0"
                        >
                            <IconInfo class="target-icon" color="e2c878" />
                            Related Domains
                        </h3>
                        <span
                            v-for="(domain_name, hostIndex) in related_domains"
                            :key="hostIndex"
                            class="font-color-secondary font-sm word-break"
                        >
                            <RouterLink
                                :to="{
                                    name: 'hostname',
                                    params: {
                                        hostname: domain_name
                                    }
                                }"
                                class="text-decoration-none font-color-light d-flex"
                            >
                                <IconTarget
                                    class="target-icon"
                                    color="1abb9c"
                                /><span
                                    class="margin-left-xxs hover-help"
                                    title="See domain details"
                                    >{{ domain_name }}</span
                                >
                            </RouterLink>
                        </span>
                        <h3
                            class="font-color-secondary font-base-sb margin-top-sm"
                        >
                            <IconInfo class="target-icon" color="e2c878" />
                            Session Resumption
                        </h3>
                        <p class="margin-bottom-xs">
                            <span class="font-sm-sb"> Cache Mode: </span>
                            <span class="font-color-base">
                                {{ host.tls?.session_resumption.cache_mode }}
                            </span>
                        </p>
                        <p class="margin-bottom-xs">
                            <span class="font-sm-sb"> Ticket Hint: </span>
                            <span class="font-color-base text-capitalize">
                                {{ host.tls?.session_resumption.ticket_hint }}
                            </span>
                        </p>
                        <p class="margin-bottom-xs">
                            <span class="font-sm-sb"> Tickets: </span>
                            <span class="font-color-base text-capitalize">
                                {{ host.tls?.session_resumption.tickets }}
                            </span>
                        </p>
                        <h3
                            class="font-color-secondary font-base-sb margin-top-sm"
                        >
                            <IconInfo class="target-icon" color="e2c878" />
                            Certificate Fingerprints
                        </h3>
                        <span
                            v-for="(
                                sha1_fingerprint, certIndex
                            ) in uniqueCertificates(host.tls?.certificates)"
                            :key="certIndex"
                            class="font-color-secondary font-sm word-break"
                        >
                            <a
                                class="text-decoration-none font-color-light d-flex"
                                :href="`/certificate/${sha1_fingerprint}`"
                            >
                                <IconCertificate
                                    color="1abb9c"
                                    class="cert-icon margin-right-xxs"
                                /><span
                                    class="hover-help"
                                    title="See Certificate details"
                                    >{{ sha1_fingerprint }}</span
                                >
                            </a>
                        </span>
                        <h3
                            class="font-color-secondary font-base-sb margin-top-sm"
                            v-if="host.threat_intel?.length > 0"
                        >
                            <IconInfo class="target-icon" color="e2c878" />
                            Threat Feed Entries
                        </h3>
                        <div
                            v-for="(info, intelKey) in host.threat_intel"
                            :key="intelKey"
                            class="font-color-light font-sm word-break"
                            :title="info.feed_identifier"
                        >
                            Appeared
                            <time
                                class="hover-help"
                                :title="moment(info.feed_date)"
                                :datetime="moment(info.feed_date).toISOString()"
                            >
                                {{ moment(info.feed_date).fromNow() }}
                            </time>
                            on
                            <a
                                v-if="info.source === 'TalosIntelligence'"
                                class="font-color-primary margin-right-xxs"
                                :href="`https://www.talosintelligence.com/reputation_center/lookup?search=${info.feed_identifier}`"
                                target="_blank"
                            >
                                Cisco Talos Intelligence
                            </a>
                            <a
                                v-else-if="info.source === 'Darklist'"
                                class="font-color-primary margin-right-xxs"
                                :href="`https://www.darklist.de/view.php?ip=${info.feed_identifier}`"
                                target="_blank"
                            >
                                darklist.de
                            </a>
                            <span v-else class="margin-right-xxs">
                                {{ info.source }}
                            </span>
                        </div>
                    </div>
                    <div
                        class="col-lg-3 col-12 d-flex flex-column margin-bottom-xs bg-dark-60 border-radius-sm padding-sm"
                    >
                        <h3 class="font-color-light font-sm-sb">
                            OSINT Pivots
                        </h3>
                        <span
                            v-for="(link, name) in external_refs"
                            :key="name"
                            class="font-color-secondary font-sm word-break"
                        >
                            <a
                                class="text-decoration-none font-color-secondary d-flex"
                                :href="link"
                            >
                                <IconLink
                                    color="e2c878"
                                    class="cert-icon margin-right-sm"
                                />
                                {{ name }}
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div v-if="reports.length > 0">
                <h4 class="heading">Scanner Reports</h4>
                <div
                    v-for="(summary, index) in reports"
                    :key="index"
                    class="margin-bottom-sm"
                >
                    <template v-if="summary">
                        <SummaryItem
                            :report="summary"
                            @deleteReport.once="handleDeleteReport"
                        />
                    </template>
                </div>
            </div>
            <div v-else class="font-color-danger font-base-sb">
                <ValidationMessage
                    class="justify-content-start"
                    message="No matching scanner reports on your account"
                    type="error"
                />
            </div>
        </div>
        <InlineLoading class="margin-top-lg" :loading="true" v-else />
    </div>
</template>

<script setup>
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import InlineLoading from '@/components/general/InlineLoading.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import SummaryItem from '@/components/general/SummaryItem.vue'
import SearchForm from '@/components/forms/SearchForm.vue'
import IconTarget from '@/components/icons/IconTarget.vue'
import IconInfo from '@/components/icons/IconInfo.vue'
import IconLink from '@/components/icons/IconLink.vue'
import IconCertificate from '@/components/icons/IconCertificate.vue'
import Toggle from '@/components/general/Toggle.vue'
import CustomPill from '@/components/general/CustomPill.vue'
import moment from 'moment'
</script>

<script>
export default {
    data() {
        return {
            loading: false,
            errorMessage: '',
            errorMessageType: '',
            host: {},
            external_refs: {},
            related_domains: [],
            reports: [],
            versions: [],
            params: {}
        }
    },
    components: {
        LoadingComponent,
        ValidationMessage,
        SummaryItem,
        SearchForm,
        IconTarget,
        IconInfo,
        IconLink,
        IconCertificate,
        Toggle,
        CustomPill
    },
    created() {
        this.loading = true
        this.$watch(
            () => this.$route.params,
            () => {
                this.params = this.$route.params
                this.errorMessage = ''
                this.errorMessageType = ''
                this.fetchData()
            },
            { immediate: true }
        )
    },
    methods: {
        shortReportId(reportId) {
            return reportId.replace(/[\W_]+/g, '').slice(0, 11)
        },
        handleDeleteReport(reportId) {
            for (const [index, summary] of this.reports.entries()) {
                if (summary.report_id === reportId) {
                    setTimeout(() => this.reports.splice(index, 1), 5000)
                    break
                }
            }
        },
        async scanHost(event, target) {
            event.preventDefault()
            this.loading = true
            try {
                const response = await Api.get(`/scanner/queue/${target}`)
                this.loading = false
                if (response.status === 402) {
                    this.errorMessage = `Quota has been exhausted, to continue using on-demand scanning you can upgrade the subscription now`
                    this.errorMessageType = 'warning'
                    return
                }
                if (response.status === 406) {
                    this.errorMessage = `The input is invalid, retry using a fully qualified domain name`
                    this.errorMessageType = 'error'
                    return
                }
                if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                    this.errorMessageType = 'error'
                    return
                }
                this.errorMessage = `Host was added to on-demand scanning.`
                this.errorMessageType = 'success'
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
            }
            this.loading = false
        },
        async fetchData() {
            if (!this.$route.params.hostname) {
                return
            }
            try {
                let url = `/host/${this.$route.params.hostname}?port=${this.$route.params.port}`
                if (
                    !!this.$route.params.version &&
                    this.$route.params.version !== 'latest'
                ) {
                    url += `&last_updated=${moment
                        .utc(this.$route.params.version)
                        .toISOString()}`
                }
                this.loading = true
                const response = await Api.get(url)
                if (response.status !== 200) {
                    this.errorMessage =
                        "An error occurred: Page couldn't be loaded"
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.host = data.host
                this.versions = data.versions
                    .map((version) => {
                        if (version === 'latest') {
                            return {
                                value: version,
                                port: 443,
                                date: '99999999', // for ordering
                                ip: '',
                                label: 'latest'
                            }
                        }
                        const versionParts = version.split('/')
                        return {
                            value: `${versionParts[0]}/${versionParts[1]}`,
                            port: versionParts[0],
                            date: versionParts[1],
                            ip: versionParts[2],
                            label: moment.utc(versionParts[1]).format('L')
                        }
                    })
                    .sort((a, b) => b.date.localeCompare(a.date))
                this.external_refs = data.external_refs
                this.related_domains = data.related_domains
                this.reports = data.reports.map((summary) => {
                    summary.refId = this.shortReportId(summary.report_id)
                    summary.dateAgo = moment.utc(summary.date).fromNow()
                    return summary
                })
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
            }
            this.loading = false
        },
        uniqueCertificates(sha1Fingerprints) {
            const uniq = new Set(sha1Fingerprints)
            return [...uniq]
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
        async handleVersionChange(e) {
            if (e.target.value === 'latest') {
                this.$router.push(`/hostname/${this.params.hostname}/`)
                return
            }
            this.$router.push(
                `/hostname/${this.params.hostname}/${e.target.value}/`
            )
        },
        async hostToggleChange(e, hostname) {
            this.loading = true
            try {
                if (e.target.checked === true) {
                    const response = await Api.get(
                        `/scanner/monitor/${hostname}`
                    )
                    this.loading = false
                    if (response.status === 204) {
                        this.errorMessageScanHost = `No changes`
                        this.errorMessageTypeScanHost = 'success'
                        return
                    }
                    if (response.status === 402) {
                        this.errorMessageScanHost = `Quota has been exhausted, to continue using on-demand scanning you can upgrade the subscription now`
                        this.errorMessageTypeScanHost = 'warning'
                        e.target.checked = false
                        return
                    }
                    if (response.status === 406) {
                        this.errorMessageScanHost = `The input is invalid, retry using a fully qualified domain name`
                        this.errorMessageTypeScanHost = 'warning'
                        e.target.checked = false
                        return
                    }
                    if (response.status !== 200) {
                        this.errorMessageScanHost = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageTypeScanHost = 'error'
                        e.target.checked = false
                        return
                    }
                    this.errorMessageScanHost = `Monitoring host.`
                    this.errorMessageTypeScanHost = 'success'
                    this.host.monitoring_enabled = true
                } else {
                    const response = await Api.get(
                        `/scanner/deactivate/${hostname}`
                    )
                    this.loading = false
                    if (response.status === 204) {
                        this.errorMessageScanHost = `No changes`
                        this.errorMessageTypeScanHost = 'success'
                        return
                    }
                    if (response.status === 402) {
                        this.errorMessageScanHost = `Quota has been exhausted, to continue using on-demand scanning you can upgrade the subscription now`
                        this.errorMessageTypeScanHost = 'warning'
                        e.target.checked = true
                        return
                    }
                    if (response.status === 406) {
                        this.errorMessageScanHost = `The input is invalid, retry using a fully qualified domain name`
                        this.errorMessageTypeScanHost = 'warning'
                        e.target.checked = true
                        return
                    }
                    if (response.status !== 200) {
                        this.errorMessageScanHost = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageTypeScanHost = 'error'
                        e.target.checked = true
                        return
                    }
                    this.errorMessageScanHost = `No longer monitoring host.`
                    this.errorMessageTypeScanHost = 'success'
                    this.host.monitoring_enabled = false
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
        }
    },
    computed: {
        lastUpdated() {
            return moment.utc(this.host.last_updated).fromNow()
        }
    }
}
</script>
<style scoped lang="scss">
.select {
    border-radius: radius('lg');
    border: none;
    background: color('primary-80');
    color: color('dark');
    padding: 0 spacers('xxs');
    width: max-content;
    max-width: 110px;
}

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
            content: '\2713';
            color: color('dark');
            line-height: 15px;
            font-size: 10px;
        }
    }
}
.scan-host-btn {
    padding: 0 spacers('xs');
    border: 0;
    border-radius: 8px;
    color: color('dark');
    max-width: max-content;
    line-height: 1.5em;
    font-size: sizes('sm');
    font-weight: 500;
    transition: 0.5s;
    background-size: 200% auto;
    background-image: linear-gradient(
        144deg,
        color('primary') 0%,
        color('secondary') 51%,
        color('secondary') 100%
    );
    box-shadow: color('primary-20') 0 15px 30px -5px;
    box-sizing: border-box;
    user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    &:active,
    &:hover {
        outline: 0;
    }
    &:hover {
        background-position: right center;
    }
}
</style>
