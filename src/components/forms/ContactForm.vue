<script setup>
    
</script>

<template>
    <loadingComponent class="loading" :class="{'inactive': !loading}"/>

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
                class="btn-outline-primary mr-0 ml-auto font-sm font-color-primary padding-xs"
                text="Submit"
                @click="submit"
            />
        </div>
    </form>
</template>
<script>
    import moment from 'moment'
    import CryptoJS from 'crypto-js'
    import TextInput from "../inputs/TextInput.vue"
    import TextArea from "../inputs/TextArea.vue"
    import Button from "../general/Button.vue"
    import loadingComponent from "../general/loadingComponent.vue"
    import ValidationMessage from "../general/ValidationMessage.vue"

    export default {
        components: {TextInput, TextArea, Button, ValidationMessage, loadingComponent},
        data() {
            return {
                subjectField: "",
                contentField: "",
                message: "",
                messageType: "",
                api_url: import.meta.env.VITE_API_URL,
                loading: false
            }
        },
        methods: {
            handleSubject(v) {
                this.subjectField = v.target.value;
            },
            handleContent(v) {
                this.contentField = v.target.value;
            },

            async sendSupport() {
                const payload = JSON.stringify({
                    'subject': this.subjectField,
                    'message': this.contentField
                })
                this.loading = true;
                const req_url = `${this.api_url}/support`
                const ts = moment().utc().unix()
                const url = new URL(req_url)
                const canonical_string = `POST\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}\n${window.btoa(payload)}`
                console.log(canonical_string)
                const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, localStorage.getItem('/session/key'))
                hash.update(canonical_string)
                const mac = hash.finalize()
                const header = `HMAC id="${localStorage.getItem('/member/email')}", mac="${mac}", ts="${ts}"`
                console.log(header)
                const response = await fetch(req_url, {
                    method: 'POST',
                    body: payload,
                    headers: {
                        'Authorization': header,
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                }).catch(error => {
                    this.message = `Something went wrong, please try again later. Server responded with: ${error}`
                    this.messageType = "error"
                    this.loading = false;
                })
                const data = await response.json()
                if (response.status === 202) {
                    this.message = "Your message was sent. Thank you!"
                    this.messageType = "success"
                    this.loading = false;
                } else {
                    console.log(data)
                    this.message = `Something went wrong, please try again later.`
                    this.messageType = "info"
                    this.loading = false;
                }

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
