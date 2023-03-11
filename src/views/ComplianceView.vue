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

            <div class="d-flex flex-column">
                <div
                    class="w-100 margin-bottom-md position-relative compliance-section"
                >
                    <div class="d-flex">
                        <h2 class="font-xl-sb margin-right-sm">
                            Compliance History
                        </h2>
                    </div>
                    <div
                        class="position-relative bg-dark-40 border-radius-sm padding-sm d-flex flex-lg-row flex-column justify-content-evenly"
                    >
                        <ComplianceCharts />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import CollapsibleSection from '@/components/general/CollapsibleSection.vue'
import ComplianceCharts from '@/components/general/ComplianceCharts.vue'
import SearchForm from '@/components/forms/SearchForm.vue'
import DashboardMenu from '@/components/layout/DashboardMenu.vue'
</script>

<script>
export default {
    components: {
        CollapsibleSection,
        ComplianceCharts,
        SearchForm,
        DashboardMenu
    }
}
</script>

<style scoped lang="scss">
.chart {
    svg {
        width: 100%;
    }
}
.pie-chart-legend {
    position: absolute;
    right: spacers('sm');
    bottom: spacers('sm');
    display: flex;
    flex-direction: column;
    font-size: sizes('xs');
    color: color('light');
    .square {
        width: 15px;
        height: 15px;
        display: inline-block;

        &.primary {
            background: color('primary');
        }
        &.secondary {
            background: color('secondary');
        }
    }
}
</style>
