import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.BASE_URL!);

  // WAIT so you SEE login page
  await page.waitForTimeout(3000);

  // ⚠️ CHANGE THESE SELECTORS
  await page.fill('#identifier', process.env.LOGIN_USERNAME!);
  await page.fill("#password", process.env.LOGIN_PASSWORD!);

  await page.click('button[type="submit"]');

  // WAIT after login
  await page.waitForTimeout(8000);

  console.log("URL AFTER LOGIN:", page.url());

  await page.context().storageState({ path: 'storage/auth.json' });

  await browser.close();
}

export default globalSetup;
