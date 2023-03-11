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
                        class="h-100 d-flex align-items-lg-center flex-column flex-lg-row margin-bottom-lg"
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
                    <h2 class="font-color-light font-xxl-b margin-bottom-lg">
                        Security Configuration
                    </h2>
                    <ValidationMessage :message="message" :type="messageType" />
                    <div
                        class="d-flex flex-column justify-content-between margin-bottom-md"
                    >
                        <div class="d-flex">
                            <Toggle
                                :defaultChecked="mfaEnrollment"
                                @change="handleToggle($event)"
                            />
                            <label
                                class="font-color-light font-base-sb margin-left-sm"
                            >
                                Require MFA Enrollment
                            </label>
                        </div>
                    </div>
                    <div
                        class="margin-bottom-lg profile-sessions-section d-flex flex-column"
                    >
                        <div
                            v-if="false"
                            class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
                        >
                            <h3
                                class="font-color-light font-base-b modal-invite-header"
                            >
                                Code Generator (TOTP)
                            </h3>
                            <div class=""></div>
                        </div>
                        <div
                            class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
                        >
                            <h3
                                class="font-color-light font-base-b modal-invite-header"
                            >
                                Passkey (FIDO) Devices
                            </h3>
                            <Modal
                                v-if="webauthnSupported"
                                id="enrollModal"
                                label="modal-enroll-header"
                            >
                                <template v-slot:button="buttonProps">
                                    <Button
                                        @click="registerFIDO()"
                                        v-bind="buttonProps"
                                        class="btn-outline-primary-sm font-color-primary font-sm"
                                        text="Enroll New Device"
                                    />
                                </template>
                                <template v-slot:modalTitle>
                                    <h5 class="font-base-b font-color-light">
                                        Enroll New Device
                                    </h5>
                                </template>
                                <template v-slot:modalContent>
                                    <form @submit.prevent="enrollFIDO($event)">
                                        <ValidationMessage
                                            v-if="fidoMessage.length > 0"
                                            class="justify-content-between"
                                            :message="fidoMessage"
                                            :type="fidoMessageType"
                                        />
                                        <TextInput
                                            placeholder="Give your device a name"
                                            id="DeviceName"
                                            label="Name"
                                            :required="true"
                                        />
                                        <Button
                                            class="btn-outline-primary-full font-color-primary font-sm"
                                            text="Start Enrollment"
                                            type="submit"
                                            :disabled="!recordId"
                                        />
                                    </form>
                                </template>
                            </Modal>
                        </div>
                        <div v-if="fidoDevices.length > 0">
                            <Swiper
                                :modules="modules"
                                :slides-per-view="1"
                                :space-between="10"
                                class="padding-bottom-lg"
                                :navigation="{
                                    nextEl: '.custom-devices-swiper-button-next',
                                    prevEl: '.custom-devices-swiper-button-prev'
                                }"
                                :pagination="{ clickable: true }"
                                :scrollbar="{ draggable: true }"
                                :breakpoints="{
                                    '640': {
                                        slidesPerView: 1,
                                        spaceBetween: 20
                                    },
                                    '768': {
                                        slidesPerView: 2,
                                        spaceBetween: 40
                                    },
                                    '1024': {
                                        slidesPerView: 4,
                                        spaceBetween: 50
                                    }
                                }"
                            >
                                <SwiperSlide
                                    class="d-flex border-radius-sm flex-column padding-md bg-dark-60"
                                    v-for="(device, deviceIndex) in fidoDevices"
                                    :key="deviceIndex"
                                >
                                    <div class="d-flex justify-content-end">
                                        <U2FDevice />
                                    </div>

                                    <div
                                        class="text-left font-color-light font-sm"
                                    >
                                        <div
                                            class="mb-0 font-sm word-break-all"
                                        >
                                            <span
                                                class="font-sm font-color-secondary"
                                                :title="device.record_id"
                                            >
                                                {{ device.device_name }}
                                            </span>
                                        </div>
                                        <div
                                            v-if="device.created"
                                            class="mb-0 font-sm"
                                        >
                                            <span
                                                class="font-sm-sb margin-right-xxs"
                                            >
                                                Created
                                            </span>
                                            <time
                                                class="hover-help"
                                                :title="device.created_at"
                                                :datetime="device.created_at"
                                            >
                                                {{ device.created }}
                                            </time>
                                        </div>
                                        <div
                                            class="d-flex justify-content-end delete-device-modal"
                                        >
                                            <Modal
                                                :id="`deleteDevice${deviceIndex}`"
                                                label="delete-device-header"
                                                :backdrop="false"
                                            >
                                                <template
                                                    v-slot:button="buttonProps"
                                                >
                                                    <button
                                                        class="edit-mode-btn delete border-radius-lg"
                                                        v-bind="buttonProps"
                                                    >
                                                        <IconTrash
                                                            class="profile-edit-icon"
                                                        />
                                                    </button>
                                                </template>
                                                <template v-slot:modalTitle>
                                                    <h5
                                                        class="delete-session-header font-base font-color-light"
                                                    >
                                                        Are you sure you want to
                                                        remove this MFA method?
                                                    </h5>
                                                </template>
                                                <template v-slot:modalContent>
                                                    <form
                                                        @submit.prevent="
                                                            deleteDevice($event)
                                                        "
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="RecordId"
                                                            :value="
                                                                device.record_id
                                                            "
                                                        />
                                                        <button
                                                            type="submit"
                                                            class="btn-outline-danger-full font-color-danger font-sm"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            Yes
                                                        </button>
                                                    </form>
                                                </template>
                                            </Modal>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            <div
                                class="d-flex justify-content-between margin-top-sm"
                            >
                                <div>
                                    <button
                                        class="custom-swiper-button custom-devices-swiper-button-prev"
                                    >
                                        &lt;
                                    </button>
                                </div>
                                <div>
                                    <button
                                        class="custom-swiper-button custom-devices-swiper-button-next"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row col-12" v-else>
                            <ValidationMessage
                                class="justify-content-between"
                                message="No devices enrolled"
                                type="warning"
                            />
                        </div>
                    </div>
                    <div class="profile-sessions-section d-flex flex-column">
                        <div
                            class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
                        >
                            <h3
                                class="font-color-light font-base-b modal-invite-header"
                            >
                                Active Sessions
                            </h3>
                        </div>
                        <ValidationMessage
                            v-if="sessionsMessage.length > 0"
                            class="justify-content-between"
                            :message="sessionsMessage"
                            :type="sessionsMessageType"
                        />
                        <div class="margin-top-sm">
                            <Swiper
                                :modules="modules"
                                :slides-per-view="1"
                                :space-between="10"
                                class="padding-bottom-lg"
                                :navigation="{
                                    nextEl: '.custom-session-swiper-button-next',
                                    prevEl: '.custom-session-swiper-button-prev'
                                }"
                                :pagination="{ clickable: true }"
                                :scrollbar="{ draggable: true }"
                                :breakpoints="{
                                    '640': {
                                        slidesPerView: 1,
                                        spaceBetween: 20
                                    },
                                    '768': {
                                        slidesPerView: 2,
                                        spaceBetween: 40
                                    },
                                    '1024': {
                                        slidesPerView: 4,
                                        spaceBetween: 50
                                    }
                                }"
                            >
                                <SwiperSlide
                                    class="d-flex border-radius-sm flex-column padding-md bg-dark-60"
                                    v-for="(session, index) in sessions"
                                    :key="session.session_token"
                                >
                                    <div class="d-flex justify-content-end">
                                        <iPhone
                                            v-if="
                                                session.platform.startsWith(
                                                    'iPhone'
                                                )
                                            "
                                            class="swiper-slide-avatar margin-bottom-sm"
                                            :class="
                                                session.platform
                                                    .split(' ')[0]
                                                    .toLowerCase()
                                            "
                                        />
                                        <Android
                                            v-else-if="
                                                session.platform.startsWith(
                                                    'Android'
                                                )
                                            "
                                            class="swiper-slide-avatar margin-bottom-sm"
                                            :class="
                                                session.platform
                                                    .split(' ')[0]
                                                    .toLowerCase()
                                            "
                                        />
                                        <Windows
                                            v-else-if="
                                                session.platform.startsWith(
                                                    'Windows'
                                                )
                                            "
                                            class="swiper-slide-avatar margin-bottom-sm"
                                            :class="
                                                session.platform
                                                    .split(' ')[0]
                                                    .toLowerCase()
                                            "
                                        />
                                        <Linux
                                            v-else-if="
                                                session.platform.startsWith(
                                                    'Linux'
                                                )
                                            "
                                            class="swiper-slide-avatar margin-bottom-sm"
                                            :class="
                                                session.platform
                                                    .split(' ')[0]
                                                    .toLowerCase()
                                            "
                                        />
                                        <Mac
                                            v-else-if="
                                                session.platform.startsWith(
                                                    'Mac'
                                                )
                                            "
                                            class="swiper-slide-avatar margin-bottom-sm"
                                            :class="
                                                session.platform
                                                    .split(' ')[0]
                                                    .toLowerCase()
                                            "
                                        />
                                        <Devices
                                            v-else
                                            class="swiper-slide-avatar margin-bottom-sm"
                                            :class="
                                                session.platform
                                                    .split(' ')[0]
                                                    .toLowerCase()
                                            "
                                        />
                                    </div>

                                    <div
                                        class="text-left font-color-light font-sm"
                                    >
                                        <div
                                            v-if="session.current"
                                            class="mb-0 font-sm word-break-all"
                                        >
                                            <span
                                                class="font-sm font-color-secondary active-session hover-help"
                                                :title="session.session_token"
                                            >
                                                (This Session)
                                            </span>
                                        </div>
                                        <div class="mb-0">
                                            <span
                                                class="font-sm hover-help"
                                                :title="session.user_agent"
                                                >{{ session.browser }}</span
                                            >
                                        </div>
                                        <div class="mb-0 font-sm">
                                            {{ session.platform }}
                                        </div>
                                        <div
                                            v-if="session.created"
                                            class="mb-0 font-sm"
                                        >
                                            Active
                                            <time
                                                class="hover-help"
                                                :title="
                                                    moment(session.timestamp)
                                                "
                                                :datetime="
                                                    moment(
                                                        session.timestamp
                                                    ).toISOString()
                                                "
                                            >
                                                {{ session.created }}
                                            </time>
                                        </div>
                                        <div
                                            class="d-flex justify-content-end delete-session-modal"
                                        >
                                            <Modal
                                                v-if="!session.current"
                                                :id="`deleteSession${index}`"
                                                label="delete-session-header"
                                                :backdrop="false"
                                            >
                                                <template
                                                    v-slot:button="buttonProps"
                                                >
                                                    <button
                                                        class="edit-mode-btn delete border-radius-lg"
                                                        v-bind="buttonProps"
                                                    >
                                                        <IconTrash
                                                            class="profile-edit-icon"
                                                        />
                                                    </button>
                                                </template>
                                                <template v-slot:modalTitle>
                                                    <h5
                                                        class="delete-session-header font-base font-color-light"
                                                    >
                                                        Are you sure you want to
                                                        delete this session?
                                                    </h5>
                                                </template>
                                                <template v-slot:modalContent>
                                                    <form
                                                        @submit.prevent="
                                                            deleteSession(
                                                                $event
                                                            )
                                                        "
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="SessionToken"
                                                            :value="
                                                                session.session_token
                                                            "
                                                        />
                                                        <button
                                                            type="submit"
                                                            class="btn-outline-danger-full font-color-danger font-sm"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            Yes
                                                        </button>
                                                    </form>
                                                </template>
                                            </Modal>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            <div
                                class="d-flex justify-content-between margin-top-sm"
                            >
                                <div>
                                    <button
                                        class="custom-swiper-button custom-session-swiper-button-prev"
                                    >
                                        &lt;
                                    </button>
                                </div>
                                <div>
                                    <button
                                        class="custom-swiper-button custom-session-swiper-button-next"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import Modal from '@/components/general/Modal.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import AccountMenu from '@/components/layout/AccountMenu.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import Button from '@/components/general/Button.vue'
