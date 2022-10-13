<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="profile-container bg-dark-40 border-radius-sm margin-bottom-lg d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start">
                <div class="h-100 d-flex align-items-lg-center flex-column flex-lg-row">
                    <img 
                        :src="`https://www.gravatar.com/avatar/${email_md5}`" 
                        class="border-radius-round profile-picture margin-right-md margin-bottom-md mb-lg-0" 
                        alt="{{account.display}}'s Profile Picture'"
                    >
                    <div class="d-flex flex-column justify-content-start">
                        <div class="d-flex flex-column justify-content-start">
                            <h1 class="font-xl-b font-color-light">
                                {{account.display}}
                            </h1>
                            <EditableTextField :editMode="editMode">
                                <template #staticField>
                                    <span class="font-base font-color-light">
                                        {{account.primary_email}}
                                    </span>
                                </template>
                                <template #inputField>
                                    <span class="font-base font-color-light">
                                        <TextInput
                                            :placeholder="account.primary_email"
                                            id="PrimaryEmail"
                                            label="Email"
                                            :required="true"
                                        />
                                    </span>
                                </template>
                            </EditableTextField>
                        </div>
                        <ValidationMessage
                            v-if="this.emailUpdateMessage.length > 0" 
                            class="justify-content-start"
                            :message="this.emailUpdateMessage"
                            :type="this.emailUpdateMessageType"
                        />
                    </div>
                </div>
                <button class="edit-mode-btn" v-if="!editMode" @click="toggleEditMode()">
                    <IconPencil class="profile-edit-icon"/>
                </button>
                <div v-else>
                    <div class="d-flex justify-content-end">
                        <button class="edit-mode-btn" @click="toggleEditMode()"><IconCancel class="profile-edit-icon" color="f45e5e"/></button>
                        <button class="edit-mode-btn" @click="updateEmail()"><checkIcon class="profile-edit-icon" color="1abb9c"/></button>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-start flex-column flex-lg-row">
                <div class="d-flex flex-column font-color-light align-items-start margin-top-md margin-bottom-md">
                    <div class="d-flex margin-bottom-sm align-items-center">
                        <span class="font-base-sb margin-right-sm ">IP Address:</span>
                        <span class="font-sm font-sm">{{account.ip_addr}}</span>
                    </div>
                    <div class="d-flex margin-bottom-sm align-items-center">
                        <span class="font-base-sb margin-right-sm">User Agent:</span>
                        <span class="font-sm font-sm">{{account.user_agent}}</span>
                    </div>
                    <div class="d-flex margin-bottom-sm align-items-center">
                        <span class="font-base-sb margin-right-sm">API Key:</span>
                        <span class="font-sm font-sm">{{account.api_key}}</span>
                    </div>
                    <Button 
                        class="btn-outline-primary-sm font-color-primary font-sm" 
                        text="Generate Client Credential"
                        @click="generateClientCredential()"
                    />
                </div>

                <div class="d-flex flex-column bg-dark-60 padding-sm border-radius-sm font-color-light w-100">
                    <div class="d-flex flex-column justify-content-between">
                        <div class="d-flex flex-column flex-lg-row justify-content-between margin-bottom-sm">
                            <div class="margin-right-lg d-flex flex-lg-row flex-column">
                                <span class="font-base-sb margin-right-sm margin-bottom-sm">Active Plan:</span>
                                <span class="font-sm font-sm">{{account.active_plan.label}}</span>
                            </div>
                            <span class="font-color-primary font-lg-b">{{account.active_plan.price}}</span>
                        </div>
                        
                        <div class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Credit Card:</span>
                            <span class="font-sm font-sm">{{credit_card}}</span>
                        </div>
                        <div class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Issuer:</span>
                            <span class="font-sm font-sm">{{issuer}}</span>
                        </div>
                        <div class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column">
                            <span class="font-base-sb margin-right-sm">Billing Mail Address:</span>
                            <span class="font-sm font-sm">{{account.billing_email}}</span>
                        </div>
                        <div class="d-flex flex-lg-row flex-column">
                            <a 
                                href="/stripe" 
                                class="text-decoration-none d-flex align-items-center justify-content-center margin-right-sm margin-bottom-sm mb-lg-0 btn-outline-primary-full font-color-primary font-sm" 
                                text="See Payments"
                            />
                            <Button 
                                class="btn-fill-primary-full font-color-light font-sm" 
                                text="Upgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-container bg-dark-40 border-radius-sm d-flex flex-column">
            <div class="profile-members-section d-flex flex-column">
                <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
                    <h3 class="font-color-light font-lg-b modal-invite-header">Members</h3>
                    <Modal id="inviteModal" label="modal-invite-header">
                        <template v-slot:button="buttonProps">
                            <Button 
                                v-bind="buttonProps" 
                                class="btn-outline-primary-sm font-color-primary font-sm" 
                                text="Invite Members"
                            />
                        </template>
                        <template v-slot:modalTitle>
                            <h5 class="font-base-b font-color-light">Invite members</h5>
                        </template>
                        <template v-slot:modalContent>
                            <form @submit.prevent="inviteMembers()">
                                <ValidationMessage 
                                    v-if="this.inviteMessage.length > 0" 
                                    class="justify-content-between"
                                    :message="this.inviteMessage"
                                    :type="this.inviteMessageType"
                                />
                                <EmaiInput 
                                    placeholder="Who do you want to invite?"
                                    id="id-invite-email"
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
                        v-if="this.memberDeleteMessage.length > 0" 
                        class="justify-content-start" 
                        :message="this.memberDeleteMessage" 
                        :type="this.memberDeleteMessageType" 
                    />
                </div>    
                <div class="margin-top-sm">
                    <swiper
                        :modules="modules"
                        :slides-per-view="1"
                        :space-between="10"
                        :navigation="{ 
                            nextEl: '.custom-member-swiper-button-next', 
                            prevEl: '.custom-member-swiper-button-prev' 
                        }"
                        :pagination="{ clickable: true }"
                        :scrollbar="{ draggable: true }"
                        :breakpoints="{
                            '640': {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            '768': {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            '1024': {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }"
                        @swiper="onSwiper"
                        @slideChange="onSlideChange"
                    >
                        <swiper-slide 
                            class="d-flex border-radius-sm flex-column padding-md bg-dark-60"
                            :class="member.account.ip_addr === account.ip_addr ? 'user-slider' : '' "
                            v-for="(member, index) in members" 
                            :key="member.email_md5"
                        >
                            <div class="d-flex justify-content-end">
                                <img 
                                    :src="`https://www.gravatar.com/avatar/${member.email_md5}`" 
                                    class="swiper-slide-avatar margin-bottom-sm" 
                                    alt=""
                                />
                            </div>

                            <div class="text-left font-color-light font-sm">
                                <p class="mb-0 font-base">
                                    {{member.account.display}}
                                    <span 
                                        v-if="member.account.ip_addr === account.ip_addr" 
                                        class="font-sm font-color-secondary"
                                    >
                                        (You)
                                    </span>
                                </p>
                                <p class="mb-0 font-sm">{{member.account.primary_email}}</p>                            
                                <p class="mb-0 font-sm">{{member.account.api_key}}</p>                            
                                <p class="mb-0 font-sm">{{member.account.ip_addr}}</p>                            
                                <p class="mb-0 font-sm">{{member.account.user_agent}}</p>
                                <p class="mb-0 font-sm">{{member.email_md5}}</p>
                                <div class="d-flex justify-content-end delete-member-modal">
                                    <Modal :id="`deleteMember${index}`" label="delete-member-header">
                                        <template v-slot:button=buttonProps>
                                            <button class="edit-mode-btn" v-bind='buttonProps'>
                                                <IconTrash class="profile-edit-icon"/>                                                
                                            </button>
                                        </template>

                                        <template v-slot:modalTitle>
                                            <h5 class="delete-member-header font-base font-color-light">Are you sure you want to delete this member?</h5>
                                        </template>
                                        <template v-slot:modalContent>
                                            <div class="d-flex w-100">
                                                <Button 
                                                    class="btn-outline-danger-full font-color-danger font-sm" 
                                                    text="Yes"
                                                    @click="deleteMember()"
                                                />
                                            </div>
                                        </template>
                                    </Modal>
                                </div>
                            </div>
                                                    
                        </swiper-slide>
                    </swiper>
                    <div class="d-flex justify-content-between margin-top-sm padding-bottom-sm border-bottom-light-20">
                        <div>
                            <button class="custom-swiper-button custom-member-swiper-button-prev font-color-light"> &lt; </button>
                        </div>
                        <div>
                            <button class="custom-swiper-button custom-member-swiper-button-next font-color-light"> &gt; </button>
                        </div>
                    </div>
                </div>
            </div> 

            <div class="client-members-section d-flex flex-column margin-top-lg">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="font-color-light font-lg-b">Clients</h3>
                </div>
                <div class="d-flex w-100">
                    <ValidationMessage 
                        v-if="this.toggleFeedMessage.length > 0" 
                        class="justify-content-start"
                        :message="this.toggleFeedMessage"
                        :type="this.toggleFeedMessageType"
                    />
                </div>
                <div class="margin-top-sm">
                    <swiper
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
                                spaceBetween: 20,
                            },
                            '768': {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            '1024': {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }"
                        @swiper="onSwiper"
                        @slideChange="onSlideChange"
                    >
                        <swiper-slide 
                            class="d-flex border-radius-sm flex-column padding-md bg-dark-60"
                            v-for="client in clients" 
                            :key="client.account.ip_addr"
                        >
                            <div class="text-left font-color-light font-sm">
                                <p class="mb-0 font-base">{{client.client_info.operating_system}}</p>
                                <p class="mb-0 font-xs">{{client.client_info.operating_system_version}}</p>                            
                                <p class="mb-0 font-xs">{{client.client_info.operating_system_release}}</p>                            
                                <p class="mb-0 font-xs">{{client.client_info.architecture}}</p>                            
                            </div>
                            <div class="d-flex justify-content-end">
                                <Toggle :defaultChecked=client.active @change="toggleClientFeed($event)"/>
                            </div>                      
                        </swiper-slide>
                    </swiper>
                    <div class="d-flex justify-content-between margin-top-sm">
                        <div>
                            <button class="custom-swiper-button custom-client-swiper-button-prev font-color-light"> &lt; </button>
                        </div>
                        <div>
                            <button class="custom-swiper-button custom-client-swiper-button-next font-color-light"> &gt; </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script> 
    import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
    import { Swiper, SwiperSlide  } from 'swiper/vue';
    
    import 'swiper/css';

    import IconPencil from "../components/icons/IconPencil.vue";
    import IconCancel from '../components/icons/IconCancel.vue';
    import IconTrash from '../components/icons/IconTrash.vue';
    import checkIcon from '../components/icons/checkIcon.vue';
    import Button from "../components/general/Button.vue";
    import Toggle from "../components/general/Toggle.vue";
    import EditableTextField from '../components/inputs/EditableTextField.vue';
    import TextInput from '../components/inputs/TextInput.vue';
    import EmaiInput from '../components/inputs/EmaiInput.vue';
    import Modal from "../components/general/Modal.vue";
    import ValidationMessage from '../components/general/ValidationMessage.vue';

    export default {
        components: {
            IconPencil,
            Button,
            Swiper,
            SwiperSlide,
            Toggle,
            EditableTextField,
            TextInput,
            IconCancel,
            checkIcon,
            IconTrash,
            EmaiInput,
            Modal,
            ValidationMessage
        },
        setup() {
            return {
                modules: [Navigation, Pagination, Scrollbar, A11y],
            };
        },
        data() {
            return {
                "account": {
                    "name": "name",
                    "display": "Display Name",
                    "primary_email": "user@example.com",
                    "billing_email": "user@example.com",
                    "api_key": "a51f2de9-5287-4dac-b30b-ad303ed35aa8",
                    "ip_addr": "129.144.50.56.",
                    "user_agent": "user_agent",
                    "timestamp": 0,
                    "active_plan": {
                        "label": "Current Plan",
                        "price": "$999.99"
                    }
                },
                "members": [
                    {
                        "account": {
                            "name": "name",
                            "display": "display",
                            "primary_email": "user@example.com",
                            "billing_email": "user@example.com",
                            "api_key": "api_key",
                            "ip_addr": "129.144.50.56.",
                            "user_agent": "user_agent",
                            "timestamp": 0
                        },
                        "email": "user@example.com",
                        "email_md5": "email_md5",
                        "confirmed": false,
                        "confirmation_token": "string",
                        "ip_addr": "string",
                        "user_agent": "string",
                        "timestamp": 0
                    },
                    {
                        "account": {
                        "name": "string",
                        "display": "string",
                        "primary_email": "user@example.com",
                        "billing_email": "user@example.com",
                        "api_key": "string",
                        "ip_addr": "string",
                        "user_agent": "string",
                        "timestamp": 0
                    },
                        "email": "user@example.com",
                        "email_md5": "string",
                        "confirmed": false,
                        "confirmation_token": "string",
                        "ip_addr": "string",
                        "user_agent": "string",
                        "timestamp": 0
                    },
                    {
                        "account": {
                        "name": "string",
                        "display": "string",
                        "primary_email": "user@example.com",
                        "billing_email": "user@example.com",
                        "api_key": "string",
                        "ip_addr": "string",
                        "user_agent": "string",
                        "timestamp": 0
                    },
                        "email": "user@example.com",
                        "email_md5": "string",
                        "confirmed": false,
                        "confirmation_token": "string",
                        "ip_addr": "string",
                        "user_agent": "string",
                        "timestamp": 0
                    },
                    {
                        "account": {
                        "name": "string",
                        "display": "string",
                        "primary_email": "user@example.com",
                        "billing_email": "user@example.com",
                        "api_key": "string",
                        "ip_addr": "string",
                        "user_agent": "string",
                        "timestamp": 0
                    },
                        "email": "user@example.com",
                        "email_md5": "string",
                        "confirmed": false,
                        "confirmation_token": "string",
                        "ip_addr": "string",
                        "user_agent": "string",
                        "timestamp": 0
                    }
                ],
                "clients": [
                    {
                        "account": {
                            "name": "name 1",
                            "display": "display 1",
                            "primary_email": "primary_email@example.com",
                            "billing_email": "billing_email@example.com",
                            "api_key": "api_key",
                            "ip_addr": "ip_addr",
                            "user_agent": "user_agent",
                            "timestamp": 0
                        },
                        "client_info": {
                            "operating_system": "operating_system",
                            "operating_system_release": "operating_system_release",
                            "operating_system_version": "operating_system_version",
                            "architecture": "architecture"
                        },
                        "name": "name",
                        "cli_version": "cli_version",
                        "access_token": "access_token",
                        "ip_addr": "ip_addr",
                        "user_agent": "user_agent",
                        "timestamp": 0,
                        "active": false
                    },
                    {
                        "account": {
                            "name": "name 2",
                            "display": "display 2",
                            "primary_email": "primary_email@example.com",
                            "billing_email": "billing_email@example.com",
                            "api_key": "api_key",
                            "ip_addr": "ip_addr",
                            "user_agent": "user_agent",
                            "timestamp": 0
                        },
                        "client_info": {
                            "operating_system": "operating_system",
                            "operating_system_release": "operating_system_release",
                            "operating_system_version": "operating_system_version",
                            "architecture": "architecture"
                        },
                        "name": "name",
                        "cli_version": "cli_version",
                        "access_token": "access_token",
                        "ip_addr": "ip_addr",
                        "user_agent": "user_agent",
                        "timestamp": 0,
                        "active": false
                    },
                    {
                        "account": {
                            "name": "name 3",
                            "display": "display 3",
                            "primary_email": "primary_email@example.com",
                            "billing_email": "billing_email@example.com",
                            "api_key": "api_key",
                            "ip_addr": "ip_addr",
                            "user_agent": "user_agent",
                            "timestamp": 0
                        },
                        "client_info": {
                            "operating_system": "operating_system",
                            "operating_system_release": "operating_system_release",
                            "operating_system_version": "operating_system_version",
                            "architecture": "architecture"
                        },
                        "name": "name",
                        "cli_version": "cli_version",
                        "access_token": "access_token",
                        "ip_addr": "ip_addr",
                        "user_agent": "user_agent",
                        "timestamp": 0,
                        "active": false
                    }
                ],
                "email": "user@example.com",
                "email_md5": "205e460b479e2e5b48aec07710c08d50",
                "confirmed": false,
                "confirmation_token": "string",
                "ip_addr": "string",
                "user_agent": "string",
                "timestamp": 0,
                "credit_card": "xxxx-xxxx-xxxx-1234",
                "issuer": "xxxx",
                editMode: false,
                inviteMessage: "",
                inviteMessageType: "",
                emailUpdateMessage: "",
                emailUpdateMessageType: "",
                memberDeleteMessage: "",
                memberDeleteMessageType: "",
                toggleFeedMessage: "",
                toggleFeedMessageType: ""
            }
        },
        methods: {
            toggleEditMode() {
                this.editMode = !this.editMode;
                this.emailUpdateMessage = "";
                this.emailUpdateMessageType  = "";
            },
            updateEmail() {
                console.log("API CALL");
                this.emailUpdateMessage = "E-mail was updated!"
                this.emailUpdateMessageType = "success"
                this.editMode= !this.editMode;
            },
            inviteMembers(){
                console.log("invite members - API CALL");
                this.inviteMessage = "E-mail was sent!"
                this.inviteMessageType = "success"
            },
            deleteMember(){
                console.log("member deleted");
                this.memberDeleteMessage = "Member was deleted"
                this.memberDeleteMessageType = "success"
                console.log("delete member")
                console.log("return new list of members")
            },
            generateClientCredential(){
                console.log("generate client credentail")
            },
            toggleClientFeed($event) {
                if($event.target.checked === true) {
                    // API call to disable feed
                    console.log("checked")
                    this.toggleFeedMessage = "Feed was enabled with success"
                    this.toggleFeedMessageType = "success"
                } else {
                    // API call to enable feed
                    this.toggleFeedMessage = "Feed was disabled with success"
                    this.toggleFeedMessageType = "success"
                }
            }
        }
    }
</script>

<style lang="scss">
    .profile {
        &-picture {
            border: 1px solid color("secondary");
            width: 100px;
            height: 100px;
            object-fit: cover;
        }
        &-edit-icon {
            width: 25px;
            height: 25px;
            cursor: pointer;
        }
        &-container {
            padding: spacers('md');

            @media (min-width: $breakpoint-lg) {
                padding: spacers('xl');
            }
        }
    }
    .swiper-slide {
        &-avatar {
            border-radius: 50%;
            width: 50px;
            height: 50px;
        }
        .swiper-wrapper {
            padding-bottom: spacers("sm");
        }
    }
    .user-slider {
        border: 1px solid color("secondary");
    }
    .custom-swiper-button {
        position: relative;
        border-radius: radius('sm');
        padding:  0 padding('xs');
        background: color('dark-60');
        color: color(light);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s linear;
        border: 1px solid color("dark");

        &:hover {
            border: 1px solid color("secondary");
            color: color('secondary');
        }

        &:disabled {
            color: color("light-20");
            background: none;
            border: 1px solid color("light-20");
            display: none;
        }
    }
    .edit-mode-btn {
        border: none;
        background: none;
    }
    #deleteMember {
        .modal-dialog {
            margin-top: 0;
            margin-bottom: 0;
            height: 100%;
            .modal-content {
                height: 100%;
                .modal-body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }   
</style>