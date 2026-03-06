import { Page, Locator, expect } from '@playwright/test';

export class Dropdown {
  constructor(private page: Page, private trigger: Locator) {}

  async select(option: string) {
    await this.trigger.click();

    // Scope to listbox instead of whole page
    const listbox = this.page.getByRole('listbox');
    await expect(listbox).toBeVisible();

    await listbox.getByText(option, { exact: true }).click();
  }
}