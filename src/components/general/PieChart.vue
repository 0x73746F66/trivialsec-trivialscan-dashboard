<template>
    <Responsive class="w-100 pie-chart">
      <template #main="{ width }">
        <Chart
          direction="circular"
          :size="{ width: (width + 50), height: 400 }"
          :data="data"
          :margin="{
            left: Math.round((width - 360)/2),
            top: 20,
            right: 0,
            bottom: 20
          }"
          :config="{ controlHover: false }"
          >
          <!-- :axis="axis" -->

          <template #layers>
            <Pie
              :dataKeys="['name', 'num']"
              :pie-style="{ innerRadius: 100, padAngle: 0.05, colors: ['#1abb9c', '#e2c878'] }"
            />
          </template>
          <template #widgets>
            <Tooltip
              :config="{
                name : { },
                num: { label: 'Value:' },
              }"
              hideLine
            />
          </template>
        </Chart>
      </template>
    </Responsive>
</template>
  
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Chart, Responsive, Pie, Tooltip } from 'vue3-charts'
  
  export default defineComponent({
    name: 'LineChart',
    components: { Chart, Responsive, Pie, Tooltip },
    props: {
        inUse: Number,
        available: Number,
    },
    setup(props) {
        const inUse = props.inUse
        const available = (props.available - props.inUse)
        const data = [
            { name: 'In Use', num: inUse },
            { name: 'Available', num: available }
        ]
    
        return { data }
    }
  })
</script>
  
<style lang="scss">
    .pie-chart{
        position: relative;
        width: 100%;

        .axis {
            display: none;
        }
        
    }
</style>