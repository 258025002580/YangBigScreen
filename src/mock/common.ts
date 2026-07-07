/** Mock 数据通用工具 */

/** 生成随机整数 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** 生成随机浮点数 */
export function randomFloat(min: number, max: number, decimals = 2): number {
  return Number((Math.random() * (max - min) + min).toFixed(decimals))
}

/** 从数组中随机取一项 */
export function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** 生成时间序列（最近 N 天） */
export function generateDateRange(days: number): string[] {
  const dates: string[] = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    dates.push(`${d.getMonth() + 1}/${d.getDate()}`)
  }
  return dates
}

/** 生成随机波动数据 */
export function generateTrendData(days: number, base: number, variance: number): number[] {
  return Array.from({ length: days }, () => randomInt(base - variance, base + variance))
}
