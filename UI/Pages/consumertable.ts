import { Page } from '@playwright/test';
import { TableComponent } from '../Components/tablengine';

export class ConsumersTablesPage {

  readonly table: TableComponent;

  constructor(private page: Page) {
    this.table = new TableComponent(page, page.locator('table'));
  }

}