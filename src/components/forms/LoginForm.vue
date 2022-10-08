<script setup>
    const api_url = import.meta.env.VITE_API_URL
    const login = (event) => {
        const email = event.target.querySelector('[name="email"]').value
        const payload = JSON.stringify({ email })
        const req_url = `${api_url}/magic-link`
    
        fetch(req_url, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            method: 'POST',
            body: payload
        })
        .then(response => response.text())
        .then(result => {
            const account = JSON.parse(result)
            console.log('account')
            console.log(account)
    
        })
        .catch(errors => {
            console.log('errors')
            console.log(errors)
    
        })
    }
</script>

<template>
    <form 
        class="login-form" 
        @submit.prevent="login"
    >
        <h3 class="text-xl font-color-light margin-bottom-md">
            Login
        </h3>
        
        <EmaiInput 
            placeholder="Email Field" 
            id="id-name-1" 
            label="Email 2" 
            :required="true"
            :model="email"
            name="email"
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