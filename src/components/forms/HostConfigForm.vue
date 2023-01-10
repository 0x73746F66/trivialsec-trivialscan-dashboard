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
            <Toggle
                :defaultChecked="host.monitoring_enabled"
                @change="hostToggleChange($event, host.transport?.hostname)"
            />
        </div>
        <span class="font-sm-b margin-left-xs">Monitoring</span>
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
<script setup>
import TextInput from '@/components/inputs/TextInput.vue'
import TextArea from '@/components/inputs/TextArea.vue'
import Button from '@/components/general/Button.vue'
import Toggle from '@/components/general/Toggle.vue'
import LoadingComponent from '@/components/general/LoadingComponent.vue'
import ValidationMessage from '@/components/general/ValidationMessage.vue'
</script>

<script>
export default {
    props: {
        enabled: {
            type: Boolean,
            default: false
        },
        path_names: {
            type: Array,
            default: ['/']
        },
        ports: {
            type: Array,
            default: [443]
        },
        hostname: String,
        timestamp: Number
    },
    components: {
        TextInput,
        TextArea,
        Button,
        Toggle,
        ValidationMessage,
        LoadingComponent
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
        async hostToggleChange(e, hostname) {
            this.loading = true
            try {
                if (e.target.checked === true) {
                    const response = await Api.get(
                        `/scanner/monitor/${hostname}`
                    )
                    if (response.status !== 200) {
                        this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageType = 'error'
                        this.loading = false
                        e.target.checked = false
                        return
                    }
                    this.errorMessage = `Monitoring host.`
                    this.errorMessageType = 'success'
                    this.host.monitoring_enabled = true
                } else {
                    const response = await Api.get(
                        `/scanner/deactivate/${hostname}`
                    )
                    if (response.status !== 200) {
                        this.errorMessage = `${response.status} ${response.statusText}: Sorry, we couldn't complete this action.`
                        this.errorMessageType = 'error'
                        this.loading = false
                        e.target.checked = false
                        return
                    }
                    this.errorMessage = `No longer monitoring host.`
                    this.errorMessageType = 'success'
                    this.host.monitoring_enabled = false
                }
            } catch (error) {
                this.errorMessage =
                    error.name === 'AbortError'
                        ? 'Request timed out, please try refreshing the page.'
                        : `${error.name} ${error.message}. Couldn't complete this action.`
                this.errorMessageType = 'error'
                e.target.checked = false
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
