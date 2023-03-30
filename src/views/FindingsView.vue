<template>
    <main>
        <LoadingComponent class="loading" :class="{ inactive: !loading }" />
        <div
            class="container font-color-light padding-top-lg padding-bottom-xl"
        >
            <div class="d-flex flex-column flex-lg-row margin-bottom-sm">
                <div class="d-inline-block w-100 position-relative">
                    <SearchForm />
                </div>
                <DashboardMenu />
            </div>

            <div class="w-100 margin-bottom-md">
                <div class="d-flex flex-column margin-bottom-md">
                    <h2 class="font-xl-sb">Vulnerabilities & Exposures</h2>
                    <span class="font-sm font-color-primary"
                        >Security is hard, that's why this list is prioritising
                        quick wins; Issues that have an easy fix but pose real
                        and trivial to exploit risk if left in the current
                        state</span
                    >
                </div>
                <ValidationMessage
                    v-if="errorMessage.length > 0"
                    class="justify-content-start"
                    :message="errorMessage"
                    :type="errorMessageType"
                />
                <div
                    class="d-flex flex-row align-items-center justify-content-center"
                >
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <template
                                    v-for="(finding, index) in issues"
                                    :key="index"
                                >
                                    <Dropdown
                                        class="margin-bottom-xs"
                                        :id="`headingFinding${index}`"
                                        :target="`collapseFinding${index}`"
                                        parent="accordion"
                                        :defaultShow="false"
                                        :defaultCollapsed="true"
                                        buttonClasses="font-lg text-left bg-dark-20 padding-xs report-dropdown border-radius-sm font-color-light w-100 d-flex justify-content-left"
                                        contentClasses="bg-dark-20 border-radius-sm padding-sm font-color-light font-base"
                                    >
                                        <template v-slot:header class="w-100">
                                            <div class="d-flex">
                                                <ThreatIcon
                                                    :severity="finding.severity"
                                                />
                                                <div class="d-flex flex-column">
                                                    <div
                                                        class="d-flex align-items-center"
                                                    >
                                                        <span
                                                            class="margin-right-xxs font-sm-b font-color-secondary"
                                                        >
                                                            {{
                                                                finding.group_id
                                                            }}.{{
                                                                finding.rule_id
                                                            }}
                                                        </span>
                                                        <span
                                                            class="font-color-lighter font-sm-sb"
                                                        >
                                                            {{ finding.name }}
                                                        </span>
                                                    </div>
                                                    <div
                                                        class="d-flex align-items-center"
                                                    >
                                                        <span
                                                            class="margin-right-xxs font-sm-sb"
                                                            >Discovered</span
                                                        >
                                                        <time
                                                            class="hover-help font-sm-sb"
                                                            :title="
                                                                finding.observed_at
                                                            "
                                                            :datetime="
                                                                finding.observed_at
                                                            "
                                                        >
                                                            {{
                                                                finding.observed
                                                            }}
                                                        </time>
                                                    </div>
                                                    <div
                                                        class="d-flex align-items-center"
                                                    >
                                                        <span
                                                            class="margin-right-xxs font-sm-sb"
                                                            >Occurrences</span
                                                        >
                                                        <span
                                                            class="font-color-secondary font-sm-b"
                                                            >{{
                                                                finding
                                                                    .occurrences
                                                                    .length
                                                            }}</span
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-slot:content>
                                            <div class="row padding-right-sm">
                                                <div
                                                    class="col-12 col-lg-6 padding-top-sm"
                                                >
                                                    <div
                                                        v-html="
                                                            finding.description
                                                        "
                                                    ></div>
                                                    <div v-if="finding.cvss2">
                                                        <span
                                                            class="font-base-sb margin-right-xxs"
                                                            >CVSSv2:</span
                                                        >
                                                        <a
                                                            class="font-color-secondary"
                                                            target="_blank"
                                                            :href="`https://nvd.nist.gov/vuln-metrics/cvss/v2-calculator?vector=(${finding.cvss2})`"
                                                        >
                                                            {{ finding.cvss2 }}
                                                        </a>
                                                    </div>
                                                    <div v-if="finding.cvss2">
                                                        <span
                                                            class="font-base-sb margin-right-xxs"
                                                            >CVSSv3:</span
                                                        >
                                                        <a
                                                            v-if="finding.cvss3"
                                                            class="font-color-secondary"
                                                            target="_blank"
                                                            :href="`https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?version=3.1&vector=${finding.cvss3}`"
                                                        >
                                                            {{ finding.cvss3 }}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-lg-6">
                                                    <div
                                                        v-for="(
                                                            occurrence, oIndex
                                                        ) in finding.occurrences"
                                                        :key="oIndex"
                                                        class="d-flex flex-column bg-dark-40 border-radius-sm padding-sm margin-bottom-xs"
                                                    >
                                                        <RouterLink
                                                            :to="{
                                                                name: 'hostname',
                                                                params: {
                                                                    hostname:
                                                                        occurrence.hostname
                                                                }
                                                            }"
                                                            class="text-decoration-none"
                                                        >
                                                            <IconTarget
                                                                class="link-icon margin-right-xxs"
                                                                color="e2c878"
                                                            />
                                                            <span
                                                                class="font-color-secondary"
                                                            >
                                                                {{
                                                                    occurrence.hostname
                                                                }}:{{
                                                                    occurrence.port
                                                                }}
                                                            </span>
                                                        </RouterLink>
                                                        <RouterLink
                                                            :to="{
                                                                name: 'certificate',
                                                                params: {
                                                                    sha1_fingerprint:
                                                                        occurrence.certificate_sha1
                                                                }
                                                            }"
                                                            class="text-decoration-none"
                                                            v-if="
                                                                occurrence.certificate_sha1
                                                            "
                                                        >
                                                            <IconCertificate
                                                                class="link-icon margin-right-xxs"
                                                                color="e2c878"
                                                            />
                                                            <span
                                                                class="font-color-secondary"
                                                            >
                                                                {{
                                                                    occurrence.certificate_subject
                                                                }}
                                                            </span>
                                                        </RouterLink>
                                                        <div
                                                            class="margin-top-xs"
                                                        >
                                                            <span
                                                                class="font-base-sb margin-right-xxs"
                                                                >Status:</span
                                                            >
                                                            <span
                                                                class="font-base"
                                                            >
                                                                <select
                                                                    id="status"
                                                                    class="font-sm"
                                                                    @change="
                                                                        changeStatus(
                                                                            $event,
                                                                            occurrence.hostname,
                                                                            finding.finding_id
                                                                        )
                                                                    "
                                                                >
                                                                    <option
                                                                        :selected="
                                                                            occurrence.status ===
                                                                            'triaged'
                                                                        "
                                                                        value="triaged"
                                                                    >
                                                                        Triaged
                                                                    </option>
                                                                    <option
                                                                        :selected="
                                                                            occurrence.status ===
                                                                            'discovered'
                                                                        "
                                                                        value="discovered"
                                                                    >
                                                                        Discovered
                                                                    </option>
                                                                    <option
                                                                        :selected="
                                                                            occurrence.status ===
                                                                            'wont_fix'
                                                                        "
                                                                        value="wont_fix"
                                                                    >
                                                                        Closed
                                                                    </option>
                                                                    <option
                                                                        :selected="
                                                                            occurrence.status ===
                                                                            'deferred'
                                                                        "
                                                                        value="deferred"
                                                                    >
                                                                        Deferred
                                                                    </option>
                                                                    <option
                                                                        :selected="
                                                                            occurrence.status ===
                                                                            'remediated'
                                                                        "
                                                                        value="remediated"
                                                                    >
                                                                        Remediated
                                                                    </option>
                                                                    <option
                                                                        :selected="
                                                                            occurrence.status ===
                                                                            'regression'
                                                                        "
                                                                        value="regression"
                                                                    >
                                                                        Regression
                                                                    </option>
                                                                </select>
                                                            </span>
                                                        </div>
                                                        <div
                                                            class="margin-top-xs"
                                                            v-if="
                                                                occurrence.status ===
                                                                'deferred'
                                                            "
                                                        >
                                                            <span
                                                                class="font-base-sb margin-right-xxs"
                                                                >Deferred
                                                                to:</span
                                                            >
                                                            <span
                                                                class="font-base"
                                                            >
                                                                <input
                                                                    type="date"
                                                                    :value="
                                                                        occurrence.deferred_to
                                                                    "
                                                                    placeholder="Date to reassess the finding"
                                                                />
                                                            </span>
                                                        </div>
                                                        <div
                                                            v-for="(
                                                                report_id,
                                                                rIndex
                                                            ) in occurrence.report_ids"
                                                            :key="rIndex"
                                                            class="margin-top-xs"
                                                        >
                                                            <RouterLink
                                                                :to="{
                                                                    name: 'detail',
                                                                    params: {
                                                                        report_id
                                                                    }
                                                                }"
                                                                class="text-decoration-none font-base-sb font-color-primary"
                                                            >
                                                                Report
                                                                {{ rIndex + 1 }}
                                                                <IconArrowPrimary
                                                                    color="1abb9c"
                                                                    class=""
                                                                />
                                                            </RouterLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </Dropdown>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import SearchForm from '@/components/forms/SearchForm.vue'
