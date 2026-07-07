/** 格式化工具 */

export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatDate(date: Date | string, fmt = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const map: Record<string, string> = {
    YYYY: String(d.getFullYear()),
    MM: String(d.getMonth() + 1).padStart(2, '0'),
    DD: String(d.getDate()).padStart(2, '0'),
    HH: String(d.getHours()).padStart(2, '0'),
    mm: String(d.getMinutes()).padStart(2, '0'),
    ss: String(d.getSeconds()).padStart(2, '0'),
  }
  return fmt.replace(/YYYY|MM|DD|HH|mm|ss/g, (k) => map[k])
}

export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}
