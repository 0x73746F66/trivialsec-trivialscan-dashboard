<template>
    <header>
        <div
            class="nav"
            :class="{
                'nav-logged-in': isLoggedIn
            }"
        >
            <div class="container">
                <div class="row">
                    <div
                        class="col-12 d-flex flex-lg-row flex-column justify-content-between"
                    >
                        <div class="d-flex justify-content-between">
                            <RouterLink
                                to="/"
                                class="text-decoration-none d-flex align-items-center"
                            >
                                <div class="d-flex align-items-center">
                                    <IconTrivialSecurity
                                        alt="Trivial Security"
                                        class="margin-right-lg"
                                        width="50"
                                        height=""
                                    />
                                    <span
                                        class="d-none d-lg-block font-xxl-b font-color-primary nowrap"
                                    >
                                        Trivial Security<CustomPill
                                            v-if="is_dev"
                                            class="margin-left-xs"
                                            label="Testing"
                                            type="secondary"
                                            size="sm"
                                            classes="pill-testing"
                                        />
                                    </span>
                                </div>
                            </RouterLink>

                            <button
                                class="navbar-toggler navbar-dark d-lg-none"
                                type="button"
                                @click="toggleNavbar"
                            >
                                <span class="navbar-toggler-icon"></span>
                            </button>
                        </div>

                        <div
                            class="d-lg-flex d-none flex-column flex-lg-row align-items-center nav-content"
                        >
                            <RouterLink
                                v-if="isLoggedIn"
                                to="/reports"
                                class="router-link font-base font-color-light text-decoration-none margin-right-md"
                                >Reports</RouterLink
                            >
                            <RouterLink
                                v-if="isLoggedIn"
                                to="/logout"
                                class="router-link font-base font-color-light text-decoration-none margin-right-md"
                                >Logout</RouterLink
                            >
                            <RouterLink
                                v-if="!isLoggedIn"
                                to="/pricing"
                                class="router-link font-base font-color-light text-decoration-none margin-right-md"
                                >Pricing</RouterLink
                            >
                            <RouterLink
                                v-if="isLoggedIn"
                                to="/profile"
                                class="router-link d-flex font-color-light text-decoration-none margin-right-md d-flex nav-profile-router"
                            >
                                <div
                                    class="d-flex flex-column align-items-end nav-profile-router-info nowrap"
                                >
                                    <span class="font-base">{{
                                        accountDisplayName
                                    }}</span>
                                    <span class="font-sm">{{
                                        member.email
                                    }}</span>
                                </div>
                                <img
                                    :src="avatarUrl"
                                    :alt="`${accountDisplayName} Profile Picture`"
                                    class="font-xs nav-profile"
                                />
                            </RouterLink>
                            <div
                                class="padding-sm w-100 p-lg-0"
                                v-if="!isLoggedIn"
                            >
                                <div
                                    class="login-register-section d-flex flex-lg-row flex-column align-items-center justify-content-start"
                                >
                                    <button
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#loginModal"
                                        class="btn-fill-primary-full font-xs font-color-light border-0 margin-right-md"
                                    >
                                        Login
                                    </button>
                                    <div class="nav-sep"></div>
                                    <button
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#registerLogin"
                                        class="btn-fill-primary-full font-xs font-color-light border-0"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="d-flex d-lg-none flex-column flex-lg-row align-items-center w-100 nav-transition nav-content"
            :class="{ 'nav-hidden': isNavbarHidden }"
        >
            <RouterLink
                v-if="isLoggedIn"
                to="/reports"
                class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
                @click="toggleNavbar"
                >Reports</RouterLink
            >
            <RouterLink
                v-if="isLoggedIn"
                to="/hosts"
                class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
                @click="toggleNavbar"
                >Hosts</RouterLink
            >
            <RouterLink
                v-if="isLoggedIn"
                to="/profile"
                class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
                @click="toggleNavbar"
                >Profile</RouterLink
            >
            <RouterLink
                v-if="isLoggedIn"
                to="/profile/sessions"
                class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
                @click="toggleNavbar"
                >My Sessions</RouterLink
            >
            <RouterLink
                v-if="isLoggedIn"
                to="/account/members"
                class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
                @click="toggleNavbar"
                >Profile</RouterLink
            >
            <RouterLink
                v-if="isLoggedIn"
                to="/profile/notifications"
                class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
                @click="toggleNavbar"
                >Notifications</RouterLink
            >
            <RouterLink
                v-if="isLoggedIn"
                to="/account/webhooks"
                class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
                @click="toggleNavbar"
                >Webhooks</RouterLink
            >
            <RouterLink
                v-if="isLoggedIn"
                to="/account/host-config"
                class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
                @click="toggleNavbar"
                >Configure</RouterLink
            >
            <RouterLink
                v-if="isLoggedIn"
                to="/logout"
                class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
                @click="toggleNavbar"
                >Logout</RouterLink
            >
            <RouterLink
                v-if="!isLoggedIn"
                to="/pricing"
                class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
                @click="toggleNavbar"
                >Pricing</RouterLink
            >
            <RouterLink
                v-if="isLoggedIn"
                to="/profile"
                class="router-link d-flex margin-top-xs margin-bottom-xs align-items-end font-color-light text-decoration-none margin-right-md d-flex"
                @click="toggleNavbar"
            >
                <div class="d-flex flex-column margin-right-sm align-items-end">
                    <span class="font-base">{{ accountDisplayName }}</span>
                    <span class="font-sm">{{ member.email }}</span>
                </div>
                <img
                    :src="avatarUrl"
                    :alt="`${accountDisplayName} Profile Picture`"
                    class="font-xs nav-profile"
                />
            </RouterLink>
            <div v-if="!isLoggedIn">
                <div class="padding-sm p-lg-0">
                    <div
                        class="login-register-section d-flex flex-lg-row align-items-center justify-content-start"
                    >
                        <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal"
                            class="btn-fill-primary-full font-xs font-color-light border-0"
                        >
                            Login
                        </button>
                        <span
                            class="font-xs-sb font-color-light margin-right-md margin-left-md margin-top-sm margin-bottom-sm my-lg-0"
                        ></span>
                        <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#registerLogin"
                            class="btn-fill-primary-full font-xs font-color-light border-0"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import IconTrivialSecurity from '@/components/icons/IconTrivialSecurity.vue'
