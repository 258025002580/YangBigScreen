<template>
  <div ref="chartRef" class="base-chart" :style="{ height: height }">
    <div v-if="loading" class="chart-loading">
      <div class="loading-spinner"></div>
    </div>
    <div v-if="error" class="chart-error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, shallowRef } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { theme } from '@/config'

const props = withDefaults(
  defineProps<{
    option: EChartsOption
    height?: string
    loading?: boolean
    error?: string
  }>(),
  {
    height: '100%',
    loading: false,
    error: '',
  },
)

const chartRef = ref<HTMLElement | null>(null)
const chartInstance = shallowRef<echarts.ECharts | null>(null)

function initChart(): void {
  if (!chartRef.value) return
  chartInstance.value = echarts.init(chartRef.value)
  chartInstance.value.setOption(props.option)
}

function updateChart(): void {
  if (!chartInstance.value) return
  chartInstance.value.setOption(props.option, { notMerge: true })
}

function resizeChart(): void {
  chartInstance.value?.resize()
}

// 监听 option 变化
watch(
  () => props.option,
  () => updateChart(),
  { deep: true },
)

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance.value?.dispose()
})
</script>

<style scoped>
.base-chart {
  width: 100%;
  position: relative;
}
.chart-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid v-bind('theme.panelBorderColor');
  border-top-color: v-bind('theme.primaryColor');
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.chart-error {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: v-bind('theme.dangerColor');
  font-size: 14px;
}
</style>
