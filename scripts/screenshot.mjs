import { chromium } from '@playwright/test'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const screenshotPath = join(__dirname, '..', 'public', 'screenshot.png')

;(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
  
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' })
  await page.waitForTimeout(3000) // 等待动画渲染完成
  
  await page.screenshot({ path: screenshotPath, fullPage: false })
  console.log(`Screenshot saved to: ${screenshotPath}`)
  
  await browser.close()
})()