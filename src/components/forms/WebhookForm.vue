<template>
    <div
        class="d-flex flex-column bg-dark-40 border-radius-sm padding-xs margin-bottom-lg"
        v-if="endpoint"
    >
        <div class="d-flex flex-column">
            <div class="font-base-sb font-color-light margin-bottom-sm">
                Enabled webhook events
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="hosted_monitoring"
                    fieldName="hosted_monitoring"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Hosted Monitoring
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="hosted_scanner"
                    fieldName="hosted_scanner"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    On-demand Scanner
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="self_hosted_uploads"
                    fieldName="self_hosted_uploads"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Self-hosted Scanner
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="early_warning_email"
                    fieldName="early_warning_email"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Early Warnings (Email)
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="early_warning_domain"
                    fieldName="early_warning_domain"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Early Warnings (Domains)
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="early_warning_ip"
                    fieldName="early_warning_ip"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Early Warnings (IP Address)
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="new_findings_certificates"
                    fieldName="new_findings_certificates"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    New Findings (Certificates)
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="new_findings_domains"
                    fieldName="new_findings_domains"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    New Findings (Domains)
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="include_warning"
                    fieldName="include_warning"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Include Warning Findings
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="include_info"
                    fieldName="include_info"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Include Informational Findings
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="client_status"
                    fieldName="client_status"
                    @change="handleToggle($event)"
                />
                <label
                    class="font-color-light font-base-sb margin-left-sm hover-help"
                    title="Generated, Toggle activation, CLI Authenticated"
                >
                    Client Status
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="client_activity"
                    fieldName="client_activity"
                    @change="handleToggle($event)"
                />
                <label
                    class="font-color-light font-base-sb margin-left-sm hover-help"
                    title="Report Uploads, Authentication"
                >
                    Client Activity
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="scanner_configurations"
                    fieldName="scanner_configurations"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Scanner configurations
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="report_created"
                    fieldName="report_created"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Report Created
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="report_deleted"
                    fieldName="report_deleted"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Report Deleted
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="account_activity"
                    fieldName="account_activity"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Account Activity
                </label>
            </div>
            <div class="d-flex margin-bottom-sm">
                <Toggle
                    :defaultChecked="member_activity"
                    fieldName="member_activity"
                    @change="handleToggle($event)"
                />
                <label class="font-color-light font-base-sb margin-left-sm">
                    Member Activity
                </label>
            </div>
        </div>
        <div class="col-12">
            <div class="d-flex justify-content-start save-webhook">
                <form @submit.prevent="saveWebhook($event)">
                    <Button
                        type="submit"
                        class="save-btn border-radius-sm"
                        data-bs-toggle="modal"
                        text="Save"
                    />
                </form>
            </div>
            <div class="d-flex justify-content-end delete-webhook-modal">
                <form @submit.prevent="deleteWebhook(endpoint)">
                    <button
                        type="submit"
                        class="font-color-danger delete border-radius-lg font-sm"
                        data-bs-dismiss="modal"
                    >
                        <IconTrash />
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import TextInput from '@/components/inputs/TextInput.vue'
import TextArea from '@/components/inputs/TextArea.vue'
import Button from '@/components/general/Button.vue'
import Toggle from '@/components/general/Toggle.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import Modal from '@/components/general/Modal.vue'
</script>

