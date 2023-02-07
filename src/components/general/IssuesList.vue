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
                <EvaluationItems
                    :evaluations="issues"
                    :results="results"
                    :resultsFilter="resultsFilter"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import EvaluationItems from '@/components/EvaluationItems.vue'
import moment from 'moment'
</script>
<script>
export default {
    components: {
        ValidationMessage,
        LoadingComponent,
        EvaluationItems
    },
    data() {
        return {
            loading: false,
            limit: 50,
            errorMessage: '',
            errorMessageType: '',
            issues: [],
            resultsFilter: {
                pass: false,
                fail: true,
                warn: false,
                info: false
            }
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
                this.issues = data.map((item) => {
                    if (item.result_level === 'fail') {
                        item.severity = 'high'
                    } else if (item.result_level === 'warn') {
                        item.severity = 'medium'
                    } else if (item.result_level === 'info') {
                        item.severity = 'low'
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
