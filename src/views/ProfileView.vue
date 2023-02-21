<template>
    <main>
        <div>
            <LoadingComponent class="loading" :class="{ inactive: !loading }" />

            <div class="container padding-top-sm padding-bottom-xl">
                <ValidationMessage
                    v-if="editMessage.length > 0"
                    class="justify-content-start"
                    :message="editMessage"
                    :type="editMessageType"
                />
                <AccountMenu />
                <div
                    class="profile-container bg-dark-40 border-radius-sm margin-bottom-lg d-flex flex-column"
                >
                    <div
                        class="d-flex justify-content-between align-items-start"
                    >
                        <div
                            class="h-100 d-flex align-items-lg-center flex-column flex-lg-row"
                        >
                            <div class="d-flex flex-column">
                                <img
                                    v-if="member.account"
                                    :src="`https://www.gravatar.com/avatar/${member.email_md5}?d=wavatar`"
                                    class="border-radius-round profile-picture margin-right-md margin-bottom-md mb-lg-0"
                                    :alt="`${member.account.display}'s Profile Picture`"
                                />
                                <a
                                    v-if="editMode"
                                    class="text-decoration-none font-color-secondary"
                                    href="https://en.gravatar.com/support/faq/"
                                    target="_blank"
                                >
                                    Change avatar
                                </a>
                            </div>
                            <div
                                class="d-flex flex-column justify-content-start"
                            >
                                <div
                                    class="d-flex flex-column justify-content-start"
                                >
                                    <EditableTextField
                                        :editMode="editMode"
                                        class="margin-bottom-sm position-relative"
                                    >
                                        <template #staticField>
                                            <h1
                                                class="font-xl-b font-color-light"
                                                v-if="member.account"
                                            >
                                                {{ member.account.display }}
                                            </h1>
                                        </template>
                                        <template #inputField>
                                            <form
                                                class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                                                @submit.prevent="
                                                    updateAccountDisplay($event)
                                                "
                                            >
                                                <TextInput
                                                    v-if="member.account"
                                                    :placeholder="
                                                        member.account.display
                                                    "
                                                    id="AccountDisplay"
                                                    label="Display Name"
                                                    :required="true"
                                                />
                                                <button
                                                    type="submit"
                                                    class="inline-custom-form-btn"
                                                >
                                                    <checkIcon
                                                        class="profile-edit-icon"
                                                        color="1abb9c"
                                                    />
                                                </button>
                                            </form>
                                        </template>
                                    </EditableTextField>
                                    <EditableTextField
                                        :editMode="editMode"
                                        class="margin-bottom-sm position-relative"
                                    >
                                        <template #staticField>
                                            <span
                                                class="font-base font-color-light"
                                            >
                                                {{ member.email }}
                                            </span>
                                        </template>
                                        <template #inputField>
                                            <form
                                                class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                                                @submit.prevent="
                                                    updateEmail($event)
                                                "
                                            >
                                                <TextInput
                                                    v-if="member.email"
                                                    :placeholder="member.email"
                                                    id="Email"
                                                    label="Email"
                                                    :required="true"
                                                />
                                                <button
                                                    type="submit"
                                                    class="inline-custom-form-btn"
                                                >
                                                    <checkIcon
                                                        class="profile-edit-icon"
                                                        color="1abb9c"
                                                    />
                                                </button>
                                            </form>
                                        </template>
                                    </EditableTextField>
                                </div>
                            </div>
                        </div>
                        <button
                            class="edit-mode-btn"
                            v-if="!editMode"
                            @click="toggleEditMode()"
                        >
                            <IconPencil class="profile-edit-icon" />
                        </button>
                        <div v-else>
                            <button
                                class="edit-mode-btn close"
                                @click="toggleEditMode()"
                            >
                                <IconCancel
                                    class="profile-edit-icon"
                                    color="f45e5e"
                                />
                            </button>
                        </div>
                    </div>
                    <div
                        class="d-flex justify-content-between align-items-start flex-column flex-lg-row"
                    >
                        <div
                            class="d-flex flex-column font-color-light align-items-start margin-top-md margin-bottom-sm"
                        >
                            <div
                                class="d-flex margin-bottom-xs align-items-center"
                            >
                                <span class="font-base-sb margin-right-sm"
                                    >Created:</span
                                >
                                <span class="font-sm font-sm">{{
                                    member.created
                                }}</span>
                            </div>
                            <div
                                class="d-flex margin-bottom-xs align-items-center"
                            >
                                <span class="font-base-sb margin-right-sm"
                                    >Status:</span
                                >
                                <span class="font-sm font-sm">{{
                                    member.status
                                }}</span>
                            </div>
                            <div
                                class="d-flex margin-bottom-xs align-items-center"
                                v-if="member.account"
                            >
                                <span class="font-base-sb margin-right-sm"
                                    >Account Name:</span
                                >
                                <span class="font-sm font-sm">{{
                                    member.account.name
                                }}</span>
                            </div>
                            <div
                                class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column"
                            >
                                <span class="font-base-sb margin-right-sm"
                                    >Primary Contact:</span
                                >
                                <EditableTextField
                                    :editMode="editMode"
                                    class="position-relative"
                                >
                                    <template #staticField>
                                        <span
                                            class="font-sm font-sm"
                                            v-if="member.account"
                                            >{{
                                                member.account.primary_email
                                            }}</span
                                        >
                                    </template>
                                    <template #inputField>
                                        <span
                                            class="font-base font-color-light"
                                        >
                                            <form
                                                class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                                                @submit.prevent="
                                                    updatePrimaryEmail($event)
                                                "
                                            >
                                                <TextInput
                                                    v-if="member.account"
                                                    :placeholder="
                                                        member.account
                                                            .primary_email
                                                    "
                                                    id="PrimaryEmail"
                                                    label="Primary Email"
                                                    :required="true"
                                                />
                                                <button
                                                    type="submit"
                                                    class="inline-custom-form-btn"
                                                >
                                                    <checkIcon
                                                        class="profile-edit-icon"
                                                        color="1abb9c"
                                                    />
                                                </button>
                                            </form>
                                        </span>
                                    </template>
                                </EditableTextField>
                            </div>
                            <ValidationMessage
                                v-if="errorMessage.length > 0"
                                class="justify-content-start"
                                :message="errorMessage"
                                :type="errorMessageType"
                            />
                            <div
                                class="d-flex margin-bottom-sm align-items-lg-start d-flex flex-column"
                            >
                                <Button
                                    class="btn-outline-primary-sm font-color-primary font-sm margin-bottom-sm"
                                    text="Generate CLI Client Credential"
                                    @click="generateClientCredential()"
                                />
                                <Modal
                                    id="deleteAccountModal"
                                    label="modal-delete-account-header"
                                >
                                    <template v-slot:button="buttonProps">
                                        <button
                                            v-bind="buttonProps"
                                            class="btn-outline-danger-sm font-color-danger font-sm"
                                        >
                                            Permanently Delete Account
                                        </button>
                                    </template>
                                    <template v-slot:modalTitle>
                                        <h5
                                            class="font-base-b font-color-light"
                                        >
                                            Are you sure you want to delete your
                                            account? This action is not
                                            reversible.
                                        </h5>
                                    </template>
                                    <template v-slot:modalContent>
                                        <Button
                                            class="btn-outline-danger-sm font-color-danger font-sm"
                                            text="Proceed"
                                            @click="deleteAccount()"
                                            data-bs-toggle="modal"
                                        />
                                    </template>
                                </Modal>
                            </div>
                        </div>
                        <div
                            class="d-flex flex-column bg-dark-60 padding-sm border-radius-sm font-color-light profile-plan-information"
                        >
                            <div
                                class="d-flex flex-column justify-content-between"
                            >
                                <div
                                    class="d-flex flex-column flex-lg-row justify-content-between margin-bottom-sm"
                                >
                                    <div
                                        class="margin-right-lg d-flex flex-lg-row flex-column align-items-lg-center"
                                    >
                                        <span
                                            class="font-base-sb margin-right-sm margin-bottom-sm mb-lg-0"
                                            >Active Plan:</span
                                        >
                                        <span class="font-sm font-sm">{{
                                            member.account?.billing
                                                ?.product_name
                                        }}</span>
                                    </div>
                                    <div>
                                        <span
                                            class="font-color-primary font-lg-b"
                                            >{{
                                                member.account?.billing
                                                    ?.display_amount
                                            }}
                                        </span>
                                        <span
                                            v-if="
                                                member.account?.billing
                                                    ?.display_period
                                            "
                                            class="font-lg-b"
                                            >/{{
                                                member.account?.billing
                                                    ?.display_period
                                            }}</span
                                        >
                                    </div>
                                </div>
                                <div
                                    v-if="member.account?.billing?.is_trial"
                                    class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column"
                                >
                                    <span class="font-sm font-color-primary"
                                        >Trial ends
                                        {{
                                            member.account?.billing
                                                ?.next_payment
                                        }}</span
                                    >
                                </div>
                                <div
                                    v-if="member.account?.billing?.description"
                                    class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column"
                                >
                                    <span class="font-base-sb margin-right-sm"
                                        >Payment Method:</span
                                    >
                                    <a
                                        v-if="
                                            member.account?.billing
                                                ?.description ===
                                            'Stripe Payments'
                                        "
                                        target="_blank"
                                        href="https://billing.stripe.com/p/login/8wMcQ27YKdPcbxSeUU"
                                        class="text-decoration-none"
                                    >
                                        <span
                                            class="font-sm font-color-light hover-help"
                                            title="Login to Stripe.com"
                                            >{{
                                                member.account?.billing
                                                    ?.description
                                            }}</span
                                        >
                                    </a>
                                    <span
                                        v-else
                                        class="font-sm font-color-light"
                                        >{{
                                            member.account?.billing?.description
                                        }}</span
                                    >
                                </div>
                                <div
                                    v-if="
                                        member.account?.billing?.next_due &&
                                        !member.account?.billing?.is_trial
                                    "
                                    class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column"
                                >
                                    <span class="font-base-sb margin-right-sm"
                                        >Next Payment:</span
                                    >
                                    <span class="font-sm">{{
                                        member.account?.billing?.next_payment
                                    }}</span>
                                </div>
                                <div
                                    class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column"
                                >
                                    <span class="font-base-sb margin-right-sm"
                                        >Billing Contact:</span
                                    >
                                    <EditableTextField
                                        :editMode="editMode"
                                        class="position-relative"
                                    >
                                        <template #staticField>
                                            <span class="font-sm">{{
                                                member?.account?.billing_email
                                            }}</span>
                                        </template>
                                        <template #inputField>
                                            <span
                                                class="font-base font-color-light"
                                            >
                                                <form
                                                    class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                                                    @submit.prevent="
                                                        updateBillingEmail(
                                                            $event
                                                        )
                                                    "
                                                >
                                                    <TextInput
                                                        :placeholder="
                                                            member?.account
                                                                ?.billing_email
                                                        "
                                                        id="BillingEmail"
                                                        label="Billing Email"
                                                        :required="true"
                                                    />
                                                    <button
                                                        type="submit"
                                                        class="inline-custom-form-btn"
                                                    >
                                                        <checkIcon
                                                            class="profile-edit-icon"
                                                            color="1abb9c"
                                                        />
                                                    </button>
                                                </form>
                                            </span>
                                        </template>
                                    </EditableTextField>
                                </div>
                                <div class="d-flex flex-column">
                                    <div
                                        v-if="
                                            member.account?.billing
                                                ?.product_name ===
                                                'Community Edition' ||
                                            member.account?.billing
                                                ?.product_name === 'Basics'
                                        "
                                    >
                                        <Modal
                                            id="upgradeModal"
                                            label="modal-upgrade-header"
                                        >
                                            <template
                                                v-slot:button="buttonProps"
                                            >
                                                <Button
                                                    v-bind="buttonProps"
                                                    class="btn-fill-primary-full font-color-dark font-sm-sb"
                                                    text="Upgrade"
                                                />
                                            </template>
                                            <template v-slot:modalTitle>
                                            </template>
                                            <template v-slot:modalContent>
                                                <stripe-pricing-table
                                                    :client-reference-id="
                                                        member.account
                                                            .billing_client_id ||
                                                        member.account.name
                                                    "
                                                    :customer-email="
                                                        member.account
                                                            .billing_email
                                                    "
                                                    pricing-table-id="prctbl_1LtVOcGZtHTgMn6lK07ldv8B"
                                                    publishable-key="pk_live_51HTJBRGZtHTgMn6l6LdsX1xQYlEwDSFR2aUpjzooo0wIiRTvxJZC4Op6aSeceg5JLGPy9qeam7s1AKVBXoSNjY8R00Qi76Bera"
                                                >
                                                </stripe-pricing-table>
                                            </template>
                                        </Modal>
                                    </div>
                                    <div
                                        v-if="
                                            member.account?.billing
                                                ?.product_name ===
                                            'Professional'
                                        "
                                    >
                                        <Modal
                                            id="upgradeModal"
                                            label="modal-upgrade-header"
                                        >
                                            <template
                                                v-slot:button="buttonProps"
                                            >
                                                <Button
                                                    v-bind="buttonProps"
                                                    class="btn-fill-primary-full font-color-dark font-sm-sb"
                                                    text="Upgrade"
                                                />
                                            </template>
                                            <template v-slot:modalTitle>
                                                <h3
                                                    class="font-light font-lg-sb"
                                                >
                                                    Do you wish to upgrade your
                                                    account type?
                                                </h3>
                                            </template>
                                            <template v-slot:modalContent>
                                                <ValidationMessage
                                                    v-if="
                                                        upgradeFormMessage.length >
                                                        0
                                                    "
                                                    class="justify-content-between"
                                                    :message="
                                                        upgradeFormMessage
                                                    "
                                                    :type="
                                                        upgradeFormMessageType
                                                    "
                                                />
                                                <p class="font-sm font-light">
                                                    Please provide us with your
                                                    preferred method of contact
                                                    (i.e. Phone number, e-mail)
                                                </p>
                                                <form
                                                    @submit.prevent="
                                                        upgradeForm($event)
                                                    "
                                                >
                                                    <TextInput
                                                        :placeholder="
                                                            member.account
                                                                .primary_email
                                                        "
                                                        id="preferredMethodOfContact"
                                                        label="Contact"
                                                        :required="true"
                                                        :textDefault="
                                                            member.account
                                                                .primary_email
                                                        "
                                                    />
                                                    <button
                                                        type="submit"
                                                        class="btn-fill-primary-full font-color-light font-sm"
                                                    >
                                                        Submit
                                                    </button>
                                                </form>
                                            </template>
                                        </Modal>
                                    </div>
                                    <form @submit.prevent="navPortal($event)">
                                        <button
                                            class="btn-outline-primary-full font-color-primary font-sm margin-top-sm"
                                            type="submit"
                                        >
                                            Manage billing
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="profile-container bg-dark-40 border-radius-sm d-flex flex-column margin-bottom-lg"
                >
                    <Clients
                        v-bind:clients="clients"
                        v-model:loading="loading"
                        v-model:errorMessage="errorMessage"
                        v-model:errorMessageType="errorMessageType"
                    />
                </div>
                <div
                    class="profile-container d-flex flex-column bg-dark-40 border-radius-sm padding-sm"
                >
                    <Quotas
                        v-model:quotas="quotas"
                        v-model:loading="loading"
                        v-model:errorMessage="errorMessage"
                        v-model:errorMessageType="errorMessageType"
                    />
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import AccountMenu from '@/components/layout/AccountMenu.vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconCancel from '@/components/icons/IconCancel.vue'
import checkIcon from '@/components/icons/checkIcon.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import EditableTextField from '@/components/inputs/EditableTextField.vue'
import Button from '@/components/general/Button.vue'
import Clients from '@/components/general/Clients.vue'
import Quotas from '@/components/general/Quotas.vue'
import Modal from '@/components/general/Modal.vue'
import moment from 'moment'
import randomWords from 'random-words'
</script>

