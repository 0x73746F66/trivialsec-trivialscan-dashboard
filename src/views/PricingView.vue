<template>
    <div>
        <div
            class="container-fluid padding-top-xl padding-bottom-md pricing-container px-0"
            ref="pricingContainer"
        >
            <div class="container">
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
        this.logged_in = !!localStorage.getItem('/session/key')
    },
    methods: {}
}
</script>
