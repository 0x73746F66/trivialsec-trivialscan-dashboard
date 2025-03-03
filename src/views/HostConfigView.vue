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
                    <div
                        class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
                    >
                        <h3
                            class="font-color-light font-lg-b modal-invite-header"
                        >
                            Scanner Configuration
                        </h3>
                        <Modal id="inviteModal" label="modal-invite-header">
                            <template v-slot:button="buttonProps">
                                <Button
                                    v-bind="buttonProps"
                                    class="btn-outline-primary-sm font-color-primary font-sm"
                                    text="Add Configuration"
                                />
                            </template>
                            <template v-slot:modalTitle>
                                <h5 class="font-base-b font-color-light">
                                    Add configuration
                                </h5>
                            </template>
                            <template v-slot:modalContent>
                                <form @submit.prevent="addConfig($event)">
                                    <TextInput
                                        placeholder="The hostname to monitor"
                                        id="Hostname"
                                        label="Hostname"
                                        :required="true"
                                        v-model="inputHostname"
                                        @keydown.enter="handleInput"
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
                    <div class="table-responsive-lg" v-if="configs.length > 0">
                        <table class="table table-dark font-color-light">
                            <thead>
                                <tr>
                                    <th scope="col">Hostname</th>
                                    <th scope="col">Ports</th>
                                    <th scope="col">HTTP Paths</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody v-for="(config, key) in configs" :key="key">
                                <tr>
                                    <td scope="row">
                                        <RouterLink
                                            :to="{
                                                name: 'hostname',
                                                params: {
                                                    hostname: config.hostname
                                                }
                                            }"
                                            class="text-decoration-none"
                                        >
                                            <IconTarget
                                                class="link-icon margin-right-xxs"
                                                color="e2c878"
                                            />
                                            <span class="font-color-secondary">
                                                {{ config.hostname }}
                                            </span>
                                        </RouterLink>
                                    </td>
                                    <td>{{ config.ports.join(',') }}</td>
                                    <td class="pre-wrap">
                                        {{ config.path_names.join('\n') }}
                                    </td>
                                    <td>
                                        {{
                                            config.enabled
                                                ? 'Monitoring'
                                                : 'Deactivated'
                                        }}
                                    </td>
                                    <td>
                                        <div
                                            class="d-flex justify-content-end edit-config-modal"
                                        >
                                            <Modal
                                                :id="`editConfig${config.id}`"
                                                label="edit-config-header"
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
                                                    <span
                                                        class="font-lg-sb font-color-secondary"
                                                    >
                                                        {{ config.hostname }}
                                                    </span>
                                                </template>
                                                <template v-slot:modalContent>
                                                    <HostConfigForm
                                                        v-bind="config"
                                                        v-model:loading="
                                                            loading
                                                        "
                                                        v-model:message="
                                                            message
                                                        "
                                                        v-model:messageType="
                                                            messageType
                                                        "
                                                        @deleteConfig.once="
                                                            handleDeleteConfig
                                                        "
                                                        @updateEnabled="
                                                            handleEnabled
                                                        "
                                                        @updatePorts="
                                                            handlePorts
                                                        "
                                                        @updatePathNames="
                                                            handlePathNames
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
import IconTarget from '@/components/icons/IconTarget.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import TextArea from '@/components/inputs/TextArea.vue'
import Toggle from '@/components/general/Toggle.vue'
import Button from '@/components/general/Button.vue'
import Modal from '@/components/general/Modal.vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        AccountMenu,
        HostConfigForm,
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
            loading: false,
            display_name: localStorage.getItem('/account/display'),
            member_avatar: localStorage.getItem('/member/email_md5'),
            member_email: localStorage.getItem('/member/email'),
            configs: [],
            inputHostname: ''
        }
    },
    mounted() {
        this.fetchConfig()
    },
    methods: {
        async addConfig(event) {
            this.loading = true
            const hostname = event.target.elements['Hostname'].value
            const response = await Api.get(`/scanner/deactivate/${hostname}`)
            if (response.status !== 200) {
                this.message = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                this.messageType = 'error'
                this.loading = false
                return
            }
            this.inputHostname = ''
            this.message = `Added ${hostname} configuration.`
            this.messageType = `success`
            this.configs.push({
                hostname,
                enabled: false,
                path_names: ['/'],
                ports: [443]
            })
            this.loading = false
        },
        async handleEnabled(hostname, enabled) {
            const configs = []
            for (const config of this.configs) {
                if (config.hostname === hostname) {
                    config.enabled = enabled
                }
                configs.push(config)
            }
            this.configs = configs
        },
        async handlePorts(hostname, ports) {
            const configs = []
            for (const config of this.configs) {
                if (config.hostname === hostname) {
                    config.ports = ports
                }
                configs.push(config)
            }
            this.configs = configs
        },
        async handlePathNames(hostname, path_names) {
            const configs = []
            for (const config of this.configs) {
                if (config.hostname === hostname) {
                    config.path_names = path_names
                }
                configs.push(config)
            }
            this.configs = configs
        },
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
                let confId = 0
                this.configs = data.map((conf) => {
                    conf.id = ++confId
                    conf.dateAgo = moment.utc(conf.timestamp).fromNow()
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
        },
        async handleDeleteConfig(hostname) {
            for (const [index, config] of this.configs.entries()) {
                if (config.hostname === hostname) {
                    setTimeout(() => this.configs.splice(index, 1), 5000)
                    break
                }
            }
        },
        async handleInput() {
            this.inputHostname = ''
            if (this.inputHostname.length > 0) {
                if (this.inputHostname.includes('://')) {
                    this.inputHostname = this.inputHostname.split('://')[1]
                }
                if (this.inputHostname.includes('/')) {
                    this.inputHostname = this.inputHostname.split('/')[0]
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
.modal {
    --bs-modal-width: 800px;
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
