import { expect, Locator, Page } from '@playwright/test';

export class TableComponent {
  async waitForTable() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.headers.first()).toBeVisible();
  }

  readonly rows: Locator;
  readonly headers: Locator;
  readonly next: Locator;
  readonly Previous: Locator;
  readonly totaltext: Locator;
  readonly headerCheckbox: Locator;

  constructor(private page: Page, private table: Locator) {
    this.headers = table.locator('thead th');
    this.rows = table.locator('tbody tr');
    this.next = page.getByRole('button', { name: 'Next' });
    this.Previous = page.getByRole('button', { name: 'Previous' });
    this.totaltext = page.locator('text=Total:');
    this.headerCheckbox = this.page.getByRole('checkbox').first();

  }

  async getHeaders() {
    await this.headers.first().waitFor();
    return await this.headers.allTextContents();
  }

  async getRowCount() {
    return await this.rows.count();
  }

  async getCell(row: number, column: number) {
    return await this.rows.nth(row).locator('td').nth(column).textContent();
  }
  async getRowData(rowIndex: number) {
    const headers = await this.table.locator('thead th').allTextContents();
    const cells = this.rows.nth(rowIndex).locator('td');

    const row: Record<string, string> = {};

    for (let i = 0; i < headers.length; i++) {
      const key = headers[i].trim();
      const value = (await cells.nth(i).textContent())?.trim() || '';
      row[key] = value;
      
    }

    return row;
  }

  async validateColumnContains(column: number, value: string) {
    const count = await this.rows.count();

    for (let i = 0; i < count; i++) {
      await expect(
        this.rows.nth(i).locator('td').nth(column)
      ).toContainText(value);
    }
  }
  async getColumnCount() {
    return await this.table.locator('thead th').count();
  }

  async NavigatetoNext() {
    await this.next.click();
  }
  async NavigatetoPrevios() {
    await this.Previous.click();
  }
  async getAllTableRowsCount() {

    let totalRows = 0;

    while (true) {

      const rows = await this.page.locator('tbody tr').count();
      totalRows += rows;

      const nextDisabled = await this.next.isDisabled();

      if (nextDisabled) break;

      await this.next.click();
      await this.page.waitForLoadState('networkidle');
    }

    return totalRows;
  }
  async TotalCount() {
    const text = await this.totaltext.textContent();
    return Number(text?.replace(/\D/g, ''));
  }
  async validateHeaderCheckboxChecked() {
    await this.headerCheckbox.click({ force: true });
    await expect(this.headerCheckbox).toBeChecked();
  }
  async getUITableData() {
    await this.rows.first().waitFor();
    const headers = (await this.headers.allTextContents()).map(h => h.trim());
    const rowCount = await this.rows.count();
    const data: any[] = [];
    for (let i = 0; i < rowCount; i++) {
      const row = this.rows.nth(i);
      const cells = row.locator('td');
      const cellCount = await cells.count();
      const obj: any = {};
      for (let j = 0; j < headers.length; j++) {
        if (j < cellCount) {
          obj[headers[j]] =
            (await cells.nth(j).textContent())?.trim() ?? '';
        } else {
          obj[headers[j]] = '';
        }
      }
      // skip empty rows
      if (Object.values(obj).every(v => v === '')) continue;
      data.push(obj);
    }
    return data;
  }
  async getAllPagesData() {
    const allData: any[] = [];
    while (true) {
      await this.rows.first().waitFor();
      const rows = await this.getUITableData();
      allData.push(...rows);
      if (await this.next.isDisabled()) break;
      await this.next.click();
      await this.page.waitForLoadState('networkidle');
    }

    return allData;
  }

}