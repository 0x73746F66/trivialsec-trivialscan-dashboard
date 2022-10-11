<template>
    <form
        class="login-form"
        @submit.prevent="login"
    >
        <ValidationMessage :message="message" :type="messageType" />

        <EmaiInput
            placeholder="Send an email with login link"
            id="id-email-1"
            label="Email"
            :required="true"
            :model="email"
            @change="handleEmail"

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
        data() {
            return {
                emailField: "",
                message: "",
                messageType: "",
                api_url: import.meta.env.VITE_API_URL 
            }
        },
        methods: {
            handleEmail(v) {
                this.emailField = v.target.value;
            },
            login() {
                const payload = JSON.stringify({
                    'email': this.subjectField,
                })

                fetch(this.api_url + '/magic-link', {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    method: 'POST',
                    body: payload
                })
                .then(response => {
                    console.log(response)
                    //TODO: notify user to check their email
                    this.message = "Please check you e-mail to complete login."
                    this.messageType = "success"
                    window.location.href = '/'
                })
                .catch(errors => {
                    console.log(errors)
                    this.message = "An error has occured, please try again."
                    this.messageType = "error"

                })
            }
        }
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
