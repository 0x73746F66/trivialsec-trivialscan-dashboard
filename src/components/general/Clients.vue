<template>
    <div
        class="clients-section d-flex flex-column margin-top-lg"
        v-if="clients.length > 0"
    >
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="font-color-light font-lg-b">Clients</h3>
        </div>
        <div class="margin-top-sm">
            <Swiper
                class="padding-bottom-lg"
                :modules="modules"
                :slides-per-view="1"
                :space-between="10"
                :navigation="{
                    nextEl: '.custom-client-swiper-button-next',
                    prevEl: '.custom-client-swiper-button-prev'
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
                        slidesPerView: 3,
                        spaceBetween: 50
                    }
                }"
            >
                <SwiperSlide
                    class="d-flex border-radius-sm flex-column padding-md bg-dark-60"
                    v-for="(client, index) in clients"
                    :key="client.name"
                >
                    <div class="text-left font-color-light font-sm">
                        <p
                            class="font-base-sb margin-bottom-sm"
                            v-clipboard:copy="client.name"
                            v-clipboard:success="clientSuccess"
                            v-clipboard:error="clientError"
                        >
                            <span class="hover-help" title="Copy to clipboard">
                                {{ client.name }}
                            </span>
                        </p>
                        <p v-if="client.cli_version" class="mb-0">
                            <span class="font-sm-sb margin-right-sm"
                                >CLI Version:</span
                            >
                            <span class="font-sm">{{
                                client.cli_version
                            }}</span>
                        </p>
                        <p class="mb-0">
                            <span class="font-sm">{{ client.ip_addr }}</span>
                        </p>
                        <p class="mb-0">
                            <span class="font-sm"
                                >{{ client.client_info.operating_system }}
                                {{
                                    client.client_info.operating_system_version
                                }}</span
                            >
                        </p>
                        <p class="margin-bottom-sm">
                            <span class="font-sm"
                                >{{
                                    client.client_info.operating_system_release
                                }}
                                {{ client.client_info.architecture }}</span
                            >
                        </p>
                        <p class="mb-0 font-xs">
                            <span>Created {{ client.created }}</span>
                        </p>
                        <p class="mb-0 font-sm">Registration Token</p>
                        <div
                            class="token font-color-primary bg-dark padding-xs margin-bottom-xs"
                            v-clipboard:copy="client.access_token"
                            v-clipboard:success="tokenSuccess"
                            v-clipboard:error="tokenError"
                        >
                            <span class="hover-help" title="Copy to clipboard">
                                {{ client.access_token }}
                            </span>
                        </div>
                    </div>
                    <div class="d-flex client-actions">
                        <div class="col-6">
                            <Toggle
                                :defaultChecked="client.active"
                                @change="toggleClient($event, client.name)"
                            />
                        </div>
                        <div class="d-flex col-6 justify-content-end">
                            <div
                                class="d-flex justify-content-end delete-client-modal"
                            >
                                <Modal
                                    v-if="!client.active"
                                    :id="`deleteClient${index}`"
                                    label="delete-client-header"
                                    :backdrop="false"
                                >
                                    <template v-slot:button="buttonProps">
                                        <button
                                            class="edit-mode-btn delete"
                                            v-bind="buttonProps"
                                        >
                                            <IconTrash
                                                class="profile-edit-icon"
                                            />
                                        </button>
                                    </template>
                                    <template v-slot:modalTitle>
                                        <h5
                                            class="delete-client-header font-base font-color-light"
                                        >
                                            Are you sure you want to delete this
                                            client?
                                        </h5>
                                    </template>
                                    <template v-slot:modalContent>
                                        <form
                                            @submit.prevent="
                                                deleteClient($event)
                                            "
                                        >
                                            <input
                                                type="hidden"
                                                name="ClientName"
                                                :value="client.name"
                                            />
                                            <button
                                                data-bs-dismiss="modal"
                                                type="submit"
                                                class="btn-outline-danger-full font-color-danger font-sm"
                                            >
                                                Yes
                                            </button>
                                        </form>
                                    </template>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div class="d-flex justify-content-between margin-top-sm">
                <div>
                    <button
                        class="custom-swiper-button custom-client-swiper-button-prev"
                    >
                        &lt;
                    </button>
                </div>
                <div>
                    <button
                        class="custom-swiper-button custom-client-swiper-button-next"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <InlineLoading :loading="loading" />
        <ValidationMessage
            v-if="!loading"
            class="justify-content-start"
            message="Generate a client to utilise the CLI"
            type="warning"
        />
    </div>
</template>

<script setup>
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import Modal from '@/components/general/Modal.vue'
import Toggle from '@/components/general/Toggle.vue'
import EmailInput from '@/components/inputs/EmailInput.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import InlineLoading from '@/components/general/InlineLoading.vue'
import moment from 'moment'
import { Popover } from 'bootstrap'
</script>

