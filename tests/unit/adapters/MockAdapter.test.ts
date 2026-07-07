import { describe, it, expect } from 'vitest'
import { MockAdapter } from '@/adapters/MockAdapter'

describe('MockAdapter', () => {
  const adapter = new MockAdapter()

  it('fetchDashboardData 应该返回仪表盘数据', async () => {
    const response = await adapter.fetchDashboardData()
    expect(response.code).toBe(200)
    expect(response.data).toBeDefined()
    expect(response.data.title).toBe('阳的数据大屏')
    expect(response.data.charts).toBeDefined()
    expect(response.data.summary).toBeDefined()
  })

  it('fetchChartData 应该返回单个图表数据', async () => {
    const response = await adapter.fetchChartData('sales-trend')
    expect(response.code).toBe(200)
    expect(response.data.id).toBe('sales-trend')
    expect(response.data.type).toBe('line')
  })

  it('fetchChartData 不存在的图表应返回 404', async () => {
    const response = await adapter.fetchChartData('non-existent')
    expect(response.code).toBe(404)
  })

  it('fetchRealtimeData 应该返回实时数据', async () => {
    const response = await adapter.fetchRealtimeData(['sales-trend', 'user-growth'])
    expect(response.code).toBe(200)
    expect(response.data).toHaveLength(2)
  })
})
