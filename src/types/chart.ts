/** 图表数据统一结构 */
export interface ChartData {
  /** 图表唯一标识 */
  id: string
  /** 图表标题 */
  title: string
  /** 图表类型 */
  type: ChartType
  /** X 轴数据 */
  xAxis: string[]
  /** 数据系列 */
  series: ChartSeries[]
  /** 额外配置 */
  extra?: Record<string, unknown>
}

/** 图表类型 */
export type ChartType = 'bar' | 'line' | 'pie' | 'scatter' | 'map'

/** 图表数据系列 */
export interface ChartSeries {
  name: string
  data: (number | { name: string; value: number })[]
  color?: string
}

/** 图表组件 Props */
export interface ChartProps {
  data: ChartData
  loading?: boolean
  error?: string
}

/** 图表公共配置 */
export interface ChartGlobalConfig {
  backgroundColor: string
  textColor: string
  fontSize: number
  animationDuration: number
}
