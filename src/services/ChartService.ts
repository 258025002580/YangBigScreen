import type { ChartData } from '@/types/chart'
import type { ApiResponse } from '@/types/api'
import { getAdapter } from '@/adapters'
import { validateChartData } from '@/utils/validator'
import { logger } from '@/utils/logger'

const log = logger.module('ChartService')

/**
 * 图表数据服务
 * 封装单个图表数据的获取逻辑
 */
class ChartService {
  /** 获取单个图表数据 */
  async fetchChartData(chartId: string, params?: Record<string, unknown>): Promise<ApiResponse<ChartData>> {
    log.info('获取图表数据', { chartId })
    const adapter = getAdapter()
    const response = await adapter.fetchChartData(chartId, params)

    if (response.code === 200 && !validateChartData(response.data)) {
      log.error('图表数据校验失败', { chartId })
      throw new Error(`图表 ${chartId} 数据格式异常`)
    }

    return response
  }
}

export const chartService = new ChartService()
