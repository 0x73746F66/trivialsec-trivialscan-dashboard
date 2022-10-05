<script setup>
import LoginForm from "../components/LoginForm.vue";
</script>

<script>
export default {
    data() {
        return {
            primary_email: null,
            loading: false,
            account: {},
            errors: [],
        }
    },
    created() { },
    mounted() { },
    methods: {}
}
</script>

<template>
    <div id="app">
        <LoginForm v-bind="account" :errors="errors"></LoginForm>
    </div>
</template>

<style scoped>

</style>
