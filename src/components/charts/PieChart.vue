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
  if (!data.series[0]) return {}
  return {
    backgroundColor: 'transparent',
    tooltip: {
      ...defaultTooltip,
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      bottom: 0,
      textStyle: { color: theme.textColor, fontSize: theme.fontSize.small },
    },
    series: [
      {
        type: 'pie',
        name: data.series[0].name,
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: theme.bgColor,
          borderWidth: 2,
        },
        label: {
          show: true,
          color: theme.textColor,
          fontSize: theme.fontSize.small,
          formatter: '{b}\n{d}%',
        },
        emphasis: {
          label: { fontSize: theme.fontSize.body, fontWeight: 'bold' },
        },
        data: data.series[0].data as { name: string; value: number }[],
      },
    ],
  }
})
</script>
