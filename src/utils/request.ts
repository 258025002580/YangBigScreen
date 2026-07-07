import type { ApiResponse, ApiRequestConfig } from '@/types/api'
import { DEFAULT_REQUEST_CONFIG } from '@/types/api'
import { logger } from '@/utils/logger'

const log = logger.module('Request')

/**
 * HTTP 请求封装
 * 后期对接真实 API 时使用，当前为占位实现
 */
export async function request<T>(
  url: string,
  options?: RequestInit,
  config?: Partial<ApiRequestConfig>,
): Promise<ApiResponse<T>> {
  const { timeout, retry, retryDelay } = { ...DEFAULT_REQUEST_CONFIG, ...config }
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= retry; attempt++) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      clearTimeout(timer)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return response.json()
    } catch (err) {
      lastError = err as Error
      log.warn(`请求失败 (第${attempt + 1}次)`, { url, error: lastError.message })

      if (attempt < retry) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
      }
    }
  }

  throw lastError
}
