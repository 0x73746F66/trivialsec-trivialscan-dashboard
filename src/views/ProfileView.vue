<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="padding-xl bg-dark-40 border-radius-sm margin-bottom-lg d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start">
                <div class="h-100 d-flex align-items-lg-center flex-column flex-lg-row">
                    <img 
                        :src="`https://www.gravatar.com/avatar/${email_md5}`" 
                        class="border-radius-round profile-picture margin-right-md margin-bottom-md mb-lg-0" 
                        alt="{{account.display}}'s Profile Picture'"
                    >
                    <div class="d-flex flex-column justify-content-start">
                        <h1 class="font-xl-b font-color-light">
                            {{account.display}}
                        </h1>
                        <span class="font-base font-color-light">
                            {{account.primary_email}}
                        </span>
                    </div>
                </div>
                <IconPencil class="profile-edit-icon"/>
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
                    <Button class="btn-outline-primary-sm font-color-primary font-sm" text="Generate Client Credential"/>
                </div>

                <div class="d-flex flex-column bg-dark-60 padding-sm border-radius-sm font-color-light">
                    <div class="d-flex flex-column justify-content-between">
                        <div class="d-flex justify-content-between margin-bottom-sm">
                            <div class="margin-right-lg">
                                <span class="font-base-sb margin-right-sm margin-bottom-sm">Active Plan:</span>
                                <span class="font-sm font-sm">{{account.active_plan.label}}</span>
                            </div>
                            <span class="font-color-primary font-lg-b">{{account.active_plan.price}}</span>
                        </div>
                        
                        <div class="d-flex margin-bottom-sm align-items-center">
                            <span class="font-base-sb margin-right-sm">Credit Card:</span>
                            <span class="font-sm font-sm">{{credit_card}}</span>
                        </div>
                        <div class="d-flex margin-bottom-sm align-items-center">
                            <span class="font-base-sb margin-right-sm">Issuer:</span>
                            <span class="font-sm font-sm">{{issuer}}</span>
                        </div>
                        <div class="d-flex margin-bottom-sm align-items-center">
                            <span class="font-base-sb margin-right-sm">Billing Mail Address:</span>
                            <span class="font-sm font-sm">{{account.billing_email}}</span>
                        </div>
                        <div class="d-flex">
                            <a 
                                href="/stripe" 
                                class="text-decoration-none d-flex align-items-center justify-content-center margin-right-sm btn-outline-primary-full font-color-primary font-sm" 
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
        <div class="padding-xl bg-dark-40 border-radius-sm d-flex flex-column">
            <div class="profile-members-section d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="font-color-light font-lg-b">Members</h3>
                    <Button class="btn-outline-primary-sm font-color-primary font-sm" text="Invite Members"/>
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
                            v-for="member in members" 
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
                                <Toggle :defaultChecked=client.active />
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
    import Button from "../components/general/Button.vue";
    import Toggle from "../components/general/Toggle.vue"

    export default {
        components: {
            IconPencil,
            Button,
            Swiper,
            SwiperSlide,
            Toggle
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
        }
    }
    .swiper-slide {
        &-avatar {
            border-radius: 50%;
            width: 50px;
            height: 50px;
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
    
</style>