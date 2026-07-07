import type { ChartData } from '@/types/chart'
import { generateDateRange, generateTrendData } from './common'

const DAYS = 30
const dates = generateDateRange(DAYS)

/** 用户增长趋势 */
export const userGrowthChart: ChartData = {
  id: 'user-growth',
  title: '用户增长趋势',
  type: 'line',
  xAxis: dates,
  series: [
    {
      name: '新增用户',
      data: generateTrendData(DAYS, 200, 50),
      color: '#00e396',
    },
    {
      name: '活跃用户',
      data: generateTrendData(DAYS, 1500, 300),
      color: '#00b4ff',
    },
  ],
}

/** 用户来源分布 */
export const userSourceChart: ChartData = {
  id: 'user-source',
  title: '用户来源分布',
  type: 'pie',
  xAxis: [],
  series: [
    {
      name: '用户来源',
      data: [
        { name: '搜索引擎', value: 35 },
        { name: '社交媒体', value: 25 },
        { name: '直接访问', value: 20 },
        { name: '推荐链接', value: 15 },
        { name: '其他', value: 5 },
      ],
    },
  ],
}
