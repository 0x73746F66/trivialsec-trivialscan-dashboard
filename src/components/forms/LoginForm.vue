<script setup>
    const api_url = import.meta.env.VITE_API_URL
    const login = (event) => {
        const email = event.target.querySelector('[name="id-email-1"]').value
        const payload = JSON.stringify({ email })
        const req_url = `${api_url}/magic-link`

        fetch(req_url, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            method: 'POST',
            body: payload
        })
        .then(response => {
            console.log(response)
            //TODO: notify user to check their email
            window.location.href = '/'
        })
        .catch(errors => {
            console.log('errors')
            console.log(errors)
        })
    }
</script>

<template>
    <form
        class="login-form"
        @submit.prevent="login"
    >
        <ValidationMessage 
            class="justify-content-between"
            :message="message" :type="messageType" 
        />

        <EmaiInput
            placeholder="Send an email with login link"
            id="id-email-1"
            label="Email"
            :required="true"
            :model="email"
        />

        <Button
            class="btn-outline-primary-full font-base-sb font-color-primary"
            text="Login"
            @click="submit"
        />
    </form>
</template>
<script>
    import EmaiInput from "../inputs/EmaiInput.vue";
    import Button from "../general/Button.vue";
    import ValidationMessage from "../general/ValidationMessage.vue";

    export default {
        components: {EmaiInput, Button, ValidationMessage},
    }
</script>
<style lang="scss">
    @import "@/assets/forms";

    .login-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: radius("sm");
        width: 100%;
    }
</style>
