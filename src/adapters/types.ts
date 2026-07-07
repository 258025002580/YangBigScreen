import type { ApiResponse } from '@/types/api'
import type { DashboardData, RealtimeData } from '@/types/dashboard'
import type { ChartData } from '@/types/chart'

/** 数据适配器接口 —— 所有适配器必须实现此接口 */
export interface IDataAdapter {
  /** 获取仪表盘整体数据 */
  fetchDashboardData(): Promise<ApiResponse<DashboardData>>

  /** 获取单个图表数据 */
  fetchChartData(chartId: string, params?: Record<string, unknown>): Promise<ApiResponse<ChartData>>

  /** 批量获取实时刷新数据 */
  fetchRealtimeData(chartIds: string[]): Promise<ApiResponse<RealtimeData[]>>
}
