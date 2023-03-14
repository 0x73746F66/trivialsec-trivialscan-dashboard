<template>
    <LoadingComponent
        class="loading"
        :class="{ inactive: !loading }"
        :active="loading"
    />

    <div class="d-flex position-relative">
        <select
            name="searchOptions"
            id="search-options"
            class="search-select font-sm"
            :class="{
                'search-select-active': searchActive,
                'search-select-active-cornered':
                    searchResults.findings.length > 0 ||
                    searchResults.hosts.length > 0 ||
                    searchResults.reports.length > 0
            }"
            v-model="searchType"
        >
            <option value="host">Domain</option>
            <option value="ip">IP Address</option>
            <!-- <option value="certificatesha1">Certificate sha1</option> -->
            <!-- <option value="certificatecommonname">Certificate Common Name</option> -->
            <!-- <option value="any">Any</option> -->
        </select>
        <input
            type="text"
            name="Search"
            class="search-bar"
            :class="{
                'search-bar-active': searchActive,
                'search-bar-active-cornered':
                    searchResults.findings.length > 0 ||
                    searchResults.hosts.length > 0 ||
                    searchResults.reports.length > 0
            }"
            id="search-bar"
            v-model="searchInput"
            @keydown.enter="submitSearch()"
            placeholder="Enter a search term to start a scan"
        />
        <div
            class="button-container"
            :class="{ 'position-absolute': searchActive }"
        >
            <button class="search-btn search-btn-main" @click="submitSearch()">
                <IconArrowPrimary
                    color="F0F0F0"
                    class="search-btn-icon"
                    v-if="searchActive"
                />
                <IconSearch color="F0F0F0" class="search-btn-icon" v-else />
            </button>
            <button
                class="search-btn search-btn-close"
                :class="{ 'search-btn-close-hidden': !searchActive }"
                @click="closeSearchBtn()"
            >
                <IconClose color="F0F0F0" class="search-btn-icon" />
            </button>
        </div>
    </div>
    <ValidationMessage :message="errorMessage" :type="errorMessageType" />
    <div
        class="search-input-results"
        v-if="
            (searchResults.findings.length > 0 ||
                searchResults.hosts.length > 0 ||
                searchResults.reports.length > 0) &&
            searchActive
        "
    >
        <!-- <div class="findings-results" v-if="searchResults.findings.length > 0">
            <div class="d-flex flex-row margin-bottom-sm justify-content-between padding-bottom-sm search-input-results-header border-bottom-light-20">
                <p class="font-base font-color-danger mb-0">
                    <IconError color="f45e5e" class="search-result-item-icon" />
                    Findings
                </p>
                <p class="font-sm font-color-light-40 mb-0">{{searchResults.findings.length}} result(s)</p>
            </div>
            <div class="d-flex flex-wrap flex-row">
                <div class="search-result-item">
                </div>
                <div class="search-result-item">
                </div>
                <div class="search-result-item">
                </div>
            </div>
        </div> -->
        <!-- <div class="certificates-results">
            <div class="d-flex flex-row margin-bottom-sm justify-content-between padding-bottom-sm search-input-results-header border-bottom-light-20">
                <p class="font-base font-color-secondary mb-0">
                    <IconCertificate color="e2c878" class="search-result-item-icon" />
                    Certificates
                </p>
                <p class="font-sm font-color-light-40 mb-0">1 result</p>
            </div>
            <div class="d-flex flex-wrap flex-row">
                <div class="search-result-item">
                    <span>Certificate result </span>
                </div>
            </div>
        </div> -->
        <div class="host-results" v-if="searchResults.hosts.length > 0">
            <div
                class="d-flex flex-row margin-bottom-sm justify-content-between padding-bottom-sm search-input-results-header border-bottom-light-20"
            >
                <p class="font-base font-color-primary mb-0">
                    <IconGlobeLight
                        color="1abb9c"
                        class="search-result-item-icon"
                    />
                    Hosts
                </p>
                <p class="font-sm font-color-light-40 mb-0">
                    {{ searchResults.hosts.length }} result<span
                        v-if="searchResults.hosts.length > 1"
                        >s</span
                    >
                </p>
            </div>
            <div class="d-flex flex-wrap flex-row w-100">
                <ValidationMessage
                    :message="errorMessageScanHost"
                    :type="errorMessageTypeScanHost"
                />
                <div
                    class="search-result-item w-100 margin-bottom-sm p-2"
                    v-for="(result, index) in searchResults.hosts"
                    :key="index"
                >
                    <span
                        class="d-flex justify-content-between align-items-start margin-bottom-sm"
                    >
                        <span class="d-flex align-items-start">
                            <Toggle
                                :defaultChecked="result.monitoring"
                                @change="
                                    hostToggleChange($event, result.hostname)
                                "
                                class="margin-right-xxs"
                            />
                            <div class="d-flex flex-column">
                                <span class="font-sm font-color-secondary">{{
                                    result.hostname
                                }}</span>
                                <span
                                    class="font-xs font-color-light"
                                    v-if="result.last_scanned_ago"
                                    >Last scanned
                                    {{ result.last_scanned_ago }}</span
                                >
                                <span
                                    class="font-xs font-color-light"
                                    v-if="result.queue_status"
                                    >{{ result.queue_status }}
                                    {{ result.queued_timestamp_ago }}</span
                                >
                                <div
                                    class="d-flex flex-column"
                                    :class="[
                                        {
                                            'ip-addr-res-container-div':
                                                result.ip_addr.length +
                                                    result.resolved_ip.length >
                                                3
                                        }
                                    ]"
                                    :id="`ip-addr-res-${index}`"
                                >
                                    <span
                                        class="font-xxs font-color-light-60 ip-addr-res"
                                        v-for="(
                                            ip_addr, index
                                        ) in result.ip_addr"
                                        :key="index"
                                    >
                                        {{ ip_addr }}
                                    </span>
                                    <span
                                        class="font-xxs font-color-light-60 ip-addr-res"
                                        v-for="(
                                            ip_addr, index
                                        ) in result.resolved_ip"
                                        :key="index"
                                    >
                                        {{ ip_addr }}
                                    </span>
                                </div>
                                <button
                                    @click="
                                        expandIPAddress(
                                            $event,
                                            `ip-addr-res-${index}`
                                        )
                                    "
                                    class="font-xs bg-none border-0 p-0 d-flex justify-content-start font-color-secondary"
                                    v-if="
                                        result.ip_addr.length +
                                            result.resolved_ip.length >
                                        3
                                    "
                                >
                                    ...
                                </button>
                                <div class="reports max-w-90">
                                    <div
                                        class="d-flex border-bottom-light-60 justify-content-start mt-2 w-100"
                                    >
                                        <span class="font-xxs font-color-light"
                                            >{{
                                                result.reports.length
                                            }}
                                            Report(s):</span
                                        >
                                    </div>
                                    <a
                                        v-for="(
                                            report, index
                                        ) in result.reports"
                                        :key="index"
                                        :href="`/result/${report}`"
                                        class="font-xs font-color-light-60 nowrap"
                                    >
                                        {{ index + 1 }}. Report
                                        <IconArrowPrimary
                                            v-if="
                                                index + 1 <
                                                result.reports.length
                                            "
                                            color="f0f0f099"
                                            style="width: 20px; height: 20px"
                                        />
                                    </a>
                                </div>
                            </div>
                        </span>
                        <div class="d-flex flex-row">
                            <button
                                @click="scanHost(result.hostname)"
                                class="search-result-item-btn search-result-item-btn-scan border-radius-lg margin-right-xxs"
                            >
                                Scan now
                            </button>
                            <RouterLink
                                v-if="result.scanned"
                                :to="`/hostname/${result.hostname}/`"
                                class="search-result-item-link border-radius-lg margin-right-xxs"
                            >
                                Details
                            </RouterLink>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <!-- <div class="reports-results"  v-if="searchResults.reports.length > 0">
            <div class="d-flex flex-row margin-bottom-sm justify-content-between padding-bottom-sm search-input-results-header border-bottom-light-20">
                <p class="font-base font-color-light-60 mb-0">
                    <IconDocumentation color="939292" class="search-result-item-icon" />
                    Reports
                </p>
                <p class="font-sm font-color-light-40 mb-0">{{searchResults.reports.length}} results</p>
            </div>
            <div class="d-flex flex-wrap flex-row w-100">
                <div
                    class="search-result-item w-100 margin-bottom-sm"
                    v-for="(report, index) in searchResults.reports"
                    :key="index"
                >
                    <span class="d-flex justify-content-between align-items-center">
                        <a :href="`/result/${report}`" class="d-flex font-color-light text-decoration-none">
                            Report {{index+1}}
                        </a>
                        <div class="d-flex flex-row">
                            <button
                                class="search-result-item-btn search-result-item-btn-delete border-radius-lg margin-right-xxs"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteReport"
                                @click="selectReportToDelete(report)"
                            >
                                Delete
                            </button>
                        </div>
                    </span>
                </div>
            </div>
        </div> -->
    </div>
    <div
        class="modal fade"
        id="deleteReport"
        tabindex="-1"
        aria-labelledby="deleteReportLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content padding-sm">
                <div class="d-flex">
                    <h5 class="modal-title font-base" id="deleteReportLabel">
                        Are you sure you want to delete this report? This action
                        is permanent
                    </h5>
                    <button
                        type="button"
                        class="btn-close d-flex align-items-center justify-content-center font-color-light"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        <IconClose class="modal-icon-close" color="f0f0f0" />
                    </button>
                </div>
                <div class="d-flex justify-content-end">
                    <button
                        type="button"
                        class="btn delete-report-btn font-color-dark"
                        @click="deleteReport()"
                    >
                        Delete Report
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import IconArrowPrimary from '@/components/icons/IconArrowPrimary.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconError from '@/components/icons/IconError.vue'
import IconCertificate from '@/components/icons/IconCertificate.vue'
import IconDocumentation from '@/components/icons/IconDocumentation.vue'
import IconGlobeLight from '@/components/icons/IconGlobeLight.vue'
import Toggle from '@/components/general/Toggle.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        IconSearch,
        IconArrowPrimary,
        IconClose,
        IconError,
        IconCertificate,
        IconGlobeLight,
        IconDocumentation,
        Toggle,
        ValidationMessage,
        LoadingComponent
    },
    data() {
        return {
            loading: false,
            searchActive:
                localStorage.getItem('/component/search/visibility') === 'false'
                    ? false
                    : true,
            searchInput: '',
            searchType: 'host',
            searchResults: {
                hosts: [],
                findings: [],
                reports: []
            },
            reportToDelete: '',
            errorMessage: '',
            errorMessageType: '',
            errorMessageScanHost: '',
            errorMessageTypeScanHost: ''
        }
    },
    methods: {
        clearSearchInput() {
            this.searchInput = ''
            this.errorMessage = ''
            this.errorMessageType = ''
            this.errorMessageScanHost = ''
            this.errorMessageTypeScanHost = ''
        },
        async submitSearch() {
            this.errorMessage = ''
            this.errorMessageScanHost = ''
            this.searchResults.hosts = []
            this.searchResults.findings = []
            this.searchResults.reports = []

            if (this.searchInput.length > 0) {
                this.searchInput = this.searchInput.toLowerCase()
                if (this.searchInput.includes('://')) {
                    this.searchInput = this.searchInput.split('://')[1]
                }
                if (this.searchInput.includes('/')) {
                    this.searchInput = this.searchInput.split('/')[0]
                }
                this.loading = true
                try {
                    const response = await Api.get(
                        `/search/${this.searchType}/${this.searchInput}`
                    )
                    this.loading = false
                    if (response.status === 204) {
                        this.errorMessage = `Query did not produce a resolvable domain name or IP Address`
                        this.errorMessageType = 'warning'
                        return
                    }
                    if (response.status !== 200) {
                        this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't find what you're looking for`
                        this.errorMessageType = 'error'
                        return
                    }
                    const data = await response.json()
                    this.searchResults.hosts = data.map((item) => {
                        if (item.last_scanned) {
                            item.last_scanned_ago = moment
                                .utc(item.last_scanned)
                                .fromNow()
                        }
                        if (item.queued_timestamp) {
                            item.queued_timestamp_ago = moment
                                .utc(item.queued_timestamp)
                                .fromNow()
                        }
                        return item
                    })
                    const allReports = []
                    data.forEach((result) => allReports.push(result.reports))
                    this.searchResults.reports = allReports.flat(1)
                } catch (error) {
                    this.errorMessage =
                        error.name === 'AbortError'
                            ? 'Request timed out, please try refreshing the page.'
                            : `${error.name} ${error.message}. Couldn't complete search.`
                    this.errorMessageType = 'error'
                }
                this.loading = false
            } else {
                this.searchActive = true
                localStorage.setItem('/component/search/visibility', 'true')
            }
        },
        async scanHost(target) {
            this.loading = true
            try {
                const response = await Api.get(`/scanner/queue/${target}`)
                this.loading = false
                if (response.status === 402) {
                    this.errorMessageScanHost = `Quota has been exhausted, to continue using on-demand scanning you can upgrade the subscription now`
                    this.errorMessageTypeScanHost = 'warning'
                    return
                }
                if (response.status === 406) {
                    this.errorMessageScanHost = `The input is invalid, retry using a fully qualified domain name`
                    this.errorMessageTypeScanHost = 'error'
                    return
                }
                if (response.status !== 200) {
                    this.errorMessageScanHost = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                    this.errorMessageTypeScanHost = 'error'
                    return
                }
                this.errorMessageScanHost = `Host was added to on-demand scanning.`
                this.errorMessageTypeScanHost = 'success'
            } catch (error) {
                this.errorMessageScanHost =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageTypeScanHost = 'error'
            }
            this.loading = false
        },
        async hostToggleChange(e, target) {
            this.loading = true
            try {
                if (e.target.checked === true) {
                    const response = await Api.get(`/scanner/monitor/${target}`)
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
                } else {
                    const response = await Api.get(
                        `/scanner/deactivate/${target}`
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
                }
            } catch (error) {
                this.errorMessageScanHost =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageTypeScanHost = 'error'
            }
            this.loading = false
        },
        closeSearchBtn() {
            this.searchActive = false
            localStorage.setItem('/component/search/visibility', 'false')
            this.clearSearchInput()
        },
        expandIPAddress(e, target) {
            document
                .querySelector(`#${target}`)
                .classList.remove('ip-addr-res-container-div')
            e.target.classList.add('d-none')
        },
        selectReportToDelete(report) {
            this.reportToDelete = report
        },
        deleteReport() {
            if (import.meta.env.DEV) {
                console.log(this.reportToDelete)
            }
        }
    }
}
</script>
<style lang="scss">
$searchBarHeight: 50px;

.search {
    &-bar {
        border: none;
        height: $searchBarHeight;
        width: 0;
        opacity: 0;
        transition: 0.2s linear;

        background: color('dark-40');
        color: color('light');

        &-active {
            opacity: 1;
            width: 100%;
            padding: 0 spacers('lg');
            border-radius: 0 radius('lg') radius('lg') 0;

            @media (max-width: breakpoints('lg')) {
                // width: 200px;
            }

            &-cornered {
                border-radius: 0 30px 0 0;
            }
        }
    }
    &-select {
        border-radius: radius('lg') 0 0 radius('lg');
        border: none;
        background: color('dark-40');
        color: color('light');
        width: 0%;

        &-active {
            padding: 0 spacers('md');
            width: 25%;
            @media (max-width: breakpoints('lg')) {
                width: 50%;
            }
            &-cornered {
                border-radius: 30px 0 0 0;
            }
        }
    }
}
.search-input-results {
    color: color('light');
    background: color('dark-60');
    border-radius: 0 0 radius('lg') radius('lg');
    width: 100%;
    padding: spacers('lg');
    position: absolute;
    z-index: 99;
    backdrop-filter: blur(8px);

    @media (max-width: breakpoints('lg')) {
        // width: 200px;
    }
}
.search-result-item {
    margin-bottom: spacers('sm');
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: 0.2s linear;

    &:hover {
        background: color('light-20');
        color: color('light');
    }

    &-icon {
        width: 25px;
        height: 25px;
    }
    &-link {
        padding: 0 spacers('md');
        border: none;
        text-decoration: none;
        background: color('primary');
        color: color('dark');
        &:hover {
            color: color('dark');
        }
    }
    &-btn {
        min-width: max-content;
        border: none;
        color: color('dark');

        &-archive {
            background: color('secondary');
        }
        &-scan {
            background: color('primary');
        }
        &-delete {
            background: color('danger');
        }
    }
}
.button-container {
    position: relative;
    width: calc($searchBarHeight * 2 - 10px);
    right: 0;
}
.search-btn {
    border-radius: 50%;
    height: calc($searchBarHeight - 14px);
    width: calc($searchBarHeight - 14px);
    background: color('primary');
    border: none;
    transition: 0.2s linear;

    &-main {
        z-index: 2;
        display: flex;
        align-items: center;
        position: absolute;
        top: 7px;
    }

    &-close {
        background: color('dark-40');
        position: absolute;
        transition: 0.2s linear;
        top: 7px;
        left: calc($searchBarHeight - 7px);
        z-index: 1;

        &-hidden {
            left: 0;
            z-index: 1;
        }
    }

    &-icon {
        width: 25px;
        height: 25px;
    }
}
.delete-report-btn {
    background: color('danger');
    margin-left: auto;
    margin-right: 0;
    &:hover {
        background: color('danger');
        color: color('dark');
    }
}
.modal-icon-close {
    width: 25px;
    height: 25px;
}
.ip-addr-res {
    line-height: 15px;
    &-container-div {
        height: calc(45px);
        overflow: hidden;
    }
}
</style>
