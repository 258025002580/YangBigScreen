import { describe, it, expect } from 'vitest'
import { formatNumber, formatMoney, formatPercent, formatDate } from '@/utils/format'

describe('format', () => {
  describe('formatNumber', () => {
    it('应该格式化千分位', () => {
      expect(formatNumber(1234567)).toBe('1,234,567')
    })

    it('应该保留指定小数位', () => {
      expect(formatNumber(1234.5678, 2)).toBe('1,234.57')
    })
  })

  describe('formatMoney', () => {
    it('超过亿时应显示亿', () => {
      expect(formatMoney(150000000)).toBe('¥1.50亿')
    })

    it('超过万时应显示万', () => {
      expect(formatMoney(50000)).toBe('¥5.00万')
    })

    it('普通金额应正常显示', () => {
      expect(formatMoney(1234.5)).toBe('¥1,234.50')
    })
  })

  describe('formatPercent', () => {
    it('应该将小数转为百分比', () => {
      expect(formatPercent(0.1234)).toBe('12.34%')
    })
  })

  describe('formatDate', () => {
    it('应该格式化日期', () => {
      const result = formatDate('2024-01-15', 'YYYY-MM-DD')
      expect(result).toBe('2024-01-15')
    })
  })
})
