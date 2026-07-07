import type { ChartData } from '@/types/chart'

/** 中国地图数据（占位） */
export const mapChart: ChartData = {
  id: 'china-map',
  title: '全国销售分布',
  type: 'map',
  xAxis: [],
  series: [
    {
      name: '销售额',
      data: [
        { name: '北京', value: 120 },
        { name: '上海', value: 150 },
        { name: '广东', value: 180 },
        { name: '浙江', value: 130 },
        { name: '江苏', value: 140 },
        { name: '四川', value: 100 },
        { name: '湖北', value: 90 },
        { name: '山东', value: 110 },
        { name: '河南', value: 85 },
        { name: '福建', value: 95 },
      ],
      color: '#00b4ff',
    },
  ],
}
