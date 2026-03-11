import { test as base } from '@playwright/test';
import { Loginpage } from '../Pages/Login';
import { DashboardPage } from '../Pages/dashboard';
import { LogoutPage } from 'UI/Pages/Logout';
import { ConsumerPage } from 'UI/Pages/consumer';
import { ConsumersTablesPage } from '../Pages/consumertable';
import { DashboardApi } from '../Services/dashboardapi'
import { ConsumerApi } from 'UI/Services/consumerapi';
import { getAuthTokenFromStorage } from 'UI/util/authtoken';
import * as dotenv from 'dotenv';
dotenv.config(); // must be called before accessing process.env

type MyFixtures = {
  loginPage: Loginpage;
  dashboardPage: DashboardPage;
  logoutpage: LogoutPage;
  consumerpage: ConsumerPage;
  consumertablepage: ConsumersTablesPage;
  dashboardapi: DashboardApi;
  consumerapi: ConsumerApi;
  authToken: string;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new Loginpage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  logoutpage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },

  consumerpage: async ({ page }, use) => {
    await use(new ConsumerPage(page));
  },

  consumertablepage: async ({ page }, use) => {
    await use(new ConsumersTablesPage(page));
  },
  authToken: async ({ request }, use) => {
  const loginUrl = `${process.env.API_BASE_URL}/api/sub-app/auth/login`;

  const response = await request.post(loginUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      identifier: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD
    }
  });

  const text = await response.text();
  console.log('API response:', text);

  if (!response.ok()) throw new Error(`API login failed: ${response.status()} \n${text}`);

  const body = JSON.parse(text);
  await use(body.data.gmrAccessToken);
},
  dashboardapi: async ({ request, authToken }, use) => {
    const api = new DashboardApi(request, authToken);
    await use(api);
  },
  consumerapi: async ({ request, page, }, use) => {
    await use(new ConsumerApi(request, page));
  },

});

export { expect } from '@playwright/test';
 
