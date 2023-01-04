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
                <div class="d-flex flex-column margin-bottom-md">
                    <h2 class="font-xl-sb">Vulnerabilities & Exposures</h2>
                    <span class="font-sm font-color-primary"
                        >Security is hard, that's why this list is prioritising
                        quick wins; Issues that have an easy fix but pose real
                        and trivial to exploit risk if left in the current
                        state</span
                    >
                </div>
                <IssuesList />
            </div>
        </div>
    </main>
</template>

<script setup>
import SearchForm from '@/components/forms/SearchForm.vue'
import IssuesList from '@/components/general/IssuesList.vue'
import DashboardMenu from '@/components/layout/DashboardMenu.vue'
</script>

<script>
export default {
    components: {
        SearchForm,
        IssuesList,
        DashboardMenu
    }
}
</script>
