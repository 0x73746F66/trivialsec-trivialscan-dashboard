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
                        Email Notifications
                    </h2>
                    <ValidationMessage :message="message" :type="messageType" />
                    <div class="d-flex flex-column justify-content-between">
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifications.scan_completed"
                                fieldName="scan_completed"
                                @change="handleToggle($event)"
                            />
                            <label
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                On-demand Scanner Completed
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="
                                    notifications.monitor_completed
                                "
                                fieldName="monitor_completed"
                                @change="handleToggle($event)"
                            />
                            <label
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Monitoring Completed
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="
                                    notifications.self_hosted_uploads
                                "
                                fieldName="self_hosted_uploads"
                                @change="handleToggle($event)"
                            />
                            <label
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Self-hosted scanner uploads
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifications.early_warning"
                                fieldName="early_warning"
                                @change="handleToggle($event)"
                            />
                            <label
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Early Warning System
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="
                                    notifications.new_findings_certificates
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
                                    notifications.new_findings_domains
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
                                :defaultChecked="notifications.include_warning"
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
                                :defaultChecked="notifications.include_info"
                                fieldName="include_info"
                                @change="handleToggle($event)"
                            />
                            <label
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Include Informational Findings
                            </label>
                        </div>
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
</script>

<script>
export default {
    components: {
        AccountMenu,
        Toggle,
        ValidationMessage,
        LoadingComponent
    },
    data() {
        return {
            display_name: localStorage.getItem('/account/display'),
            member_avatar: localStorage.getItem('/member/email_md5'),
            member_email: localStorage.getItem('/member/email'),
            message: '',
            messageType: '',
            loading: false,
            notifications: {
                scan_completed: false,
                monitor_completed: false,
                self_hosted_uploads: false,
                early_warning: false,
                new_findings_certificates: false,
                new_findings_domains: false,
                include_warning: false,
                include_info: false
            }
        }
    },
    mounted() {
        this.fetchNotifications()
    },
    methods: {
        async handleToggle(event) {
            this.loading = true
            const action = event.target.checked ? 'enable' : 'disable'
            const targetUrl = `/notification/${action}/${event.target.name}`
            try {
                const response = await Api.get(targetUrl)
                if (response.status !== 202) {
                    this.message = `${response.status} ${response.statusText}`
                    this.messageType = `error`
                    this.loading = false
                    return
                }
                this.notifications[event.target.name] = event.target.checked
                this.message = `${action}d notification ${event.target.name} event`
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
        async fetchNotifications() {
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
                this.notifications = data.account.notifications
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
