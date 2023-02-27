<template>
    <div class="container margin-top-sm">
        <div
            class="profile-container bg-dark-40 border-radius-sm margin-bottom-lg d-flex flex-column"
        >
            <ValidationMessage
                v-if="message.length > 0"
                class="justify-content-start"
                :message="message"
                :type="messageType"
            />
            <h2
                class="font-lg-sb font-color-light text-center"
                v-if="loadingMessage"
            >
                {{ loadingMessage }}
            </h2>
            <InlineLoading :loading="loading" />
        </div>
    </div>
</template>

<script setup>
import PagePlaceholder from '@/components/PagePlaceholder.vue'
import InlineLoading from '@/components/general/InlineLoading.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
</script>

<script>
let apiUrl = import.meta.env.VITE_API_URL.trim()
apiUrl = `${apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl}`
export default {
    components: {
        PagePlaceholder
    },
    data() {
        return {
            loading: true,
            message: '',
            messageType: '',
            loadingMessage: 'Checking credentials'
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
                this.messageType = 'error'
                return
            }
            const response = await fetch(
                `${apiUrl}/magic-link/${this.$route.params.magic_link}`
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
            localStorage.setItem(
                '/account/name',
                data?.account?.name || localStorage.getItem('/account/name')
            )
            localStorage.setItem(
                '/account/display',
                data?.account?.display ||
                    localStorage.getItem('/account/display')
            )
            localStorage.setItem(
                '/account/mfa',
                data?.account?.mfa || localStorage.getItem('/account/mfa')
            )
            localStorage.setItem(
                '/member/email',
                data?.member?.email || localStorage.getItem('/member/email')
            )
            localStorage.setItem(
                '/member/email_md5',
                data?.member?.email_md5 ||
                    localStorage.getItem('/member/email_md5')
            )
            localStorage.setItem(
                '/member/mfa',
                data?.member?.mfa || localStorage.getItem('/member/mfa')
            )
            localStorage.setItem(
                '/session/key',
                data?.session?.access_token ||
                    localStorage.getItem('/session/key')
            )
            if (localStorage.getItem('/session/key')) {
                window.initPusher()
                data.session.access_token = null
                localStorage.setItem(`/me`, JSON.stringify(data))
                this.$router.push({
                    name:
                        data?.account?.mfa === 'enroll' &&
                        data?.member?.mfa !== true
                            ? 'security'
                            : 'profile'
                })
                this.loadingMessage = ''
                return
            }
            this.message =
                'Magic Link error, no session could be established. Please try again.'
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
