<script setup>
    
</script>

<template>
    <form
        class="contact-form"
        @submit.prevent="sendSupport"
    >
        <div class="subject-field">
            <TextInput
                placeholder=""
                id="subject-field"
                label="Subject"
                :required="true"
                @change="handleSubject"
            />
        </div>

        <div class="text-area-field margin-bottom-lg">
            <TextArea 
                placeholder=""
                id="text-area-field"
                label="Message"
                :required="true"
                @change="handleContent"

            />
        </div>

        <Button
            class="btn-outline-primary-full font-lg-sb font-color-primary"
            text="Submit"
            @click="submit"
        />
    </form>
</template>
<script>
    import TextInput from "../inputs/TextInput.vue"
    import TextArea from "../inputs/TextArea.vue"
    import Button from "../general/Button.vue"

    export default {
        components: {TextInput, TextArea, Button},
        data() {
            return {
                subjectField: "",
                contentField: "",
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
                .then(response => response.json())
                .catch(console.log);
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
