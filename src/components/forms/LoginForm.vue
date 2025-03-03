<template>
    <LoadingComponent
        class="modal-loading loading"
        :class="{ inactive: !loading }"
    />

    <form class="login-form" @submit.prevent="login">
        <ValidationMessage
            class="justify-content-between"
            :message="message"
            :type="messageType"
        />

        <EmailInput
            placeholder="Send an email with login link"
            id="id-email-1"
            label="Email"
            :required="true"
            :model="emailField"
            @change="handleEmail"
        />

        <Button
            class="btn-outline-primary-full font-xl-sb font-color-primary"
            text="Login"
        />
    </form>
</template>
<script setup>
import EmailInput from '@/components/inputs/EmailInput.vue'
import Button from '@/components/general/Button.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import { encode, decode } from '@qix/base64url-arraybuffer'
import { Modal } from 'bootstrap'
</script>
<script>
let apiUrl = import.meta.env.VITE_API_URL.trim()
apiUrl = `${apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl}`
export default {
    components: { EmailInput, Button, ValidationMessage, LoadingComponent },
    data() {
        return {
            emailField: '',
            message: '',
            messageType: '',
            loading: false,
            webauthnSupported: 'credentials' in navigator
        }
    },
    methods: {
        handleEmail(v) {
            this.emailField = v.target.value
        },
        async login() {
            this.loading = true
            this.message = `Checking Credential`
            this.messageType = 'warning'
            const member_email = this.emailField
            const payload = JSON.stringify({
                email: member_email
            })
            const response = await fetch(`${apiUrl}/magic-link`, {
                method: 'POST',
                body: payload,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).catch((errors) => {
                this.message = `An error has occurred, please try again. ${errors}`
                this.messageType = 'error'
                this.loading = false
            })
            if (response.status === 202) {
                this.message = 'Please check your e-mail to complete login.'
                this.messageType = 'success'
                this.loading = false
                setTimeout(() => this.$router.push('/'), 3000)
            } else if (this.webauthnSupported && response.status === 200) {
                const fido_options = await response.json()
                this.message = 'Confirm 2FA to complete login'
                return this.promptFido(fido_options, member_email)
            } else {
                this.message = `${response.status}: ${response.statusText}. Something went wrong, please try again later.`
                this.messageType = 'error'
                this.loading = false
            }
        },
        saveSessionData(account, session, member) {
            localStorage.setItem(
                '/account/name',
                account.name || localStorage.getItem('/account/name')
            )
            localStorage.setItem(
                '/account/display',
                account.display || localStorage.getItem('/account/display')
            )
            localStorage.setItem(
                '/account/mfa',
                account.mfa || localStorage.getItem('/account/mfa')
            )
            localStorage.setItem(
                '/member/email',
                member.email || localStorage.getItem('/member/email')
            )
            localStorage.setItem(
                '/member/email_md5',
                member.email_md5 || localStorage.getItem('/member/email_md5')
            )
            localStorage.setItem(
                '/member/mfa',
                member.mfa || localStorage.getItem('/member/mfa')
            )
            localStorage.setItem(
                '/session/key',
                session.access_token || localStorage.getItem('/session/key')
            )
        },
        async promptFido(options, member_email) {
            options.challenge = decode(options.challenge)
            for (const allowed of options.allowCredentials) {
                allowed.id = decode(allowed.id)
            }
            const cred = await navigator.credentials.get({
                publicKey: options
            })
            const credential = {}
            credential.id = cred.id
            credential.type = cred.type
            credential.rawId = encode(cred.rawId)
            credential.member_email = member_email

            if (cred.response) {
                const clientDataJSON = encode(cred.response.clientDataJSON)
                const authenticatorData = encode(
                    cred.response.authenticatorData
                )
                const signature = encode(cred.response.signature)
                const userHandle = encode(cred.response.userHandle)
                credential.response = {
                    clientDataJSON,
                    authenticatorData,
                    signature,
                    userHandle
                }
            }
            this.message = "Verifying Credentials"
            this.loading = true
            try {
                const response = await Api.post(
                    '/webauthn/login',
                    credential
                )
                this.loading = false
                if (response.status != 200) {
                    this.message = `${response.status} ${response.statusText}: Something went wrong during FIDO login.`
                    this.messageType = `error`
                    return
                }
                const data = await response.json()
                if (!!data.session.access_token) {
                    this.saveSessionData(
                        data.account,
                        data.session,
                        data.member
                    )
                    this.message = "Verified!"
                    this.messageType = "success"
                    window.initPusher()
                    data.session.access_token = null
                    localStorage.setItem(`/me`, JSON.stringify(data))
                    setTimeout(() => {
                        const modal = Modal.getInstance(document.getElementById('loginModal'))
                        if (modal?._isShown) {
                            modal.hide()
                        }
                        this.$router.push({name: 'reports'})
                    }, 3000)

                    return
                }
            } catch (error) {
                this.message =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. The FIDO device was not registered.`
                this.messageType = `error`
                this.loading = false
                return
            }
            this.message =
                'FIDO error, no session could be established. Please try again.'
            this.messageType = 'error'
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/forms';

.login-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: radius('sm');
    width: 100%;
}
</style>
