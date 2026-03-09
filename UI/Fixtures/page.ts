import { test as base } from '@playwright/test';
import { Loginpage } from '../Pages/Login';
import { DashboardPage } from '../Pages/dashboard';
import { LogoutPage } from 'UI/Pages/Logout';
import { ConsumerPage } from 'UI/Pages/consumer';
import { ConsumersTablesPage } from '../Pages/consumertable';
import { DashboardApi} from '../Services/dashboardapi'
import { ConsumerApi } from 'UI/Services/consumerapi';

type MyFixtures = {
  loginPage: Loginpage;
  dashboardPage: DashboardPage;
  logoutpage: LogoutPage;
  consumerpage: ConsumerPage;
  consumertablepage: ConsumersTablesPage;
  dashboardapi: DashboardApi;
  consumerapi : ConsumerApi;
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
   dashboardapi: async ({ request,page }, use) => {
    await use(new DashboardApi(request,page));
  },
  consumerapi: async ({ request,page, }, use) => {
    await use(new ConsumerApi(request,page));
  },

});

export { expect } from '@playwright/test';