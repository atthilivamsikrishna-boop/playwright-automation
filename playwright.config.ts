import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

  timeout: 60000,

  expect: {
    timeout: 60000
  },
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  globalSetup: require.resolve('./UI/tests/auth/auth.setup.ts'),

  projects: [

    {
      name: 'login-tests',
      testDir: './UI/tests/auth',
      testMatch: /login\.spec\.ts/,
      use: { storageState: undefined }
    },

    {
      name: 'ui-tests',
      testDir: './UI/tests/ui-tests',
      testIgnore: /login\.spec\.ts/,
      use: {
        storageState: 'storage/auth.json'
      }
    },

    {
      name: 'api-tests',
      testDir: './UI/tests/api-tests',
      use: {
        storageState: 'storage/auth.json',
        trace: 'off',
        screenshot: 'off',
        video: 'off'
      }
    }

  ]
});