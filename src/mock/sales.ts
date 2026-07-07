import type { ChartData } from '@/types/chart'
import { generateDateRange, generateTrendData, randomFloat, randomInt } from './common'

const DAYS = 30
const dates = generateDateRange(DAYS)

/** 销售趋势图 */
export const salesTrendChart: ChartData = {
  id: 'sales-trend',
  title: '销售趋势',
  type: 'line',
  xAxis: dates,
  series: [
    {
      name: '销售额',
      data: generateTrendData(DAYS, 50000, 15000),
      color: '#00b4ff',
    },
    {
      name: '订单量',
      data: generateTrendData(DAYS, 300, 80),
      color: '#00e396',
    },
  ],
}

/** 地区销售排行 */
export const regionSalesChart: ChartData = {
  id: 'region-sales',
  title: '地区销售排行',
  type: 'bar',
  xAxis: ['华东', '华南', '华北', '西南', '华中', '东北', '西北'],
  series: [
    {
      name: '销售额（万元）',
      data: [
        randomInt(80, 150),
        randomInt(70, 130),
        randomInt(60, 110),
        randomInt(50, 90),
        randomInt(40, 80),
        randomInt(30, 70),
        randomInt(20, 50),
      ],
      color: '#00b4ff',
    },
  ],
}

/** 品类占比 */
export const categoryPieChart: ChartData = {
  id: 'category-pie',
  title: '品类销售占比',
  type: 'pie',
  xAxis: [],
  series: [
    {
      name: '品类占比',
      data: [
        { name: '电子产品', value: randomFloat(30, 40) },
        { name: '服装鞋帽', value: randomFloat(20, 30) },
        { name: '食品饮料', value: randomFloat(15, 25) },
        { name: '家居用品', value: randomFloat(10, 20) },
        { name: '其他', value: randomFloat(5, 10) },
      ],
    },
  ],
}

/** 散点图：客户消费分布 */
export const customerScatterChart: ChartData = {
  id: 'customer-scatter',
  title: '客户消费分布',
  type: 'scatter',
  xAxis: [],
  series: [
    {
      name: '客户',
      data: Array.from({ length: 50 }, () => [randomFloat(0, 10000), randomFloat(0, 500)]),
      color: '#00b4ff',
    },
  ],
}

/** 汇总数据 */
export const mockSummary = {
  totalSales: randomFloat(5000000, 8000000),
  totalOrders: randomInt(8000, 12000),
  totalUsers: randomInt(50000, 80000),
  growthRate: randomFloat(0.05, 0.25),
}
