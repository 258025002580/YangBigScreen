import { MockAdapter } from './MockAdapter'
import { ApiAdapter } from './ApiAdapter'
import type { IDataAdapter } from './types'

/**
 * 适配器工厂
 * 根据环境变量 VITE_DATA_SOURCE 决定使用哪个适配器
 * - mock: 使用 MockAdapter（本地 Mock 数据）
 * - api:  使用 ApiAdapter（真实 API）
 */
let adapter: IDataAdapter | null = null

export function getAdapter(): IDataAdapter {
  if (!adapter) {
    const source = import.meta.env.VITE_DATA_SOURCE || 'mock'
    adapter = source === 'api' ? new ApiAdapter() : new MockAdapter()
    console.warn(`[Adapter] 当前数据源: ${source}`)
  }
  return adapter
}

/** 重置适配器（主要用于测试） */
export function resetAdapter(): void {
  adapter = null
}

export { MockAdapter, ApiAdapter }
export type { IDataAdapter }
