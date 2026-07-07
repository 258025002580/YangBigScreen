<template>
  <BigScreenLayout>
    <ScreenHeader :title="data?.title || '如意数据大屏'" />

    <!-- 核心指标 -->
    <div class="metrics-row">
      <MetricCard v-for="m in data?.metrics" :key="m.id" v-bind="m" />
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 左侧 -->
      <div class="side-left">
        <BasePanel title="访问趋势">
          <LineTrendChart :option="trendOption" height="100%" />
        </BasePanel>
        <BasePanel title="分类占比">
          <PieStatusChart :option="categoryOption" height="100%" />
        </BasePanel>
      </div>

      <!-- 中间 -->
      <div class="center-area">
        <BasePanel title="全国态势总览">
          <MapOverviewChart :option="mapOption" height="100%" />
        </BasePanel>
      </div>

      <!-- 右侧 -->
      <div class="side-right">
        <BasePanel title="城市排名">
          <BarRankingChart :option="rankingOption" height="100%" />
        </BasePanel>
        <BasePanel title="能力雷达">
          <RadarAbilityChart :option="radarOption" height="100%" />
        </BasePanel>
      </div>
    </div>

    <!-- 底部 -->
    <div class="bottom-row">
      <BasePanel title="实时动态">
        <div class="activity-list">
          <div v-for="item in data?.activities" :key="item.id" class="activity-item">
            <span class="activity-dot" :class="item.type"></span>
            <span class="activity-content">{{ item.content }}</span>
            <span class="activity-time">{{ item.time }}</span>
          </div>
        </div>
      </BasePanel>
    </div>
  </BigScreenLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import BigScreenLayout from '@/layouts/BigScreenLayout.vue'
import ScreenHeader from '@/components/ScreenHeader.vue'
import MetricCard from '@/components/MetricCard.vue'
import BasePanel from '@/components/BasePanel.vue'
import LineTrendChart from '@/charts/LineTrendChart.vue'
import BarRankingChart from '@/charts/BarRankingChart.vue'
import PieStatusChart from '@/charts/PieStatusChart.vue'
import RadarAbilityChart from '@/charts/RadarAbilityChart.vue'
import MapOverviewChart from '@/charts/MapOverviewChart.vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const store = useDashboardStore()
const data = computed(() => store.data)

// 访问趋势折线图
const trendOption = computed<EChartsOption>(() => {
  const d = data.value?.trendData ?? []
  return {
    backgroundColor: 'transparent',
    grid: { left: 40, right: 16, top: 16, bottom: 24 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6,27,63,0.9)',
      borderColor: 'rgba(0,180,255,0.3)',
      textStyle: { color: '#b0d8ff', fontSize: 12 },
    },
    xAxis: {
      type: 'category',
      data: d.map((p) => p.time),
      axisLine: { lineStyle: { color: 'rgba(0,180,255,0.2)' } },
      axisLabel: { color: 'rgba(176,216,255,0.5)', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
      axisLabel: { color: 'rgba(176,216,255,0.5)', fontSize: 10 },
    },
    series: [
      {
        type: 'line',
        data: d.map((p) => p.value),
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#00d4ff', width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0,212,255,0.25)' },
              { offset: 1, color: 'rgba(0,212,255,0)' },
            ],
          },
        },
      },
    ],
  }
})

// 分类占比饼图
const categoryOption = computed<EChartsOption>(() => {
  const d = data.value?.categories ?? []
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(6,27,63,0.9)',
      borderColor: 'rgba(0,180,255,0.3)',
      textStyle: { color: '#b0d8ff', fontSize: 12 },
      formatter: '{b}: {c}%',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['50%', '50%'],
        label: { color: '#b0d8ff', fontSize: 10, formatter: '{b}\n{d}%' },
        labelLine: { lineStyle: { color: 'rgba(176,216,255,0.3)' } },
        itemStyle: { borderRadius: 3, borderColor: '#0a1432', borderWidth: 2 },
        data: d.map((c) => ({ name: c.name, value: c.value, itemStyle: { color: c.color } })),
      },
    ],
  }
})

