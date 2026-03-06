import { test as baseTest } from '@playwright/test';
import { chromium } from 'playwright';

const failedUrls: string[] = [];

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    await use(page);

    const testInfo = baseTest.info();
    if (testInfo.status === 'failed') {
      failedUrls.push(page.url());
    }
  },
});

test.afterAll(async () => {
  if (failedUrls.length === 0) return;

  console.log('Opening all failed test URLs in a browser...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const url of failedUrls) {
    await page.goto(url);
  }
});