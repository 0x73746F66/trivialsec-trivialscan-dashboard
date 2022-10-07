<template>
    <form class="login-form">
        <h3 class="text-xl font-color-light margin-bottom-md">Login</h3>
        <EmaiInput 
            placeholder="Email Field" 
            id="id-name-1" 
            label="Email 2" 
            :required="true"
        />
        <Button 
            class="btn-outline-primary-full font-xl-sb font-color-primary"
            text="Login"
            @click="submit"    
        />
    </form>
</template>
<script>
    import EmaiInput from "../inputs/EmaiInput.vue"
    import Button from "../general/Button.vue"

    export default {
        components: {EmaiInput, Button},
        methods: {
            submit() {
            
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/forms";

    .login-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: color("dark-20");
        border-radius: radius("sm");
        padding: padding('lg');
        width: 100%;
    }
</style>