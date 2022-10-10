<script setup>
    
</script>

<template>
    <form
        class="contact-form"
    >
        <!-- 
                @submit.prevent="login"
        -->
        <div class="subject-field">
            <TextInput
                placeholder=""
                id="subject-field"
                label="Subject"
                :required="true"
            />
        </div>

        <EmaiInput
            placeholder=""
            id="id-email-1"
            label="Email"
            :required="true"
            :model="email"
        />

        <div class="text-area-field margin-bottom-lg">
            <TextArea 
                placeholder=""
                id="text-area-field"
                label="Message"
                :required="true"
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
    import EmaiInput from "../inputs/EmaiInput.vue"
    import Button from "../general/Button.vue"

    export default {
        components: {TextInput, TextArea, EmaiInput, Button},
    }
</script>
<style lang="scss">
    @import "@/assets/forms";
    
    .text-area-field {
        min-height: 250px;
    }

</style>
