import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DashboardData } from '@/types/dashboard'
import { dashboardService } from '@/services'
import { logger } from '@/utils/logger'

const log = logger.module('DashboardStore')

/**
 * 仪表盘全局状态
 * 缓存仪表盘数据、管理加载状态
 */
export const useDashboardStore = defineStore('dashboard', () => {
  const dashboardData = ref<DashboardData | null>(null)
  const loading = ref(false)
  const error = ref('')
  const lastFetched = ref<number | null>(null)

  /** 获取仪表盘数据（带缓存策略） */
  async function fetchDashboard(force = false): Promise<void> {
    // 缓存策略：5分钟内不重复请求
    if (!force && lastFetched.value && Date.now() - lastFetched.value < 5 * 60 * 1000) {
      log.debug('使用缓存数据')
      return
    }

    loading.value = true
    error.value = ''
    try {
      const response = await dashboardService.fetchDashboardData()
      if (response.code === 200) {
        dashboardData.value = response.data
        lastFetched.value = Date.now()
      } else {
        error.value = response.message
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : '获取仪表盘数据失败'
      log.error('获取仪表盘数据失败', { error: msg })
      error.value = msg
    } finally {
      loading.value = false
    }
  }

  return {
    dashboardData,
    loading,
    error,
    lastFetched,
    fetchDashboard,
  }
})
