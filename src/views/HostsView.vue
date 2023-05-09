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

            <LoadingComponent class="loading" :class="{ inactive: !loading }" />
            <div
                v-if="errorMessage.length > 0"
                class="d-flex flex-column w-100"
            >
                <ValidationMessage
                    class="justify-content-start"
                    :message="errorMessage"
                    :type="errorMessageType"
                />
            </div>
            <div class="w-100 margin-bottom-md">
                <h2 class="font-xl-sb margin-bottom-md">Scanned Hosts</h2>
                <div
                    class="d-flex flex-row align-items-center justify-content-center"
                >
                    <div>
                        <button
                            class="target-swiper-button target-swiper-button-prev font-color-light"
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
                            nextEl: '.target-swiper-button-next',
                            prevEl: '.target-swiper-button-prev'
                        }"
                        :pagination="{ clickable: true }"
                        :scrollbar="{ draggable: true }"
                        :breakpoints="{}"
                    >
                        <SwiperSlide
                            class="target-slide"
                            v-for="(target, index) in slicedTargets"
                            :key="index"
                        >
                            <div
                                class="slide-target-item margin-bottom-sm"
                                v-for="(t, i) in target"
                                :key="i"
                            >
                                <div
                                    class="d-flex flex-column justify-content-between w-100"
                                >
                                    <div class="d-flex flex-column w-100">
                                        <div
                                            class="d-flex justify-content-between"
                                        >
                                            <div class="http-status">
                                                <span
                                                    v-if="t.http.length > 0"
                                                    v-for="(
                                                        http, key
                                                    ) in t.http"
                                                    :key="key"
                                                    :title="
                                                        `${http.title}\n${
                                                            http.request_url ||
                                                            ''
                                                        }`.trim()
                                                    "
                                                    class="font-sm-b padding-xxs margin-right-xxs font-color-dark status-code-pill hover-help"
                                                    :class="{
                                                        success:
                                                            http.status_code.toString()[0] ===
                                                            '2'
                                                    }"
                                                >
                                                    {{ http.status_code }}
                                                </span>
                                            </div>
                                            <div
                                                class="d-flex align-items-center"
                                            >
                                                <Toggle
                                                    title="Monitoring on/off"
                                                    :defaultChecked="
                                                        t.monitoring_enabled
                                                    "
                                                    @change="
                                                        hostToggleChange(
                                                            $event,
                                                            t.transport
                                                                ?.hostname
                                                        )
                                                    "
                                                />
                                                <button
                                                    @click="
                                                        scanHost(
                                                            $event,
                                                            t.transport
                                                                ?.hostname
                                                        )
                                                    "
                                                    class="scan-host-btn margin-left-xxs flex-right"
                                                >
                                                    Scan now
                                                </button>
                                            </div>
                                        </div>
                                        <RouterLink
                                            :to="`/hostname/${t.transport.hostname}/${t.transport.port}`"
                                            class="text-decoration-none target-icon-link font-color-secondary w-100"
                                        >
                                            <span class="d-block">
                                                <IconTarget
                                                    class="margin-right-xxs target-icon"
                                                    color="e2c878"
                                                />
                                                {{ t.transport.hostname }}:{{
                                                    t.transport.port
                                                }}
                                            </span>
                                            <span
                                                v-if="t.error"
                                                class="d-block font-color-tertiary"
                                                >{{ t.error[0] }}
                                                {{ t.error[1] }}</span
                                            >
                                            <span
                                                class="d-block font-color-light-60"
                                            >
                                                {{ t.transport.peer_address }}
                                            </span>
                                        </RouterLink>
                                    </div>
                                    <time
                                        class="font-color-light-40"
                                        :title="t.last_updated"
                                        :datetime="t.last_updated"
                                    >
                                        {{ t.timeAgo }}
                                    </time>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div>
                        <button
                            class="target-swiper-button target-swiper-button-next font-color-light"
                        >
                            <IconChevron color="f0f0f0" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import IconTarget from '@/components/icons/IconTarget.vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import Toggle from '@/components/general/Toggle.vue'
