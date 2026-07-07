import type { ApiResponse, DashboardData } from '@/types/dashboard'
import { createLogger } from '@/logs/logger'

const log = createLogger('DataSource')

/**
 * 数据源接口
 * 所有数据源必须实现此接口
 */
export interface IDataSource {
  fetchDashboard(): Promise<ApiResponse<DashboardData>>
}

/**
 * Mock 数据源
 * 直接导入本地 mock 数据，通过 setTimeout 模拟网络延迟
 */
class MockDataSource implements IDataSource {
  async fetchDashboard(): Promise<ApiResponse<DashboardData>> {
    log.info('使用 Mock 数据源')
    const { mockDashboardData } = await import('@/mocks/dashboardMock')
    await new Promise((r) => setTimeout(r, 200))
    return {
      code: 200,
      data: mockDashboardData,
      message: 'success',
      timestamp: Date.now(),
    }
  }
}

/**
 * API 数据源
 * 通过 Axios 请求真实后端 API
 */
class ApiDataSource implements IDataSource {
  async fetchDashboard(): Promise<ApiResponse<DashboardData>> {
    log.info('使用 API 数据源')
    const { default: http } = await import('./http')
    const response = await http.get<ApiResponse<DashboardData>>('/api/dashboard')
    return response.data
  }
}

let source: IDataSource | null = null

/**
 * 获取当前数据源实例
 * 根据 VITE_DATA_SOURCE 环境变量决定使用 Mock 还是 API
 */
export function getDataSource(): IDataSource {
  if (!source) {
    const mode = import.meta.env.VITE_DATA_SOURCE || 'mock'
    source = mode === 'api' ? new ApiDataSource() : new MockDataSource()
    log.info(`数据源模式: ${mode}`)
  }
  return source
}

/** 重置数据源（测试用） */
export function resetDataSource(): void {
  source = null
}
