<template>
    <div class="nav" :class="{'nav-animate-hidden' : isNavbarHidden}">
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex flex-lg-row flex-column justify-content-between">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex align-items-center">
                            <IconTrivialSecurity
                                alt="Trivial Security"
                                class="margin-right-lg"
                                width="50"
                                height=""
                            />
                            <span class="d-none d-lg-block font-xxl-b font-color-primary">Trivial Security</span>
                        </div>

                        <button
                            class="navbar-toggler navbar-dark d-lg-none"
                            type="button"
                            @click='toggleNavbar'
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>

                    <div
                        class="d-flex flex-column flex-lg-row align-items-center nav-transition nav-content"
                        :class="{'nav-hidden' : navbarHidden}"
                    >
                        <RouterLink to="/" class="router-link font-base font-color-light text-decoration-none margin-right-md">Home</RouterLink>
                        <RouterLink v-if="logged_in" to="/results" class="router-link font-base font-color-light text-decoration-none margin-right-md">Reports</RouterLink>
                        <RouterLink v-if="$route.params.report_id" :to="{name: 'summary', params: {report_id: $route.params.report_id}}" class="router-link font-base font-color-light text-decoration-none margin-right-md">Summary</RouterLink>
                        <RouterLink v-if="$route.params.report_id" :to="{name: 'detail', params: {report_id: $route.params.report_id}}" class="router-link font-base font-color-light text-decoration-none margin-right-md">Full Report</RouterLink>
                        <RouterLink v-if="!logged_in" to="/login" class="router-link font-base font-color-light text-decoration-none margin-right-md">Login</RouterLink>
                        <RouterLink v-if="!logged_in" to="/register" class="router-link font-base font-color-light text-decoration-none margin-right-md">Register</RouterLink>
                        <RouterLink v-if="logged_in" to="/logout" class="router-link font-base font-color-light text-decoration-none margin-right-md">Logout</RouterLink>
                        <RouterLink v-if="logged_in" to="/profile" class="router-link font-base font-color-light text-decoration-none margin-right-md">{{account_name}}<br>{{member_email}}</RouterLink>
                        <RouterLink to="/support" class="router-link font-base font-color-light text-decoration-none margin-right-md">Support</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import IconTrivialSecurity from '../icons/IconTrivialSecurity.vue';

    export default {
        components: { IconTrivialSecurity },
        props: {
            isNavbarHidden: Boolean
        },
        data() {
            return {
                navbarHidden: true,
                logged_in: false,
                account_name: null,
                member_email: null,
            }
        },
        created() {
            //TODO: use vue3 store backed by localStorage
            this.account_name = localStorage.getItem('/account/name')
            this.member_email = localStorage.getItem('/member/email')
            this.logged_in = !!localStorage.getItem('/session/key')
        },
        methods: {
            toggleNavbar() {
                this.navbarHidden = !this.navbarHidden;
            }
        }
    }
</script>
<style lang="scss">
    header {
        &:after {
            content: "";
            display: block;
            width: 100%;
            height: 75px;
        }
    }
    .nav {
        @extend .bg-dark-40;
        @extend .padding-md;
        width: 100%;
        z-index: 10;
        background: #1a1616;
        position: fixed;
        transition: 0.2s linear;
        top: 0;
        animation: showNavbar 0.5s forwards;
        
        &-animate-hidden {
            animation: hideNavbar 1s forwards;
        }
        
        @keyframes hideNavbar {
            0% {
                top: 0;
            }
            99% {
                top: -300%;
            }
            100% {
                position: absolute;
                top: 0;
            }
        }

        @keyframes showNavbar {
            0% {
                top: -300%;
            }
            100% {
                top: 0;
            }
        }

        .router-link {
            @media (max-width: $breakpoint-lg) {
                margin-bottom: spacers("xs");
            }
        }

        .router-link-active {
            @extend .font-color-primary;
            @extend .font-base-b;
        }

        &-transition {
            transition: 0.2s linear;
        }

        &-content {
        }

        &-hidden {
            @media (max-width: $breakpoint-lg) {
                height: 0px;
                overflow: hidden;
            }
        }
    }
</style>