import DashboardMenu from '@/components/layout/DashboardMenu.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import IconCertificate from '@/components/icons/IconCertificate.vue'
import IconTarget from '@/components/icons/IconTarget.vue'
import IconArrowPrimary from '@/components/icons/IconArrowPrimary.vue'
import ThreatIcon from '@/components/icons/ThreatIcon.vue'
import Dropdown from '@/components/general/Dropdown.vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        SearchForm,
        DashboardMenu,
        ValidationMessage,
        LoadingComponent,
        IconCertificate,
        ThreatIcon,
        IconArrowPrimary,
        IconTarget,
        Dropdown
    },
    data() {
        return {
            loading: false,
            limit: 50,
            errorMessage: '',
            errorMessageType: '',
            issues: []
        }
    },
    mounted() {
        this.fetchFindings()
    },
    methods: {
        async fetchFindings() {
            this.loading = true
            try {
                const response = await Api.get(
                    `/findings/latest?limit=${this.limit}`
                )
                this.loading = false
                if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    return
                }
                const data = await response.json()
                // filter observations by status and mark the severity
                this.issues = data.map((item) => {
                    if (
                        item.occurrences.filter(
                            (item) => item.status === 'deferred'
                        ).length > 0
                    ) {
                        item.severity = 'info'
                    } else if (
                        item.occurrences.filter(
                            (item) =>
                                item.status === 'regression' ||
                                item.status === 'discovered'
                        ).length > 0
                    ) {
                        item.severity = 'high'
                    } else {
                        console.log(item)
                        item.severity = 'medium'
                    }
                    item.observed = moment.utc(item.observed_at).fromNow()
                    return item
                })
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}`
                this.errorMessageType = 'error'
            }
            this.loading = false
        },
        async changeStatus(event, hostname, finding_id) {
            const status = event.target.value
            this.loading = true
            try {
                const response = await Api.post(`/finding/status`, {
                    hostname,
                    finding_id,
                    status
                })
                this.loading = false
                if (response.status === 204) {
                    this.errorMessage = `Status not changed`
                    this.errorMessageType = 'warning'
                    return
                }
                if (response.status !== 202) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    return
                }
                this.errorMessage = `Status updated`
                this.errorMessageType = 'success'
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}`
                this.errorMessageType = 'error'
            }
            this.loading = false
            for (const finding of this.issues) {
                if (finding_id === finding.finding_id) {
                    for (const occurrence of finding.occurrences) {
                        if (hostname === occurrence.hostname) {
                            occurrence.status = status
                        }
                    }
                }
            }
        }
    },
    computed: {
        results() {
            return {
                pass: this.issues.filter((item) => item.result_level === 'pass')
                    .length,
                fail: this.issues.filter((item) => item.result_level === 'fail')
                    .length,
                warn: this.issues.filter((item) => item.result_level === 'warn')
                    .length,
                info: this.issues.filter((item) => item.result_level === 'info')
                    .length
            }
        }
    }
}
</script>
<style scoped>
.link-icon {
    height: 20px;
    width: 20px;
}
</style>
