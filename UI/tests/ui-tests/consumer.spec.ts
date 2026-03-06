import { test, expect } from 'UI/Fixtures/page';
import { ConsumerPage } from 'UI/Pages/consumer'
import dateranges from 'UI/Test-data/dateranges.json';
import { DashboardPage } from 'UI/Pages/dashboard'
import data from 'UI/Test-data/addconsumer.json';
import { ConsumersTablesPage } from 'UI/Pages/consumertable';

test('Select valid report range from JSON', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const { startDate, endDate } = dateranges.validReportRange;
    await consumerpage.filterByDate(startDate, endDate);
});
test('validate table headers', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const headers = await consumertablepage.table.getHeaders();
    expect(headers).toEqual(
        expect.arrayContaining(['UID', 'CMD', 'RMD'])
    );
});
test('table should contain all expected headers', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const headers = await consumertablepage.table.getHeaders();
    expect(headers).toEqual([
        '',
        'S.No',
        'UID',
        'Consumer Name',
        'Meter SI No',
        'Last Communication Date',
        'CMD',
        'RMD',
        'Occurred DateTime',
        'Consumption(KVAh)',
        'Actions'
    ]);
});
test('table should have rows', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const count = await consumertablepage.table.getRowCount();
    expect(count).toBeGreaterThan(0);
});
test('row object should contain correct keys', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const row = await consumertablepage.table.getRowData(0);
    expect(row).toMatch
});
test('Validate Number of Columns in the table.', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const count = await consumertablepage.table.getColumnCount();
    console.log(count);
    expect(count).toEqual(11);
});
test('Validate the Next Button and Previous Button Whether the Pagination works or not in the  Table Records', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    await consumertablepage.table.NavigatetoNext();
    await consumertablepage.table.NavigatetoPrevios();
})
test('Validate the Single Row Data', async ({ page, consumerpage, consumertablepage, dashboardPage }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const rowdata = await consumertablepage.table.getRowData(0);
    console.log(rowdata);
});
test('validate the Total Records of the Tabale', async ({ page, dashboardPage, consumerpage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const records = await consumertablepage.table.getAllTableRowsCount();
    const count = await consumertablepage.table.TotalCount();
    await expect(records).toBe(count);
})
test('Validate the header checkbox',async({page,consumerpage,dashboardPage,consumertablepage})=>{
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    await consumertablepage.table.validateHeaderCheckboxChecked();
})
test('Validate the rowdata ',async({page,dashboardPage,consumerpage,consumertablepage})=>{
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const rdata = await consumertablepage.table.getRowData
    console.log(rdata);
    
})