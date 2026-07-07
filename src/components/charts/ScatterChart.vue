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
      formatter: (params: { value: [number, number] }) =>
        `消费: ${params.value[0].toFixed(2)}<br/>订单: ${params.value[1]}`,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: '消费金额',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: theme.textColor, fontSize: theme.fontSize.small },
    },
    yAxis: {
      type: 'value',
      name: '订单数',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: theme.textColor, fontSize: theme.fontSize.small },
    },
    series: data.series.map((s) => ({
      type: 'scatter',
      name: s.name,
      data: s.data as [number, number][],
      symbolSize: 8,
      itemStyle: { color: s.color || theme.primaryColor },
    })),
  }
})
</script>
