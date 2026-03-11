/*Validate dashboard page after auto login and check consumer cards*/
import { test, expect } from 'UI/Fixtures/page';
import { DashboardPage } from 'UI/Pages/dashboard'
import { DashboardApi } from 'UI/Services/dashboardapi'
import { Dropdown } from 'UI/Test-data/metertable.json';
test('Dashboard loads after auto login', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL("https://portal.gmr.bestinfra.app/");
});
test('Validate dashboard consumer cards', async ({ page }) => {
  await page.goto('/');
  const dashboard = new DashboardPage(page);
  await dashboard.validateBothCardsDisplayed();
  await dashboard.validateTotalConsumersCount(19);
  await dashboard.validateHighUsageCount(0);
});
test('Validate dashboard card - Consumption & Billing', async ({ page }) => {
  await page.goto('/');
  const dashboard = new DashboardPage(page);
  await dashboard.validateElectricityUsage('1,16,105');
  await dashboard.validateElectricityCharges('₹76,80,400.00');

});
test('Validate dashboard card - Consumption & Billing Monthly', async ({ page }) => {
  await page.goto('/');
  const dashboard = new DashboardPage(page);
  await dashboard.monthlyToggle.click();
  await dashboard.validateMonthlyElectricityUsage('29,23,905');
  await dashboard.validateMonthlyElectricityCharges('₹2,31,79,187.10');
  await dashboard.assertMonthlyValuesDifferentFromDaily();
});

test('Validate the Search Bar', async ({ page }) => {
  await page.goto('/');
  const dashboard = new DashboardPage(page);
  await dashboard.ValidateSearchBar(process.env.SEARCH_VALUE!);

});
test('select the meters option', async ({ page }) => {
  await page.goto('/');
  const dashboard = new DashboardPage(page);
  await dashboard.selectMeterDropdown(process.env.METER_VALUE!);
  await dashboard.validateFilteredByMeter(process.env.METER_VALUE!);
})
test('dashboard validation', async ({ page, dashboardPage, dashboardapi }) => {
  await page.goto('/');
  const api = await dashboardapi.GetDashboardstats();
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
test('table should contain all expected headers', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.table.waitForTable();
    const headers = await dashboardPage.table.getHeaders();
    expect(headers).toEqual([
        'S.No',
        'Meter SI No',
        'Consumer Name',
        'Event Date Time',
        'Event Description',
        'Status',
        'Duration',
        'Actions'
    ]);
    console.log(headers);
});
test('table should have rows', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.table.waitForTable();
    const count = await dashboardPage.table.getRowCount();
    expect(count).toBe(5);
    console.log(count);
});
test('Validate Number of Columns in the table.', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.table.waitForTable();
    const count = await dashboardPage.table.getColumnCount();
    console.log(count);
    expect(count).toEqual(8);
});
test('Validate the Next Button and Previous Button Whether the Pagination works or not in the  Table Records', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
     await dashboardPage.table.waitForTable();
    await dashboardPage.table.NavigatetoNext();
    await dashboardPage.table.NavigatetoPrevios();
})
test('Validate the Single Row Data', async ({ page, consumerpage, consumertablepage, dashboardPage }) => {
    await page.goto('/');
   await dashboardPage.table.waitForTable();
    const rowdata = await dashboardPage.table.getRowData(0);
    console.log(rowdata);
});
test('validate the Total Records of the Tabale', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.table.waitForTable();
    const records = await dashboardPage.table.getAllTableRowsCount();
    const count = await dashboardPage.table.TotalCount();
    await expect(records).toBe(5);
})
test('Validate the Per Page Dropdown',async({page,dashboardPage})=>{
    await page.goto('/');
    await dashboardPage.selectMeterDropdown(Dropdown);
})
test('Validate the Graphs',async({page,dashboardPage})=>{
  await page.goto('/');
  await dashboardPage.GraphisLoaded();
  await dashboardPage.Hover();
  await dashboardPage.ValidateGraph();
  const tooltiptext =  await dashboardPage.printTooltipValue();
  console.log(tooltiptext);
});
test("Collect all graph values", async ({ page,dashboardPage }) => {
    await page.goto('/');
    await dashboardPage.GraphisLoaded();
    const graphData = await dashboardPage.collectAllGraphValues();
    console.log("Graph Data:", graphData);

});


