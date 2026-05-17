/**
 * playwright.config.js
 * Playwright configuration for EngQuest3k E2E tests
 * 
 * Usage:
 *   npx playwright test                          # Run all tests
 *   npx playwright test --project=chromium       # Run Chromium only
 *   npx playwright test --grep "AI Tutor"        # Run matching tests
 *   TEST_WEEK=32 npx playwright test             # Test specific week
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  
  fullyParallel: false,           // Run tests sequentially to avoid API rate limits
  forbidOnly: !!process.env.CI,   // Fail if test.skip() or test.fixme() is used in CI
  retries: process.env.CI ? 2 : 1, // Retry failed tests in CI
  
  reporter: [
    ['html', { outputFolder: 'test-results/playwright-report' }],
    ['json', { outputFile: 'test-results/playwright-results.json' }],
    ['list'],                     // Console output
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    trace: 'on-first-retry',     // Capture trace on first retry
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,         // 15s for single action
    navigationTimeout: 30000,     // 30s for page load
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to test other browsers:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  
  // Start dev server automatically for local testing
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  
  // Output directory for test artifacts
  outputDir: 'test-results/',
});
