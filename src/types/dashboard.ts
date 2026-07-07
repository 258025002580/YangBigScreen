import type { ChartData } from './chart'

/** 仪表盘整体数据 */
export interface DashboardData {
  /** 仪表盘标题 */
  title: string
  /** 数据更新时间 */
  updateTime: string
  /** 各图表数据集合 */
  charts: Record<string, ChartData>
  /** 汇总指标 */
  summary: DashboardSummary
}

/** 汇总指标 */
export interface DashboardSummary {
  /** 总销售额 */
  totalSales: number
  /** 总订单数 */
  totalOrders: number
  /** 总用户数 */
  totalUsers: number
  /** 同比变化率 */
  growthRate: number
}

/** 实时刷新数据 */
export interface RealtimeData {
  chartId: string
  data: ChartData
  timestamp: number
}
