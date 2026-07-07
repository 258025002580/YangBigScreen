<template>
  <DashboardLayout>
    <template #header>
      <HeaderPanel />
    </template>
    <template #left>
      <LeftPanel />
    </template>
    <template #center>
      <CenterPanel />
    </template>
    <template #right>
      <RightPanel />
    </template>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import HeaderPanel from './panels/HeaderPanel.vue'
import LeftPanel from './panels/LeftPanel.vue'
import CenterPanel from './panels/CenterPanel.vue'
import RightPanel from './panels/RightPanel.vue'
import { useDashboardStore } from '@/stores'
import { useAutoRefresh } from '@/composables/useAutoRefresh'
import { logger } from '@/utils/logger'

const log = logger.module('Dashboard')
const dashboardStore = useDashboardStore()

// 初始化加载仪表盘数据
onMounted(async () => {
  log.info('仪表盘初始化')
  await dashboardStore.fetchDashboard(true)
})

// 自动刷新
useAutoRefresh(async () => {
  await dashboardStore.fetchDashboard(true)
})
</script>
