import { test, expect } from '@playwright/test'

test.describe('如意数据大屏 E2E', () => {
  test('页面标题应正确显示', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.title-cn', { timeout: 10000 })
    const title = await page.locator('.title-cn').textContent()
    expect(title).toContain('如意')
  })

  test('核心指标卡片应存在', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.metric-card', { timeout: 10000 })
    const count = await page.locator('.metric-card').count()
    expect(count).toBe(4)
  })

  test('图表容器应存在', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.base-panel', { timeout: 10000 })
    const panels = await page.locator('.base-panel').count()
    expect(panels).toBeGreaterThanOrEqual(4)
  })

  test('页面不是空白', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.big-screen', { timeout: 10000 })
    const html = await page.content()
    expect(html.length).toBeGreaterThan(100)
  })
})
