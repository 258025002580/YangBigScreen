<template>
  <BaseChart :option="chartOption" :loading="loading" :error="error" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseChart from './BaseChart.vue'
import type { ChartProps } from '@/types/chart'
import { theme, defaultTooltip } from '@/config'

const props = defineProps<ChartProps>()

const chartOption = computed<EChartsOption>(() => {
  const { data } = props
  return {
    backgroundColor: 'transparent',
    tooltip: {
      ...defaultTooltip,
      trigger: 'item',
    },
    visualMap: {
      min: 0,
      max: 200,
      left: 'left',
      bottom: 10,
      inRange: {
        color: ['#0a3a5c', '#00b4ff'],
      },
      textStyle: { color: theme.textColor },
    },
    series: [
      {
        type: 'map',
        map: 'china',
        roam: false,
        zoom: 1.2,
        label: {
          show: true,
          color: theme.textColor,
          fontSize: theme.fontSize.small,
        },
        itemStyle: {
          areaColor: '#0a2a4a',
          borderColor: 'rgba(0, 180, 255, 0.5)',
        },
        emphasis: {
          label: { color: '#fff', fontSize: theme.fontSize.body },
          itemStyle: { areaColor: '#00b4ff' },
        },
        data: (data.series[0]?.data as { name: string; value: number }[]) || [],
      },
    ],
  }
})
</script>
