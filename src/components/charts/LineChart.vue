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
      boundaryGap: false,
      axisLine: { lineStyle: { color: theme.panelBorderColor } },
      axisLabel: { color: theme.textColor, fontSize: theme.fontSize.small },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: theme.textColor, fontSize: theme.fontSize.small },
    },
    series: data.series.map((s) => ({
      type: 'line',
      name: s.name,
      data: s.data as number[],
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { color: s.color || theme.primaryColor, width: 2 },
      itemStyle: { color: s.color || theme.primaryColor },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: (s.color || theme.primaryColor).replace(')', ',0.3)').replace('rgb', 'rgba') },
          { offset: 1, color: 'rgba(0,0,0,0)' },
        ]),
      },
    })),
  }
})

// 需要在 script setup 中引入 echarts 才能使用 graphic
import * as echarts from 'echarts'
</script>
