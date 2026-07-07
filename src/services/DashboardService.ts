import type { DashboardData, ApiResponse } from '@/types/dashboard'
import { getDataSource } from './dataSource'
import { createLogger } from '@/logs/logger'

const log = createLogger('DashboardService')

class DashboardService {
  /** 获取仪表盘完整数据 */
  async fetchDashboard(): Promise<ApiResponse<DashboardData>> {
    log.info('获取仪表盘数据')
    const source = getDataSource()
    const response = await source.fetchDashboard()
    if (response.code !== 200) {
      log.error('获取仪表盘数据失败', response)
      throw new Error(response.message || '获取数据失败')
    }
    return response
  }
}

export const dashboardService = new DashboardService()
