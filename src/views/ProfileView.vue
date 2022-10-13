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
                        <span class="font-base-sb margin-right-sm ">Created:</span>
                        <span class="font-sm font-sm">{{created}}</span>
                    </div>
                    <div class="d-flex margin-bottom-sm align-items-center">
                        <span class="font-base-sb margin-right-sm">Status:</span>
                        <span class="font-sm font-sm">{{status}}</span>
                    </div>
                    <div class="d-flex margin-bottom-sm align-items-center">
                        <span class="font-base-sb margin-right-sm">Client Account Name:</span>
                        <span class="font-sm font-sm">{{account.name}}</span>
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
                            <span class="font-sm font-sm">{{account.active_plan.credit_card}}</span>
                        </div>
                        <div class="d-flex margin-bottom-sm align-items-center">
                            <span class="font-base-sb margin-right-sm">Issuer:</span>
                            <span class="font-sm font-sm">{{account.active_plan.issuer}}</span>
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
                            :class="member.email === account.primary_email ? 'user-slider' : '' "
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
                                    {{member.email}}
                                    <span 
                                        v-if="member.email === account.primary_email" 
                                        class="font-sm font-color-secondary"
                                    >
                                        (You)
                                    </span>
                                </p>
                                <p v-if="member.email !== account.primary_email" class="mb-0 font-sm">Guest invited {{member.invited}}</p>
                                <p v-else class="mb-0 font-xs">Owner</p>
                                <p class="mb-0 font-sm">Joined {{member.created}}</p>
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
                                <p class="mb-0 font-base">{{client.name}}</p>
                                <p class="mb-0 font-xs">CLI Version: {{client.cli_version}}</p>
                                <p class="mb-0 font-xs">{{client.ip_addr}}</p>
                                <p class="mb-0 font-xs">{{client.client_info.operating_system}} {{client.client_info.operating_system_version}}</p>
                                <p class="mb-0 font-xs">{{client.client_info.operating_system_release}} {{client.client_info.architecture}}</p>
                                <p class="mb-0 font-sm">Created {{client.created}}</p>
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
    import moment from 'moment'
    import CryptoJS from 'crypto-js'

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
                loading: false,
                error: null,
                report: {},
                api_url: import.meta.env.VITE_API_URL,
                account: {},
                members: [],
                clients: [],
            }
        },
        created() {
            // watch the params of the route to fetch the data again
            this.$watch(
                () => this.$route.params,
                () => {
                    this.fetchProfile()
                },
                // fetch the data when the view is created and the data is
                // already being observed
                { immediate: true }
            )
        },
        methods: {
            async fetchProfile() {
                if (!!localStorage.getItem('/session/key')) {
                    this.loading = true
                    const req_url = `${this.api_url}/me`
                    const ts = moment().utc().unix()
                    const url = new URL(req_url)
                    const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
                    console.log(canonical_string)
                    const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, localStorage.getItem('/session/key'))
                    hash.update(canonical_string)
                    const mac = hash.finalize()
                    const header = `HMAC id="${localStorage.getItem('/member/email')}", mac="${mac}", ts="${ts}"`
                    console.log(header)
                    const response = await fetch(req_url, {
                        headers: {"Authorization": header}
                    }).catch(error => {
                        this.error = error
                        this.loading = false
                    })
                    this.loading = false
                    if (response.status !== 200) {
                        alert(`${response.status} ${response.statusText}`)
                    } else {
                        const data = await response.json()
                        console.log(data)
                        this.account = data.account
                        this.email_md5 = data.email_md5
                        this.confirmed = data.confirmed
                        this.status = data.confirmed ? "Confirmed" : "Pending activation"
                        this.created = moment(data.timestamp).fromNow()
                        // placeholders
                        this.account.active_plan = {
                            label: "Community Edition",
                            price: "FREE",
                            credit_card: "xxxx-xxxx-xxxx-1234",
                            issuer: "VISA",
                        }
                        this.fetchClients()
                        this.fetchMembers()
                    }
                }
            },
            async fetchClients() {
                if (!!localStorage.getItem('/session/key')) {
                    this.loading = true
                    const req_url = `${this.api_url}/clients`
                    const ts = moment().utc().unix()
                    const url = new URL(req_url)
                    const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
                    console.log(canonical_string)
                    const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, localStorage.getItem('/session/key'))
                    hash.update(canonical_string)
                    const mac = hash.finalize()
                    const header = `HMAC id="${localStorage.getItem('/member/email')}", mac="${mac}", ts="${ts}"`
                    console.log(header)
                    const response = await fetch(req_url, {
                        headers: {"Authorization": header}
                    }).catch(error => {
                        this.error = error
                        this.loading = false
                    })
                    this.loading = false
                    if (response.status === 404) {
                        this.members = []
                    } else if (response.status !== 200) {
                        alert(`${response.status} ${response.statusText}`)
                    } else {
                        const data = await response.json()
                        console.log(data)
                        this.clients = data.map(client => {
                            client.created = moment(client.timestamp).fromNow()
                            return client
                        })
                    }
                }
            },
            async fetchMembers() {
                if (!!localStorage.getItem('/session/key')) {
                    this.loading = true
                    const req_url = `${this.api_url}/members`
                    const ts = moment().utc().unix()
                    const url = new URL(req_url)
                    const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
                    console.log(canonical_string)
                    const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, localStorage.getItem('/session/key'))
                    hash.update(canonical_string)
                    const mac = hash.finalize()
                    const header = `HMAC id="${localStorage.getItem('/member/email')}", mac="${mac}", ts="${ts}"`
                    console.log(header)
                    const response = await fetch(req_url, {
                        headers: {"Authorization": header}
                    }).catch(error => {
                        this.error = error
                        this.loading = false
                    })
                    this.loading = false
                    if (response.status === 404) {
                        this.members = []
                    } else if (response.status !== 200) {
                        alert(`${response.status} ${response.statusText}`)
                    } else {
                        const data = await response.json()
                        console.log(data)
                        this.members = data.map(member => {
                            member.created = moment(member.timestamp).fromNow()
                            member.status = data.confirmed ? "Confirmed" : "Pending activation"
                            return member
                        })
                    }
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