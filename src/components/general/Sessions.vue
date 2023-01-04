<template>
    <LoadingComponent class="loading" :class="{ inactive: !loading }" />
    <div class="profile-sessions-section d-flex flex-column">
        <div
            class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
        >
            <h3 class="font-color-light font-lg-b modal-invite-header">
                Sessions
            </h3>
            <ValidationMessage
                v-if="errorMessage.length > 0"
                class="justify-content-between"
                :message="errorMessage"
                :type="errorMessageType"
            />
        </div>
        <div class="margin-top-sm">
            <Swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="10"
                class="padding-bottom-sm"
                :navigation="{
                    nextEl: '.custom-session-swiper-button-next',
                    prevEl: '.custom-session-swiper-button-prev'
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
                        slidesPerView: 4,
                        spaceBetween: 50
                    }
                }"
            >
                <SwiperSlide
                    class="d-flex border-radius-sm flex-column padding-md bg-dark-60"
                    v-for="(session, index) in sessions"
                    :key="session.session_token"
                >
                    <div class="d-flex justify-content-end">
                        <iPhone
                            v-if="session.platform.startsWith('iPhone')"
                            class="swiper-slide-avatar margin-bottom-sm"
                            :class="
                                session.platform.split(' ')[0].toLowerCase()
                            "
                        />
                        <Android
                            v-else-if="session.platform.startsWith('Android')"
                            class="swiper-slide-avatar margin-bottom-sm"
                            :class="
                                session.platform.split(' ')[0].toLowerCase()
                            "
                        />
                        <Windows
                            v-else-if="session.platform.startsWith('Windows')"
                            class="swiper-slide-avatar margin-bottom-sm"
                            :class="
                                session.platform.split(' ')[0].toLowerCase()
                            "
                        />
                        <Linux
                            v-else-if="session.platform.startsWith('Linux')"
                            class="swiper-slide-avatar margin-bottom-sm"
                            :class="
                                session.platform.split(' ')[0].toLowerCase()
                            "
                        />
                        <Mac
                            v-else-if="session.platform.startsWith('Mac')"
                            class="swiper-slide-avatar margin-bottom-sm"
                            :class="
                                session.platform.split(' ')[0].toLowerCase()
                            "
                        />
                        <Devices
                            v-else
                            class="swiper-slide-avatar margin-bottom-sm"
                            :class="
                                session.platform.split(' ')[0].toLowerCase()
                            "
                        />
                    </div>

                    <div class="text-left font-color-light font-sm">
                        <p
                            v-if="session.current"
                            class="mb-0 font-sm word-break-all"
                        >
                            <span
                                class="font-sm font-color-secondary active-session"
                                :title="session.session_token"
                            >
                                (This Session)
                            </span>
                        </p>
                        <p class="mb-0 font-sm">{{ session.browser }}</p>
                        <p class="mb-0 font-sm">{{ session.platform }}</p>
                        <p v-if="session.created" class="mb-0 font-sm">
                            Active {{ session.created }}
                        </p>
                        <div
                            class="d-flex justify-content-end delete-session-modal"
                        >
                            <Modal
                                v-if="!session.current"
                                :id="`deleteSession${index}`"
                                label="delete-session-header"
                                :backdrop="false"
                            >
                                <template v-slot:button="buttonProps">
                                    <button
                                        class="edit-mode-btn delete border-radius-lg"
                                        v-bind="buttonProps"
                                    >
                                        <IconTrash class="profile-edit-icon" />
                                    </button>
                                </template>
                                <template v-slot:modalTitle>
                                    <h5
                                        class="delete-session-header font-base font-color-light"
                                    >
                                        Are you sure you want to delete this
                                        session?
                                    </h5>
                                </template>
                                <template v-slot:modalContent>
                                    <form
                                        @submit.prevent="deleteSession($event)"
                                    >
                                        <input
                                            type="hidden"
                                            name="SessionToken"
                                            :value="session.session_token"
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
                </SwiperSlide>
            </Swiper>
            <div class="d-flex justify-content-between margin-top-sm">
                <div>
                    <button
                        class="custom-swiper-button custom-session-swiper-button-prev"
                    >
                        &lt;
                    </button>
                </div>
                <div>
                    <button
                        class="custom-swiper-button custom-session-swiper-button-next"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import Modal from '@/components/general/Modal.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import iPhone from '@/components/icons/iPhone.vue'
import Android from '@/components/icons/Android.vue'
import Windows from '@/components/icons/Windows.vue'
import Linux from '@/components/icons/Linux.vue'
import Mac from '@/components/icons/Mac.vue'
import Devices from '@/components/icons/Devices.vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        Swiper,
        SwiperSlide,
        IconTrash,
        Modal,
        ValidationMessage,
        LoadingComponent,
        iPhone,
        Android,
        Windows,
        Linux,
        Mac,
        Devices
    },
    data() {
        return {
            modules: [Navigation, Pagination, Scrollbar, A11y],
            loading: false,
            sessions: [],
            errorMessage: '',
            errorMessageType: ''
        }
    },
    mounted() {
        this.fetchSessions()
    },
    methods: {
        async fetchSessions() {
            this.loading = true
            try {
                const response = await Api.get(`/sessions`, { timeout: 30000 })
                if (response.status === 204) {
                    this.errorMessage = 'Issue loading sessions'
                    this.errorMessageType = 'error'
                    this.sessions = []
                    this.loading = false
                    return
                } else if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.sessions = data.map((session) => {
                    session.created = moment.utc(session.timestamp).fromNow()
                    return session
                })
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
            }
            this.loading = false
        },
        async deleteSession(event) {
            this.loading = true
            try {
                const sessionToken = event.target.elements['SessionToken'].value
                const response = await Api.delete(`/revoke/${sessionToken}`)
                if (response.status != 202) {
                    this.errorMessage =
                        "Something went wrong. session couldn't be deleted."
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                this.errorMessage = 'This member was deleted'
                this.errorMessageType = 'success'
                for (const [index, session] of this.sessions.entries()) {
                    if (session.session_token === sessionToken) {
                        this.sessions.splice(index, 1)
                        break
                    }
                }
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
            }
            this.loading = false
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
