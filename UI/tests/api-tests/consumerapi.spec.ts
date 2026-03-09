import { test, expect } from 'UI/Fixtures/page';
import { ConsumerPage } from 'UI/Pages/consumer';
import { ConsumerApi } from 'UI/Services/consumerapi';
import fs from 'fs';
import consumerdata from 'UI/Test-data/consumerdates.json'


test('TC1 - Validate the consumer table records with api t', async ({ page, consumerapi, dashboardPage, consumertablepage }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    await consumertablepage.table.waitForTable();
    const api = await consumerapi.getTableRecords();
    const ui = await consumertablepage.table.getAllPagesData();
    console.log(api);
    console.log(ui);
    expect(ui.length).toBe(api.data.length);
    expect(api.success).toBe(true);
    expect(api.data.length).toBe(api.pagination.totalCount);
    expect(Array.isArray(api.data)).toBeTruthy();
    expect(api.pagination).toBeDefined();
    expect(api.pagination.currentPage).toBe(1);
    expect(api.data.length).toBeLessThanOrEqual(api.pagination.limit);
    expect(api.data).toHaveLength(api.pagination.totalCount);
});
test('TC2 - Validate the Export', async ({ page, request, dashboardPage, consumerapi }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const api = await consumerapi.ExportApi();
    expect(api.status()).toBe(200);
});
test('TC3 - Verify the Content Disposition Header', async ({ page, consumerapi, dashboardPage, consumertablepage, request }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const api = await consumerapi.ExportApi();
    const response = await consumerapi.ExportApi();
    const header = response.headers()['content-disposition'];
    expect(header).toContain('attachment');
});
test('TC4 - Verify the content type is Excel/CSV', async ({ page, consumerapi, dashboardPage, consumertablepage, request }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const api = await consumerapi.ExportApi();
    const response = await consumerapi.ExportApi();
    const header = response.headers()['content-type'];
    expect(header).toContain('application');
});
test('TC5 - Verify file download', async ({ request, page, dashboardPage, consumerapi }) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    const response = await consumerapi.ExportApi();
    const filePath = 'downloads/consumers.xlsx';
    await consumerapi.downloadFile(response, filePath);
    const stats = fs.statSync(filePath);
    expect(stats.size).toBeGreaterThan(0);
    expect(stats.size).toBeGreaterThan(0);
});
test('TC6 - Verify the API Returns 200', async ({ page, consumerapi }) => {
    await page.goto('/');
    const data = consumerdata.consumer;
    const response = await consumerapi.getConsumerdetailsbyDate(
        data.Startdate,
        data.Range
    );
    expect(response.status()).toBe(200);
});
test('TC7 -  Verify the Response in json', async ({ page, request, consumerapi }) => {
    await page.goto('/');
    const data = consumerdata.consumer;
    const response = await consumerapi.getConsumerdetailsbyDate(
        data.Startdate,
        data.Range
    );
    const contenttype = response.headers()['content-type'];
    expect(contenttype).toBe('application/json; charset=utf-8');
});
test('TC8-  Verify the Response Body', async ({ page, request, consumerapi }) => {
    await page.goto('/');
    const data = consumerdata.consumer;
    const response = await consumerapi.getConsumerdetailsbyDate(data.Startdate, data.Range);
    const body = await response.json();
    expect(body).not.toBeNull();
    console.log(body);
    expect(body.data.length).toBeGreaterThan(0);
    for (const record of body.data) {
        expect(record).toHaveProperty('meterNumber');
    }
});
test('TC9 - Verify response time', async ({ consumerapi,page,request }) => {
    await page.goto('/');
    const start = Date.now();
    const response = await consumerapi.getConsumerdetailsbyDate(consumerdata.consumer.Startdate,consumerdata.consumer.Range);
    const end = Date.now();
    const responseTime = end - start;
    console.log("Response Time:", responseTime);
    expect(responseTime).toBeLessThan(3000);
  });
  test('TC10 -  Verify the Meter Status',async({page,request,consumerapi})=>{
    await page.goto('/');
    const api= await consumerapi.MeterStatus();
    const response = await consumerapi.MeterStatus();
    console.log(api);
    for(const record of api.data){
        expect(record).toHaveProperty('name');
    }
  })


