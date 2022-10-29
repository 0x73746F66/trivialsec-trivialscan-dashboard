<template>
  <Chart
    :size="{ width: 500, height: 320 }"
    :data="data"
    :margin="margin"
    :direction="direction"
    :axis="axis"
    v-if="chartData"
  >

    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Area :dataKeys="['name', 'num']" type="monotone" />
      <Line
        :dataKeys="['name', 'num']"
        type="normal"
        :lineStyle="{
          stroke: `url(#${label}chartgrad)`
        }"
      />

      <CustomChartDefs :defsId="`${label}chartgrad`"/>
    </template>
  </Chart>
  <span class="font-xl font-color-light-80 text-center w-100 d-block" v-else>
    No data to display
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Chart, Grid, Line, Area } from 'vue3-charts'
import CustomChartDefs from "./CustomChartDefs.vue"

export default defineComponent({
  name: 'LineChart',
  props: {
    chartData: Object,
    label: String,
  },
  data() {
    return {
    }
  },
  components: { Chart, Grid, Line, Area, CustomChartDefs },
  setup(props) {
    const data = props.chartData.sort((a, b) => (a.timestamp < b.timestamp));
    const direction = ref('horizontal')
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0
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

    return { data, direction, margin, axis }
  },
})
</script>

<style lang="">

</style>
