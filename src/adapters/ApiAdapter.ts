import type { IDataAdapter } from './types'
import type { ApiResponse } from '@/types/api'
import type { DashboardData, RealtimeData } from '@/types/dashboard'
import type { ChartData } from '@/types/chart'
import { logger } from '@/utils/logger'

const log = logger.module('ApiAdapter')

/**
 * 真实 API 适配器
 * 后期切换到真实后端时使用
 * 当前为占位实现，后续替换为实际的 HTTP 请求
 */
export class ApiAdapter implements IDataAdapter {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL || '/api'
  }

  async fetchDashboardData(): Promise<ApiResponse<DashboardData>> {
    log.info('获取仪表盘数据（API）')
    const response = await fetch(`${this.baseUrl}/dashboard`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    return response.json()
  }

  async fetchChartData(chartId: string, params?: Record<string, unknown>): Promise<ApiResponse<ChartData>> {
    log.info('获取图表数据（API）', { chartId, params })
    const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : ''
    const response = await fetch(`${this.baseUrl}/charts/${chartId}${query}`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    return response.json()
  }

  async fetchRealtimeData(chartIds: string[]): Promise<ApiResponse<RealtimeData[]>> {
    log.info('获取实时数据（API）', { chartIds })
    const response = await fetch(`${this.baseUrl}/realtime`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chartIds }),
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    return response.json()
  }
}
