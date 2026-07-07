/**
 * 数据格式化工具
 */

/** 格式化数字（千分位 + 保留小数） */
export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** 格式化金额 */
export function formatMoney(value: number, unit = '¥'): string {
  if (value >= 100000000) {
    return `${unit}${(value / 100000000).toFixed(2)}亿`
  }
  if (value >= 10000) {
    return `${unit}${(value / 10000).toFixed(2)}万`
  }
  return `${unit}${formatNumber(value, 2)}`
}

/** 格式化百分比 */
export function formatPercent(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/** 格式化日期 */
export function formatDate(date: string | Date, format = 'YYYY-MM-DD'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const map: Record<string, string> = {
    YYYY: String(d.getFullYear()),
    MM: String(d.getMonth() + 1).padStart(2, '0'),
    DD: String(d.getDate()).padStart(2, '0'),
    HH: String(d.getHours()).padStart(2, '0'),
    mm: String(d.getMinutes()).padStart(2, '0'),
    ss: String(d.getSeconds()).padStart(2, '0'),
  }
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => map[key])
}
