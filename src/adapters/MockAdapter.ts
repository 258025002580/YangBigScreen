import type { IDataAdapter } from './types'
import type { ApiResponse } from '@/types/api'
import type { DashboardData, RealtimeData } from '@/types/dashboard'
import type { ChartData } from '@/types/chart'
import { mockDashboardData } from '@/mock'
import { logger } from '@/utils/logger'

const log = logger.module('MockAdapter')

/**
 * Mock 数据适配器
 * 开发阶段使用，从本地 mock 数据中获取数据
 * 通过 setTimeout 模拟网络延迟
 */
export class MockAdapter implements IDataAdapter {
  private delay = 300 // 模拟网络延迟（ms）

  async fetchDashboardData(): Promise<ApiResponse<DashboardData>> {
    log.info('获取仪表盘数据（Mock）')
    await this.simulateDelay()
    return {
      code: 200,
      data: mockDashboardData,
      message: 'success',
      timestamp: Date.now(),
    }
  }

  async fetchChartData(chartId: string, params?: Record<string, unknown>): Promise<ApiResponse<ChartData>> {
    log.info('获取图表数据', { chartId, params })
    await this.simulateDelay()
    const chart = mockDashboardData.charts[chartId]
    if (!chart) {
      log.error('图表数据不存在', { chartId })
      return {
        code: 404,
        data: {} as ChartData,
        message: `图表 ${chartId} 不存在`,
        timestamp: Date.now(),
      }
    }
    return {
      code: 200,
      data: chart,
      message: 'success',
      timestamp: Date.now(),
    }
  }

  async fetchRealtimeData(chartIds: string[]): Promise<ApiResponse<RealtimeData[]>> {
    log.info('获取实时数据（Mock）', { chartIds })
    await this.simulateDelay()
    const data: RealtimeData[] = chartIds.map((id) => {
      const chart = mockDashboardData.charts[id]
      return {
        chartId: id,
        data: chart || ({} as ChartData),
        timestamp: Date.now(),
      }
    })
    return {
      code: 200,
      data,
      message: 'success',
      timestamp: Date.now(),
    }
  }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay))
  }
}
