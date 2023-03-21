<template>
    <div class="d-flex flex-row align-items-center justify-content-center">
            <LoadingComponent class="loading" :class="{ inactive: !loading }" />
            <div v-if="errorMessage.length > 0" class="d-flex flex-column w-100">
                <ValidationMessage
                    class="justify-content-start"
                    :message="errorMessage"
                    :type="errorMessageType"
                />
                <span
                    class="font-xl font-color-light-80 text-center w-100 bg-dark-40 border-radius-sm d-block"
                    >No data to display</span
                >
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-12 margin-top-sm">
                        <template
                            v-for="(finding, index) in issues"
                            :key="index"
                        >
                            <div class="font-base d-flex flex-column justify-content-between font-color-primary w-100 align-items-start margin-top-xxs">
                                <div class="d-flex w-100 bg-dark-20 padding-sm font-color-light font-base border-radius-sm">
                                    <ThreatIcon :severity="finding.severity" />
                                    <div class="d-flex flex-column">
                                        <div class="d-flex align-items-center">
                                            <span
                                                class="margin-right-xxs font-sm-b font-color-secondary"
                                            >
                                                {{ finding.group_id }}.{{finding.rule_id}}
                                            </span>
                                            <span
                                                class="font-color-lighter font-xs-sb"
                                            >
                                                {{ finding.name }}
                                            </span>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <span
                                                class="margin-right-xxs font-sm-sb"
                                                >Discovered</span
                                            >
                                            <time
                                                class="hover-help font-sm-sb"
                                                :title="finding.observed_at"
                                                :datetime="finding.observed_at"
                                            >
                                                {{ finding.observed }}
                                            </time>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <span
                                                class="margin-right-xxs font-sm-sb"
                                                >Occurrences</span
                                            >
                                            <span
                                                class="font-color-secondary font-sm-b"
                                                >{{ finding.occurrences.length }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import ThreatIcon from '@/components/icons/ThreatIcon.vue'
import moment from 'moment'
</script>
<script>
export default {
    components: {
        ValidationMessage,
        LoadingComponent,
        ThreatIcon,
    },
    data() {
        return {
            loading: false,
            limit: 50,
            errorMessage: '',
            errorMessageType: '',
            issues: [],
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
                if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                // filter observations by status and mark the severity
                this.issues = data.map((item) => {
                    if (item.occurrences.filter(item => item.status === "deferred").length > 0) {
                        item.severity = 'info'
                    } else if (item.occurrences.filter(item => item.status === "regression" || item.status === "discovered").length > 0) {
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
