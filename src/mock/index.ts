import type { DashboardData } from '@/types/dashboard'
import { salesTrendChart, regionSalesChart, categoryPieChart, customerScatterChart, mockSummary } from './sales'
import { userGrowthChart, userSourceChart } from './user'
import { mapChart } from './map'

/** 完整的 Mock 仪表盘数据 */
export const mockDashboardData: DashboardData = {
  title: '阳的数据大屏',
  updateTime: new Date().toISOString(),
  charts: {
    'sales-trend': salesTrendChart,
    'region-sales': regionSalesChart,
    'category-pie': categoryPieChart,
    'customer-scatter': customerScatterChart,
    'user-growth': userGrowthChart,
    'user-source': userSourceChart,
    'china-map': mapChart,
  },
  summary: mockSummary,
}

export { mockSummary } from './sales'
