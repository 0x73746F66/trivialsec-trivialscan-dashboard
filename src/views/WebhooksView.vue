<template>
    <main>
        <LoadingComponent class="loading" :class="{ inactive: !loading }" />
        <WebhookSecret
            class="webhook-notice"
            v-if="showSecret"
            v-model:showNotice="showNotice"
            :class="{ inactive: !showNotice }"
            :signingSecret="showSecret"
        />
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
                    <div
                        class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
                    >
                        <h3
                            class="font-color-light font-lg-b modal-invite-header"
                        >
                            Webhook Endpoints
                        </h3>
                        <Modal id="inviteModal" label="modal-invite-header">
                            <template v-slot:button="buttonProps">
                                <Button
                                    v-bind="buttonProps"
                                    class="btn-outline-primary-sm font-color-primary font-sm"
                                    text="Add Endpoint"
                                />
                            </template>
                            <template v-slot:modalTitle>
                                <h5 class="font-base-b font-color-light">
                                    Add Endpoint
                                </h5>
                            </template>
                            <template v-slot:modalContent>
                                <form @submit.prevent="addWebhook($event)">
                                    <TextInput
                                        placeholder="The endpoint URL to send the webhooks"
                                        id="Endpoint"
                                        label="Endpoint"
                                        :required="true"
                                    />
                                    <Button
                                        type="submit"
                                        class="edit-btn border-radius-sm"
                                        data-bs-toggle="modal"
                                        text="Save"
                                    />
                                </form>
                            </template>
                        </Modal>
                    </div>
                    <ValidationMessage :message="message" :type="messageType" />
                    <div class="table-responsive-lg" v-if="webhooks.length > 0">
                        <table class="table table-dark font-color-light">
                            <thead>
                                <tr>
                                    <th scope="col">Endpoint</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody
                                v-for="(webhook, key) in webhooks"
                                :key="key"
                            >
                                <tr>
                                    <td scope="row">
                                        <IconTarget
                                            class="link-icon margin-right-xxs"
                                            color="e2c878"
                                        />
                                        <span class="font-color-secondary">
                                            {{ webhook.endpoint }}
                                        </span>
                                    </td>
                                    <td>
                                        <div
                                            class="d-flex justify-content-end edit-webhook-modal"
                                        >
                                            <Modal
                                                :id="`editWebhook${webhook.id}`"
                                                label="edit-webhook-header"
                                            >
                                                <template
                                                    v-slot:button="buttonProps"
                                                >
                                                    <button
                                                        type="button"
                                                        class="edit-btn border-radius-sm"
                                                        v-bind="buttonProps"
                                                    >
                                                        Edit
                                                    </button>
                                                </template>
                                                <template v-slot:modalTitle>
                                                    <h5
                                                        class="font-sm-b font-color-secondary"
                                                    >
                                                        {{ webhook.endpoint }}
                                                    </h5>
                                                </template>
                                                <template v-slot:modalContent>
                                                    <WebhookForm
                                                        v-bind="webhook"
                                                        v-model:loading="
                                                            loading
                                                        "
                                                        v-model:message="
                                                            message
                                                        "
                                                        v-model:messageType="
                                                            messageType
                                                        "
                                                        @deleteWebhook.once="
                                                            handleDeleteWebhook
                                                        "
                                                    />
                                                </template>
                                            </Modal>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="font-base-sb font-color-secondary">
                        No webhook endpoints registered
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import AccountMenu from '@/components/layout/AccountMenu.vue'
import WebhookForm from '@/components/forms/WebhookForm.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import IconTarget from '@/components/icons/IconTarget.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import TextArea from '@/components/inputs/TextArea.vue'
import Toggle from '@/components/general/Toggle.vue'
import Button from '@/components/general/Button.vue'
import Modal from '@/components/general/Modal.vue'
import WebhookSecret from '@/components/general/WebhookSecret.vue'
</script>

<script>
export default {
    components: {
        AccountMenu,
        WebhookForm,
        LoadingComponent,
        ValidationMessage,
        IconTarget,
        TextInput,
        TextArea,
        Toggle,
        Button,
        Modal
    },
    data() {
        return {
            message: '',
            messageType: '',
            showSecret: '',
            loading: false,
            showNotice: false,
            display_name: localStorage.getItem('/account/display'),
            member_avatar: localStorage.getItem('/member/email_md5'),
            member_email: localStorage.getItem('/member/email'),
            webhooks: []
        }
    },
    mounted() {
        this.fetchWebhook()
    },
    methods: {
        async addWebhook(event) {
            this.loading = true
            const endpoint = event.target.elements['Endpoint'].value
            const response = await Api.post(`/webhook/enable`, { endpoint })
            this.loading = false
            if (response.status === 201) {
                const webhook = await response.json()
                webhook.id = Math.max(this.webhooks.map((item) => item.id)) + 1
                this.showSecret = webhook.signing_secret
                this.message = `Added webhook to ${endpoint}`
                this.messageType = `success`
                this.webhooks.unshift(webhook)
                this.showNotice = true
                return
            }
            if (response.status === 206) {
                this.message = `Webhook endpoint exists: ${endpoint}`
                this.messageType = `warning`
                return
            }
            this.message = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
            this.messageType = 'error'
        },
        async fetchWebhook() {
            this.loading = true
            try {
                const response = await Api.get(`/me`)
                if (response.status !== 200) {
                    this.message = `${response.status} ${response.statusText}`
                    this.messageType = `error`
                    this.loading = false
                    return
                }
                const data = await response.json()
                let webhookId = 0
                this.webhooks = data.account.webhooks.map((webhook) => {
                    webhook.id = webhookId++
                    return webhook
                })
            } catch (error) {
                this.message =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.messageType = 'error'
            }
            this.loading = false
        },
        async handleDeleteWebhook(endpoint) {
            for (const [index, webhook] of this.webhooks.entries()) {
                if (webhook.endpoint === endpoint) {
                    this.webhooks.splice(index, 1)
                    break
                }
            }
        }
    }
}
</script>
<style scoped lang="scss">
.link-icon {
    height: 20px;
    width: 20px;
}
.table {
    --bs-table-bg: color('dark');
}
.edit-btn {
    padding: 0 spacers('lg');
    border: 0;
    background-color: color('primary');
    &:hover {
        color: color('secondary');
        background-color: color('primary-80');
    }
}
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
