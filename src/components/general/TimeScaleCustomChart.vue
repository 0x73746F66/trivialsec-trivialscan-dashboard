<template>
    <div>
        <div
            class="compliance-custom-chart-display position-relative"
            v-for="(chart, key, index) in chartData"
            :class="[{'show' : index == 0, 'hide' : index > 0}, `compliance-custom-chart-display-${transformedLabel}`]"
            :key="index"
            :id="`compliance-${transformedLabel}-${ranges[index]}`">
            
            <select 
                @change="handleComplianceTimeScale($event)"
                class="time-scale-select text-capitalize"
                v-if="ranges.length > 1"
                v-model="selectedChart" 
            >
                <option v-for="range in ranges" :key="`${transformedLabel}-${range}`" :value="`${transformedLabel}-${range}`" class="text-capitalize">{{range}}</option>
            </select>

            <CustomChart :chartData="chart" :label="`${ranges[index]}-${transformedLabel}`"  />
        </div>
    </div>
</template>
<script>
import CustomChart from "./CustomChart.vue";

export default {
    components: {CustomChart},
    data() {
        return {
            selectedChart: ""
        }
    },
    props: {
        label: String,
        ranges: Array,
        chartData: Array
    },
    mounted() {
        this.selectedChart = this.transformedLabel + '-' + this.ranges[0]
    },
    methods: {
        handleComplianceTimeScale(e){
            Array.from(document.getElementsByClassName(`compliance-custom-chart-display-${this.transformedLabel}`)).forEach(
                function(el) {
                    el.classList.add("hide");
                    el.classList.remove("show");
                }
            )
            document.getElementById(`compliance-${e.target.value}`).classList.remove("hide");
            document.getElementById(`compliance-${e.target.value}`).classList.add("show");
        },
    },
    computed: {
        transformedLabel() {
            return this.label.replace(/[^A-Z0-9]/ig, "_")
        },
    }
}
</script>
<style lang='scss'>
    .compliance-custom-chart-display{
        &:not(.show) {
            display: none;
        }   

        &.show {
            animation: fadeIn 0.5s linear forwards;
        }
        &.hide {
           display: none;
        }
    }
    .time-scale-select {
        border-radius: radius("sm");
        padding: spacers("xxs");
        color: color("light");
        background: color("dark-40");
        border: none;
        z-index: 10;
        cursor: pointer;
        position: absolute;
        right: spacers("md");
        top: spacers("md");
        transition: 0.2s linear;
        @extend .font-sm;

        @media (max-width: $breakpoint-lg) {
            right: spacers("sm");
            top: spacers("sm");
        }

        &:active,
        &:focus,
        &:hover {
            outline: color("primary") solid 1px;
        }
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            display: block !important;
            opacity: 1;
        }
    }
    
</style>