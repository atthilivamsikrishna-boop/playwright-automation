import { test, expect } from 'UI/Fixtures/page';
import { DashboardPage } from 'UI/Pages/dashboard'
import { DashboardApi } from 'UI/Services/dashboardapi'

test('dashboard validation', async ({ page, dashboardPage, dashboardapi }) => {
    await page.goto('/');
    const api = await dashboardapi.getDashboardStats();
    const totalUI = await dashboardPage.getTotalConsumers();
    const highUsageUI = await dashboardPage.getHighUsageConsumers();
    console.log('------------- API DATA -------------');
    console.log(JSON.stringify(api.data.consumerStats, null, 2));
    console.log('------------- UI DATA -------------');
    console.log({
        totalConsumers: totalUI,
        highUsageConsumers: highUsageUI
    });
    expect(Number(totalUI)).toBe(api.data.consumerStats.totalConsumers);
    expect(Number(highUsageUI)).toBe(api.data.consumerStats.highUsageConsumers);
    expect(api.data).toHaveProperty('consumerStats');
    expect(api.data).toHaveProperty('dailyStats');
    expect(api.data).toHaveProperty('monthlyStats');
});
test('Table Validation', async ({ page, dashboardapi, dashboardPage, }) => {
    await page.goto('/');
    const api = await dashboardapi.getTableRecords();
    console.log(api);
});
test('UI data should match API', async ({ page, request, dashboardapi, dashboardPage }) => {
    await page.goto('');
    const api = await dashboardapi.getTableRecords();
    const ui = await dashboardPage.table.getAllPagesData();
    expect(ui.length).toBe(api.data.length);
});
