import { test, expect } from 'UI/Fixtures/page';
import { DashboardPage } from 'UI/Pages/dashboard'
import { DashboardApi } from 'UI/Services/dashboardapi'
import { ApiValidator } from 'UI/util/apivalidator';

test('TC1 - Dashboard validation', async ({ page, dashboardPage, dashboardapi }) => {
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
test('TC2 - Table Validation', async ({ page, dashboardapi, dashboardPage, }) => {
    await page.goto('/');
    const api = await dashboardapi.getTableRecords();
    console.log(api);
    ApiValidator.validatePagination(api.pagination);
    ApiValidator.validateSuccess(api);
    ApiValidator.validateArray(api.data);
    expect(api.data.length).toBe(api.pagination.totalCount);
});
test('TC3 - UI data should match API', async ({ page, request, dashboardapi, dashboardPage }) => {
    await page.goto('');
    const api = await dashboardapi.getTableRecords();
    const ui = await dashboardPage.table.getAllPagesData();
    expect(ui.length).toBe(api.data.length);
});
test('TC4 - wigdet all of consumers', async ({ page, request, dashboardapi, dashboardPage }) => {
    await page.goto('/');
    const api = await dashboardapi.getwigdetsrecords();
    console.log(api);
    expect(api.success).toBe(true);
    expect(api.message).toContain('retrieved');
    expect(api.data.length).toBe(api.pagination.totalCount);
});
test('TC5 - Validate the Total Meter Events', async ({ page, request, dashboardapi, dashboardPage, }) => {
    await page.goto('/');
    const api = await dashboardapi.getMeterEvent();
    console.log(api);
    expect(api.success).toBe(true);
    expect(api.data.length).toBe(api.pagination.totalCount);
    expect(Array.isArray(api.data)).toBeTruthy();
    expect(api.pagination).toBeDefined();
    expect(api.pagination.currentPage).toBe(1);
    expect(api.data.length).toBeLessThanOrEqual(api.pagination.limit);
    expect(api.data).toHaveLength(api.pagination.totalCount);
});
test('TC6 - Validate the Tariff', async ({ page, dashboardapi, request, dashboardPage }) => {
    await page.goto('/');
    const api = await dashboardapi.Trariff();
    console.log(api);
    ApiValidator.validateArray(api);
    ApiValidator.validateFields(api[0], ['id', 'name', 'category', 'type', 'slabs', 'minDemand', 'maxDemand', 'valid_from']);
    api.forEach((Trariff: { slabs: any[]; }) => {
        expect(Array.isArray(Trariff.slabs)).toBeTruthy();
        Trariff.slabs.forEach((slab) => {
            expect(slab).toHaveProperty('range');
            expect(slab).toHaveProperty('rate');
        });
    });
});
test('TC7 - Validate the Monthly and Daily Consumption', async ({ page, request, dashboardPage, dashboardapi }) => {
    await page.goto('/');
    const api = await dashboardapi.Graph();
    console.log(api);
    expect(api.data).toHaveProperty('monthly');
    expect(api.data).toHaveProperty('seriesColors');
    expect(api.data).toHaveProperty('daily');
    const daily = api.data.daily;
    const monthly = api.data.monthly;
    console.log(typeof api.data.daily);
    console.log(api.data.daily);
    ApiValidator.validateArray(daily.xAxisData);
    ApiValidator.validateArray(daily.seriesData);
    ApiValidator.validateArray(monthly.xAxisData);
    ApiValidator.validateArray(monthly.seriesData);
    const dailySeries = daily.seriesData[0];
    expect(daily.xAxisData.length).toBe(dailySeries.data.length);
    const monthlySeries = monthly.seriesData[0];
    expect(monthly.xAxisData.length).toBe(monthlySeries.data.length);
    expect(daily.seriesData[0].name).toContain('Daily kVAh');
    expect(monthly.seriesData[0].name).toContain('Monthly kVAh');
});