import Toggle from '@/components/general/Toggle.vue'
import U2FDevice from '@/components/icons/U2FDevice.vue'
import iPhone from '@/components/icons/iPhone.vue'
import Android from '@/components/icons/Android.vue'
import Windows from '@/components/icons/Windows.vue'
import Linux from '@/components/icons/Linux.vue'
import Mac from '@/components/icons/Mac.vue'
import Devices from '@/components/icons/Devices.vue'
import { encode, decode } from '@qix/base64url-arraybuffer'
import { Modal as BSModal } from 'bootstrap'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        Swiper,
        SwiperSlide,
        ValidationMessage,
        LoadingComponent,
        AccountMenu,
        IconTrash,
        Modal,
        TextInput,
        Button,
        Toggle,
        U2FDevice,
        iPhone,
        Android,
        Windows,
        Linux,
        Mac,
        Devices
    },
    data() {
        return {
            modules: [Navigation, Pagination, Scrollbar, A11y],
            display_name: window.localStorage.getItem('/account/display'),
            member_avatar: window.localStorage.getItem('/member/email_md5'),
            member_email: window.localStorage.getItem('/member/email'),
            message: '',
            messageType: '',
            loading: false,
            mfaEnrollment:
                window.localStorage.getItem('/account/mfa') === 'enroll',
            sessions: [],
            sessionsMessage: '',
            sessionsMessageType: '',
            webauthnSupported: 'credentials' in navigator,
            fidoMessage: '',
            fidoMessageType: '',
            fidoDevices: [],
            publicKeyOptions: {},
            recordId: ''
        }
    },
    created() {
        this.fetchSessions()
    },
    methods: {
        async registerFIDO() {
            this.recordId = ''
            this.publicKeyOptions = ''
            this.fidoMessage = ''
            this.fidoMessageType = ''
            try {
                const response = await Api.get('/webauthn/register').catch(
                    (err) => {
                        this.fidoMessage = err
                        this.fidoMessageType = `error`
                    }
                )
                if (response.status != 201) {
                    this.fidoMessage = `${response.status} ${response.statusText}: Something went wrong. The FIDO device was not registered.`
                    this.fidoMessageType = `error`
                    return
                }
                const options = await response.json()
                this.recordId = options.user.name
                options.user.id = decode(options.user.id)
                options.challenge = decode(options.challenge)
                if (options.excludeCredentials) {
                    for (const cred of options.excludeCredentials) {
                        cred.id = decode(cred.id)
                    }
                }
                this.publicKeyOptions = options
            } catch (error) {
                this.fidoMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. The FIDO device was not registered.`
                this.fidoMessageType = `error`
                return
            }
        },
        async enrollFIDO(event) {
            if (!this.publicKeyOptions || !this.recordId) {
                this.fidoMessage =
                    'FIDO device was not registered and cannot be enrolled, please retry in a moment.'
                this.fidoMessageType = `error`
            }
            const deviceName = event.target.elements['DeviceName'].value
                .toLowerCase()
                .split(' ')
                .join('-')
            const cred = await navigator.credentials.create({
                publicKey: this.publicKeyOptions
            })
            const credential = {}
            credential.record_id = this.recordId
            credential.id = cred.id
            credential.rawId = encode(cred.rawId)
            credential.type = cred.type
            if (cred.response) {
                const clientDataJSON = encode(cred.response.clientDataJSON)
                const attestationObject = encode(
                    cred.response.attestationObject
                )
                credential.response = {
                    clientDataJSON,
                    attestationObject
                }
            }
            try {
                this.loading = true
                const response = await Api.post(
                    `/webauthn/enroll/${deviceName}`,
                    credential
                )
                this.loading = false
                if (response.status != 202) {
                    this.fidoMessage = `${response.status} ${response.statusText}: Something went wrong. The FIDO device was not enrolled.`
                    this.fidoMessageType = `error`
                    return
                }
                const data = await response.json()
                data.created = moment.utc(data.created_at).fromNow()
                this.fidoDevices.push(data)
                this.message = 'Enrolled'
                this.messageType = `success`
                if (window.localStorage.getItem('/member/mfa') !== 'true') {
                    window.localStorage.setItem('/member/mfa', 'true')
                    this.$router.go()
                } else {
                    const modal = BSModal.getInstance(
                        document.getElementById('enrollModal')
                    )
                    if (modal?._isShown) {
                        modal.hide()
                    }
                }
            } catch (error) {
                this.loading = false
                this.fidoMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.fidoMessageType = `error`
            }
        },
        async deleteDevice(event) {
            const recordId = event.target.elements['RecordId'].value
            try {
                this.loading = true
                const response = await Api.delete(
                    `/webauthn/delete/${recordId}`
                )
                this.loading = false
                if (response.status != 202) {
                    this.fidoMessage = `${response.status} ${response.statusText}: Something went wrong. The FIDO device was not removed.`
                    this.fidoMessageType = `error`
                    return
                }
                this.fidoMessage = 'Removed device'
                this.fidoMessageType = `success`
                for (const [index, device] of this.fidoDevices.entries()) {
                    if (device.record_id === recordId) {
                        this.fidoDevices.splice(index, 1)
                        break
                    }
                }
                if (this.fidoDevices.length === 0) {
                    window.localStorage.setItem('/member/mfa', '')
                    this.$router.go()
                }
            } catch (error) {
                this.loading = false
                this.fidoMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.fidoMessageType = `error`
            }
        },
        async fetchSessions() {
            this.loading = true
            try {
                const response = await Api.get(`/sessions`, { timeout: 30000 })
                if (response.status === 204) {
                    this.sessionsMessage = 'Issue loading sessions'
                    this.sessionsMessageType = 'error'
                    this.sessions = []
                    this.loading = false
                    return
                } else if (response.status !== 200) {
                    this.sessionsMessage = `${response.status} ${response.statusText}`
                    this.sessionsMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.sessions = data.sessions.map((session) => {
                    session.created = moment.utc(session.timestamp).fromNow()
                    return session
                })
                this.fidoDevices = data.fido_devices.map((item) => {
                    item.created = moment.utc(item.created_at).fromNow()
                    return item
                })
            } catch (error) {
                this.sessionsMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.sessionsMessageType = 'error'
            }
            this.loading = false
        },
        async deleteSession(event) {
            this.loading = true
            try {
                const sessionToken = event.target.elements['SessionToken'].value
                const response = await Api.delete(`/revoke/${sessionToken}`)
                if (response.status != 202) {
                    this.sessionsMessage =
                        "Something went wrong. session couldn't be deleted."
                    this.sessionsMessageType = 'error'
                    this.loading = false
                    return
                }
                this.sessionsMessage = 'This session was deleted'
                this.sessionsMessageType = 'success'
                for (const [index, session] of this.sessions.entries()) {
                    if (session.session_token === sessionToken) {
                        this.sessions.splice(index, 1)
                        break
                    }
                }
            } catch (error) {
                this.sessionsMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.sessionsMessageType = 'error'
            }
            this.loading = false
        },
        async handleToggle(event) {
            this.loading = true
            try {
                const setting = event.target.checked ? 'enroll' : 'opt_out'
                const response = await Api.get(`/account/mfa/${setting}`)
                this.loading = false
                if (response.status !== 202) {
                    this.message = `${response.status} ${response.statusText}`
                    this.messageType = `error`
                    this.loading = false
                    event.target.checked = this.mfaEnrollment
                    return
                }
                this.mfaEnrollment = event.target.checked
                window.localStorage.setItem('/account/mfa', setting)
                this.message = `Updated successfully`
                this.messageType = `success`
            } catch (error) {
                this.loading = false
                this.message =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.messageType = 'error'
            }
        }
    }
}
</script>
<style lang="scss">
.delete-device-modal,
.delete-session-modal {
    .modal {
        --bs-modal-width: 800px;
        overflow: hidden;
    }
    .modal-dialog {
        margin: auto 0;
    }
}
</style>
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
        width: 50px;
        height: 50px;

        &.linux {
            background: color('light-60');
            border-radius: 50%;
        }
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

.active-session {
    border-bottom: none;
}

.modal {
    --bs-modal-width: 800px;
}
</style>
