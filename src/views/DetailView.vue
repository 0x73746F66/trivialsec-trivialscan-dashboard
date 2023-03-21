<template>
    <main>
        <div class="container padding-top-xl">
            <ValidationMessage
                :message="message"
                :type="messageType"
                class="justify-content-start"
            />
        </div>
        <div
            class="report margin-bottom-xl font-color-light"
            v-if="report?.targets.length > 0"
        >
            <ReportDetail v-bind="report" />
            <div class="container">
                <div class="row">
                    <InlineLoading class="margin-top-lg" :loading="loading" />
                    <EvaluationItems
                        v-if="report.evaluations"
                        :evaluations="report.evaluations"
                        :results="report.results"
                        :resultsFilter="resultsFilter"
                        :reportDate="moment.utc(report.date).format('YYYYMMDD')"
                    />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import ReportDetail from '@/components/ReportDetail.vue'
import EvaluationItems from '@/components/EvaluationItems.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import InlineLoading from '@/components/general/InlineLoading.vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        ReportDetail,
        EvaluationItems,
        ValidationMessage,
        LoadingComponent
    },
    data() {
        return {
            report: {},
            resultsFilter: {
                pass: false,
                fail: true,
                warn: true,
                info: false,
                tls_negotiation: true,
                certificate: true,
                compliance: true,
                transport: true
            },
            loading: false,
            message: '',
            messageType: ''
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => {
                try {
                    this.report = JSON.parse(
                        localStorage.getItem(
                            `/summary/${this.$route.params.report_id}`
                        )
                    )
                    localStorage.removeItem(
                        `/summary/${this.$route.params.report_id}`
                    )
                } catch (error) {
                    this.message = error.toString()
                    this.messageType = 'error'
                }
                this.fetchData()
            },
            { immediate: true }
        )
    },
    methods: {
        async fetchData() {
            this.loading = true
            try {
                const response = await Api.get(
                    `/report/${this.$route.params.report_id}`,
                    { timeout: 60000 }
                )
                if (response.status === 204) {
                    this.message = 'No reports available'
                    this.messageType = 'warning'
                    this.loading = false
                    return
                } else if (response.status !== 200) {
                    this.message = "An error occurred: Page couldn't be loaded"
                    this.messageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                data.evaluations = data.evaluations.map((item) => {
                    item.severity = item.result_level
                    if (item.result_level === 'fail') {
                        item.severity = 'high'
                    } else if (item.result_level === 'warn') {
                        item.severity = 'medium'
                    }
                    return item
                }).sort((a, b) => {
                    const aRule = `${a.group_id
                        .toString()
                        .padStart(3, '0')}.${a.rule_id
                        .toString()
                        .padStart(4, '0')}`
                    const bRule = `${b.group_id
                        .toString()
                        .padStart(3, '0')}.${b.rule_id
                        .toString()
                        .padStart(4, '0')}`
                    return aRule.localeCompare(bRule)
                })
                this.report = data
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
            }
            this.loading = false
        }
    }
}
</script>

<style scoped lang="scss">
.inline-loading {
    height: 50vh;
}
</style>
