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
                    <div class="d-flex justify-content-between w-100">
                        <div>
                            <button
                                class="swiper-button swiper-button-prev"
                            ></button>
                        </div>
                        <Swiper
                            class="padding-bottom-lg"
                            :modules="modules"
                            :slides-per-view="1"
                            :space-between="10"
                            :navigation="{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev'
                            }"
                            :pagination="{ clickable: true }"
                            :scrollbar="{ draggable: false }"
                        >
                            <SwiperSlide
                                class="d-flex flex-wrap align-content-start"
                                v-for="(ews, alertIndex) in slicedAlerts"
                                :key="alertIndex"
                            >
                                <div
                                    class="col-lg-4 col-12"
                                    v-for="(alert, key) in ews"
                                    :key="key"
                                >
                                    <div
                                        class="bg-dark-60 border-radius-sm padding-md margin-right-xs margin-bottom-xs"
                                    >
                                        <Modal
                                            :backdrop="false"
                                            :id="`alertModal${key}`"
                                            label="modal-alert-header"
                                        >
                                            <template
                                                v-slot:button="buttonProps"
                                            >
                                                <div
                                                    class="d-flex justify-content-between w-100 flex-wrap"
                                                >
                                                    <span
                                                        class="font-base-sb font-color-secondary"
                                                    >
                                                        {{
                                                            alert.feed_identifier
                                                        }}
                                                    </span>
                                                    <span class="font-sm">
                                                        {{ alert.source }}
                                                    </span>
                                                </div>
                                                <div
                                                    v-if="
                                                        alert.matching_data
                                                            ?.domains
                                                    "
                                                >
                                                    <ul>
                                                        <li
                                                            v-for="(
                                                                matched_domain,
                                                                i
                                                            ) in alert
                                                                .matching_data
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
                                                                    {{
                                                                        matched_domain
                                                                    }}
                                                                </span>
                                                            </RouterLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div
                                                    class="d-flex font-sm justify-content-between flex-wrap"
                                                >
                                                    <div
                                                        class="col-lg-6 col-12"
                                                    >
                                                        <span
                                                            class="margin-right-xxs"
                                                            >Discovered</span
                                                        >
                                                        <time
                                                            class="hover-help"
                                                            :title="
                                                                alert.feed_date
                                                            "
                                                            :datetime="
                                                                alert.feed_date
                                                            "
                                                        >
                                                            {{
                                                                moment
                                                                    .utc(
                                                                        alert.feed_date
                                                                    )
                                                                    .fromNow()
                                                            }}
                                                        </time>
                                                        <div class="d-flex">
                                                            <span
                                                                class="margin-right-xxs"
                                                            >
                                                                Last seen
                                                            </span>
                                                            <time
                                                                class="hover-help"
                                                                :title="
                                                                    alert.feed_date
                                                                "
                                                                :datetime="
                                                                    alert.feed_date
                                                                "
                                                            >
                                                                {{
                                                                    moment
                                                                        .utc(
                                                                            alert
                                                                                .feed_data
                                                                                .last_seen
                                                                        )
                                                                        .fromNow()
                                                                }}
                                                            </time>
                                                        </div>
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
                                                <h5
                                                    class="font-lg-b font-color-light"
                                                >
                                                    {{ alert.summary }}
                                                </h5>
                                            </template>
                                            <template v-slot:modalContent>
                                                <div
                                                    class="d-flex"
                                                    v-if="alert.reference_url"
                                                >
                                                    <IconLink
                                                        color="e2c878"
                                                        class="link-icon margin-right-xxs"
                                                    />
                                                    <a
                                                        class="font-sm font-color-secondary text-decoration-none"
                                                        :href="
                                                            alert.reference_url
                                                        "
                                                        target="_blank"
                                                    >
                                                        Source information
                                                    </a>
                                                </div>
                                                <div
                                                    class="d-flex flex-column font-sm-sb margin-top-sm"
                                                >
                                                    Description:
                                                    <span class="font-sm">
                                                        {{ alert.description }}
                                                    </span>
                                                </div>
                                                <div
                                                    class="d-flex margin-top-xxs"
                                                >
                                                    <span
                                                        class="font-sm-sb margin-right-xxs"
                                                    >
                                                        Category:
                                                    </span>
                                                    <span class="font-sm">
                                                        {{
                                                            alert.feed_data
                                                                .category
                                                        }}
                                                    </span>
                                                </div>
                                                <div
                                                    class="d-flex flex-column margin-top-sm"
                                                    v-if="
                                                        alert.matching_data
                                                            .emailed_to
                                                    "
                                                >
                                                    Sent to:
                                                    <span class="font-sm">
                                                        {{
                                                            alert.matching_data
                                                                .emailed_to
                                                        }}
                                                    </span>
                                                </div>
                                                <div
                                                    class="d-flex flex-column font-sm-sb margin-top-sm"
                                                >
                                                    Abuse reporting:
                                                    <span class="font-sm">
                                                        {{ alert.abuse }}
                                                    </span>
                                                </div>
                                            </template>
                                        </Modal>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div>
                            <button
                                class="swiper-button swiper-button-next"
                            ></button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <ValidationMessage
                        message="No early warning alerts sent"
                        type="success"
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
import IconLink from '@/components/icons/IconLink.vue'
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
        IconLink,
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
    },
    computed: {
        slicedAlerts() {
            const original = [...this.alerts]
            const arrays = []
            while (this.alerts.length > 0) {
                arrays.push(this.alerts.splice(0, 15))
            }
            this.alerts = original
            return arrays
        }
    }
}
</script>
<style scoped lang="scss">
.link-icon {
    height: 20px;
    width: 20px;
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

.target-dropdown-icon {
    width: 15px;
    height: 15px;
}
</style>
