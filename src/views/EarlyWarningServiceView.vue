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
            <div class="margin-bottom-md">
                <h2 class="font-xl-sb margin-bottom-md">
                    Early Warning Service
                </h2>
                <ValidationMessage
                    :message="message"
                    :type="messageType"
                    v-if="message.length > 0"
                />
                <div
                    v-if="alerts.length > 0"
                    class="d-flex flex-row flex-wrap w-100"
                >
                    <div
                        class="col-lg-4 col-10"
                        v-for="(alert, _) in alerts"
                        :key="alert.id"
                    >
                        <div
                            class="bg-dark-60 border-radius-sm padding-md margin-right-xs margin-bottom-xs"
                        >
                            <Modal id="alertModal" label="modal-alert-header">
                                <template v-slot:button="buttonProps">
                                    <div
                                        class="d-flex flex-column justify-content-between w-100"
                                    >
                                        <div class="d-flex flex-column">
                                            <span
                                                class="font-base-sb font-color-secondary"
                                            >
                                                {{ alert.feed_identifier }}
                                            </span>
                                        </div>
                                        <div
                                            class="d-flex flex-column font-sm"
                                            v-if="alert.matching_data?.domains"
                                        >
                                            Matched Domains:
                                            <ul>
                                                <li
                                                    v-for="(
                                                        matched_domain, i
                                                    ) in alert.matching_data
                                                        ?.domains"
                                                    :key="i"
                                                >
                                                    <RouterLink
                                                        :to="{
                                                            name: 'hostname',
                                                            params: {
                                                                hostname:
                                                                    matched_domain
                                                            }
                                                        }"
                                                        class="text-decoration-none"
                                                    >
                                                        <span
                                                            class="font-color-light"
                                                        >
                                                            {{ matched_domain }}
                                                        </span>
                                                    </RouterLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div
                                        class="d-flex justify-items-end justify-content-end"
                                    >
                                        <div class="w-100">
                                            <span class="margin-right-xxs"
                                                >Discovered</span
                                            >
                                            <time
                                                class="hover-help"
                                                :title="alert.feed_date"
                                                :datetime="alert.feed_date"
                                            >
                                                {{ alert.timeAgo }}
                                            </time>
                                        </div>
                                        <button
                                            type="button"
                                            v-bind="buttonProps"
                                            class="btn-outline-primary-sm font-color-primary font-sm nowrap"
                                        >
                                            Details
                                            <IconArrowPrimary
                                                color="1abb9c"
                                                class="link-icon margin-left-xxs"
                                            />
                                        </button>
                                    </div>
                                </template>
                                <template v-slot:modalTitle>
                                    <h5 class="font-lg-b font-color-light">
                                        {{ alert.summary }}
                                    </h5>
                                </template>
                                <template v-slot:modalContent>
                                    <div class="d-flex">
                                        <span
                                            class="font-sm-sb margin-right-xxs"
                                        >
                                            Source:
                                        </span>
                                        <span class="font-sm">
                                            {{ alert.source }}
                                        </span>
                                    </div>
                                    <div class="d-flex">
                                        <span
                                            class="font-sm-sb margin-right-xxs"
                                        >
                                            Last Seen:
                                        </span>
                                        <span class="font-sm">
                                            {{ alert.feed_data.last_seen }}
                                        </span>
                                    </div>
                                    <div class="d-flex">
                                        <span
                                            class="font-sm-sb margin-right-xxs"
                                        >
                                            Category:
                                        </span>
                                        <span class="font-sm">
                                            {{ alert.feed_data.category }}
                                        </span>
                                    </div>
                                    <div class="d-flex flex-column">
                                        Description:
                                        <span class="font-sm">
                                            {{ alert.description }}
                                        </span>
                                    </div>
                                    <div
                                        class="d-flex flex-column margin-top-sm"
                                    >
                                        Abuse reporting:
                                        <span class="font-sm">
                                            {{ alert.abuse }}
                                        </span>
                                    </div>
                                    <div
                                        class="d-flex flex-column"
                                        v-if="alert.matching_data.emailed_to"
                                    >
                                        Sent to:
                                        <span class="font-sm">
                                            {{ alert.matching_data.emailed_to }}
                                        </span>
                                    </div>
                                </template>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <ValidationMessage
                        message="No early warning alerts sent"
                        type="warning"
                    />
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
import Modal from '@/components/general/Modal.vue'
import Button from '@/components/general/Button.vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import IconArrowPrimary from '@/components/icons/IconArrowPrimary.vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        SearchForm,
        DashboardMenu,
        Swiper,
        SwiperSlide,
        IconChevron,
        IconArrowPrimary,
        Modal,
        Button,
        ValidationMessage,
        LoadingComponent
    },
    data() {
        return {
            modules: [Navigation, Pagination, Scrollbar, A11y],
            loading: false,
            message: '',
            messageType: '',
            alerts: []
        }
    },
    created() {
        this.fetchAlerts()
    },
    methods: {
        async fetchAlerts() {
            this.loading = true
            try {
                const response = await Api.get(
                    '/early-warning-service/alerts',
                    {
                        timeout: 30000
                    }
                )
                if (response.status !== 200) {
                    this.message = `${response.status} ${response.statusText}`
                    this.messageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                for (const alert of data) {
                    alert.timeAgo = moment.utc(alert.feed_date).fromNow()
                }
                this.alerts = data
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
.link-icon {
    height: 20px;
    width: 20px;
}
</style>
