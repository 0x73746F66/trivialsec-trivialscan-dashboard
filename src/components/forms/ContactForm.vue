<script setup>
    
</script>

<template>
    <form
        class="contact-form"
        @submit.prevent="sendSupport"
    >
        <ValidationMessage :message="message" :type="messageType" />
    
        <div class="subject-field">
            <TextInput
                placeholder=""
                id="subject-field"
                label="Subject"
                :required="true"
                @change="handleSubject"
            />
        </div>

        <div class="text-area-field">
            <TextArea 
                placeholder=""
                id="text-area-field"
                label="Message"
                :required="true"
                @change="handleContent"

            />
        </div>
        <div class="d-flex justify-content-end">
            <Button
                class="btn-outline-primary mr-0 ml-auto font-lg-sb font-color-primary"
                text="Submit"
                @click="submit"
            />
        </div>
    </form>
</template>
<script>
    import TextInput from "../inputs/TextInput.vue"
    import TextArea from "../inputs/TextArea.vue"
    import Button from "../general/Button.vue"
    import ValidationMessage from "../general/ValidationMessage.vue"

    export default {
        components: {TextInput, TextArea, Button, ValidationMessage},
        data() {
            return {
                subjectField: "",
                contentField: "",
                message: "",
                messageType: "",
                api_url: import.meta.env.VITE_API_URL 
            }
        },
        methods: {
            handleSubject(v) {
                this.subjectField = v.target.value;
            },
            handleContent(v) {
                this.contentField = v.target.value;
            },

            sendSupport() {
                const payload = JSON.stringify({
                    'subject': this.subjectField,
                    'message': this.contentField
                })
                fetch(this.api_url + `/support`, {
                    method: 'POST',
                    headers: {/* generated Authorization */},
                    body: {
                        payload
                    }
                })
                .then(response => {
                    response.json()
                    this.message = "Your message was sent. Thank you!"
                    this.messageType = "success"
                })
                .catch(error => {
                    this.message = "Something went wrong, please try again later."
                    this.messageType = "error"
                });
            }
        }
    }
</script>
<style lang="scss">
    @import "@/assets/forms";
    
    .text-area-field {
        min-height: 250px;
    }

</style>
