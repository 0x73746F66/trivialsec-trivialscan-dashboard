<script setup>
import RegistrationForm from "../components/RegistrationForm.vue";
</script>

<script>
export default {
    data() {
        return {
            display: null,
            primary_email: null,
            loading: false,
            account: {},
            errors: [],
        }
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<template>
    <div id="app">
        <RegistrationForm v-bind="account" :errors="errors" ></RegistrationForm>
    </div>
</template>

<style scoped>

</style>
