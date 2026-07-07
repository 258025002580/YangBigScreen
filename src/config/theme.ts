/** 大屏主题配置 */
export const theme = {
  /** 背景色 */
  bgColor: '#0a1a3a',
  /** 面板背景色 */
  panelBgColor: 'rgba(6, 30, 60, 0.8)',
  /** 面板边框色 */
  panelBorderColor: 'rgba(0, 150, 255, 0.3)',
  /** 主色调 */
  primaryColor: '#00b4ff',
  /** 文字颜色 */
  textColor: '#e0e8f0',
  /** 标题颜色 */
  titleColor: '#ffffff',
  /** 成功色 */
  successColor: '#00e396',
  /** 警告色 */
  warningColor: '#feb019',
  /** 危险色 */
  dangerColor: '#ff4560',
  /** 字体大小 */
  fontSize: {
    title: 28,
    subtitle: 18,
    body: 14,
    small: 12,
  },
  /** 间距 */
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  /** 圆角 */
  borderRadius: 4,
}

export type Theme = typeof theme
