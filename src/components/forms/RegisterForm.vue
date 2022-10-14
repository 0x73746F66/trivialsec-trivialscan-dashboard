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
                api_url: import.meta.env.VITE_API_URL,
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
            async register() {
                const payload = JSON.stringify({
                    'display': this.displayName,
                    'primary_email': this.email,
                    'name': ''
                })
                const response = await fetch(`${this.api_url}/account/register`, {
                    method: 'POST',
                    body: payload,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                }).catch(error => {
                    this.message = `Something went wrong, please try again later.\r\nServer responded with: ${error}`
                    this.messageType = "error"
                })
                const data = await response.json()
                if (response.status === 201) {
                    this.message = "Account registered with success.\r\nPlease check your e-mail inbox."
                    this.messageType = "success"
                } else if (response.status === 409) {
                    this.message = "Account already registered."
                    this.messageType = "warning"
                } else {
                    console.log(data)
                    this.message = `Something went wrong, please try again later.`
                    this.messageType = "warning"
                }
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
