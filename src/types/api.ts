/** API 请求/响应通用类型 */

/** 统一 API 响应结构 */
export interface ApiResponse<T> {
  code: number
  data: T
  message: string
  timestamp: number
}

/** API 请求配置 */
export interface ApiRequestConfig {
  /** 请求超时时间（ms） */
  timeout: number
  /** 重试次数 */
  retry: number
  /** 重试间隔（ms） */
  retryDelay: number
}

/** 默认请求配置 */
export const DEFAULT_REQUEST_CONFIG: ApiRequestConfig = {
  timeout: 10000,
  retry: 2,
  retryDelay: 1000,
}
