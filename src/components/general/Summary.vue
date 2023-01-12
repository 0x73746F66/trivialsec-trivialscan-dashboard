<template>
    <ValidationMessage
        v-if="errorMessage.length > 0"
        class="justify-content-start"
        :message="errorMessage"
        :type="errorMessageType"
    />
    <LoadingComponent class="loading" v-if="loading" />
    <div class="d-flex flex-row align-items-center justify-content-center">
        <div>
            <button class="swiper-button swiper-button-prev"></button>
        </div>
        <Swiper
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
            <SwiperSlide v-for="(items, index) in slicedSummaries" :key="index">
                <SummaryItem
                    v-for="(summary, summaryIndex) in items"
                    :key="summaryIndex"
                    :report="summary"
                    @deleteReport.once="handleDeleteReport"
                />
            </SwiperSlide>
        </Swiper>
        <div>
            <button class="swiper-button swiper-button-next"></button>
        </div>
    </div>
</template>
<script setup>
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
            const arrays = []
            while (this.summaries.length > 0) {
                arrays.push(this.summaries.splice(0, 5))
            }
            return arrays
        }
    },
    methods: {
        addRecord(report) {
            this.summaries = [report].concat(this.summaries)
        },
        shortReportId(reportId) {
            return reportId.replace(/[\W_]+/g, '').slice(0, 11)
        },
        handleDeleteReport(reportId) {
            for (const [index, summary] of this.summaries.entries()) {
                if (summary.report_id === reportId) {
                    setTimeout(() => this.summaries.splice(index, 1), 5000)
                    break
                }
            }
        },
        async fetchSummaries() {
            this.loading = true
            try {
                const response = await Api.get(`/reports`)
                if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    this.loading = false
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
