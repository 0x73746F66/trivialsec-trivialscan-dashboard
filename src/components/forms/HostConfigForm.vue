<template>
    <div
        class="d-flex flex-column bg-dark-40 border-radius-sm padding-sm margin-bottom-lg"
    >
        <div class="d-flex align-items-center">
            <span class="font-sm-b font-color-light margin-right-xs"
                >Monitoring</span
            >
            <Toggle
                :defaultChecked="enabled"
                @change="hostToggleChange($event)"
            />
        </div>
        <div class="http-paths-field">
            <TextArea
                placeholder="Separate each path per line"
                id="http-paths"
                label="HTTP Paths"
                :textDefault="pathsField"
                @change="handlePathNames"
            />
        </div>
        <div class="http-paths-field">
            <TextArea
                placeholder="Separate each port number with a comma"
                id="ports"
                size="sm"
                label="Port Numbers"
                :textDefault="portsField"
                @change="handlePorts"
            />
            <div class="col-12" v-if="!enabled">
                <div class="d-flex justify-content-end delete-config-modal">
                    <form @submit.prevent="deleteConfig">
                        <button
                            type="submit"
                            class="font-color-danger delete border-radius-lg font-sm"
                            data-bs-dismiss="modal"
                        >
                            <IconTrash />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import TextInput from '@/components/inputs/TextInput.vue'
import TextArea from '@/components/inputs/TextArea.vue'
import Toggle from '@/components/general/Toggle.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import Modal from '@/components/general/Modal.vue'
</script>

