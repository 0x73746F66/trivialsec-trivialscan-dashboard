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
                        Scanner Configuration
                    </h2>
                    <ValidationMessage :message="message" :type="messageType" />
                    <div class="d-flex flex-column justify-content-between">
                        <template v-for="(config, key) in configs" :key="key">
                            <HostConfigForm
                                v-if="!config.deleted"
                                v-bind="config"
                                v-model:loading="loading"
                                v-model:message="message"
                                v-model:messageType="messageType"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import AccountMenu from '@/components/layout/AccountMenu.vue'
import HostConfigForm from '@/components/forms/HostConfigForm.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        AccountMenu,
        HostConfigForm,
        LoadingComponent,
        ValidationMessage
    },
    data() {
        return {
            message: '',
            messageType: '',
            loading: false,
            display_name: localStorage.getItem('/account/display'),
            member_avatar: localStorage.getItem('/member/email_md5'),
            member_email: localStorage.getItem('/member/email'),
            configs: []
        }
    },
    mounted() {
        this.fetchConfig()
    },
    methods: {
        async fetchConfig() {
            this.loading = true
            try {
                const response = await Api.get(`/scanner/config`, {
                    timeout: 30000
                })
                if (response.status !== 200) {
                    this.message = `${response.status} ${response.statusText}`
                    this.messageType = `error`
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.configs = data.map((conf) => {
                    conf.dateAgo = moment.utc(conf.timestamp).fromNow()
                    conf.deleted = false
                    return conf
                })
            } catch (error) {
                this.message =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.messageType = 'error'
            }
            this.loading = false
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
