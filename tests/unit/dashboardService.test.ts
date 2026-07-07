import { describe, it, expect, beforeEach } from 'vitest'
import { dashboardService } from '@/services/DashboardService'
import { resetDataSource } from '@/services/dataSource'

describe('dashboardService in mock mode', () => {
  beforeEach(() => {
    resetDataSource()
  })

  it('fetchDashboard 应返回仪表盘数据', async () => {
    const response = await dashboardService.fetchDashboard()
    expect(response.code).toBe(200)
    expect(response.data).toBeDefined()
    expect(response.data.title).toBe('如意数据大屏')
    expect(response.data.metrics).toBeDefined()
    expect(response.data.metrics).toHaveLength(4)
    expect(response.data.trendData).toBeDefined()
    expect(response.data.categories).toBeDefined()
    expect(response.data.rankings).toBeDefined()
    expect(response.data.radarData).toBeDefined()
    expect(response.data.activities).toBeDefined()
    expect(response.data.mapData).toBeDefined()
  })

  it('metrics 应包含正确的字段', async () => {
    const response = await dashboardService.fetchDashboard()
    const m = response.data.metrics[0]
    expect(m).toHaveProperty('id')
    expect(m).toHaveProperty('label')
    expect(m).toHaveProperty('value')
    expect(m).toHaveProperty('unit')
    expect(m).toHaveProperty('icon')
    expect(m).toHaveProperty('color')
  })
})
