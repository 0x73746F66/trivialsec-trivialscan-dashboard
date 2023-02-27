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
                    <MfaConfiguration class="margin-bottom-lg" />
                    <Sessions />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import Sessions from '@/components/general/Sessions.vue'
import MfaConfiguration from '@/components/general/MfaConfiguration.vue'
import Toggle from '@/components/general/Toggle.vue'
import AccountMenu from '@/components/layout/AccountMenu.vue'
</script>

<script>
export default {
    components: {
        ValidationMessage,
        LoadingComponent,
        Sessions,
        MfaConfiguration,
        Toggle,
        AccountMenu
    },
    data() {
        return {
            display_name: window.localStorage.getItem('/account/display'),
            member_avatar: window.localStorage.getItem('/member/email_md5'),
            member_email: window.localStorage.getItem('/member/email'),
            message: '',
            messageType: '',
            loading: false,
            mfaEnrollment:
                window.localStorage.getItem('/account/mfa') === 'enroll'
        }
    },
    methods: {
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
