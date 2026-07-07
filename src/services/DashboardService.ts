import type { DashboardData } from '@/types/dashboard'
import type { ApiResponse } from '@/types/api'
import { getAdapter } from '@/adapters'
import { validateDashboardData } from '@/utils/validator'
import { logger } from '@/utils/logger'

const log = logger.module('DashboardService')

/**
 * 仪表盘数据服务
 * 封装仪表盘整体数据的获取逻辑
 */
class DashboardService {
  /** 获取仪表盘完整数据 */
  async fetchDashboardData(): Promise<ApiResponse<DashboardData>> {
    log.info('获取仪表盘数据')
    const adapter = getAdapter()
    const response = await adapter.fetchDashboardData()

    if (response.code === 200 && !validateDashboardData(response.data)) {
      log.error('仪表盘数据校验失败')
      throw new Error('数据格式异常')
    }

    return response
  }
}

export const dashboardService = new DashboardService()
