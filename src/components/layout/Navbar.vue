<template>
    <div class="nav">
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                        <IconTrivialSecurity
                            alt="Trivial Security" 
                            class="margin-right-lg" 
                            width="50" 
                            height="" 
                        />
                        <span class="font-xxl-b font-color-primary">Trivial Security</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <RouterLink to="/" class="font-base font-color-light text-decoration-none margin-right-md">Home</RouterLink>
                        <RouterLink to="/results" class="font-base font-color-light text-decoration-none margin-right-md">Reports</RouterLink>
                        <RouterLink v-if="$route.params.report_id" :to="{name: 'summary', params: {report_id: $route.params.report_id}}" class="font-base font-color-light text-decoration-none margin-right-md">Summary</RouterLink>
                        <RouterLink v-if="$route.params.report_id" :to="{name: 'detail', params: {report_id: $route.params.report_id}}" class="font-base font-color-light text-decoration-none margin-right-md">Full Report</RouterLink>
                        <RouterLink to="/login" class="font-base font-color-light text-decoration-none margin-right-md">Login</RouterLink>
                        <RouterLink to="/register" class="font-base font-color-light text-decoration-none margin-right-md">Register</RouterLink>
                        <RouterLink to="/logout" class="font-base font-color-light text-decoration-none margin-right-md">Logout</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import IconTrivialSecurity from '../icons/IconTrivialSecurity.vue';

    export default {
        components: { IconTrivialSecurity }        
    }
</script>
<style lang="scss">
    .nav {
        @extend .bg-dark-40;
        @extend .padding-md;

        .router-link-active {
            @extend .font-color-primary;
            @extend .font-base-b;
        }
    }
</style>