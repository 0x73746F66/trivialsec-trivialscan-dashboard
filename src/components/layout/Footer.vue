<template>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 margin-bottom-lg col-lg-2">
                    <IconTrivialSecurity 
                        alt="Trivial Security" 
                        class="" 
                        width="50" 
                        height=""
                    />
                    <div class="social-footer margin-top-md padding-md">
                  
                    </div>
                </div>
                <div class="col-12 col-lg-10 d-flex flex-lg-row flex-column justify-content-end">
                    <div class="d-flex flex-column margin-right-lg">
                        <span class="font-lg-sb font-color-light margin-bottom-md">Quick Links</span>
                        <RouterLink to="/" class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none">Home</RouterLink>
                        <RouterLink to="/results" class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none">Reports</RouterLink>
                        <RouterLink v-if="$route.params.report_id" :to="{name: 'summary', params: {report_id: $route.params.report_id}}" class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none">Summary</RouterLink>
                        <RouterLink v-if="$route.params.report_id" :to="{name: 'detail', params: {report_id: $route.params.report_id}}" class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none">Full Report</RouterLink>
                        <RouterLink to="/login" class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none">Login</RouterLink>
                        <RouterLink to="/register" class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none">Register</RouterLink>
                        <RouterLink to="/logout" class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none">Logout</RouterLink>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="font-lg-sb font-color-light margin-bottom-md">Need Support?</span>
                        <RouterLink to="/" class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none">Support Page</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { RouterLink, RouterView } from "vue-router";
    import IconTrivialSecurity from '../icons/IconTrivialSecurity.vue';

    export default {
        components: { IconTrivialSecurity }
    }
    
</script>
<style lang="scss">
    .footer {
        @extend .bg-dark-40;
        @extend .padding-md;
        // display: flex;
    
        @media (max-width: $breakpoint-lg) {
            flex-direction: column;
        }
    }
</style>