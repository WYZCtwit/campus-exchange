import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    viewport: { width: 390, height: 844 }, // iPhone 14 — mobile-first app
    locale: 'zh-CN',
    actionTimeout: 10_000,
    navigationTimeout: 45_000,
  },
  expect: { timeout: 5_000 },
  reporter: [['list']],
})
