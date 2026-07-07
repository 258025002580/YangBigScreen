<template>
  <div class="left-panel">
    <DataCard title="销售趋势">
      <LineChart v-bind="salesTrendProps" />
    </DataCard>
    <DataCard title="地区销售排行">
      <BarChart v-bind="regionSalesProps" />
    </DataCard>
    <DataCard title="客户消费分布">
      <ScatterChart v-bind="customerScatterProps" />
    </DataCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import DataCard from '@/components/common/DataCard.vue'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import ScatterChart from '@/components/charts/ScatterChart.vue'
import { useChartData } from '@/composables/useChartData'

const salesTrend = useChartData('sales-trend')
const regionSales = useChartData('region-sales')
const customerScatter = useChartData('customer-scatter')

const salesTrendProps = salesTrend.toChartProps()
const regionSalesProps = regionSales.toChartProps()
const customerScatterProps = customerScatter.toChartProps()

onMounted(() => {
  salesTrend.fetchData()
  regionSales.fetchData()
  customerScatter.fetchData()
})
</script>

<style scoped>
.left-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}
.left-panel > * {
  flex: 1;
  min-height: 0;
}
</style>
