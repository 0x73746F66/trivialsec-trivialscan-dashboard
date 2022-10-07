<template>
    <form class="register-form">
        <h3 class="text-xl font-color-light margin-bottom-md">Register</h3>
        <TextInput 
            placeholder=""
            id="registerUsername"
            label="Username"
            :required="true"
        />
        <EmaiInput 
            placeholder="Email Field" 
            id="id-name-1" 
            label="Email 2" 
            :required="true"
        />
        <Button 
            class="btn-outline-primary-full font-xl-sb font-color-primary"
            text="Register"
            @click="submit"    
        />
    </form>
</template>
<script>
    import TextInput from "../inputs/TextInput.vue"
    import EmaiInput from "../inputs/EmaiInput.vue"
    import Button from "../general/Button.vue"

    export default {
        components: {TextInput, EmaiInput, Button},
        methods: {
            submit() {
            
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/forms";

    .register-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: color("dark-20");
        border-radius: radius("sm");
        padding: padding('lg');
        width: 100%;
    }
</style>