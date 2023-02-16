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
        <div>
            <button
                class="event-swiper-button event-swiper-button-prev font-color-light"
            >
                <IconChevron color="f0f0f0" />
            </button>
        </div>
        <Swiper
            class="w-100"
            :modules="modules"
            :slides-per-view="1"
            :space-between="10"
            :navigation="{
                nextEl: '.event-swiper-button-next',
                prevEl: '.event-swiper-button-prev'
            }"
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: true }"
            :breakpoints="{}"
        >
            <SwiperSlide
                class="event-slide"
                v-for="(webhookEvents, index) in slicedEvents"
                :key="index"
            >
                <div
                    class="slide-event-item margin-bottom-sm"
                    v-for="(event, i) in webhookEvents"
                    :key="i"
                >
                    <div
                        class="d-flex flex-column justify-content-between w-100"
                    >
                        <div class="d-flex flex-column">
                            <span class="pill">
                                {{ event.event_name }}
                            </span>
                            <div class="d-block">
                                <span class="margin-right-xxs font-color-light">
                                    ID:
                                </span>
                                <span class="font-color-secondary">
                                    {{ event.event_id }}
                                </span>
                            </div>
                        </div>
                        <div class="d-flex font-color-light w-100">
                            <span class="margin-right-xxs"> Delivered </span>
                            <time
                                class="hover-help"
                                :title="event.date"
                                :datetime="event.date"
                            >
                                {{ event.timeAgo }}
                            </time>
                        </div>
                    </div>
                    <a
                        class="download-link"
                        title="Download JSON file"
                        :href="`${apiUrl}/webhook/${event.event_name}/${event.event_id}`"
                        target="_blank"
                    >
                        <IconJsonFile
                            color="e2c878"
                            class="json-icon d-flex flex-right"
                        />
                    </a>
                </div>
            </SwiperSlide>
        </Swiper>
        <div>
            <button
                class="event-swiper-button event-swiper-button-next font-color-light"
            >
                <IconChevron color="f0f0f0" />
            </button>
        </div>
    </div>
</template>

<script setup>
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import IconJsonFile from '@/components/icons/IconJsonFile.vue'
import moment from 'moment'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
</script>

<script>
let apiUrl = import.meta.env.VITE_API_URL.trim()
export default {
    components: {
        Swiper,
        SwiperSlide,
        IconChevron,
        IconJsonFile,
        ValidationMessage,
        LoadingComponent
    },
    data() {
        return {
            modules: [Navigation, Pagination, Scrollbar, A11y],
            loading: false,
            errorMessage: '',
            errorMessageType: '',
            events: [],
            apiUrl: `${apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl}`
        }
    },
    mounted() {
        this.fetchEvents()
    },
    methods: {
        async fetchEvents() {
            this.loading = true
            try {
                const response = await Api.get('/webhook/events', {
                    timeout: 30000
                })
                if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.events = data.map((event) => {
                    event.timeAgo = moment.utc(event.date).fromNow()
                    return event
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
    },
    computed: {
        slicedEvents() {
            const arrays = []
            while (this.events.length > 0) {
                arrays.push(this.events.splice(0, 6))
            }
            return arrays
        }
    }
}
</script>

<style scoped lang="scss">
.event-slide {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;

    @media (max-width: breakpoints('lg')) {
        flex-direction: column;
    }

    &:last-of-type {
        &:after {
            content: '';
            width: 30%;
        }
    }
}

.slide-event-item {
    background: color('dark-20');
    border-radius: radius('sm');
    padding: spacers('xs');
    width: 30%;
    font-size: sizes('xs');
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    @media (max-width: breakpoints('lg')) {
        width: 100%;
    }
}

.event-swiper-button {
    position: relative;
    border-radius: radius('sm');
    padding: spacers('xs');
    background: none;
    color: color(light);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s linear;
    border: none;

    &-prev {
        transform: rotate(180deg);
    }

    svg {
        width: 25px;
        height: 25px;
    }

    &:hover {
        color: color('secondary');
    }

    &:disabled {
        color: color('light-20');
        background: none;
        display: none;
    }
}

.pill {
    color: color('dark');
    font-size: sizes('base');
    font-weight: 500;
    text-align: center;
    background: color('primary');
}
.download-link {
    margin-top: auto;
}
.json-icon {
    width: 20px;
    height: 20px;
}
</style>