<script>
export default {
    emits: [
        'update:loading',
        'update:message',
        'update:messageType',
        'deleteWebhook',
        'updateWebhook'
    ],
    props: {
        endpoint: {
            type: String
        },
        hosted_monitoring: {
            type: Boolean,
            default: false
        },
        hosted_scanner: {
            type: Boolean,
            default: false
        },
        self_hosted_uploads: {
            type: Boolean,
            default: false
        },
        early_warning_email: {
            type: Boolean,
            default: false
        },
        early_warning_domain: {
            type: Boolean,
            default: false
        },
        early_warning_ip: {
            type: Boolean,
            default: false
        },
        new_findings_certificates: {
            type: Boolean,
            default: false
        },
        new_findings_domains: {
            type: Boolean,
            default: false
        },
        include_warning: {
            type: Boolean,
            default: false
        },
        include_info: {
            type: Boolean,
            default: false
        },
        client_status: {
            type: Boolean,
            default: false
        },
        client_activity: {
            type: Boolean,
            default: false
        },
        scanner_configurations: {
            type: Boolean,
            default: false
        },
        report_created: {
            type: Boolean,
            default: false
        },
        report_deleted: {
            type: Boolean,
            default: false
        },
        account_activity: {
            type: Boolean,
            default: false
        },
        member_activity: {
            type: Boolean,
            default: false
        }
    },
    components: {
        TextInput,
        TextArea,
        Button,
        Toggle,
        IconTrash,
        Modal
    },
    data() {
        return {
            hostedMonitoring: this.hosted_monitoring,
            hostedScanner: this.hosted_scanner,
            selfHostedUploads: this.self_hosted_uploads,
            earlyWarningEmail: this.early_warning_email,
            earlyWarningDomain: this.early_warning_domain,
            earlyWarningIp: this.early_warning_ip,
            newFindingsCertificates: this.new_findings_certificates,
            newFindingsDomains: this.new_findings_domains,
            includeWarning: this.include_warning,
            includeInfo: this.include_info,
            clientStatus: this.client_status,
            clientActivity: this.client_activity,
            scannerConfigurations: this.scanner_configurations,
            reportCreated: this.report_created,
            reportDeleted: this.report_deleted,
            accountActivity: this.account_activity,
            memberActivity: this.member_activity
        }
    },
    methods: {
        async handleToggle(event) {
            this[event.target.name.toCamelCase()] = event.target.checked
        },
        async deleteWebhook() {
            this.$emit('update:loading', true)
            try {
                const response = await Api.delete(
                    `/webhook?endpoint=${encodeURIComponent(this.endpoint)}`
                )
                if (response.status != 202) {
                    this.$emit(
                        'update:message',
                        `${response.status} ${response.statusText}: Something went wrong. webhook couldn't be deleted.`
                    )
                    this.$emit('update:messageType', `error`)
                    this.$emit('update:loading', false)
                    return
                }
                this.$emit(
                    'update:message',
                    `The webhook for ${this.endpoint} was deleted`
                )
                this.$emit('update:messageType', `success`)
                this.$emit('deleteWebhook', this.endpoint)
            } catch (error) {
                this.$emit(
                    'update:message',
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                )
                this.$emit('update:messageType', `error`)
            }
            this.$emit('update:loading', false)
        },
        async saveWebhook(e) {
            this.$emit('update:loading', true)
            try {
                const webhook = {
                    endpoint: this.endpoint,
                    hosted_monitoring: this.hostedMonitoring,
                    hosted_scanner: this.hostedScanner,
                    self_hosted_uploads: this.selfHostedUploads,
                    early_warning_email: this.earlyWarningEmail,
                    early_warning_domain: this.earlyWarningDomain,
                    early_warning_ip: this.earlyWarningIp,
                    new_findings_certificates: this.newFindingsCertificates,
                    new_findings_domains: this.newFindingsDomains,
                    include_warning: this.includeWarning,
                    include_info: this.includeInfo,
                    client_status: this.clientStatus,
                    client_activity: this.clientActivity,
                    scanner_configurations: this.scannerConfigurations,
                    report_created: this.reportCreated,
                    report_deleted: this.reportDeleted,
                    account_activity: this.accountActivity,
                    member_activity: this.memberActivity
                }
                const response = await Api.post(`/webhook/enable`, webhook)
                if (response.status !== 206 && response.status !== 201) {
                    this.$emit(
                        'update:message',
                        `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                    )
                    this.$emit('update:messageType', 'error')
                    this.$emit('update:loading', false)
                    return
                }
                this.$emit(
                    'update:message',
                    `Updated webhook ${this.endpoint}.`
                )
                this.$emit('update:messageType', `success`)
                this.$emit('updateWebhook', webhook)
            } catch (error) {
                this.$emit(
                    'update:message',
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                )
                this.$emit('update:messageType', `error`)
            }
            this.$emit('update:loading', false)
        }
    }
}
</script>
<style scoped lang="scss">
.delete {
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
.save-btn {
    padding: spacers('xxs') spacers('xl');
    border: 0;
    background-color: color('primary');

    &:hover {
        color: color('secondary');
        background-color: color('primary-80');
    }
}
</style>
