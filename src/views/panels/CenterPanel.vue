<template>
  <div class="center-panel">
    <div class="summary-row">
      <div class="summary-item">
        <span class="summary-label">总销售额</span>
        <NumberFlop :value="summary?.totalSales || 0" :decimals="0" prefix="¥" color="#00e396" />
      </div>
      <div class="summary-item">
        <span class="summary-label">总订单数</span>
        <NumberFlop :value="summary?.totalOrders || 0" color="#00b4ff" />
      </div>
      <div class="summary-item">
        <span class="summary-label">总用户数</span>
        <NumberFlop :value="summary?.totalUsers || 0" color="#feb019" />
      </div>
      <div class="summary-item">
        <span class="summary-label">同比增长率</span>
        <NumberFlop :value="(summary?.growthRate || 0) * 100" :decimals="2" suffix="%" color="#ff4560" />
      </div>
    </div>
    <DataCard title="全国销售分布" height="100%">
      <MapChart v-bind="mapProps" />
    </DataCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import DataCard from '@/components/common/DataCard.vue'
import NumberFlop from '@/components/common/NumberFlop.vue'
import MapChart from '@/components/charts/MapChart.vue'
import { useDashboardStore } from '@/stores'
import { useChartData } from '@/composables/useChartData'

const dashboardStore = useDashboardStore()
const summary = computed(() => dashboardStore.dashboardData?.summary)

const mapChart = useChartData('china-map')
const mapProps = mapChart.toChartProps()

onMounted(() => {
  mapChart.fetchData()
})
</script>

<style scoped>
.center-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}
.summary-row {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}
.summary-item {
  flex: 1;
  padding: 16px;
  text-align: center;
  background: rgba(6, 30, 60, 0.8);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 4px;
}
.summary-label {
  display: block;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-bottom: 8px;
}
.center-panel > :last-child {
  flex: 1;
  min-height: 0;
}
</style>
