<template>
    <div class="profile-sessions-section d-flex flex-column">
        <div
            v-if="false"
            class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
        >
            <h3 class="font-color-light font-base-b modal-invite-header">
                Code Generator (TOTP)
            </h3>
            <div class=""></div>
        </div>
        <div
            class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
        >
            <h3 class="font-color-light font-base-b modal-invite-header">
                Passkey (FIDO) Devices
            </h3>
            <Modal
                v-if="webauthnSupported"
                id="enrollModal"
                label="modal-enroll-header"
            >
                <template v-slot:button="buttonProps">
                    <Button
                        @click="registerU2F()"
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
                    <form @submit.prevent="enrollU2F($event)">
                        <ValidationMessage
                            v-if="errorMessage.length > 0"
                            class="justify-content-between"
                            :message="errorMessage"
                            :type="errorMessageType"
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
                        />
                    </form>
                </template>
            </Modal>
        </div>
        <div class="row col-12" v-if="webauthnDevices.length > 0">
            <U2FDevice />
        </div>
        <div class="row col-12" v-else>
            <ValidationMessage
                class="justify-content-between"
                message="No devices enrolled"
                type="warning"
            />
        </div>
    </div>
</template>

<script setup>
import TextInput from '@/components/inputs/TextInput.vue'
import Button from '@/components/general/Button.vue'
import U2FDevice from '@/components/icons/U2FDevice.vue'
import Modal from '@/components/general/Modal.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import { encode, decode } from 'base64-arraybuffer'
</script>

<script>
export default {
    components: {
        TextInput,
        Button,
        U2FDevice,
        Modal,
        ValidationMessage
    },
    data() {
        return {
            loading: false,
            webauthnSupported: 'credentials' in navigator,
            errorMessage: '',
            errorMessageType: '',
            webauthnDevices: [],
            enrollId: '',
            publicKeyOptions: {}
        }
    },
    methods: {
        async registerU2F() {
            this.enrollId = ''
            this.publicKeyOptions = ''
            this.errorMessage = ''
            this.errorMessageType = ''
            let data
            try {
                const response = await Api.get('/webauthn/register').catch(
                    (err) => {
                        this.errorMessage = err
                        this.errorMessageType = `error`
                    }
                )
                if (response.status != 201) {
                    this.errorMessage = `${response.status} ${response.statusText}: Something went wrong. The U2F device was not registered.`
                    this.errorMessageType = `error`
                    return
                }
                data = await response.json()
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. The U2F device was not registered.`
                this.errorMessageType = `error`
                return
            }
            this.enrollId = data.enrollId
            data.options.user.id = decode(data.options.user.id)
            data.options.challenge = decode(data.options.challenge)
            if (data.options.excludeCredentials) {
                for (const cred of data.options.excludeCredentials) {
                    cred.id = decode(cred.id)
                }
            }
            this.publicKeyOptions = data.options
        },
        async enrollU2F(event) {
            if (!this.publicKeyOptions || !this.enrollId) {
                this.errorMessage =
                    'U2F device was not registered and cannot be enrolled, please retry in a moment.'
                this.errorMessageType = `error`
            }
            const deviceName = event.target.elements['DeviceName'].value
            const cred = await navigator.credentials.create({
                publicKey: this.publicKeyOptions
            })
            const credential = {}
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
                    `/webauthn/enroll/${this.enrollId}/${deviceName}`,
                    credential
                )
                this.loading = false
                if (response.status != 202) {
                    this.errorMessage = `${response.status} ${response.statusText}: Something went wrong. The U2F device was not enrolled.`
                    this.errorMessageType = `error`
                    return
                }
                this.errorMessage = 'Enrolled'
                this.errorMessageType = `success`
            } catch (error) {
                this.loading = false
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = `error`
            }
        }
    }
}
</script>

<style scoped lang="scss">
.delete-session-modal {
    overflow: hidden;
}

.modal {
    --bs-modal-width: 800px;
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
</style>
