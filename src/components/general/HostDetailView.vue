<template>
    <div class="font-color-light" v-if="Object.keys(host).length > 0">
        <LoadingComponent class="loading" v-if="loading" />
        <ValidationMessage
            v-if="errorMessage?.length > 0"
            class="justify-content-start"
            :message="errorMessage"
            :type="errorMessageType"
        />
        <div class="d-flex flex-column flex-lg-row justify-content-between">
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
                                    v-for="(version, versionIndex) in versions"
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
                                                    version.value !== 'latest'
                                                "
                                            >
                                                {{ version.ip }} on
                                                {{ version.port }} at
                                                {{ version.label }}</span
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
                                                    version.value !== 'latest'
                                                "
                                            >
                                                {{ version.ip }} on
                                                {{ version.port }} at
                                                {{ version.label }}</span
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
                    @change="hostToggleChange($event, host.transport?.hostname)"
                />
                <span class="font-sm-b margin-left-xs">Monitoring</span>
                <CustomPill
                    class="margin-left-xs"
                    :label="
                        host.monitoring_enabled === true ? 'Active' : 'Inactive'
                    "
                    :type="
                        host.monitoring_enabled === true ? 'success' : 'danger'
                    "
                />
            </div>
        </div>
        <div class="row margin-bottom-xxs">
            <div class="col-lg-9 col-12 margin-bottom-xs">
                <h3 class="font-color-secondary font-base-sb margin-top-sm">
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
                            v-for="(offered, offeredIndex) in host.tls?.protocol
                                ?.offered"
                            :key="offeredIndex"
                        >
                            {{ offered }}
                        </span>
                    </div>
                </div>
                <div v-if="host.tls?.client.expected_client_subjects.length">
                    <span
                        class="font-color-base"
                        v-for="(subject, subjectIndex) in host.tls?.client
                            ?.expected_client_subjects"
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
                        :title="`${host.tls?.cipher.offered_rfc?.join('\n')}`"
                    >
                        ({{ host.tls?.cipher.offered_rfc?.length }} offered)
                    </span>
                </h3>
                <p class="margin-bottom-xs">
                    <span class="font-sm-sb margin-right-xxs">Negotiated:</span>
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
                        <IconTarget class="target-icon" color="1abb9c" /><span
                            class="margin-left-xxs hover-help"
                            title="See domain details"
                            >{{ domain_name }}</span
                        >
                    </RouterLink>
                </span>
                <h3 class="font-color-secondary font-base-sb margin-top-sm">
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
                <h3 class="font-color-secondary font-base-sb margin-top-sm">
                    <IconInfo class="target-icon" color="e2c878" />
                    Certificate Fingerprints
                </h3>
                <span
                    v-for="(sha1_fingerprint, certIndex) in uniqueCertificates(
                        host.tls?.certificates
                    )"
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
                <h3 class="font-color-light font-sm-sb">OSINT Pivots</h3>
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
</template>
<script setup>
import moment from 'moment'
import IconTarget from '@/components/icons/IconTarget.vue'
import IconInfo from '@/components/icons/IconInfo.vue'
import IconLink from '@/components/icons/IconLink.vue'
import IconCertificate from '@/components/icons/IconCertificate.vue'
import Toggle from '@/components/general/Toggle.vue'
import CustomPill from '@/components/general/CustomPill.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
</script>

<script>
export default {
    components: {
        IconTarget,
        IconInfo,
        IconLink,
        IconCertificate,
        Toggle,
        CustomPill,
        ValidationMessage,
        LoadingComponent
    },
    props: ['host', 'external_refs', 'versions', 'related_domains', 'params'],
    data() {
        return {
            loading: false,
            errorMessage: '',
            errorMessageType: ''
        }
    },
    methods: {
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
                        this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageType = 'error'
                        e.target.checked = false
                        return
                    }
                    this.errorMessage = `Monitoring host.`
                    this.errorMessageType = 'success'
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
                        this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageType = 'error'
                        e.target.checked = true
                        return
                    }
                    this.errorMessage = `No longer monitoring host.`
                    this.errorMessageType = 'success'
                    this.host.monitoring_enabled = false
                }
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
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
</style>