// 城市排名柱状图
const rankingOption = computed<EChartsOption>(() => {
  const d = data.value?.rankings ?? []
  return {
    backgroundColor: 'transparent',
    grid: { left: 60, right: 16, top: 8, bottom: 8 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6,27,63,0.9)',
      borderColor: 'rgba(0,180,255,0.3)',
      textStyle: { color: '#b0d8ff', fontSize: 12 },
    },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
      axisLabel: { color: 'rgba(176,216,255,0.5)', fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      data: d.map((r) => r.name).reverse(),
      axisLine: { lineStyle: { color: 'rgba(0,180,255,0.2)' } },
      axisLabel: { color: 'rgba(176,216,255,0.7)', fontSize: 11 },
      inverse: true,
    },
    series: [
      {
        type: 'bar',
        data: d
          .map((r) => ({
            value: r.value,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#00d4ff' },
                { offset: 1, color: '#0066cc' },
              ]),
              borderRadius: [0, 3, 3, 0],
            },
          }))
          .reverse(),
        barWidth: 14,
        label: { show: true, position: 'right', color: '#b0d8ff', fontSize: 10, formatter: '{c}' },
      },
    ],
  }
})

// 能力雷达图
const radarOption = computed<EChartsOption>(() => {
  const d = data.value?.radarData ?? []
  if (d.length === 0) return {}
  return {
    backgroundColor: 'transparent',
    radar: {
      center: ['50%', '50%'],
      radius: '65%',
      indicator: d.map((r) => ({ name: r.name, max: r.max })),
      axisName: { color: '#b0d8ff', fontSize: 11 },
      splitArea: { areaStyle: { color: ['rgba(0,212,255,0.02)', 'rgba(0,212,255,0.04)'] } },
      splitLine: { lineStyle: { color: 'rgba(0,180,255,0.15)' } },
      axisLine: { lineStyle: { color: 'rgba(0,180,255,0.2)' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: d.map((r) => r.value),
            name: '当前值',
            areaStyle: { color: 'rgba(0,212,255,0.2)' },
            lineStyle: { color: '#00d4ff', width: 2 },
            itemStyle: { color: '#00d4ff' },
            symbol: 'circle',
            symbolSize: 4,
          },
        ],
      },
    ],
  }
})

// 地图总览（散点气泡图）
const mapOption = computed<EChartsOption>(() => {
  const d = data.value?.mapData ?? []
  const geoData = d.map((item, _i) => ({
    name: item.name,
    value: [Math.random() * 100, Math.random() * 100, item.value],
  }))
  return {
    backgroundColor: 'transparent',
    grid: { left: 10, right: 20, top: 20, bottom: 20 },
    xAxis: { show: false, min: -10, max: 110 },
    yAxis: { show: false, min: -10, max: 110 },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(6,27,63,0.9)',
      borderColor: 'rgba(0,180,255,0.3)',
      textStyle: { color: '#b0d8ff', fontSize: 12 },
      formatter: (p: unknown) => {
        const param = p as { name: string; value: [number, number, number] }
        return `${param.name}<br/>活跃度: ${param.value[2]}`
      },
    },
    series: [
      {
        type: 'scatter',
        symbolSize: (val: unknown) => Math.max(20, (val as [number, number, number])[2]),
        data: geoData,
        animationDelay: (idx: number) => idx * 30,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { offset: 0, color: 'rgba(0,212,255,0.8)' },
            { offset: 1, color: 'rgba(0,100,200,0.1)' },
          ]),
        },
        label: {
          show: true,
          formatter: (p: unknown) => (p as { name: string }).name,
          color: '#b0d8ff',
          fontSize: 10,
          position: 'bottom',
        },
      },
    ],
  }
})

onMounted(() => {
  store.fetchDashboard(true)
})
</script>

<style scoped>
.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 12px 20px;
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  display: flex;
  gap: 12px;
  padding: 0 20px;
  min-height: 0;
}

.side-left,
.side-right {
  width: 460px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.side-left > *,
.side-right > * {
  flex: 1;
  min-height: 0;
}

.center-area {
  flex: 1;
  min-width: 0;
}

.center-area > * {
  height: 100%;
}

.bottom-row {
  flex-shrink: 0;
  padding: 12px 20px 16px;
  height: 160px;
}

.bottom-row > * {
  height: 100%;
}

.activity-list {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 12px;
}

.activity-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.activity-dot.info {
  background: #00d4ff;
}

.activity-dot.warning {
  background: #feb019;
}

.activity-dot.success {
  background: #00e396;
}

.activity-dot.error {
  background: #ff4560;
}

.activity-content {
  flex: 1;
  color: rgba(176, 216, 255, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-time {
  color: rgba(176, 216, 255, 0.4);
  font-family: DIN, Arial, monospace;
  flex-shrink: 0;
}
</style>
