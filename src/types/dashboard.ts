/** 仪表盘核心数据类型 */

export interface MetricItem {
  id: string
  label: string
  value: number
  unit: string
  icon: string
  color: string
  trend?: number
}

export interface TrendPoint {
  time: string
  value: number
}

export interface CategoryItem {
  name: string
  value: number
  color?: string
}

export interface RankingItem {
  name: string
  value: number
  percent?: number
}

export interface RadarItem {
  name: string
  value: number
  max: number
}

export interface ActivityItem {
  id: number
  type: 'info' | 'warning' | 'success' | 'error'
  content: string
  time: string
}

export interface DashboardData {
  title: string
  updateTime: string
  metrics: MetricItem[]
  trendData: TrendPoint[]
  categories: CategoryItem[]
  rankings: RankingItem[]
  radarData: RadarItem[]
  activities: ActivityItem[]
  mapData: { name: string; value: number }[]
}

export interface ApiResponse<T> {
  code: number
  data: T
  message: string
  timestamp: number
}
