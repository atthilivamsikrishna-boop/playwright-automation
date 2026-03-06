import { Page, Locator } from '@playwright/test';

export class RangeDatePicker {
  readonly startInput: Locator;
  readonly endInput: Locator;

  constructor(page: Page, rootSelector: string) {
    const root = page.locator(rootSelector);

    // Ant Design range picker has two inputs
    this.startInput = root.locator('input').first();
    this.endInput = root.locator('input').nth(1);
  }

  async enterDateRange(startDate: string, endDate: string) {
    await this.startInput.click();
    await this.startInput.fill(startDate);

    await this.endInput.click();
    await this.endInput.fill(endDate);

    // trigger change
    await this.endInput.press('Tab');
  }
}