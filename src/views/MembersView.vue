<template>
    <LoadingComponent class="loading" :class="{ inactive: !loading }" />
    <main>
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
                    <div class="profile-members-section d-flex flex-column">
                        <div
                            class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
                        >
                            <ValidationMessage
                                v-if="errorMessage.length > 0"
                                class="justify-content-between"
                                :message="errorMessage"
                                :type="errorMessageType"
                            />
                            <h2
                                class="font-color-light font-xxl-b margin-bottom-lg"
                            >
                                Members
                            </h2>
                            <Modal id="inviteModal" label="modal-invite-header">
                                <template v-slot:button="buttonProps">
                                    <Button
                                        v-bind="buttonProps"
                                        class="btn-outline-primary-sm font-color-primary font-sm"
                                        text="Invite Member"
                                    />
                                </template>
                                <template v-slot:modalTitle>
                                    <h5 class="font-base-b font-color-light">
                                        Invite member
                                    </h5>
                                </template>
                                <template v-slot:modalContent>
                                    <form
                                        @submit.prevent="inviteMembers($event)"
                                    >
                                        <ValidationMessage
                                            v-if="inviteMessage.length > 0"
                                            class="justify-content-between"
                                            :message="inviteMessage"
                                            :type="inviteMessageType"
                                        />
                                        <EmailInput
                                            placeholder="Who do you want to invite?"
                                            id="InviteEmail"
                                            label="E-mail"
                                            :required="true"
                                        />
                                        <Button
                                            class="btn-outline-primary-full font-color-primary font-sm"
                                            text="Invite"
                                            type="submit"
                                        />
                                    </form>
                                </template>
                            </Modal>
                        </div>
                        <div class="d-flex w-100">
                            <ValidationMessage
                                v-if="memberDeleteMessage.length > 0"
                                class="justify-content-start"
                                :message="memberDeleteMessage"
                                :type="memberDeleteMessageType"
                            />
                        </div>
                        <div class="margin-top-sm">
                            <Swiper
                                :modules="modules"
                                :slides-per-view="1"
                                :space-between="10"
                                class="padding-bottom-lg"
                                :navigation="{
                                    nextEl: '.custom-member-swiper-button-next',
                                    prevEl: '.custom-member-swiper-button-prev'
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
                                    :class="member.current ? 'user-slider' : ''"
                                    v-for="(member, index) in members"
                                    :key="member.email_md5"
                                >
                                    <div class="d-flex justify-content-end">
                                        <img
                                            :src="`https://www.gravatar.com/avatar/${member.email_md5}?d=wavatar`"
                                            class="swiper-slide-avatar margin-bottom-sm"
                                            alt=""
                                        />
                                    </div>

                                    <div
                                        class="text-left font-color-light font-sm"
                                    >
                                        <p class="mb-0 font-sm word-break-all">
                                            {{ member.email }}
                                            <span
                                                v-if="member.current"
                                                class="font-sm font-color-secondary"
                                            >
                                                (You)
                                            </span>
                                        </p>
                                        <p class="mb-0 font-sm">
                                            {{ member.status }}
                                        </p>
                                        <p
                                            v-if="member.confirmed"
                                            class="mb-0 font-sm"
                                        >
                                            Joined {{ member.created }}
                                        </p>
                                        <p v-else class="mb-0 font-sm">
                                            Invited {{ member.created }}
                                        </p>
                                        <div
                                            class="d-flex justify-content-end delete-member-modal"
                                        >
                                            <Modal
                                                v-if="!member.current"
                                                :id="`deleteMember${index}`"
                                                label="delete-member-header"
                                                :backdrop="false"
                                            >
                                                <template
                                                    v-slot:button="buttonProps"
                                                >
                                                    <button
                                                        class="edit-mode-btn delete border-radius-lg"
                                                        v-bind="buttonProps"
                                                    >
                                                        <IconTrash
                                                            class="profile-edit-icon"
                                                        />
                                                    </button>
                                                </template>
                                                <template v-slot:modalTitle>
                                                    <h5
                                                        class="delete-member-header font-base font-color-light"
                                                    >
                                                        Are you sure you want to
                                                        delete this member?
                                                    </h5>
                                                </template>
                                                <template v-slot:modalContent>
                                                    <form
                                                        @submit.prevent="
                                                            deleteMember($event)
                                                        "
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="MemberEmail"
                                                            :value="
                                                                member.email
                                                            "
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
                            <div
                                class="d-flex justify-content-between margin-top-sm"
                            >
                                <div>
                                    <button
                                        class="custom-swiper-button custom-member-swiper-button-prev"
                                    >
                                        &lt;
                                    </button>
                                </div>
                                <div>
                                    <button
                                        class="custom-swiper-button custom-member-swiper-button-next"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import AccountMenu from '@/components/layout/AccountMenu.vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import IconTrash from '@/components/icons/IconTrash.vue'
