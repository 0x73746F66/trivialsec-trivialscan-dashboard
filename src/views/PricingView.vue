<template>
    <div>
        <div
            class="container-fluid padding-top-xl padding-bottom-md pricing-container px-0"
            ref="pricingContainer"
        >
            <div class="container">
                <div class="col-12 w-100 text-center margin-bottom-sm">
                    <h2 class="font-color-light font-lg-b">
                        Community Edition
                    </h2>
                </div>
                <div class="d-flex w-100">
                    <div class="col-2"></div>
                    <div class="col-8 text-center font-color-light font-sm">
                        All new accounts start in our Community Edition (CE)
                        tier, CE provides all customers access to Trivial
                        Security at no cost. This will suit the needs for most
                        small businesses or open source projects.
                    </div>
                    <div class="col-2"></div>
                </div>
                <div class="d-flex w-100">
                    <div class="col-2"></div>
                    <div
                        class="col-8 text-center margin-bottom-md font-color-light font-sm"
                    >
                        As part of the CE tier you will have access to
                        continuous monitoring of three hosts, and perform one
                        on-demand scan per host for each of the hosts being
                        monitored.
                        <RouterLink
                            class="font-color-primary"
                            :to="{ name: 'feature-early-warning' }"
                            >Early Warning Service (EWS)</RouterLink
                        >
                        is available for all tiers. EWS leverages the results of
                        scans for corelation across vast sources of threat data.
                    </div>
                    <div class="col-2"></div>
                </div>
                <stripe-pricing-table
                    pricing-table-id="prctbl_1LtUL7GZtHTgMn6lMg9zP3DU"
                    publishable-key="pk_live_51HTJBRGZtHTgMn6l6LdsX1xQYlEwDSFR2aUpjzooo0wIiRTvxJZC4Op6aSeceg5JLGPy9qeam7s1AKVBXoSNjY8R00Qi76Bera"
                >
                </stripe-pricing-table>
                <span class="margin-top-sm d-block font-sm font-color-light"
                    >* Self-managed refers to Trivial Scanner running on your
                    self-hosted and on-prem servers, your cloud, or your client
                    computers, and connecting to Trivial Security SaaS
                    services.</span
                >
            </div>
        </div>

        <div
            class="container padding-bottom-xl padding-top-xl"
            v-if="!logged_in"
        >
            <LoginOrRegister
                loginModalId="loginModal"
                registerModalId="registerLogin"
            />
        </div>
    </div>
</template>

<script setup>
import LoginOrRegister from '@/components/general/LoginOrRegister.vue'
</script>

<script>
export default {
    components: {
        LoginOrRegister
    },
    data() {
        return {
            logged_in: false
        }
    },
    async mounted() {
        let stripeScript = document.createElement('script')
        stripeScript.setAttribute(
            'src',
            'https://js.stripe.com/v3/pricing-table.js'
        )
        document.head.appendChild(stripeScript)
    },
    created() {
        this.logged_in = !!localStorage.getItem('/session/bearer_token')
    },
    methods: {}
}
</script>
