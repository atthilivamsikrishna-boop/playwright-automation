import { test, expect } from 'UI/Fixtures/page';

test('validate the consumer table records with api', async ({page,consumerapi,dashboardPage,consumertablepage}) => {
    await page.goto('/');
    await dashboardPage.navigatetoconsumers();
    await consumertablepage.table.waitForTable();
    const api = await consumerapi.getTableRecords();
    const ui = await consumertablepage.table.getAllPagesData();
    console.log(api);
    console.log(ui);
    expect(ui.length).toBe(api.data.length);
});