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
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
      axisLine: { lineStyle: { color: theme.panelBorderColor } },
      axisLabel: { color: theme.textColor, fontSize: theme.fontSize.small },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: theme.textColor, fontSize: theme.fontSize.small },
    },
    series: data.series.map((s) => ({
      type: 'bar',
      name: s.name,
      data: s.data as number[],
      itemStyle: {
        color: s.color || theme.primaryColor,
        borderRadius: [4, 4, 0, 0],
      },
      barWidth: 16,
    })),
  }
})
</script>
