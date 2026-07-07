import { test, expect } from '@playwright/test'

test.describe('数据大屏 Dashboard', () => {
  test('页面应正常渲染', async ({ page }) => {
    await page.goto('/')
    // 等待标题出现
    await expect(page.locator('.title-text')).toBeVisible()
    // 确认标题内容
    const title = await page.locator('.title-text').textContent()
    expect(title).toBeTruthy()
  })

  test('应显示汇总指标卡片', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.summary-item', { timeout: 5000 })
    const items = await page.locator('.summary-item').count()
    expect(items).toBe(4)
  })

  test('应显示图表容器', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.data-card', { timeout: 5000 })
    const cards = await page.locator('.data-card').count()
    expect(cards).toBeGreaterThan(0)
  })
})
