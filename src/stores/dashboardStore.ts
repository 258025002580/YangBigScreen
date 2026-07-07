import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DashboardData } from '@/types/dashboard'
import { dashboardService } from '@/services/DashboardService'
import { createLogger } from '@/logs/logger'

const log = createLogger('DashboardStore')

export const useDashboardStore = defineStore('dashboard', () => {
  const data = ref<DashboardData | null>(null)
  const loading = ref(false)
  const error = ref('')
  const lastFetched = ref(0)

  async function fetchDashboard(force = false): Promise<void> {
    if (!force && lastFetched.value && Date.now() - lastFetched.value < 30000) {
      return
    }
    loading.value = true
    error.value = ''
    try {
      const res = await dashboardService.fetchDashboard()
      data.value = res.data
      lastFetched.value = Date.now()
      log.info('仪表盘数据加载成功')
    } catch (e) {
      error.value = e instanceof Error ? e.message : '未知错误'
      log.error('仪表盘数据加载失败', e)
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, lastFetched, fetchDashboard }
})
