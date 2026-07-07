import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { createLogger } from '@/logs/logger'

const log = createLogger('Http')

const http: AxiosInstance = axios.create({
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use(
  (config) => {
    log.debug(`请求 ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    log.error('请求拦截器错误', error)
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    log.debug(`响应 ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    log.error(`响应错误 ${error.response?.status} ${error.config?.url}`, error.message)
    return Promise.reject(error)
  },
)

export default http
