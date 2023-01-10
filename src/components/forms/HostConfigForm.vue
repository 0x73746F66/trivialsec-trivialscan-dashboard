<template>
    <div
        class="d-flex flex-column bg-dark-40 border-radius-sm padding-sm margin-bottom-lg"
    >
        <div class="d-flex">
            <div class="col-12 col-lg-6 font-lg-b font-color-secondary">
                {{ hostname }}
            </div>
            <div class="col-12 col-lg-6">
                <div class="d-flex justify-content-end delete-config-modal">
                    <Modal
                        v-if="!enabled"
                        :id="`deleteConfig${id}`"
                        label="delete-config-header"
                        :backdrop="false"
                    >
                        <template v-slot:button="buttonProps">
                            <button
                                class="delete border-radius-lg"
                                v-bind="buttonProps"
                            >
                                <IconTrash class="profile-edit-icon" />
                            </button>
                        </template>
                        <template v-slot:modalTitle>
                            <h5
                                class="delete-config-header font-base font-color-light"
                            >
                                Are you sure you want to delete this
                                configuration?
                            </h5>
                        </template>
                        <template v-slot:modalContent>
                            <form @submit.prevent="deleteConfig($event)">
                                <input
                                    type="hidden"
                                    name="Hostname"
                                    :value="hostname"
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
        </div>
        <div class="d-flex align-items-center">
            <span class="font-sm-b font-color-light margin-right-xs"
                >Monitoring</span
            >
            <Toggle
                :defaultChecked="enabled"
                @change="hostToggleChange($event, hostname)"
            />
        </div>
        <div class="http-paths-field">
            <TextArea
                placeholder="Separate each path per line"
                id="http-paths"
                label="HTTP Paths"
                :textDefault="
                    path_names
                        .filter((i) => typeof i === 'string')
                        .map((i) => i.trim())
                        .join('\n')
                "
                @change="handlePathNames"
            />
        </div>
        <div class="http-paths-field">
            <TextArea
                placeholder="Separate each port number with a comma"
                id="ports"
                size="sm"
                label="Port Numbers"
                :textDefault="
                    ports.filter((i) => typeof i === 'number').join(',')
                "
                @change="handlePorts"
            />
        </div>
    </div>
</template>
<script setup>
import TextInput from '@/components/inputs/TextInput.vue'
import TextArea from '@/components/inputs/TextArea.vue'
import Button from '@/components/general/Button.vue'
import Toggle from '@/components/general/Toggle.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import Modal from '@/components/general/Modal.vue'
</script>

<script>
export default {
    emits: ['update:loading', 'update:message', 'update:messageType'],
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
        Button,
        Toggle,
        IconTrash,
        Modal
    },
    data() {
        return {
            id: null
        }
    },
    mounted() {
        this.id = this._uid
    },
    methods: {
        async handlePathNames(event) {
            console.log(`handlePathNames`, event)
        },
        async handlePorts(event) {
            console.log(`handlePorts`, event)
        },
        async deleteConfig(event) {
            this.$emit('update:loading', true)
            try {
                const hostname = event.target.elements['Hostname'].value
                const response = await Api.delete(`/scanner/config/${hostname}`)
                if (response.status != 202) {
                    this.$emit(
                        'update:message',
                        "Something went wrong. configuration couldn't be deleted."
                    )
                    this.$emit('update:messageType', `error`)
                    this.$emit('update:loading', false)
                    return
                }
                this.$emit('update:message', 'This configuration was deleted')
                this.$emit('update:messageType', `success`)
                this.$emit('update:deleted', true)
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
        async hostToggleChange(e, hostname) {
            this.$emit('update:loading', true)
            try {
                if (e.target.checked === true) {
                    const response = await Api.get(
                        `/scanner/monitor/${hostname}`
                    )
                    if (response.status !== 200) {
                        this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageType = 'error'
                        this.$emit('update:loading', false)
                        e.target.checked = false
                        return
                    }
                    this.$emit('update:message', `Monitoring host.`)
                    this.$emit('update:messageType', `success`)
                    this.$emit('update:enabled', true)
                } else {
                    const response = await Api.get(
                        `/scanner/deactivate/${hostname}`
                    )
                    if (response.status !== 200) {
                        this.$emit(
                            'update:message',
                            `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        )
                        this.$emit('update:messageType', `error`)
                        this.$emit('update:loading', false)
                        e.target.checked = false
                        return
                    }
                    this.$emit('update:message', `No longer monitoring host.`)
                    this.$emit('update:messageType', `success`)
                    this.$emit('update:enabled', false)
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
.delete-config-modal {
    overflow: hidden;
}
.modal {
    --bs-modal-width: 800px;
}

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
