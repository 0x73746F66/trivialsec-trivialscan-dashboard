<template>
    <main>
        <div class="container font-color-light margin-top-lg margin-bottom-xl">
            <div class="d-flex flex-column flex-lg-row margin-bottom-sm">
                <div class="d-inline-block w-100 position-relative">
                    <SearchForm />
                </div>
            </div>
            <LoadingComponent class="loading" v-if="loading" />
            <ValidationMessage
                v-if="errorMessage.length > 0"
                class="justify-content-start"
                :message="errorMessage"
                :type="errorMessageType"
            />
            <div
                class="certificate padding-bottom-sm"
                v-if="Object.keys(certificate).length > 0"
            >
                <Certificate v-bind="certificate" />
            </div>
            <h4 class="heading">Scanner Reports</h4>
            <div v-if="reports.length > 0">
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
                No matching scanner reports on your account
            </div>
        </div>
    </main>
</template>

<script setup>
import Certificate from '@/components/general/Certificate.vue'
import SearchForm from '@/components/forms/SearchForm.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import SummaryItem from '@/components/general/SummaryItem.vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        SearchForm,
        SummaryItem,
        ValidationMessage,
        LoadingComponent
    },
    data() {
        return {
            loading: false,
            errorMessage: '',
            errorMessageType: '',
            certificate: {},
            reports: []
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => {
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
        async fetchData() {
            this.loading = true
            try {
                const response = await Api.get(
                    `/certificate/${this.$route.params.sha1_fingerprint}`
                )
                if (response.status !== 200) {
                    this.errorMessage = `${response.status}: ${response.statusText}`
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.certificate = data.certificate
                this.reports = data.reports.map((summary) => {
                    summary.refId = this.shortReportId(summary.report_id)
                    summary.dateAgo = moment.utc(summary.date).fromNow()
                    return summary
                })
            } catch (error) {
                this.message =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.messageType = 'error'
            }
            this.loading = false
        }
    }
}
</script>

<style scoped lang="scss">
.report {
    margin: 0 auto;
}

@media (min-width: 1024px) {
    .report {
        min-height: 90vh;
        margin: 10vh 0 0 0;
        width: 100%;
        display: flex;
        align-items: center;
    }
}

div {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-text);
}
</style>
