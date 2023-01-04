<template>
    <Chart
        :data="data"
        :margin="margin"
        :direction="direction"
        :axis="axis"
        :options="options"
        v-if="chartData"
    >
        <template #layers>
            <Grid strokeDasharray="2,2" />
            <Area
                :dataKeys="['name', 'num']"
                type="monotone"
                :areaStyle="{ fillOpacity: 0 }"
            />
            <Line
                :dataKeys="['name', 'num']"
                type="normal"
                :lineStyle="{
                    stroke: `url(#${label}chartgrad)`
                }"
            />

            <CustomChartDefs :defsId="`${label}chartgrad`" />
        </template>
    </Chart>
    <span class="font-xl font-color-light-80 text-center w-100 d-block" v-else>
        No data to display
    </span>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Chart, Grid, Line, Area } from 'vue3-charts'
import CustomChartDefs from './CustomChartDefs.vue'

export default defineComponent({
    name: 'LineChart',
    props: {
        chartData: Object,
        label: String
    },
    data() {
        return {}
    },
    components: { Chart, Grid, Line, Area, CustomChartDefs },
    setup(props) {
        const data = props.chartData.sort((a, b) =>
            a.timestamp.toString().localeCompare(b.timestamp.toString())
        )
        const direction = ref('horizontal')
        const margin = ref({
            left: 0,
            top: 5,
            right: 0,
            bottom: 80
        })
        const options = ref({
            scales: {
                xAxes: [
                    {
                        ticks: {
                            minRotation: 90
                        }
                    }
                ]
            }
        })
        const axis = ref({
            primary: {
                type: 'band'
            },
            secondary: {
                domain: ['dataMin', 'dataMax + 100'],
                type: 'linear',
                ticks: 8
            }
        })

        return { data, direction, margin, options, axis }
    }
})
</script>
