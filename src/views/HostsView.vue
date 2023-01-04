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
                <h2 class="font-xl-sb margin-bottom-md">
                    Hostname & IP Addresses
                </h2>
                <HostsList />
            </div>
        </div>
    </main>
</template>

<script setup>
import SearchForm from '@/components/forms/SearchForm.vue'
import HostsList from '@/components/general/HostsList.vue'
import DashboardMenu from '@/components/layout/DashboardMenu.vue'
</script>

<script>
export default {
    components: {
        SearchForm,
        HostsList,
        DashboardMenu
    }
}
</script>