<script>
export default {
    components: {
        IconPencil,
        Button,
        EditableTextField,
        TextInput,
        IconCancel,
        checkIcon,
        Modal,
        ValidationMessage,
        LoadingComponent,
        Clients,
        Quotas,
        AccountMenu
    },
    data() {
        return {
            member: {},
            quotas: {},
            clients: [],
            editMode: false,
            errorMessage: '',
            errorMessageType: '',
            editMessage: '',
            editMessageType: '',
            email: '',
            primaryEmail: '',
            billingEmail: '',
            upgradeFormMessage: '',
            upgradeFormMessageType: '',
            loading: false
        }
    },
    created() {
        const storedRaw = localStorage.getItem(`/me`)
        const data = storedRaw ? JSON.parse(storedRaw) : {}
        if (data?.member) {
            this.member = data.member
            this.member.account = data.account
            this.member.status = this.member.confirmed
                ? 'Confirmed'
                : 'Pending activation'
            this.member.created = moment.utc(this.member.timestamp).fromNow()
            if (this.member.account?.billing?.next_due) {
                this.member.account.billing.next_payment = moment
                    .utc(this.member.account.billing.next_due)
                    .fromNow()
            }
            localStorage.removeItem(`/me`)
        } else {
            this.fetchProfile()
        }
    },
    mounted() {
        let stripeScript = document.createElement('script')
        stripeScript.setAttribute(
            'src',
            'https://js.stripe.com/v3/pricing-table.js'
        )
        document.head.appendChild(stripeScript)
    },
    methods: {
        toggleEditMode() {
            this.editMode = !this.editMode
            this.editMessage = ''
            this.editMessageType = ''
        },
        async fetchProfile() {
            this.loading = true
            try {
                const response = await Api.get('/me')
                if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.member = data.member
                this.member.account = data.account
                this.member.status = this.member.confirmed
                    ? 'Confirmed'
                    : 'Pending activation'
                this.member.created = moment
                    .utc(this.member.timestamp)
                    .fromNow()
                if (this.member.account?.billing?.next_due) {
                    this.member.account.billing.next_payment = moment
                        .utc(this.member.account.billing.next_due)
                        .fromNow()
                }
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
            }
            this.loading = false
        },
        async updateEmail(event) {
            this.loading = true
            const email = event.target.elements['Email'].value
            const response = await Api.post('/member/email', { email })
            try {
                if (response.status !== 202) {
                    this.editMessage = `${response.status} ${response.statusText}`
                    this.editMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.editMode = !this.editMode
                this.editMessage = 'E-mail was updated!'
                this.editMessageType = 'success'
                localStorage.setItem('/member/email', email)
                localStorage.setItem(
                    '/member/email_md5',
                    data?.member?.email_md5 ||
                        localStorage.getItem('/member/email_md5')
                )
            } catch (error) {
                this.editMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.editMessageType = 'error'
            }
            this.loading = false
        },
        async updatePrimaryEmail(event) {
            this.loading = true
            try {
                const email = event.target.elements['PrimaryEmail'].value
                const response = await Api.post('/account/email', { email })
                if (response.status !== 202) {
                    this.editMessage = `${response.status} ${response.statusText}`
                    this.editMessageType = 'error'
                    this.loading = false
                    return
                }
                this.editMode = !this.editMode
                this.editMessage = 'E-mail was updated!'
                this.editMessageType = 'success'
            } catch (error) {
                this.editMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.editMessageType = 'error'
            }
            this.loading = false
        },
        async updateBillingEmail(event) {
            this.loading = true
            const email = event.target.elements['BillingEmail'].value
            try {
                const response = await Api.post('/billing/email', { email })
                if (response.status !== 202) {
                    this.editMessage = `${response.status} ${response.statusText}`
                    this.editMessageType = 'error'
                    this.loading = false
                    return
                }
                this.editMode = !this.editMode
                this.editMessage = 'E-mail was updated!'
                this.editMessageType = 'success'
            } catch (error) {
                this.editMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.editMessageType = 'error'
            }
            this.loading = false
        },
        async updateAccountDisplay(event) {
            const name = event.target.elements['AccountDisplay'].value
            this.loading = true
            try {
                const response = await Api.post(`/account/display`, { name })
                if (response.status !== 202) {
                    this.editMessage = `${response.status}: Something went wrong. Couldn't generate new credentials.`
                    this.editMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.editMessage = 'Display Name was updated!'
                this.editMessageType = 'success'
                localStorage.setItem(
                    '/account/display',
                    data?.display || localStorage.getItem('/account/display')
                )
                this.editMode = !this.editMode
            } catch (error) {
                this.editMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.editMessageType = 'error'
            }
            this.loading = false
        },
        async upgradeForm(event) {
            this.loading = true
            const contact = event.target.elements.preferredMethodOfContact.value
            try {
                const response = await Api.post('/account/upgrade', { contact })
                if (response.status === 202) {
                    this.upgradeFormMessage =
                        'Thank you for reaching out to us! We will be in contact soon.'
                    this.upgradeFormMessageType = 'success'
                    this.loading = false
                    return
                }
                this.upgradeFormMessage = `Something went wrong, your contact wasn't sent.`
                this.upgradeFormMessageType = 'error'
            } catch (error) {
                this.upgradeFormMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.upgradeFormMessageType = 'error'
            }
            this.loading = false
        },
        async deleteAccount() {
            this.loading = true
            try {
                const response = await Api.delete(`/account`)
                if (response.status != 202) {
                    this.errorMessage =
                        "Something went wrong. session couldn't be deleted."
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                this.errorMessage = 'This account was deleted'
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
        async generateClientCredential() {
            const client_name = randomWords({ exactly: 2, join: '' })
            this.loading = true
            try {
                const response = await Api.post(`/claim/${client_name}`, {})
                if (response.status !== 201) {
                    this.errorMessage = `${response.status}: ${response.statusText}. Something went wrong. Couldn't generate new credentials.`
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                this.errorMessage = 'New Credentials generated!'
                this.errorMessageType = 'success'
                const client = await response.json()
                client.created = moment.utc(client.timestamp).fromNow()
                this.clients.push(client)
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
            }
            this.loading = false
        },
        async navPortal() {
            this.loading = true
            try {
                const response = await Api.post(
                    '/stripe/create-customer-portal-session',
                    void 0,
                    { redirect: 'manual' }
                )
                const url = await response.json()
                window.location.href = url
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
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

.profile {
    &-picture {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    &-plan-information {
        width: 100%;

        @media (min-width: breakpoints('lg')) {
            width: auto;
        }
    }

    &-edit-icon {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    &-container {
        padding: spacers('md');

        @media (min-width: breakpoints('lg')) {
            padding: spacers('xl');
        }
    }
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

.inline-custom-form {
    &-btn {
        border-radius: 50%;
        background: none;
        border: 1px solid color('primary');
        height: 40px;
        width: 40px;
        display: flex;
        margin-left: 10px;
        align-items: center;
        justify-content: center;

        svg {
            width: 35px;
        }
    }

    label {
        top: -10px !important;
    }

    input {
        margin-top: 0 !important;
    }
}
</style>
