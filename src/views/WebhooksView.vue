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
                    <div class="d-flex flex-column justify-content-between">
                        <div class="d-flex margin-bottom-sm">
                            <TextInput
                                placeholder="Enter your webhook URL to receive all enabled events"
                                id="webhook-endpoint"
                                label="Your Webhook Endpoint"
                                :required="true"
                                @change="handleWebhookEndpoint"
                            />
                        </div>
                        <h3
                            class="font-color-light font-base-sb margin-top-md margin-bottom-lg"
                        >
                            Events to send
                        </h3>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Host Monitor
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                On-demand Scanner
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Self-hosted Scanner
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Early Warnings (Email)
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Early Warnings (Domains)
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Early Warnings (IP Address)
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                New Findings (Certificates)
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                New Findings (Domains)
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Include Warning Findings
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Include Informational Findings
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                                title="Generated, Toggle activation, CLI Authenticated"
                            >
                                Client Status
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                                title="Report Uploads, Authentication"
                            >
                                Client Activity
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Host Monitor Configurations
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Report Created
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Report Deleted
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Account Activity
                            </label>
                        </div>
                        <div class="d-flex margin-bottom-sm">
                            <Toggle
                                :defaultChecked="notifyScanCompleted"
                                fieldName="notifyScanCompleted"
                                @change="toggleScanCompleted($event)"
                            />
                            <label
                                @click="toggleScanCompleted($event)"
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Member Activity
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
import TextInput from '@/components/inputs/TextInput.vue'
import TextArea from '@/components/inputs/TextArea.vue'
import Button from '@/components/general/Button.vue'
import Toggle from '@/components/general/Toggle.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
</script>

<script>
export default {
    components: {
        AccountMenu,
        Toggle,
        TextInput,
        TextArea,
        Button
    },
    data() {
        return {
            display_name: localStorage.getItem('/account/display'),
            member_avatar: localStorage.getItem('/member/email_md5'),
            member_email: localStorage.getItem('/member/email'),
            message: '',
            messageType: '',
            loading: false
        }
    }
}
</script>
<style scoped lang="scss">
.profile {
    &-picture {
        border: 1px solid color('secondary');
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
