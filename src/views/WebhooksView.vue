<template>
    <main>
        <LoadingComponent class="loading" :class="{ inactive: !loading }" />
        <div>
            <div class="container padding-top-sm padding-bottom-xl">
                <AccountMenu />
                <div
                    class="profile-container bg-dark-40 border-radius-sm d-flex flex-column"
                >
                    <div
                        class="h-100 d-flex align-items-lg-center flex-column flex-lg-row margin-bottom-xl"
                    >
                        <img
                            :src="`https://www.gravatar.com/avatar/${member_avatar}?d=wavatar`"
                            class="border-radius-round profile-picture margin-right-md margin-bottom-md mb-lg-0"
                            :alt="`${display_name}'s Profile Picture`"
                        />
                        <div class="d-flex flex-column justify-content-start">
                            <div
                                class="d-flex flex-column justify-content-start"
                            >
                                <h1 class="font-xl-b font-color-light">
                                    {{ display_name }}
                                </h1>
                                <span class="font-base font-color-light">
                                    {{ member_email }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <h2 class="font-color-light font-lg-b margin-bottom-lg">
                        Webhook Configuration
                    </h2>
                    <ValidationMessage :message="message" :type="messageType" />
                    <div class="d-flex flex-column justify-content-between">
                        <div class="d-flex margin-bottom-sm">
                            <TextInput
                                placeholder="Enter your webhook URL to receive all enabled events"
                                id="webhook_endpoint"
                                :textDefault="webhooks.webhook_endpoint"
                                label="Your Webhook Endpoint"
                                :required="true"
                                @change="handleWebhookEndpoint($event)"
                            />
                        </div>
                        <template v-if="showEvents">
                            <h3
                                class="font-color-light font-base-sb margin-top-md margin-bottom-lg"
                            >
                                Events to send
                            </h3>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="webhooks.hosted_monitoring"
                                    fieldName="hosted_monitoring"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Hosted Monitoring
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="webhooks.hosted_scanner"
                                    fieldName="hosted_scanner"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    On-demand Scanner
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="
                                        webhooks.self_hosted_uploads
                                    "
                                    fieldName="self_hosted_uploads"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Self-hosted Scanner
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="
                                        webhooks.early_warning_email
                                    "
                                    fieldName="early_warning_email"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Early Warnings (Email)
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="
                                        webhooks.early_warning_domain
                                    "
                                    fieldName="early_warning_domain"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Early Warnings (Domains)
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="webhooks.early_warning_ip"
                                    fieldName="early_warning_ip"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Early Warnings (IP Address)
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="
                                        webhooks.new_findings_certificates
                                    "
                                    fieldName="new_findings_certificates"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    New Findings (Certificates)
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="
                                        webhooks.new_findings_domains
                                    "
                                    fieldName="new_findings_domains"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    New Findings (Domains)
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="webhooks.include_warning"
                                    fieldName="include_warning"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Include Warning Findings
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="webhooks.include_info"
                                    fieldName="include_info"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Include Informational Findings
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="webhooks.client_status"
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
                                    :defaultChecked="webhooks.client_activity"
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
                                    :defaultChecked="
                                        webhooks.scanner_configurations
                                    "
                                    fieldName="scanner_configurations"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Scanner Configurations
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="webhooks.report_created"
                                    fieldName="report_created"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Report Created
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="webhooks.report_deleted"
                                    fieldName="report_deleted"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Report Deleted
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="webhooks.account_activity"
                                    fieldName="account_activity"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Account Activity
                                </label>
                            </div>
                            <div class="d-flex margin-bottom-sm">
                                <Toggle
                                    :defaultChecked="webhooks.member_activity"
                                    fieldName="member_activity"
                                    @change="handleToggle($event)"
                                />
                                <label
                                    class="font-color-light font-base-sb margin-left-sm"
                                >
                                    Member Activity
                                </label>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import AccountMenu from '@/components/layout/AccountMenu.vue'
import Toggle from '@/components/general/Toggle.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import TextInput from '@/components/inputs/TextInput.vue'
</script>

<script>
export default {
    components: {
        AccountMenu,
        Toggle,
        ValidationMessage,
        LoadingComponent,
        TextInput
    },
    data() {
        return {
            display_name: localStorage.getItem('/account/display'),
            member_avatar: localStorage.getItem('/member/email_md5'),
            member_email: localStorage.getItem('/member/email'),
            message: '',
            messageType: '',
            loading: false,
            webhooks: {
                webhook_endpoint: null,
                hosted_monitoring: false,
                hosted_scanner: false,
                self_hosted_uploads: false,
                early_warning_email: false,
                early_warning_domain: false,
                early_warning_ip: false,
                new_findings_certificates: false,
                new_findings_domains: false,
                include_warning: false,
                include_info: false,
                client_status: false,
                client_activity: false,
                scanner_configurations: false,
                report_created: false,
                report_deleted: false,
                account_activity: false,
                member_activity: false
            }
        }
    },
    computed: {
        showEvents() {
            return (
                typeof this.webhooks.webhook_endpoint === 'string' &&
                this.webhooks.webhook_endpoint.length > 0
            )
        }
    },
    mounted() {
        this.fetchWebhooks()
    },
    methods: {
        async handleToggle(event) {
            this.loading = true
            const action = event.target.checked ? 'enable' : 'disable'
            const targetUrl = `/webhook/${action}/${event.target.name}`
            try {
                const response = await Api.get(targetUrl)
                if (response.status !== 202) {
                    this.message = `${response.status} ${response.statusText}`
                    this.messageType = `error`
                    this.loading = false
                    return
                }
                this.webhooks[event.target.name] = event.target.checked
                this.message = `${action}d webhook ${event.target.name} event`
                this.messageType = `success`
            } catch (error) {
                this.message =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.messageType = 'error'
            }
            this.loading = false
        },
        async handleWebhookEndpoint(event) {
            this.loading = true
            const endpoint =
                event.target.value.length > 0 ? event.target.value : null
            try {
                const response = await Api.post(`/webhook/endpoint`, {
                    endpoint
                })
                if (response.status !== 202) {
                    this.message = `${response.status} ${response.statusText}`
                    this.messageType = `error`
                    this.loading = false
                    return
                }
                this.webhooks.webhook_endpoint = endpoint
                this.message = `Updated your Webhooks endpoint URL`
                this.messageType = `success`
            } catch (error) {
                this.message =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.messageType = 'error'
            }
            this.loading = false
        },
        async fetchWebhooks() {
            this.loading = true
            try {
                const response = await Api.get(`/me`, { timeout: 30000 })
                if (response.status !== 200) {
                    this.message = `${response.status} ${response.statusText}`
                    this.messageType = `error`
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.webhooks = data.member.account.webhooks
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
.profile {
    &-picture {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    &-container {
        padding: spacers('md');

        @media (min-width: breakpoints('lg')) {
            padding: spacers('xl');
        }
    }
}
</style>
