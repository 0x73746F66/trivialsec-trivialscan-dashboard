<template>
    <div
        v-if="report"
        class="summary bg-dark-40 border-radius-sm d-flex flex-column padding-sm margin-bottom-sm"
    >
        <div class="row row-cols-auto">
            <ValidationMessage
                v-if="delMessages[report.refId]?.length > 0"
                class="justify-content-start"
                :message="delMessages[report.refId]"
                :type="delMessageTypes[report.refId]"
            />
            <span class="col-10 col-lg-6">
                <span class="font-sm-sb margin-right-xxs">
                    {{ report.category }}
                </span>
                <span class="break-mobile font-xs">{{ report.dateAgo }}</span>
            </span>
            <div class="col-2 col-lg-6 d-flex justify-content-end">
                <div class="d-flex justify-content-end delete-report">
                    <form @submit.prevent="deleteReport($event)">
                        <input
                            type="hidden"
                            name="ReportId"
                            :value="report.report_id"
                        />
                        <button type="submit" class="btn-delete">
                            <IconTrash class="trash-icon" />
                        </button>
                    </form>
                </div>
            </div>
            <span class="col-12 col-lg-6 d-flex">
                <span v-if="report.project_name" class="font-base">
                    <span class="font-base-sb margin-right-xxs">Project:</span
                    >{{ report.project_name }}
                </span>
            </span>
        </div>
        <div class="row">
            <div
                class="col-12 col-lg-6 d-flex nowrap flex-column justify-content-start align-items-start margin-bottom-sm"
            >
                <span v-for="(target, index) in report.targets" :key="index">
                    <IconTarget
                        class="summary-icon-targets margin-right-xxs"
                        color="e2c878"
                    />
                    <RouterLink
                        :to="`/hostname/${target.transport.hostname}/${
                            target.transport.port
                        }/${moment.utc(report.date).format('YYYYMMDD')}`"
                        class="font-color-secondary"
                    >
                        {{ target.transport.hostname }}:{{
                            target.transport.port
                        }}
                    </RouterLink>
                </span>
                <span
                    v-if="report.certificates.length > 0"
                    class="margin-bottom-xxs font-sm"
                >
                    <IconCertificate
                        class="summary-icon-certificates margin-right-xxs"
                        color="e2c878"
                    />
                    {{ report.certificates.length }}
                    <span
                        >Certificate<span v-if="report.certificates.length > 1"
                            >s</span
                        ></span
                    >
                </span>
            </div>
            <div
                class="col-12 col-lg-6 d-flex flex-column justify-content-end align-items-end mobile-align-left margin-bottom-lg"
            >
                <div class="font-sm text-right">
                    <span class="margin-right-xxs">{{ report.type }}</span>
                    <span class="font-color-secondary"
                        >v{{ report.version }}</span
                    >
                </div>
                <div v-if="report.client_name" class="font-sm text-right">
                    <span v-if="report.client" class="margin-right-xxs">
                        {{ report.client.operating_system }}
                        {{ report.client.architecture }}
                    </span>
                    <span class="font-color-secondary">
                        {{ report.client_name }}
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div
                class="col-12 col-lg-6 d-flex align-items-start summary-pill-container"
            >
                <div v-if="report.results.fail > 0" class="summary-pill error">
                    <IconError class="summary-icon" color="" />
                    <span class="font-color-dark">{{
                        report.results.fail
                    }}</span>
                    <span class="summary-pill-legend margin-left-xxs"
                        >Failures</span
                    >
                </div>
                <div
                    v-if="report.results.warn > 0"
                    class="summary-pill warning"
                >
                    <IconWarning class="summary-icon" color="" />
                    <span class="font-color-dark">{{
                        report.results.warn
                    }}</span>
                    <span class="summary-pill-legend margin-left-xxs"
                        >Warnings</span
                    >
                </div>
                <div v-if="report.results.pass > 0" class="summary-pill pass">
                    <checkIcon class="summary-icon" color="" />
                    <span class="font-color-dark">{{
                        report.results.pass
                    }}</span>
                    <span class="summary-pill-legend margin-left-xxs"
                        >Passes</span
                    >
                </div>
                <div v-if="report.results.info > 0" class="summary-pill info">
                    <IconInfo class="summary-icon" color="" />
                    <span class="font-color-dark">{{
                        report.results.info
                    }}</span>
                    <span class="summary-pill-legend margin-left-xxs"
                        >Informational</span
                    >
                </div>
            </div>
            <div
                class="col-12 col-lg-6 d-flex flex-column justify-content-end align-items-end margin-top-sm"
            >
                <RouterLink
                    :to="{
                        name: 'detail',
                        params: { report_id: report.report_id }
                    }"
                    class="font-color-primary text-decoration-none"
                    @click="navData(report)"
                >
                    Full Report
                    <IconArrowPrimary
                        class="summary-icon-next mr-0"
                        color="1abb9c"
                    />
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script setup>
import checkIcon from '@/components/icons/checkIcon.vue'
import IconError from '@/components/icons/IconError.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import IconInfo from '@/components/icons/IconInfo.vue'
import IconTarget from '@/components/icons/IconTarget.vue'
import IconCertificate from '@/components/icons/IconCertificate.vue'
import IconArrowPrimary from '@/components/icons/IconArrowPrimary.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import moment from 'moment'
</script>

<script>
export default {
    emits: ['deleteReport', 'update:loading'],
    props: {
        report: {
            type: Object,
            default: {}
        }
    },
    components: {
        checkIcon,
        IconError,
        IconWarning,
        IconInfo,
        IconTarget,
        IconCertificate,
        IconArrowPrimary,
        IconTrash,
        ValidationMessage
    },
    data() {
        return {
            delMessages: {},
            delMessageTypes: {}
        }
    },
    methods: {
        navData(report) {
            localStorage.setItem(
                `/summary/${report.report_id}`,
                JSON.stringify(report)
            )
        },
        shortReportId(reportId) {
            return reportId.replace(/[\W_]+/g, '').slice(0, 11)
        },
        async deleteReport(event) {
            const reportId = event.target.elements['ReportId'].value
            const refId = this.shortReportId(reportId)
            this.$emit('update:loading', true)
            try {
                const response = await Api.delete(`/report/${reportId}`)
                if (response.status != 202) {
                    this.delMessages[refId] =
                        "Something went wrong. Report couldn't be deleted."
                    this.delMessageTypes[refId] = 'error'
                    this.$emit('update:loading', false)
                    return
                }
                this.delMessages[refId] = `This report was deleted`
                this.delMessageTypes[refId] = 'success'
                this.$emit('deleteReport', reportId)
            } catch (error) {
                this.delMessages[refId] =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.delMessageTypes[refId] = 'error'
            }
            this.$emit('update:loading', false)
        }
    }
}
</script>
<style scoped lang="scss">
.delete-report {
    padding-right: 0;
    padding-left: 0;
}
@media (max-width: breakpoints('sm')) {
    .break-mobile {
        display: block !important;
    }
    .mobile-align-left {
        align-items: flex-start !important;
    }
}
.summary {
    color: color('light');
}
.btn-delete {
    border: none;
    background: none;
    border-radius: 50%;
    transition: 0.2s linear;
    height: 40px;
    width: 40px;
    svg {
        width: 30px;
        height: 30px;
    }
    &:hover {
        background: color('danger');
    }
}
.summary {
    &-icon {
        width: 25px;
        height: 25px;
        margin-right: spacers('xs');
        &-certificates,
        &-targets {
            width: 25px;
            height: 25px;
            margin-right: spacers('xxs');
        }
        &-next {
            width: 25px;
            height: 25px;
            margin-right: 0;
        }
    }
    &-pill {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px;
        border-radius: radius('sm');
        color: color('dark');
        margin-right: spacers('xxs');
        padding: spacers('xxs') spacers('xs');
        transition: 0.2s linear;
        &-legend {
            display: none;
        }
        &-container {
            flex-wrap: wrap;
            @media (max-width: breakpoints('sm')) {
                padding-right: 0;
                padding-left: 0;
            }
        }

        &:hover {
            .summary-pill-legend {
                display: block;
            }
        }

        &.error {
            background: color('danger');
        }
        &.warning {
            background: color('warning');
        }
        &.pass {
            background: color('primary');
        }
        &.info {
            background: color('light-40');
        }
    }
}
</style>