import Button from '@/components/general/Button.vue'
import Toggle from '@/components/general/Toggle.vue'
import EmailInput from '@/components/inputs/EmailInput.vue'
import Modal from '@/components/general/Modal.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import moment from 'moment'
</script>

<script>
export default {
    components: {
        AccountMenu,
        Button,
        Swiper,
        SwiperSlide,
        Toggle,
        IconTrash,
        EmailInput,
        Modal,
        ValidationMessage,
        LoadingComponent
    },
    created() {
        this.fetchMembers()
    },
    data() {
        return {
            display_name: localStorage.getItem('/account/display'),
            member_avatar: localStorage.getItem('/member/email_md5'),
            member_email: localStorage.getItem('/member/email'),
            modules: [Navigation, Pagination, Scrollbar, A11y],
            loading: false,
            members: [],
            errorMessage: '',
            errorMessageType: '',
            inviteMessage: '',
            inviteMessageType: '',
            memberDeleteMessage: '',
            memberDeleteMessageType: ''
        }
    },
    methods: {
        async inviteMembers(event) {
            this.loading = true
            try {
                const response = await Api.post('/member/invite', {
                    email: event.target.elements['InviteEmail'].value
                })
                if (response.status !== 202) {
                    this.inviteMessage = `${response.status} ${response.statusText}`
                    this.inviteMessageType = 'error'
                    this.loading = false
                    return
                }
                this.inviteMessage = 'Invited!'
                this.inviteMessageType = 'success'
                const member = await response.json()
                member.created = moment.utc(member.timestamp).fromNow()
                member.status = 'Pending Activation'
                this.members.push(member)
            } catch (error) {
                this.inviteMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.inviteMessageType = 'error'
            }
            this.loading = false
        },
        async deleteMember(event) {
            this.loading = true
            try {
                const memberEmail = event.target.elements['MemberEmail'].value
                const response = await Api.delete(`/member/${memberEmail}`)
                if (response.status != 202) {
                    this.memberDeleteMessage =
                        "Something went wrong. Member couldn't be deleted."
                    this.memberDeleteMessageType = 'error'
                    this.loading = false
                    return
                }
                this.memberDeleteMessage = 'This member was deleted'
                this.memberDeleteMessageType = 'success'
                for (const [index, member] of this.members.entries()) {
                    if (member.email === memberEmail) {
                        this.members.splice(index, 1)
                        break
                    }
                }
            } catch (error) {
                this.memberDeleteMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.memberDeleteMessageType = 'error'
            }
            this.loading = false
        },
        async fetchMembers() {
            this.loading = true
            try {
                const response = await Api.get(`/members`, { timeout: 30000 })
                if (response.status === 204) {
                    this.errorMessage = 'Issue loading members'
                    this.errorMessageType = 'error'
                    this.members = []
                    this.loading = false
                    return
                } else if (response.status !== 200) {
                    this.errorMessage = `${response.status} ${response.statusText}`
                    this.errorMessageType = 'error'
                    this.loading = false
                    return
                }
                const data = await response.json()
                this.members = data.map((member) => {
                    member.created = moment.utc(member.timestamp).fromNow()
                    member.status = member.confirmed
                        ? 'Confirmed'
                        : 'Pending Activation'
                    return member
                })
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
.delete-member-modal {
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
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
    .swiper-wrapper {
        padding-bottom: spacers('sm');
    }
}
.user-slider {
    border: 1px solid color('secondary');
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
