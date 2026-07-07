import { describe, it, expect } from 'vitest'
import { formatNumber, formatDate, formatPercent } from '@/utils/format'

describe('formatNumber', () => {
  it('应格式化千分位', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
  })

  it('应保留小数', () => {
    expect(formatNumber(1234.567, 2)).toBe('1,234.57')
  })
})

describe('formatDate', () => {
  it('应格式化日期', () => {
    const d = new Date(2024, 0, 15, 10, 30, 0)
    const result = formatDate(d, 'YYYY-MM-DD HH:mm:ss')
    expect(result).toBe('2024-01-15 10:30:00')
  })
})

describe('formatPercent', () => {
  it('应转换为百分比', () => {
    expect(formatPercent(0.1234)).toBe('12.3%')
  })
})
