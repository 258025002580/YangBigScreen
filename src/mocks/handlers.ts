import { http, HttpResponse, delay } from 'msw'
import { mockDashboardData } from './dashboardMock'

export const handlers = [
  http.get('/api/dashboard', async () => {
    await delay(300)
    return HttpResponse.json({
      code: 200,
      data: mockDashboardData,
      message: 'success',
      timestamp: Date.now(),
    })
  }),

  http.get('/api/dashboard/metrics', async () => {
    await delay(200)
    return HttpResponse.json({
      code: 200,
      data: mockDashboardData.metrics,
      message: 'success',
      timestamp: Date.now(),
    })
  }),
]
