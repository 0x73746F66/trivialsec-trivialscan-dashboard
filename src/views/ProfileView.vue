<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="profile-container bg-dark-40 border-radius-sm margin-bottom-lg d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start">
                <div class="h-100 d-flex align-items-lg-center flex-column flex-lg-row">
                    <img
                        :src="`https://www.gravatar.com/avatar/${member.email_md5}`"
                        class="border-radius-round profile-picture margin-right-md margin-bottom-md mb-lg-0"
                        alt="{{member.account.display}}'s Profile Picture'"
                    >
                    <div class="d-flex flex-column justify-content-start">
                        <div class="d-flex flex-column justify-content-start">
                            <EditableTextField :editMode="editMode" class="margin-bottom-sm position-relative">
                                <template #staticField>
                                    <h1 class="font-xl-b font-color-light">
                                        {{member.account.display}}
                                    </h1>
                                </template>
                                <template #inputField>
                                    <form
                                            class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                                            @submit.prevent="updateAccountDisplay()"
                                        >
                                            <TextInput
                                                :placeholder="member.account.display"
                                                id="AccountDisplay"
                                                label="Display Name"
                                                :required="true"
                                            />
                                            <button type="submit" class="inline-custom-form-btn">
                                                <checkIcon class="profile-edit-icon" color="1abb9c"/>
                                            </button>
                                        </form>
                                </template>
                            </EditableTextField>
                            <EditableTextField :editMode="editMode" class="margin-bottom-sm position-relative">
                                <template #staticField>
                                    <span class="font-base font-color-light">
                                        {{member.email}}
                                    </span>
                                </template>
                                <template #inputField>
                                    <form
                                            class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                                            @submit.prevent="updateBillingEmail()"
                                        >
                                            <TextInput
                                                :placeholder="member.account.primary_email"
                                                id="PrimaryEmail"
                                                label="Email"
                                                :required="true"
                                            />
                                            <button type="submit" class="inline-custom-form-btn">
                                                <checkIcon class="profile-edit-icon" color="1abb9c"/>
                                            </button>
                                        </form>
                                </template>
                            </EditableTextField>
                        </div>
                        <ValidationMessage
                            v-if="this.emailUpdateMessage.length > 0"
                            class="justify-content-start"
                            :message="this.emailUpdateMessage"
                            :type="this.emailUpdateMessageType"
                        />
                    </div>
                </div>
                <button class="edit-mode-btn" v-if="!editMode" @click="toggleEditMode()">
                    <IconPencil class="profile-edit-icon"/>
                </button>
                <div v-else>
                    <button class="edit-mode-btn close" @click="toggleEditMode()"><IconCancel class="profile-edit-icon" color="f45e5e"/></button>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-start flex-column flex-lg-row">
                <div class="d-flex flex-column font-color-light align-items-start margin-top-md margin-bottom-sm">
                    <div class="d-flex margin-bottom-xs align-items-center">
                        <span class="font-base-sb margin-right-sm ">Created:</span>
                        <span class="font-sm font-sm">{{member.created}}</span>
                    </div>
                    <div class="d-flex margin-bottom-xs align-items-center">
                        <span class="font-base-sb margin-right-sm">Status:</span>
                        <span class="font-sm font-sm">{{member.status}}</span>
                    </div>
                    <div class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Account Name:</span>
                            <EditableTextField :editMode="editMode" class="position-relative">
                                <template #staticField>
                                    <span class="font-sm font-sm">{{member.account.name}}</span>
                                </template>
                                <template #inputField>
                                    <span class="font-base font-color-light">
                                        <form
                                            class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                                            @submit.prevent="updateAccountName()"
                                        >
                                            <TextInput
                                                :placeholder="member.account.name"
                                                id="AccountName"
                                                label="Account Name"
                                                :required="true"
                                            />
                                            <button type="submit" class="inline-custom-form-btn">
                                                <checkIcon class="profile-edit-icon" color="1abb9c"/>
                                            </button>
                                        </form>
                                    </span>
                                </template>
                            </EditableTextField>
                        </div>
                        <div class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Primary Contact:</span>
                            <EditableTextField :editMode="editMode" class="position-relative">
                                <template #staticField>
                                    <span class="font-sm font-sm">{{member.account.primary_email}}</span>
                                </template>
                                <template #inputField>
                                    <span class="font-base font-color-light">
                                        <form
                                            class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                                            @submit.prevent="updatePrimaryEmail()"
                                        >
                                            <TextInput
                                                :placeholder="member.account.primary_email"
                                                id="PrimaryEmail"
                                                label="Primary Email"
                                                :required="true"
                                            />
                                            <button type="submit" class="inline-custom-form-btn">
                                                <checkIcon class="profile-edit-icon" color="1abb9c"/>
                                            </button>
                                        </form>
                                    </span>
                                </template>
                            </EditableTextField>
                        </div>
                        <div class="d-flex margin-bottom-sm align-items-lg-start d-flex flex-column">
                            <Button
                                class="btn-outline-primary-sm font-color-primary font-sm margin-bottom-sm"
                                text="Generate CLI Client Credential"
                                @click="generateClientCredential()"
                            />
                            <Button
                                class="btn-outline-danger-sm font-color-danger font-sm"
                                text="Permanantly Delete Account"
                                @click="deleteAccount()"
                            />
                        </div>
                </div>

                <div class="d-flex flex-column bg-dark-60 padding-sm border-radius-sm font-color-light profile-plan-information">
                    <div class="d-flex flex-column justify-content-between">
                        <div class="d-flex flex-column flex-lg-row justify-content-between margin-bottom-sm">
                            <div class="margin-right-lg d-flex flex-lg-row flex-column align-items-lg-center">
                                <span class="font-base-sb margin-right-sm margin-bottom-sm mb-lg-0">Active Plan:</span>
                                <span class="font-sm font-sm">{{member.account?.active_plan?.label}}</span>
                            </div>
                            <span class="font-color-primary font-lg-b">{{member.account?.active_plan?.price}} </span>
                            <span v-if="member.account?.active_plan?.subscription" class="font-lg-b">/{{member.account?.active_plan?.subscription}}</span>
                        </div>
                        <div v-if="member.account?.active_plan?.debit_account" class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Debit Account:</span>
                            <span class="font-sm font-sm">{{member.account?.active_plan?.debit_account}}</span>
                        </div>
                        <div v-if="member.account?.active_plan?.credit_card" class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Credit Card:</span>
                            <span class="font-sm font-sm">{{member.account?.active_plan?.credit_card}}</span>
                        </div>
                        <div v-if="member.account?.active_plan?.issuer" class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Issuer:</span>
                            <span class="font-sm font-sm">{{member.account?.active_plan?.issuer}}</span>
                        </div>
                        <div v-if="member.account?.active_plan?.expiry" class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Expiry:</span>
                            <span class="font-sm font-sm">{{member.account?.active_plan?.expiry}}</span>
                        </div>
                        <div v-if="member.account?.active_plan?.due_date" class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Next Payment:</span>
                            <span class="font-sm font-sm">{{member.account?.active_plan?.due_date}}</span>
                        </div>
                        <div class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Billing Contact:</span>
                            <EditableTextField :editMode="editMode" class="position-relative">
                                <template #staticField>
                                    <span class="font-sm font-sm">{{member.account.billing_email}}</span>
                                </template>
                                <template #inputField>
                                    <span class="font-base font-color-light">
                                        <form
                                            class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                                            @submit.prevent="updateBillingEmail()"
                                        >
                                            <TextInput
                                                :placeholder="member.account.billing_email"
                                                id="BillingEmail"
                                                label="Billing Email"
                                                :required="true"
                                            />
                                            <button type="submit" class="inline-custom-form-btn">
                                                <checkIcon class="profile-edit-icon" color="1abb9c"/>
                                            </button>
                                        </form>
                                    </span>
                                </template>
                            </EditableTextField>
                        </div>
                        <div class="d-flex flex-column">
                            <div class="d-flex margin-bottom-sm">
                                <RouterLink to="/billing"
                                    class="text-decoration-none d-flex align-items-center justify-content-center margin-right-xs margin-bottom-sm mb-lg-0 btn-outline-primary-full font-color-primary font-sm"
                                    v-if="member.account?.active_plan?.type !== 'Trial'"
                                >
                                    Past Invoices
                                </RouterLink>
                                <a v-if="member.account?.active_plan?.stripe_customer_url"
                                    :href="member.account?.active_plan?.stripe_customer_url"
                                    class="text-decoration-none d-flex align-items-center justify-content-center margin-bottom-sm mb-lg-0 btn-outline-primary-full font-color-primary font-sm"
                                    text="Next Invoice"
                                />
                            </div>
                            <Button
                                class="btn-fill-primary-full font-color-light font-sm"
                                text="Upgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-container bg-dark-40 border-radius-sm d-flex flex-column">
            <div class="profile-members-section d-flex flex-column">
                <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
                    <h3 class="font-color-light font-lg-b modal-invite-header">Members</h3>
                    <Modal id="inviteModal" label="modal-invite-header">
                        <template v-slot:button="buttonProps">
                            <Button
                                v-bind="buttonProps"
                                class="btn-outline-primary-sm font-color-primary font-sm"
                                text="Invite Members"
                            />
                        </template>
                        <template v-slot:modalTitle>
                            <h5 class="font-base-b font-color-light">Invite members</h5>
                        </template>
                        <template v-slot:modalContent>
                            <form @submit.prevent="inviteMembers()">
                                <ValidationMessage
                                    v-if="this.inviteMessage.length > 0"
                                    class="justify-content-between"
                                    :message="this.inviteMessage"
                                    :type="this.inviteMessageType"
                                />
                                <EmaiInput
                                    placeholder="Who do you want to invite?"
                                    id="id-invite-email"
                                    label="E-mail"
                                    :required="true"
                                />
                                <Button
                                    class="btn-outline-primary-full font-color-primary font-sm"
                                    text="Invite"
                                    type="submit"
                                />
                            </form>
                        </template>
                    </Modal>
                </div>
                <div class="d-flex w-100">
                    <ValidationMessage
                        v-if="this.memberDeleteMessage.length > 0"
                        class="justify-content-start"
                        :message="this.memberDeleteMessage"
                        :type="this.memberDeleteMessageType"
                    />
                </div>
                <div class="margin-top-sm">
                    <swiper
                        :modules="modules"
                        :slides-per-view="1"
                        :space-between="10"
                        class="padding-bottom-sm"
                        :navigation="{
                            nextEl: '.custom-member-swiper-button-next',
                            prevEl: '.custom-member-swiper-button-prev'
                        }"
                        :pagination="{ clickable: true }"
                        :scrollbar="{ draggable: true }"
                        :breakpoints="{
                            '640': {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            '768': {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            '1024': {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }"
                    >
                        <swiper-slide
                            class="d-flex border-radius-sm flex-column padding-md bg-dark-60"
                            :class="member.current ? 'user-slider' : '' "
                            v-for="(member, index) in members"
                            :key="member.email_md5"
                        >
                            <div class="d-flex justify-content-end">
                                <img
                                    :src="`https://www.gravatar.com/avatar/${member.email_md5}`"
                                    class="swiper-slide-avatar margin-bottom-sm"
                                    alt=""
                                />
                            </div>

                            <div class="text-left font-color-light font-sm">
                                <p class="mb-0 font-sm word-break-all">
                                    {{member.email}}
                                    <span
                                        v-if="member.current"
                                        class="font-sm font-color-secondary"
                                    >
                                        (You)
                                    </span>
                                </p>
                                <p class="mb-0 font-sm">{{member.status}}</p>
                                <p v-if="member.confirmed" class="mb-0 font-sm">Joined {{member.created}}</p>
                                <p v-else class="mb-0 font-sm">Invited {{member.created}}</p>
                                <div class="d-flex justify-content-end delete-member-modal">
                                    <Modal :id="`deleteMember${index}`" label="delete-member-header">
                                        <template v-slot:button=buttonProps>
                                            <button class="edit-mode-btn delete" v-bind='buttonProps'>
                                                <IconTrash class="profile-edit-icon"/>
                                            </button>
                                        </template>

                                        <template v-slot:modalTitle>
                                            <h5 class="delete-member-header font-base font-color-light">Are you sure you want to delete this member?</h5>
                                        </template>
                                        <template v-slot:modalContent>
                                            <div class="d-flex w-100">
                                                <Button
                                                    class="btn-outline-danger-full font-color-danger font-sm"
                                                    text="Yes"
                                                    @click="deleteMember()"
                                                />
                                            </div>
                                        </template>
                                    </Modal>
                                </div>
                            </div>

                        </swiper-slide>
                    </swiper>
                    <div class="d-flex justify-content-between margin-top-sm border-bottom-light-20">
                        <div>
                            <button class="custom-swiper-button custom-member-swiper-button-prev font-color-light"> &lt; </button>
                        </div>
                        <div>
                            <button class="custom-swiper-button custom-member-swiper-button-next font-color-light"> &gt; </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="client-members-section d-flex flex-column margin-top-lg">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="font-color-light font-lg-b">Clients</h3>
                </div>
                <div class="d-flex w-100">
                    <ValidationMessage
                        v-if="this.toggleFeedMessage.length > 0"
                        class="justify-content-start"
                        :message="this.toggleFeedMessage"
                        :type="this.toggleFeedMessageType"
                    />
                </div>
                <div class="margin-top-sm">
                    <swiper
                        :modules="modules"
                        :slides-per-view="1"
                        :space-between="10"
                        :navigation="{
                            nextEl: '.custom-client-swiper-button-next',
                            prevEl: '.custom-client-swiper-button-prev'
                        }"
                        :pagination="{ clickable: true }"
                        :scrollbar="{ draggable: true }"
                        :breakpoints="{
                            '640': {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            '768': {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            '1024': {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }"
                    >
                        <swiper-slide
                            class="d-flex border-radius-sm flex-column padding-md bg-dark-60"
                            v-for="client in clients"
                            :key="client.account.ip_addr"
                        >
                            <div class="text-left font-color-light font-sm">
                                <p class="font-base-sb margin-bottom-sm">{{client.name}}</p>
                                <p class="mb-0">
                                    <span class="font-sm-sb margin-right-sm">CLI Version:</span>
                                    <span class="font-sm">{{client.cli_version}}</span>
                                </p>
                                <p class="mb-0">
                                    <span class="font-sm">{{client.ip_addr}}</span>
                                </p>
                                <p class="mb-0">
                                    <span class="font-sm">{{client.client_info.operating_system}} {{client.client_info.operating_system_version}}</span>
                                </p>
                                <p class="margin-bottom-sm">
                                    <span class="font-sm">{{client.client_info.operating_system_release}} {{client.client_info.architecture}}</span>
                                </p>
                                <p class="mb-0 font-xs">
                                    <span>Created {{client.created}}</span>
                                </p>
                            </div>
                            <div class="d-flex justify-content-end">
                                <Toggle :defaultChecked=client.active @change="toggleClientFeed($event, client.name)"/>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <div class="d-flex justify-content-between margin-top-sm">
                        <div>
                            <button class="custom-swiper-button custom-client-swiper-button-prev font-color-light"> &lt; </button>
                        </div>
                        <div>
                            <button class="custom-swiper-button custom-client-swiper-button-next font-color-light"> &gt; </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { RouterLink } from "vue-router";
    import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
    import { Swiper, SwiperSlide  } from 'swiper/vue';
    import moment from 'moment'
    import CryptoJS from 'crypto-js'

    import 'swiper/css';

    import IconPencil from "../components/icons/IconPencil.vue";
    import IconCancel from '../components/icons/IconCancel.vue';
    import IconTrash from '../components/icons/IconTrash.vue';
    import checkIcon from '../components/icons/checkIcon.vue';
    import Button from "../components/general/Button.vue";
    import Toggle from "../components/general/Toggle.vue";
    import EditableTextField from '../components/inputs/EditableTextField.vue';
    import TextInput from '../components/inputs/TextInput.vue';
    import EmaiInput from '../components/inputs/EmaiInput.vue';
    import Modal from "../components/general/Modal.vue";
    import ValidationMessage from '../components/general/ValidationMessage.vue';

    export default {
        components: {
            IconPencil,
            Button,
            Swiper,
            SwiperSlide,
            Toggle,
            EditableTextField,
            TextInput,
            IconCancel,
            checkIcon,
            IconTrash,
            EmaiInput,
            Modal,
            ValidationMessage
        },
        setup() {
            return {
                modules: [Navigation, Pagination, Scrollbar, A11y],
            };
        },
        data() {
            return {
                api_url: import.meta.env.VITE_API_URL,
                member: {},
                members: [],
                clients: [],
                editMode: false,
                inviteMessage: "",
                inviteMessageType: "",
                emailUpdateMessage: "",
                emailUpdateMessageType: "",
                billingEmailUpdateMessage: "",
                billingEmailUpdateMessageType: "",
                memberDeleteMessage: "",
                memberDeleteMessageType: "",
                toggleFeedMessage: "",
                toggleFeedMessageType: "",
            }
        },
        created() {
            this.fetchProfile()
            this.fetchClients()
            this.fetchMembers()
        },
        methods: {
            async fetchProfile() {
                const req_url = `${this.api_url}/me`
                const ts = moment().utc().unix()
                const url = new URL(req_url)
                const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
                console.log(canonical_string)
                const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, localStorage.getItem('/session/key'))
                hash.update(canonical_string)
                const mac = hash.finalize()
                const header = `HMAC id="${localStorage.getItem('/member/email')}", mac="${mac}", ts="${ts}"`
                console.log(header)
                const response = await fetch(req_url, {
                    headers: {"Authorization": header}
                }).catch(alert)
                const data = await response.json()
                console.log(data)
                if (response.status !== 200) {
                    alert(`${response.status} ${response.statusText}`)
                }
                this.member = data.member
                this.member.status = this.member.confirmed ? "Confirmed" : "Pending activation"
                this.member.created = moment(this.member.timestamp).fromNow()
                // placeholders
                const payments = [
                    {
                        label: "Community Edition", // Community Edition, Enterprise, Professional
                        price: "FREE", // FREE, $39, $199, $12,500
                        type: "Trial", // Trial, Quota, Unlimited
                    },
                    {
                        label: "Professional", // Community Edition, Enterprise, Professional
                        price: "$39", // FREE, $39, $199, $12,500
                        subscription: "Month", // Month, Year
                        type: "Quota", // Trial, Quota, Unlimited
                        credit_card: "xxxx-xxxx-xxxx-1234",
                        issuer: "VISA",
                        expiry: "10/24",
                        due_date: moment(new Date(1667723919438)).fromNow(),
                        stripe_customer_url: "https://invoice.stripe.com/i/",
                    },
                    {
                        label: "Enterprise", // Community Edition, Enterprise, Professional
                        price: "$12,500", // FREE, $39, $199, $12,500
                        subscription: "Year", // Month, Year
                        type: "Unlimited", // Trial, Quota, Unlimited
                        debit_account: "Swift Payments",
                        due_date: moment(new Date(1667723919438)).fromNow(),
                        stripe_customer_url: "https://invoice.stripe.com/i/",
                    }
                ]
                this.member.account.active_plan = payments[Math.floor(Math.random()*payments.length)]
            },
            async fetchClients() {
                this.loading = true
                const req_url = `${this.api_url}/clients`
                const ts = moment().utc().unix()
                const url = new URL(req_url)
                const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
                console.log(canonical_string)
                const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, localStorage.getItem('/session/key'))
                hash.update(canonical_string)
                const mac = hash.finalize()
                const header = `HMAC id="${localStorage.getItem('/member/email')}", mac="${mac}", ts="${ts}"`
                console.log(header)
                const response = await fetch(req_url, {
                    headers: {"Authorization": header}
                }).catch(error => {
                    this.error = error
                    this.loading = false
                })
                this.loading = false
                if (response.status === 404) {
                    this.members = []
                } else if (response.status !== 200) {
                    alert(`${response.status} ${response.statusText}`)
                } else {
                    const data = await response.json()
                    console.log(data)
                    this.clients = data.map(client => {
                        client.created = moment(client.timestamp).fromNow()
                        return client
                    })
                }
            },
            async fetchMembers() {
                this.loading = true
                const req_url = `${this.api_url}/members`
                const ts = moment().utc().unix()
                const url = new URL(req_url)
                const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
                console.log(canonical_string)
                const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, localStorage.getItem('/session/key'))
                hash.update(canonical_string)
                const mac = hash.finalize()
                const header = `HMAC id="${localStorage.getItem('/member/email')}", mac="${mac}", ts="${ts}"`
                console.log(header)
                const response = await fetch(req_url, {
                    headers: {"Authorization": header}
                }).catch(error => {
                    this.error = error
                    this.loading = false
                })
                this.loading = false
                if (response.status === 404) {
                    this.members = []
                } else if (response.status !== 200) {
                    alert(`${response.status} ${response.statusText}`)
                } else {
                    const data = await response.json()
                    console.log(data)
                    this.members = data.map(member => {
                        member.created = moment(member.timestamp).fromNow()
                        member.status = member.confirmed ? "Confirmed" : "Pending Activation"
                        return member
                    })
                }
            },
            toggleEditMode() {
                this.editMode = !this.editMode;
                this.emailUpdateMessage = "";
                this.emailUpdateMessageType  = "";
            },
            updateEmail() {
                console.log("API CALL");
                this.emailUpdateMessage = "E-mail was updated!"
                this.emailUpdateMessageType = "success"
                console.log(this.primaryEmail);
                console.log(this.billingEmail);
                this.editMode= !this.editMode;
            },
            updateBillingEmail() {
                this.billingEmailUpdateMessage = "E-mail was updated!"
                this.billingEmailUpdateMessageType = "success"
                this.editMode= !this.editMode;
            },
            inviteMembers(){
                console.log("invite members - API CALL");
                this.inviteMessage = "E-mail was sent!"
                this.inviteMessageType = "success"
            },
            deleteMember(){
                console.log("member deleted");
                this.memberDeleteMessage = "Member was deleted"
                this.memberDeleteMessageType = "success"
                console.log("delete member")
                console.log("return new list of members")
            },
            generateClientCredential(){
                console.log("generate client credentail")
            },
            async toggleClientFeed($event, client_name) {
                const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, localStorage.getItem('/session/key'))
                const deactivate_url = `${this.api_url}/deactived/${client_name}`
                const activate_url = `${this.api_url}/activate/${client_name}`
                const ts = moment().utc().unix()
                const mac = hash.finalize()
                const header = `HMAC id="${localStorage.getItem('/member/email')}", mac="${mac}", ts="${ts}"`

                if($event.target.checked === true) {
                    const response = await fetch(activate_url, {
                        headers: {"Authorization": header}
                    })

                    if (response.status == 200) {
                        this.toggleFeedMessage = "Feed was enabled with success"
                        this.toggleFeedMessageType = "success"
                    } else {
                        this.toggleFeedMessage = `${response.status}: An error has occured, please try again.`
                        this.toggleFeedMessageType = "error"
                    }

                } else {
                    const response = await fetch(deactivate_url, {
                        headers: {"Authorization": header}
                    })

                    if (response.status == 200) {
                        this.toggleFeedMessage = "Feed was disabled with success"
                        this.toggleFeedMessageType = "success"
                    } else {
                        this.toggleFeedMessage = `${response.status}: An error has occured, please try again.`
                        this.toggleFeedMessageType = "error"
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .profile {
        &-picture {
            border: 1px solid color("secondary");
            width: 100px;
            height: 100px;
            object-fit: cover;
        }
        &-plan-information {
            width: 100%;
            @media (min-width: $breakpoint-lg) {
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

            @media (min-width: $breakpoint-lg) {
                padding: spacers('xl');
            }
        }
    }
    .swiper-slide {
        &-avatar {
            border-radius: 50%;
            width: 50px;
            height: 50px;
        }
        .swiper-wrapper {
            padding-bottom: spacers("sm");
        }
    }
    .user-slider {
        border: 1px solid color("secondary");
    }
    .custom-swiper-button {
        position: relative;
        border-radius: radius('sm');
        padding:  0 padding('xs');
        background: color('dark-60');
        color: color(light);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s linear;
        border: 1px solid color("dark");

        &:hover {
            border: 1px solid color("secondary");
            color: color('secondary');
        }

        &:disabled {
            color: color("light-20");
            background: none;
            border: 1px solid color("light-20");
            display: none;
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
                background: color("light-20");
            }
        }
        &.delete {
            svg {
                width: 30px;
            }
            &:hover {
                background: color("danger");
            }
        }
        &:hover {
            background: color("primary");
        }
    }
    .delete-member-modal {
        .modal {
            .modal-dialog {
                margin-top: 0;
                margin-bottom: 0;
                height: 100%;
                .modal-content {
                    height: 100%;
                    .modal-body {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
    }
    .inline-custom-form {
        &-btn {
            border-radius: 50%;
            background: none;
            border: 1px solid color("primary");
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
