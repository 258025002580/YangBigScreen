/** 通用工具类型 */

/** 可为空的类型 */
export type Nullable<T> = T | null

/** 可选的记录类型 */
export type OptionalRecord<K extends string, V> = Partial<Record<K, V>>

/** 时间范围 */
export interface TimeRange {
  start: string
  end: string
}

/** 分页参数 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/** 分页响应 */
export interface PaginatedData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
