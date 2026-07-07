import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:3001',
    channel: 'msedge',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: true,
  },
})
