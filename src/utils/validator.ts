import type { ChartData } from '@/types/chart'
import type { DashboardData } from '@/types/dashboard'

/**
 * 数据校验工具
 * 在数据进入系统前进行基本校验，防止脏数据导致渲染异常
 */

/** 校验图表数据 */
export function validateChartData(data: unknown): data is ChartData {
  if (!data || typeof data !== 'object') return false
  const chart = data as ChartData
  return (
    typeof chart.id === 'string' &&
    typeof chart.title === 'string' &&
    Array.isArray(chart.xAxis) &&
    Array.isArray(chart.series)
  )
}

/** 校验仪表盘数据 */
export function validateDashboardData(data: unknown): data is DashboardData {
  if (!data || typeof data !== 'object') return false
  const dashboard = data as DashboardData
  return (
    typeof dashboard.title === 'string' &&
    typeof dashboard.updateTime === 'string' &&
    typeof dashboard.charts === 'object' &&
    typeof dashboard.summary === 'object'
  )
}