import CustomPill from '@/components/general/CustomPill.vue'
</script>

<script>
export default {
    components: {
        IconTrivialSecurity,
        CustomPill
    },
    data() {
        return {
            accountName: window.localStorage.getItem('/account/name'),
            accountDisplayName: window.localStorage.getItem('/account/display'),
            member: {
                email: window.localStorage.getItem('/member/email'),
                email_md5: window.localStorage.getItem('/member/email_md5')
            },
            isLoggedIn: false,
            isNavbarHidden: true,
            is_dev: import.meta.env.DEV
        }
    },
    computed: {
        avatarUrl() {
            return `https://www.gravatar.com/avatar/${this.member.email_md5}?d=wavatar`
        }
    },
    mounted() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params,
            () => {
                this.isLoggedIn = !!window.localStorage.getItem('/session/key')
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
    methods: {
        toggleNavbar() {
            this.isNavbarHidden = !this.isNavbarHidden
        }
    }
}
</script>
<style lang="scss">
header {
    &:after {
        content: '';
        display: block;
        width: 100%;
        height: calc(56px + (spacers('sm') * 2));
        @media (max-width: breakpoints('lg')) {
            height: 65px;
        }
    }
}
.pill-testing {
    display: inline-flex;
    min-width: fit-content;
    vertical-align: super;
}
</style>
<style scoped lang="scss">
.nav {
    background: color('dark-40');
    padding: spacers('md');
    width: 100%;
    max-width: 100vw;
    z-index: 100;
    backdrop-filter: blur(8px);
    position: fixed;
    transition: 0.2s linear;
    animation: showNavbar 0.5s forwards;
    height: calc(56px + (spacers('sm') * 2));
    @media (max-width: breakpoints('lg')) {
        height: 65px;
    }
    &-profile {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        &-router {
            background: color('dark-60');
            padding: spacers('xxs');
            border-radius: radius('lg');
            display: flex;
            align-items: center;
            justify-content: center;

            &-info {
                overflow: hidden;
                max-width: 0;
                width: auto;
                transition: 0.2s linear;
            }
            &:hover {
                .nav-profile-router-info {
                    max-width: 500px;
                    overflow: visible;
                    margin-right: spacers('xs');
                    margin-left: spacers('sm');
                }
            }
        }
    }

    &-sep {
        border-left: solid 2px color('primary');
        height: 30px;
        margin-right: 20px;
    }

    &-transition {
        position: fixed;
        top: 65px;
        transition: 0.5s linear;

        @media (max-width: breakpoints('lg')) {
            max-height: 600px;
        }
    }

    &-hidden {
        @media (max-width: breakpoints('lg')) {
            max-height: 0px;
            overflow: hidden;
        }
    }

    &-content {
        @media (max-width: breakpoints('lg')) {
            background: color('dark-80');
            backdrop-filter: blur(8px);
            z-index: 100;
            height: 100vh;
        }
    }

    .router-link {
        @media (max-width: breakpoints('lg')) {
            margin-bottom: spacers('xs');
        }
    }

    .router-link-active {
        color: color('primary');
        font-size: sizes('base');
        font-weight: 800;
        font-family: Montserrat-bold, sans-serif;
    }
}
.login-register {
    &-section {
        position: relative;
    }

    &-sep {
        background: color('dark');
        padding: spacers('sm');

        @media (min-width: breakpoints('lg')) {
            &:before {
                content: '';
                z-index: -1;
                background: color('light');
                top: 25px;
                left: 50%;
                bottom: 25px;
                width: 1px;
                position: absolute;
            }
        }
    }
}
</style>
