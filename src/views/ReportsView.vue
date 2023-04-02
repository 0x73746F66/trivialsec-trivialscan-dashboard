<template>
    <main>
        <LoadingComponent class="loading" v-if="loading" />
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
                <div class="d-flex margin-bottom-md">
                    <div class="d-flex flex-column">
                        <h2 class="font-xl-sb">Report Summaries</h2>
                        <span class="font-sm font-color-primary"
                            >Trivial Scanner report uploads or Managed
                            Monitoring results are shown here.</span
                        >
                    </div>
                    <div
                        class="d-flex flex-right"
                        title="Scanner Configuration"
                    >
                        <RouterLink
                            to="/account/host-config"
                            class="configure-icon font-color-light text-decoration-none"
                        >
                            <IconConfigure
                                color="f0f0f0"
                                class="router-link-icon"
                            />
                        </RouterLink>
                    </div>
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
                    <div>
                        <button
                            class="swiper-button swiper-button-prev"
                        ></button>
                    </div>
                    <Swiper
                        class="w-100"
                        :modules="modules"
                        :slides-per-view="1"
                        :space-between="10"
                        :navigation="{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        }"
                        :pagination="{ clickable: true }"
                        :scrollbar="{ draggable: true }"
                        :breakpoints="{}"
                    >
                        <SwiperSlide
                            v-for="(items, index) in slicedSummaries"
                            :key="index"
                        >
                            <template
                                v-for="(summary, summaryIndex) in items"
                                :key="summaryIndex"
                            >
                                <SummaryItem
                                    v-if="summary?.targets.length > 0"
                                    :report="summary"
                                    @deleteReport="handleDeleteReport"
                                    v-model:loading="loading"
                                />
                            </template>
                        </SwiperSlide>
                    </Swiper>
                    <div>
                        <button
                            class="swiper-button swiper-button-next"
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import SearchForm from '@/components/forms/SearchForm.vue'
import DashboardMenu from '@/components/layout/DashboardMenu.vue'
import IconConfigure from '@/components/icons/IconConfigure.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import SummaryItem from '@/components/general/SummaryItem.vue'
import moment from 'moment'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
</script>

<script>
export default {
    components: {
        SearchForm,
        DashboardMenu,
        IconConfigure,
        Swiper,
        SwiperSlide,
        LoadingComponent,
        ValidationMessage,
        SummaryItem
    },
    data() {
        return {
            modules: [Navigation, Pagination, Scrollbar, A11y],
            loading: false,
            errorMessage: '',
            errorMessageType: '',
            summaries: []
        }
    },
    mounted() {
        this.fetchSummaries()
        if (localStorage.getItem('/account/name')) {
            const channel = window.pusher.subscribe(
                localStorage.getItem('/account/name')
            )
            channel.bind('trivial-scanner-status', (data) => {
                if (data?.status === 'Complete') {
                    data.refId = this.shortReportId(data.report_id)
                    data.dateAgo = moment.utc(data.date).fromNow()
                    this.addRecord(data)
                }
            })
        }
    },
    computed: {
        slicedSummaries() {
            const copy = [
                ...this.summaries.filter((obj) => obj?.targets.length > 0)
            ]
            const arrays = []
            while (copy.length > 0) {
                arrays.push(copy.splice(0, 5))
            }
            return arrays
        }
    },
    methods: {
        addRecord(report) {
            this.summaries = [report].concat([...this.summaries])
        },
        shortReportId(reportId) {
            return reportId.replace(/[\W_]+/g, '').slice(0, 11)
        },
        handleDeleteReport(reportId) {
            setTimeout(() => {
                for (const [index, summary] of this.summaries.entries()) {
                    if (summary.report_id === reportId) {
                        this.summaries.splice(index, 1)
                        break
                    }
                }
            }, 5000)
        },
        async fetchSummaries() {
            this.loading = true
            try {
                const response = await Api.get(`/reports`)
                this.loading = false
                if (response.status === 204) {
                    this.errorMessage = `No scan data is present for this account. Try searching above, and starting an On-demand scan now.`
                    this.errorMessageType = 'warning'
                    return
                }
                if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    return
                }
                const data = await response.json()
                this.summaries = data.map((summary) => {
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
        }
    }
}
</script>
<style scoped lang="scss">
.configure-icon {
    width: 32px;
    height: 32px;
}
.swiper-button {
    position: relative;
    background: none;
    border: none;
    color: color(light);
    transition: 0.2s linear;
    width: 3rem;

    &:after {
        font-size: sizes('xxl');
    }

    &:hover {
        color: color('secondary');
    }
}
</style>
