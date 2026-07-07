<template>
  <div ref="chartRef" class="chart-container" :style="{ height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, shallowRef } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = withDefaults(
  defineProps<{
    option: EChartsOption
    height?: string
  }>(),
  { height: '100%' },
)

const chartRef = ref<HTMLElement | null>(null)
const instance = shallowRef<echarts.ECharts | null>(null)

function init() {
  if (!chartRef.value) return
  instance.value = echarts.init(chartRef.value)
  instance.value.setOption(props.option)
}

function resize() {
  instance.value?.resize()
}

watch(
  () => props.option,
  (val) => instance.value?.setOption(val, { notMerge: true }),
  { deep: true },
)

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  window.removeEventListener('resize', resize)
  instance.value?.dispose()
})
</script>

<style scoped>
.chart-container {
  width: 100%;
}
</style>