<script>
export default {
    emits: ['update:loading', 'update:errorMessage', 'update:errorMessageType'],
    props: {
        clients: { type: Array, default: [] }
    },
    components: {
        Swiper,
        SwiperSlide,
        Toggle,
        EmailInput,
        ValidationMessage,
        InlineLoading
    },
    data() {
        return {
            modules: [Navigation, Pagination, Scrollbar, A11y],
            loading: false
        }
    },
    created() {
        this.fetchClients()
    },
    methods: {
        async tokenSuccess(event) {
            const popover = new Popover(event.trigger, {
                content: 'Copied!',
                placement: 'right'
            })
            popover.show()
            setTimeout(() => {
                popover.hide()
            }, 3000)
        },
        async tokenError(event) {
            const popover = new Popover(event.trigger, {
                content: 'Clipboard failed',
                placement: 'right'
            })
            popover.show()
            setTimeout(() => {
                popover.hide()
            }, 3000)
        },
        async clientSuccess(event) {
            const popover = new Popover(event.trigger, {
                content: 'Copied!',
                placement: 'right'
            })
            popover.show()
            setTimeout(() => {
                popover.hide()
            }, 3000)
        },
        async clientError(event) {
            const popover = new Popover(event.trigger, {
                content: 'Clipboard failed',
                placement: 'right'
            })
            popover.show()
            setTimeout(() => {
                popover.hide()
            }, 3000)
        },
        async deleteClient(event) {
            this.$emit('update:loading', true)
            try {
                const clientName = event.target.elements['ClientName'].value
                const response = await Api.delete(`/client/${clientName}`)
                if (response.status != 202) {
                    this.$emit(
                        'update:errorMessage',
                        "Something went wrong. Client couldn't be deleted"
                    )
                    this.$emit('update:errorMessageType', 'error')
                    this.$emit('update:loading', false)
                    return
                }
                this.$emit('update:errorMessage', 'This client was deleted')
                this.$emit('update:errorMessageType', 'success')
                for (const [index, client] of this.clients.entries()) {
                    if (client.name === clientName) {
                        this.clients.splice(index, 1)
                        break
                    }
                }
            } catch (error) {
                this.$emit(
                    'update:errorMessage',
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                )
                this.$emit('update:errorMessageType', 'error')
            }
            this.$emit('update:loading', false)
        },
        async fetchClients() {
            try {
                this.loading = true
                const response = await Api.get(`/clients`, { timeout: 30000 })
                if (response.status === 204) {
                    this.loading = false
                    return
                } else if (response.status !== 200) {
                    this.$emit(
                        'update:errorMessage',
                        `${response.status} ${response.statusText}`
                    )
                    this.$emit('update:errorMessageType', 'error')
                    this.loading = false
                    return
                }
                const data = await response.json()
                data.forEach((client) => {
                    client.created = moment.utc(client.timestamp).fromNow()
                    this.clients.push(client)
                })
            } catch (error) {
                this.$emit(
                    'update:errorMessage',
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                )
                this.$emit('update:errorMessageType', 'error')
            }
            this.loading = false
        },
        async toggleClient($event, client_name) {
            const deactivate_url = `/deactivated/${client_name}`
            const activate_url = `/activate/${client_name}`
            this.$emit('update:loading', true)
            try {
                if ($event.target.checked === true) {
                    const response = await Api.get(activate_url)
                    if (response.status !== 200) {
                        this.$emit(
                            'update:errorMessage',
                            `${response.status} ${response.statusText}`
                        )
                        this.$emit('update:errorMessageType', 'error')
                        this.$emit('update:loading', false)
                        return
                    }
                    this.$emit(
                        'update:errorMessage',
                        'Client was enabled with success'
                    )
                    this.$emit('update:errorMessageType', 'success')
                    for (const client of this.clients) {
                        if (client_name === client.name) {
                            client.active = true
                            break
                        }
                    }
                } else {
                    const response = await Api.get(deactivate_url)
                    if (response.status !== 200) {
                        this.$emit(
                            'update:errorMessage',
                            `${response.status} ${response.statusText}`
                        )
                        this.$emit('update:errorMessageType', 'error')
                        this.$emit('update:loading', false)
                        return
                    }
                    this.$emit(
                        'update:errorMessage',
                        'Client was disabled with success'
                    )
                    this.$emit('update:errorMessageType', 'success')
                    for (const client of this.clients) {
                        if (client_name === client.name) {
                            client.active = false
                            break
                        }
                    }
                }
            } catch (error) {
                this.$emit(
                    'update:errorMessageType',
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                )
                this.$emit('update:errorMessageType', 'error')
            }
            this.$emit('update:loading', false)
        }
    }
}
</script>
<style scoped lang="scss">
.modal {
    --bs-modal-width: 800px;
}
.delete-client-modal {
    overflow: hidden;
}
.token {
    word-wrap: break-word;
    max-width: fit-content;
}
.client-actions {
    align-items: center;
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
        border-radius: 50%;
        width: 50px;
        height: 50px;
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
</style>
