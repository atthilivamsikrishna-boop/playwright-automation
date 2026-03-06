import { Page, Locator } from '@playwright/test';

export class SingleDatePicker {
  readonly input: Locator;
  readonly calendarButton: Locator;
  readonly page: Page;

  constructor(page: Page, inputSelector: string) {
    this.page = page;
    this.input = page.locator(inputSelector);
    this.calendarButton = page.getByRole('button', { name: /calendar|toggle/i });
  }

  async selectDate(date: string) {
    // date format expected: 2026-02-01
    const target = new Date(date);

    const day = target.getDate().toString();
    const month = target.toLocaleString('en-US', { month: 'long' });
    const year = target.getFullYear().toString();

    await this.input.click();

    // navigate year if needed
    await this.page.getByRole('button', { name: year }).click().catch(() => {});

    // select month if UI supports it
    await this.page.getByText(month, { exact: false }).click().catch(() => {});

    // select day
    await this.page.getByRole('gridcell', { name: new RegExp(`^${day}$`) }).click();
  }
}