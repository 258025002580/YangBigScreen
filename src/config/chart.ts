import { theme } from './theme'
import type { ChartGlobalConfig } from '@/types/chart'

/** ECharts 全局默认配置 */
export const chartGlobalConfig: ChartGlobalConfig = {
  backgroundColor: 'transparent',
  textColor: theme.textColor,
  fontSize: theme.fontSize.body,
  animationDuration: 800,
}

/** ECharts 默认 tooltip 样式 */
export const defaultTooltip = {
  backgroundColor: 'rgba(6, 30, 60, 0.95)',
  borderColor: theme.panelBorderColor,
  textStyle: {
    color: theme.textColor,
    fontSize: theme.fontSize.small,
  },
}

/** 自动刷新间隔（ms） */
export const AUTO_REFRESH_INTERVAL = 60_000 // 60秒