<script>
export default {
    emits: [
        'update:loading',
        'update:message',
        'update:messageType',
        'updateEnabled',
        'updatePathNames',
        'updatePorts',
        'deleteConfig'
    ],
    props: {
        enabled: {
            type: Boolean,
            default: false
        },
        path_names: {
            type: Array,
            default: ['/']
        },
        ports: {
            type: Array,
            default: [443]
        },
        hostname: {
            type: String
        },
        dateAgo: {
            type: String
        },
        timestamp: {
            type: Number
        }
    },
    components: {
        TextInput,
        TextArea,
        Toggle,
        IconTrash,
        Modal
    },
    data() {
        return {
            id: null,
            pathsField: '',
            portsField: ''
        }
    },
    mounted() {
        this.id = this._uid
        this.pathsField = this.path_names
            .filter((i) => typeof i === 'string')
            .map((i) => i.trim())
            .join('\n')
        this.portsField = this.ports
            .filter((i) => typeof i === 'number')
            .join(',')
    },
    methods: {
        async handlePathNames(httpPaths) {
            this.$emit('update:loading', true)
            const http_paths = [
                ...new Set(
                    httpPaths.split(/\r?\n|\r|\n/g).filter((i) => i.length > 0)
                )
            ]
            try {
                const response = await Api.post(`/scanner/config`, {
                    hostname: this.hostname,
                    http_paths
                })
                this.$emit('update:loading', false)
                if (response.status === 406) {
                    this.$emit('update:message', `Invalid Hostname`)
                    this.$emit('update:messageType', `error`)
                    return
                }
                if (response.status === 204) {
                    this.$emit('update:message', `No change`)
                    this.$emit('update:messageType', `success`)
                    return
                }
                if (response.status !== 202) {
                    this.$emit(
                        'update:message',
                        `${response.status} ${response.statusText}: Something went wrong. HTTP paths configuration couldn't be updated.`
                    )
                    this.$emit('update:messageType', `error`)
                    return
                }
                this.$emit(
                    'update:message',
                    `The HTTP paths configuration for ${this.hostname} was updated`
                )
                this.$emit('update:messageType', `success`)
                this.$emit('updatePathNames', this.hostname, http_paths)
            } catch (error) {
                this.$emit(
                    'update:message',
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                )
                this.$emit('update:messageType', `error`)
            }
            this.$emit('update:loading', false)
        },
        async handlePorts(portsList) {
            this.$emit('update:loading', true)
            const ports = [...new Set(portsList.split(','))]
            try {
                const response = await Api.post(`/scanner/config`, {
                    hostname: this.hostname,
                    ports
                })
                this.$emit('update:loading', false)
                if (response.status === 406) {
                    this.$emit('update:message', `Invalid Hostname`)
                    this.$emit('update:messageType', `error`)
                    return
                }
                if (response.status === 204) {
                    this.$emit('update:message', `No change`)
                    this.$emit('update:messageType', `success`)
                    return
                }
                if (response.status !== 202) {
                    this.$emit(
                        'update:message',
                        `${response.status} ${response.statusText}: Something went wrong. ports configuration couldn't be updated.`
                    )
                    this.$emit('update:messageType', `error`)
                    return
                }
                this.$emit(
                    'update:message',
                    `The ports configuration for ${this.hostname} was updated`
                )
                this.$emit('update:messageType', `success`)
                this.$emit('updatePorts', this.hostname, ports)
            } catch (error) {
                this.$emit(
                    'update:message',
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                )
                this.$emit('update:messageType', `error`)
            }
            this.$emit('update:loading', false)
        },
        async deleteConfig() {
            this.$emit('update:loading', true)
            try {
                const response = await Api.delete(
                    `/scanner/config/${this.hostname}`
                )
                this.$emit('update:loading', false)
                if (response.status === 406) {
                    this.$emit('update:message', `Invalid Hostname`)
                    this.$emit('update:messageType', `error`)
                    return
                }
                if (response.status === 204) {
                    this.$emit('update:message', `No change`)
                    this.$emit('update:messageType', `success`)
                    return
                }
                if (response.status !== 202) {
                    this.$emit(
                        'update:message',
                        `${response.status} ${response.statusText}: Something went wrong. configuration couldn't be deleted.`
                    )
                    this.$emit('update:messageType', `error`)
                    return
                }
                this.$emit(
                    'update:message',
                    `The configuration for ${this.hostname} was deleted`
                )
                this.$emit('update:messageType', `success`)
                this.$emit('deleteConfig', this.hostname)
            } catch (error) {
                this.$emit(
                    'update:message',
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                )
                this.$emit('update:messageType', `error`)
            }
            this.$emit('update:loading', false)
        },
        async hostToggleChange(e) {
            this.$emit('update:loading', true)
            try {
                if (e.target.checked === true) {
                    const response = await Api.get(
                        `/scanner/monitor/${this.hostname}`
                    )
                    this.$emit('update:loading', false)
                    if (response.status === 204) {
                        this.$emit('update:message', `No change`)
                        this.$emit('update:messageType', `success`)
                        return
                    }
                    if (response.status === 402) {
                        this.$emit(
                            'update:message',
                            `Quota has been exhausted, no more monitoring is possible. Upgrade the account or stop monitoring another host`
                        )
                        this.$emit('update:messageType', `warning`)
                        e.target.checked = false
                        return
                    }
                    if (response.status === 406) {
                        this.$emit('update:message', `Invalid Hostname`)
                        this.$emit('update:messageType', `error`)
                        e.target.checked = false
                        return
                    }
                    if (response.status !== 200) {
                        this.$emit(
                            'update:message',
                            `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        )
                        this.$emit('update:messageType', 'error')
                        e.target.checked = false
                        return
                    }
                    this.$emit('update:message', `Monitoring ${this.hostname}.`)
                    this.$emit('update:messageType', `success`)
                    this.$emit('updateEnabled', this.hostname, true)
                } else {
                    const response = await Api.get(
                        `/scanner/deactivate/${this.hostname}`
                    )
                    this.$emit('update:loading', false)
                    if (response.status === 406) {
                        this.$emit('update:message', `Invalid Hostname`)
                        this.$emit('update:messageType', `error`)
                        e.target.checked = true
                        return
                    }
                    if (response.status !== 200) {
                        this.$emit(
                            'update:message',
                            `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        )
                        this.$emit('update:messageType', `error`)
                        e.target.checked = true
                        return
                    }
                    this.$emit(
                        'update:message',
                        `No longer monitoring ${this.hostname}.`
                    )
                    this.$emit('update:messageType', `success`)
                    this.$emit('updateEnabled', this.hostname, false)
                }
            } catch (error) {
                this.$emit(
                    'update:message',
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                )
                this.$emit('update:messageType', `error`)
                e.target.checked = false
            }
            this.$emit('update:loading', false)
        }
    }
}
</script>
<style scoped lang="scss">
.delete {
    border: none;
    background: none;
    border-radius: 50%;
    transition: 0.2s linear;
    height: 40px;
    width: 40px;

    svg {
        width: 30px;
        height: 30px;
    }
    &:hover {
        background: color('danger');
    }
}
</style>
