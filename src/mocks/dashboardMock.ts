import type {
  DashboardData,
  TrendPoint,
  CategoryItem,
  RankingItem,
  RadarItem,
  ActivityItem,
  MetricItem,
} from '@/types/dashboard'

function rnd(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateTrend(days: number, base: number, variance: number): TrendPoint[] {
  const now = new Date()
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - (days - 1 - i))
    return {
      time: `${d.getMonth() + 1}/${d.getDate()}`,
      value: rnd(base - variance, base + variance),
    }
  })
}

const metrics: MetricItem[] = [
  {
    id: 'visits',
    label: '今日访问量',
    value: rnd(8000, 15000),
    unit: '次',
    icon: 'eye',
    color: '#00d4ff',
    trend: 0.12,
  },
  {
    id: 'orders',
    label: '实时订单数',
    value: rnd(3000, 6000),
    unit: '单',
    icon: 'cart',
    color: '#00e396',
    trend: 0.08,
  },
  {
    id: 'users',
    label: '活跃用户数',
    value: rnd(5000, 9000),
    unit: '人',
    icon: 'user',
    color: '#feb019',
    trend: -0.03,
  },
  { id: 'health', label: '系统健康度', value: rnd(95, 100), unit: '%', icon: 'heart', color: '#ff4560', trend: 0 },
]

const trendData: TrendPoint[] = generateTrend(30, 2000, 500)

const categories: CategoryItem[] = [
  { name: '电子商务', value: rnd(25, 35), color: '#00d4ff' },
  { name: '金融保险', value: rnd(18, 28), color: '#00e396' },
  { name: '教育医疗', value: rnd(15, 22), color: '#feb019' },
  { name: '社交娱乐', value: rnd(10, 18), color: '#ff4560' },
  { name: '其他行业', value: rnd(5, 12), color: '#a855f7' },
]

const rankings: RankingItem[] = [
  { name: '北京市', value: rnd(800, 1200), percent: 0.92 },
  { name: '上海市', value: rnd(750, 1100), percent: 0.88 },
  { name: '深圳市', value: rnd(700, 1000), percent: 0.85 },
  { name: '广州市', value: rnd(650, 950), percent: 0.82 },
  { name: '杭州市', value: rnd(600, 900), percent: 0.78 },
  { name: '成都市', value: rnd(550, 850), percent: 0.75 },
  { name: '武汉市', value: rnd(500, 800), percent: 0.72 },
  { name: '南京市', value: rnd(450, 750), percent: 0.68 },
]

const radarData: RadarItem[] = [
  { name: '性能', value: rnd(80, 95), max: 100 },
  { name: '安全', value: rnd(75, 92), max: 100 },
  { name: '稳定', value: rnd(85, 98), max: 100 },
  { name: '扩展', value: rnd(70, 90), max: 100 },
  { name: '体验', value: rnd(80, 96), max: 100 },
  { name: '效率', value: rnd(78, 94), max: 100 },
]

const activities: ActivityItem[] = [
  { id: 1, type: 'success', content: '订单 #20240707001 已完成支付', time: '10:25:30' },
  { id: 2, type: 'info', content: '新用户注册：张** 来自 北京市', time: '10:24:15' },
  { id: 3, type: 'warning', content: '服务器 CPU 使用率超过 80%', time: '10:22:08' },
  { id: 4, type: 'success', content: '订单 #20240707002 已完成支付', time: '10:20:45' },
  { id: 5, type: 'error', content: 'API 接口 /api/order 响应超时', time: '10:18:33' },
  { id: 6, type: 'info', content: '定时任务「数据备份」执行完成', time: '10:15:00' },
  { id: 7, type: 'success', content: '批量退款审核通过 12 笔', time: '10:12:22' },
  { id: 8, type: 'warning', content: '磁盘使用率已达 75%', time: '10:08:47' },
]

const mapData: { name: string; value: number }[] = [
  { name: '北京', value: rnd(80, 100) },
  { name: '上海', value: rnd(75, 95) },
  { name: '广东', value: rnd(85, 100) },
  { name: '浙江', value: rnd(70, 90) },
  { name: '江苏', value: rnd(72, 92) },
  { name: '四川', value: rnd(65, 85) },
  { name: '湖北', value: rnd(60, 80) },
  { name: '山东', value: rnd(68, 88) },
  { name: '福建', value: rnd(55, 75) },
  { name: '河南', value: rnd(58, 78) },
  { name: '湖南', value: rnd(50, 72) },
  { name: '安徽', value: rnd(48, 70) },
  { name: '辽宁', value: rnd(45, 68) },
  { name: '陕西', value: rnd(42, 65) },
  { name: '重庆', value: rnd(52, 72) },
]

export const mockDashboardData: DashboardData = {
  title: '如意数据大屏',
  updateTime: new Date().toISOString(),
  metrics,
  trendData,
  categories,
  rankings,
  radarData,
  activities,
  mapData,
}