import CustomPill from '@/components/general/CustomPill.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import DashboardMenu from '@/components/layout/DashboardMenu.vue'
import SearchForm from '@/components/forms/SearchForm.vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        SearchForm,
        DashboardMenu,
        Toggle,
        CustomPill,
        Swiper,
        SwiperSlide,
        IconTarget,
        IconChevron,
        ValidationMessage,
        LoadingComponent
    },
    data() {
        return {
            modules: [Navigation, Pagination, Scrollbar, A11y],
            loading: false,
            errorMessage: '',
            errorMessageType: '',
            targets: []
        }
    },
    mounted() {
        this.fetchHosts()
    },
    methods: {
        async fetchHosts() {
            this.loading = true
            try {
                const response = await Api.get('/hosts', {
                    timeout: 30000
                })
                if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.targets = data.map((host) => {
                    host.timeAgo = moment.utc(host.last_updated).fromNow()
                    return host
                })
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
            }
            this.loading = false
        },
        async scanHost(event, target) {
            event.preventDefault()
            this.loading = true
            try {
                const response = await Api.get(`/scanner/queue/${target}`)
                this.loading = false
                if (response.status === 402) {
                    this.errorMessage = `Quota has been exhausted, to continue using on-demand scanning you can upgrade the subscription now`
                    this.errorMessageType = 'warning'
                    return
                }
                if (response.status === 406) {
                    this.errorMessage = `The input is invalid, retry using a fully qualified domain name`
                    this.errorMessageType = 'error'
                    return
                }
                if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                    this.errorMessageType = 'error'
                    return
                }
                this.errorMessage = `Host was added to on-demand scanning.`
                this.errorMessageType = 'success'
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
            }
            this.loading = false
        },
        async hostToggleChange(e, hostname) {
            e.preventDefault()
            this.loading = true
            try {
                if (e.target.checked === true) {
                    const response = await Api.get(
                        `/scanner/monitor/${hostname}`
                    )
                    this.loading = false
                    if (response.status === 204) {
                        this.errorMessage = `No changes`
                        this.errorMessageTypeScanHost = 'success'
                        return
                    }
                    if (response.status === 402) {
                        this.errorMessage = `Quota has been exhausted, to continue using on-demand scanning you can upgrade the subscription now`
                        this.errorMessageTypeScanHost = 'warning'
                        e.target.checked = false
                        return
                    }
                    if (response.status === 406) {
                        this.errorMessage = `The input is invalid, retry using a fully qualified domain name`
                        this.errorMessageTypeScanHost = 'warning'
                        e.target.checked = false
                        return
                    }
                    if (response.status !== 200) {
                        this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageType = 'error'
                        e.target.checked = false
                        return
                    }
                    this.errorMessage = `Monitoring host.`
                    this.errorMessageType = 'success'
                } else {
                    const response = await Api.get(
                        `/scanner/deactivate/${hostname}`
                    )
                    this.loading = false
                    if (response.status === 204) {
                        this.errorMessage = `No changes`
                        this.errorMessageType = 'success'
                        return
                    }
                    if (response.status === 402) {
                        this.errorMessage = `Quota has been exhausted, to continue using on-demand scanning you can upgrade the subscription now`
                        this.errorMessageType = 'warning'
                        e.target.checked = true
                        return
                    }
                    if (response.status === 406) {
                        this.errorMessage = `The input is invalid, retry using a fully qualified domain name`
                        this.errorMessageType = 'warning'
                        e.target.checked = true
                        return
                    }
                    if (response.status !== 200) {
                        this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageType = 'error'
                        e.target.checked = true
                        return
                    }
                    this.errorMessage = `No longer monitoring host.`
                    this.errorMessageType = 'success'
                }
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
                e.target.checked = false
            }
            this.loading = false
        }
    },
    computed: {
        slicedTargets() {
            const arrays = []
            while (this.targets.length > 0) {
                arrays.push(this.targets.splice(0, 15))
            }
            return arrays
        }
    }
}
</script>

<style scoped lang="scss">
.target-slide {
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

.slide-target-item {
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

.target-icon {
    height: 25px;
    width: 25px;
}

.target-swiper-button {
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

.status-code-pill {
    background: color('secondary');
    padding: 0 spacers('xxs') !important;
    border-radius: radius('md');

    &.success {
        background: color('primary');
    }
}

.scan-host-btn {
    padding: 0 spacers('xs');
    border: 0;
    border-radius: 8px;
    color: color('dark');
    max-width: max-content;
    line-height: 1.5em;
    font-size: sizes('sm');
    font-weight: 500;
    transition: 0.5s;
    background-size: 200% auto;
    background-image: linear-gradient(
        144deg,
        color('primary') 0%,
        color('secondary') 51%,
        color('secondary') 100%
    );
    box-shadow: color('primary-20') 0 15px 30px -5px;
    box-sizing: border-box;
    user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    &:active,
    &:hover {
        outline: 0;
    }
    &:hover {
        background-position: right center;
    }
}
</style>
