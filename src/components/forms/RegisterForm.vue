<script setup>
    const api_url = import.meta.env.VITE_API_URL
    const register = (event) => {
        const display = event.target.querySelector('[name="registerUsername"]').value
        const primary_email = event.target.querySelector('[name="id-email-2"]').value
        const payload = JSON.stringify({ display, primary_email, name: '' })
        const req_url = `${api_url}/account/register`

        fetch(req_url, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            method: 'POST',
            body: payload
        })
        .then(response => response.text())
        .then(result => {
            const account = JSON.parse(result)
            console.log('account')
            console.log(account)

        })
        .catch(errors => {
            console.log('errors')
            console.log(errors)

        })
    }
</script>

<template>
    <form class="register-form" @submit.prevent="register">
        <h3 class="text-xl font-color-light margin-bottom-md">Sign Up</h3>
        <TextInput
            placeholder=""
            id="registerUsername"
            label="Username"
            :required="true"
        />
        <EmaiInput
            placeholder="Email Field"
            id="id-email-2"
            label="Email"
            :required="true"
        />
        <Button
            class="btn-outline-primary-full font-xl-sb font-color-primary"
            text="Register"
            @click="submit"
        />
    </form>
</template>
<script>
    import TextInput from "../inputs/TextInput.vue"
    import EmaiInput from "../inputs/EmaiInput.vue"
    import Button from "../general/Button.vue"

    export default {
        components: {TextInput, EmaiInput, Button},
        methods: {
            submit() {

            }
        }
    }
</script>
<style lang="scss">
    @import "@/assets/forms";

    .register-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: color("dark-20");
        border-radius: radius("sm");
        padding: padding('lg');
        width: 100%;
    }
</style>
