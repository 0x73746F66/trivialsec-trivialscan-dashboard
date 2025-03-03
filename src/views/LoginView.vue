<template>
    <div class="container margin-top-sm">
        <div
            class="profile-container bg-dark-40 border-radius-sm margin-bottom-lg d-flex flex-column align-items-center"
        >
            <div class="col-lg-6 col-12">
                <ValidationMessage
                    v-if="message.length > 0"
                    class="justify-content-start"
                    :message="message"
                    :type="messageType"
                />
                <div v-if="magic_link">
                    <h2
                        class="font-lg-sb font-color-light text-center"
                        v-if="loadingMessage"
                    >
                        {{ loadingMessage }}
                    </h2>
                    <InlineLoading :loading="loading" />
                </div>
                <div v-else class="margin-top-md">
                    <h2 class="font-lg-sb font-color-light text-center">
                        Passkey (FIDO) Login
                    </h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import InlineLoading from '@/components/general/InlineLoading.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoginForm from '@/components/forms/LoginForm.vue'
import { encode, decode } from '@qix/base64url-arraybuffer'
</script>

<script>
let apiUrl = import.meta.env.VITE_API_URL.trim()
apiUrl = `${apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl}`
export default {
    components: {
        InlineLoading,
        ValidationMessage,
        LoginForm
    },
    data() {
        return {
            magic_link: '',
            loading: true,
            message: '',
            messageType: '',
            loadingMessage: 'Checking credentials',
            webauthnSupported: 'credentials' in navigator
        }
    },
    created() {
        this.fetchSession()
    },
    methods: {
        async fetchSession() {
            if (!this.$route.params.magic_link) {
                this.loading = false
                this.loadingMessage = ''
                this.message = 'No Magic Link provided'
                this.messageType = 'warning'
                return
            }
            this.magic_link = this.$route.params.magic_link
            const response = await fetch(
                `${apiUrl}/magic-link/${this.magic_link}`
            ).catch((errors) => {
                console.error(errors)
                setTimeout(() => window.user_notify(`Errors`, errors), 3000)
            })
            this.loading = false
            if (response.status !== 200) {
                const errMessage =
                    response.status === 204
                        ? `This 1-time use magic link has already been used`
                        : `An error occurred and has been logged`
                setTimeout(
                    () =>
                        window.user_notify(
                            `${response.status} ${response.statusText}`,
                            errMessage
                        ),
                    3000
                )
                this.$router.push('/')
                return
            }
            const data = await response.json()
            if (
                this.webauthnSupported &&
                data.member.mfa &&
                data.fido_options
            ) {
                this.loadingMessage = 'Confirm 2FA to complete login'
                return this.promptFido(data.fido_options, data.member.email)
            }
            if (!!data.session.access_token) {
                this.saveSessionData(data.account, data.session, data.member)
                window.initPusher()
                data.session.access_token = null
                localStorage.setItem(`/me`, JSON.stringify(data))
                this.$router.push({
                    name:
                        data?.account?.mfa === 'enroll' &&
                        data?.member?.mfa !== true
                            ? 'security'
                            : 'reports'
                })
                return
            }
            this.message =
                'Magic Link error, no session could be established. Please try again.'
            this.messageType = 'error'
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
            this.loadingMessage = 'Verifying Credentials'
            this.loading = true
            try {
                const response = await Api.post('/webauthn/login', credential)
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
                    this.loadingMessage = 'Verified!'
                    window.initPusher()
                    data.session.access_token = null
                    localStorage.setItem(`/me`, JSON.stringify(data))
                    this.$router.push({ name: 'profile' })
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
<style scoped lang="scss">
.profile-container {
    padding: spacers('md');

    @media (min-width: breakpoints('lg')) {
        padding: spacers('xl');
    }
}
</style>
