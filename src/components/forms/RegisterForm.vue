<template>
    <form class="register-form" @submit.prevent="register">

        <ValidationMessage :message="message" :type="messageType" />

        <TextInput
            placeholder="ACME Corp."
            id="registerUsername"
            label="Username"
            :required="true"
            @change="handleName"
        />
        <EmaiInput
            placeholder="Primary contact email"
            id="id-email-2"
            label="Email"
            :required="true"
            @change="handleEmail"
        />
        <Button
            class="btn-outline-primary-full font-base-sb font-color-primary"
            text="Register"
            @click="submit"
        />
    </form>
</template>
<script>
    import TextInput from "../inputs/TextInput.vue";
    import EmaiInput from "../inputs/EmaiInput.vue";
    import Button from "../general/Button.vue";
    import ValidationMessage from "../general/ValidationMessage.vue";

    export default {
        components: {TextInput, EmaiInput, Button, ValidationMessage},
        data() {
            return {
                apiUrl: import.meta.env.VITE_API_URL,
                displayName: '',
                email: '',
                message: "",
                messageType: "",
            }
        },
        methods: {
            handleName(v) {
                this.displayName = v.target.value;
            },
            handleEmail(v) {
                this.email = v.target.value;
            },
            register() {
                const payload = JSON.stringify({
                    'display': this.displayName,
                    'primary_email': this.email,
                    'name': ''
                })
                fetch(`${this.api_url}/account/register`, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    method: 'POST',
                    body: payload
                })
                .then(response => response.text())
                .then(result => {
                    const account = JSON.parse(result)
                    this.message = "Account registered with success. Please check your e-mail inbox."
                    this.messageType = "success"
                    console.log(account)

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

    .register-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: radius("sm");
        width: 100%;
    }
</style>
