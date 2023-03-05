<template>
    <main>
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
                <h2 class="font-xl-sb margin-bottom-md">Early Warning Service</h2>
                <div
                    class="slide-target-item margin-bottom-sm"
                    v-for="(alert, i) in alerts"
                    :key="i"
                >
                    <pre class="font-color-light">
                        {{ alert }}
                    </pre>
                </div>
                <pre class="font-color-light">
                        {{ alerts }}
                </pre>

            </div>
        </div>
    </main>
</template>

<script setup>
import SearchForm from '@/components/forms/SearchForm.vue'
import DashboardMenu from '@/components/layout/DashboardMenu.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        SearchForm,
        DashboardMenu,
        ValidationMessage,
        LoadingComponent
    },
    data() {
        return {
            loading: false,
            errorMessage: '',
            errorMessageType: '',
            alerts: []
        }
    },
    mounted() {
        this.fetchAlerts()
    },
    methods: {
        async fetchAlerts() {
            this.loading = true
            try {
                const response = await Api.get('/early-warning-service/alerts', {
                    timeout: 30000
                })
                if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                for (const alert of data) {
                    alert.timeAgo = moment.utc(alert.feed_date).fromNow()
                }
                this.alerts = data
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
