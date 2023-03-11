<template>
    <div v-if="Object.keys(quotas).length > 0">
        <div v-if="!quotas?.unlimited_monitoring && !quotas?.unlimited_scans">
            <div class="d-flex font-color-light">
                <h2 class="font-xl-sb margin-right-sm">Plan Quotas</h2>
                <QuestionComponent
                    label="question-total-available"
                    :content="quotasTooltip"
                />
            </div>
            <div class="d-flex flex-lg-row flex-column justify-content-around">
                <RadialProgress
                    :diameter="200"
                    :completed-steps="quotas?.monitoring?.used || 0"
                    :total-steps="quotas?.monitoring?.total || 0"
                    innerStrokeColor="#1abb9c"
                    startColor="#f45e5e"
                    stopColor="#e2c878"
                    :strokeWidth="20"
                    :innerStrokeWidth="15"
                >
                    <div
                        class="d-flex flex-column align-items-center"
                        v-if="quotas?.unlimited_monitoring"
                    >
                        <span class="font-color-secondary font-sm"
                            >Unlimited Monitoring</span
                        >
                    </div>
                    <div
                        class="d-flex flex-column align-items-center"
                        v-else-if="
                            quotas?.monitoring?.used > 0 ||
                            quotas?.monitoring?.total > 0
                        "
                    >
                        <span class="font-color-secondary font-sm"
                            >Hosts Monitored</span
                        >
                        <span class="font-color-light font-xxl">
                            {{ quotas?.monitoring?.used }} /
                            {{ quotas?.monitoring?.total }}
                        </span>
                        <span class="font-color-light font-base">
                            {{ quotas?.monitoring?.period }}
                        </span>
                    </div>
                </RadialProgress>
                <RadialProgress
                    :diameter="200"
                    :completed-steps="quotas?.ondemand?.used || 0"
                    :total-steps="quotas?.ondemand?.total || 0"
                    innerStrokeColor="#1abb9c"
                    startColor="#f45e5e"
                    stopColor="#e2c878"
                    :strokeWidth="20"
                    :innerStrokeWidth="15"
                >
                    <div
                        class="d-flex flex-column align-items-center"
                        v-if="quotas?.unlimited_scans"
                    >
                        <span class="font-color-secondary font-sm"
                            >Unlimited Scans</span
                        >
                    </div>
                    <div
                        class="d-flex flex-column align-items-center"
                        v-else-if="
                            quotas?.ondemand?.used > 0 ||
                            quotas?.ondemand?.total > 0
                        "
                    >
                        <span class="font-color-secondary font-sm"
                            >On-Demand Scans</span
                        >
                        <span class="font-color-light font-xxl">
                            {{ quotas?.ondemand?.used }} /
                            {{ quotas?.ondemand?.total }}
                        </span>
                        <span class="font-color-light font-base">
                            {{ quotas?.ondemand?.period }}
                        </span>
                    </div>
                </RadialProgress>
            </div>
        </div>
        <div v-else>
            <ValidationMessage
                class="justify-content-start"
                message="Unlimited usage plan is active"
                type="success"
            />
        </div>
    </div>
    <div v-else>
        <InlineLoading :loading="loading" />
        <ValidationMessage
            v-if="!loading"
            class="justify-content-start"
            message="No report data to calculate usage"
            type="warning"
        />
    </div>
</template>

<script setup>
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import InlineLoading from '@/components/general/InlineLoading.vue'
import RadialProgress from 'vue3-radial-progress'
import QuestionComponent from '@/components/general/QuestionComponent.vue'
</script>

<script>
export default {
    emits: [
        'update:quotas',
        'update:loading',
        'update:errorMessage',
        'update:errorMessageType'
    ],
    props: {
        quotas: { type: Object, default: {} }
    },
    components: {
        ValidationMessage,
        InlineLoading,
        RadialProgress,
        QuestionComponent
    },
    data() {
        return {
            loading: false,
            quotasTooltip:
                'This section shows how well you are utilizing Trivial Security',
            quotaSections: []
        }
    },
    created() {
        this.fetchQuotas()
    },
    methods: {
        async fetchQuotas() {
            try {
                this.loading = true
                const response = await Api.get(`/dashboard/quotas`, {
                    timeout: 30000
                })
                if (response.status === 204) {
                    this.loading = false
                    return
                } else if (response.status !== 200) {
                    this.$emit(
                        'update:errorMessage',
                        `${response.status} ${response.statusText}`
                    )
                    this.$emit('update:errorMessageType', 'error')
                    this.loading = false
                    return
                }
                const data = await response.json()
                if (
                    data?.unlimited_monitoring === false &&
                    data.monitoring.total > 0
                ) {
                    this.quotaSections.push('Monitoring')
                }
                if (data?.unlimited_scans === false) {
                    if (data.ondemand.total > 0) {
                        this.quotaSections.push('On-Demand')
                    }
                }
                if (this.quotaSections.length > 0) {
                    this.quotasTooltip = `Community Edition allows the use of self-managed scanners and will perform one scan only when each new host it added`
                } else if (this.unlimited_monitoring === true) {
                    this.quotasTooltip += `, you have Unlimited host monitoring`
                }
                if (
                    data?.monitoring.total > 0 &&
                    data.monitoring.used < data.monitoring.total
                ) {
                    this.quotasTooltip += `, you could be monitoring ${
                        data.monitoring.total - data.monitoring.used
                    } more hosts`
                }
                this.$emit('update:quotas', data)
            } catch (error) {
                this.$emit(
                    'update:errorMessage',
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                )
                this.$emit('update:errorMessageType', 'error')
            }
            this.loading = false
        }
    }
}
</script>
<style scoped lang="scss">
.modal {
    --bs-modal-width: 800px;
}
.delete-client-modal {
    overflow: hidden;
}
.token {
    word-wrap: break-word;
    max-width: fit-content;
}
.client-actions {
    align-items: center;
}
.profile-edit-icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
}
.edit-mode-btn {
    border: none;
    background: none;
    border-radius: 50%;
    transition: 0.2s linear;
    height: 40px;
    width: 40px;

    &.close {
        svg {
            width: 30px;
        }
        &:hover {
            background: color('light-20');
        }
    }
    &.delete {
        svg {
            width: 30px;
        }
        &:hover {
            background: color('danger');
        }
    }
    &:hover {
        background: color('primary');
    }
}
.swiper-slide {
    &-avatar {
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
    .swiper-wrapper {
        padding-bottom: spacers('sm');
    }
}
.custom-swiper-button {
    position: relative;
    border-radius: radius('sm');
    padding: 0 spacers('xs');
    background: color('dark-60');
    color: color(light);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s linear;
    border: 1px solid color('dark');

    &:hover {
        border: 1px solid color('secondary');
        color: color('secondary');
    }

    &:disabled {
        display: none;
    }
}
.swiper-button-disabled {
    display: none;
}
</style>
