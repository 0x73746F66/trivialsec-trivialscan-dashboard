<template>
    <main>
        <div
            class="container font-color-light padding-top-lg padding-bottom-xl"
        >
            <div class="d-flex flex-column flex-lg-row margin-bottom-sm">
                <div class="d-inline-block w-100 position-relative">
                    <SearchForm />
                </div>
                <DashboardMenu />
            </div>

            <div class="w-100 margin-bottom-md">
                <div class="d-flex margin-bottom-md">
                    <div class="d-flex flex-column">
                        <h2 class="font-xl-sb">Report Summaries</h2>
                        <span class="font-sm font-color-primary"
                            >Trivial Scanner uploaded reports</span
                        >
                    </div>
                    <div
                        class="d-flex flex-right"
                        title="Scanner Configuration"
                    >
                        <RouterLink
                            to="/account/host-config"
                            class="configure-icon font-color-light text-decoration-none"
                        >
                            <IconConfigure
                                color="f0f0f0"
                                class="router-link-icon"
                            />
                        </RouterLink>
                    </div>
                </div>
                <Summary />
            </div>
        </div>
    </main>
</template>

<script setup>
import SearchForm from '@/components/forms/SearchForm.vue'
import Summary from '@/components/general/Summary.vue'
import DashboardMenu from '@/components/layout/DashboardMenu.vue'
import IconConfigure from '@/components/icons/IconConfigure.vue'
</script>

<script>
export default {
    components: {
        SearchForm,
        Summary,
        DashboardMenu,
        IconConfigure
    }
}
</script>
<style scoped>
.configure-icon {
    width: 32px;
    height: 32px;
}
</style>
