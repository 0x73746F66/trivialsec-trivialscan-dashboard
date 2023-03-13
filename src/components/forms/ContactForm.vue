<template>
    <LoadingComponent class="loading" :class="{ inactive: !loading }" />

    <form class="contact-form" @submit.prevent="sendSupport">
        <ValidationMessage :message="message" :type="messageType" />
        <div class="subject-field">
            <TextInput
                placeholder=""
                id="subject-field"
                label="Subject"
                :required="true"
                :textDefault="SubjectFieldDefault"
                @change="handleSubject"
            />
        </div>

        <div class="text-area-field">
            <TextArea
                placeholder=""
                id="text-area-field"
                label="Message"
                :required="true"
                :textDefault="TextAreaFieldDefault"
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
import TextInput from '@/components/inputs/TextInput.vue'
import TextArea from '@/components/inputs/TextArea.vue'
import Button from '@/components/general/Button.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'

export default {
    components: {
        TextInput,
        TextArea,
        Button,
        ValidationMessage,
        LoadingComponent
    },
    props: {
        SubjectFieldDefault: String,
        TextAreaFieldDefault: String
    },
    data() {
        return {
            subjectField: '',
            contentField: '',
            message: '',
            messageType: '',
            loading: false
        }
    },
    methods: {
        handleSubject(v) {
            this.subjectField = v.target.value
        },
        handleContent(v) {
            this.contentField = v.target.value
        },
        async sendSupport() {
            this.loading = true
            try {
                const response = await Api.post('/support', {
                    subject: this.subjectField,
                    message: this.contentField
                })
                this.loading = false
                if (response.status === 424) {
                    this.message = `Something went wrong sending the email, please try again later.`
                    this.messageType = 'error'
                    return
                }
                if (response.status !== 202) {
                    this.message = `Something went wrong, please try again later.`
                    this.messageType = 'error'
                    return
                }
                this.message = 'Your message was sent. Thank you!'
                this.messageType = 'success'
            } catch (error) {
                this.message =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.messageType = 'error'
            }
            this.loading = false
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/forms';

.text-area-field {
    min-height: 250px;
}
</style>
