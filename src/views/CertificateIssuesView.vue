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
                    <h2 class="font-xl-sb">Certificate Issues</h2>
                    <span class="font-sm font-color-primary"
                        >Encryption of the internet is based on inherent trust
                        and complicated configuration, here are some issues we
                        observed:</span
                    >
                </div>
                <CertificateIssuesList />
            </div>
        </div>
    </main>
</template>

<script setup>
import SearchForm from '@/components/forms/SearchForm.vue'
import CertificateIssuesList from '@/components/general/CertificateIssuesList.vue'
import DashboardMenu from '@/components/layout/DashboardMenu.vue'
</script>

<script>
export default {
    components: {
        SearchForm,
        CertificateIssuesList,
        DashboardMenu
    },
    data() {
        return {
            loading: false,
            errorMessage: '',
            errorMessageType: ''
        }
    }
}
</script>
