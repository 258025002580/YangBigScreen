<template>
  <div class="right-panel">
    <DataCard title="品类销售占比">
      <PieChart v-bind="categoryPieProps" />
    </DataCard>
    <DataCard title="用户增长趋势">
      <LineChart v-bind="userGrowthProps" />
    </DataCard>
    <DataCard title="用户来源分布">
      <PieChart v-bind="userSourceProps" />
    </DataCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import DataCard from '@/components/common/DataCard.vue'
import PieChart from '@/components/charts/PieChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import { useChartData } from '@/composables/useChartData'

const categoryPie = useChartData('category-pie')
const userGrowth = useChartData('user-growth')
const userSource = useChartData('user-source')

const categoryPieProps = categoryPie.toChartProps()
const userGrowthProps = userGrowth.toChartProps()
const userSourceProps = userSource.toChartProps()

onMounted(() => {
  categoryPie.fetchData()
  userGrowth.fetchData()
  userSource.fetchData()
})
</script>

<style scoped>
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}
.right-panel > * {
  flex: 1;
  min-height: 0;
}
</style>
