import { Page, Locator } from '@playwright/test';
import { RangeDatePicker } from '../Components/datepicker';
import { Dropdown } from '../Components/dropdown';
import { SingleDatePicker } from '../Components/singledatepicker';


export class ConsumerPage {
  readonly page: Page;
  readonly dateRange: RangeDatePicker;
  readonly addconsumer: Locator;
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly email: Locator;
  readonly phonenumber: Locator;
  readonly Idtype: Dropdown;
  readonly Idnumber: Locator;
  readonly AssetProperty: Locator;
  readonly propertytype: Dropdown;
  readonly moveindate: SingleDatePicker;
  readonly accounttype: Dropdown;
  readonly saveBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dateRange = new RangeDatePicker(
      page,
      '.ant-picker-range'
    );
    this.addconsumer = page.getByRole('button', { name: 'Add Consumer' });
    this.firstname = page.locator("#first_name");
    this.lastname = page.locator("#last_name");
    this.email = page.locator("#email");
    this.phonenumber = page.locator("#phone");
    this.AssetProperty = page.locator('div.font-medium.text-neutral-darker', { hasText: 'MTR005E' });
    this.Idtype = new Dropdown(
      page,
      page.locator('span:has-text("Select ID Type")').locator('..')
    );
    this.Idnumber = page.locator("#id_number");
    this.AssetProperty = page
      .locator('div.p-4.border.rounded-lg')
      .filter({ hasText: 'MTR001A' });
    this.propertytype = new Dropdown(
      page,
      page.locator('span:has-text("Select Property Type")').locator('..')
    );
    this.moveindate = new SingleDatePicker(
      page,
      '#move_in_date-input'
    );
    this.accounttype = new Dropdown(
      page,
      page.locator('span:has-text("Select Account Type")').locator('..')
    );
   



    this.saveBtn = page.getByRole('button', { name: 'Save' });

  }

  async navigate() {
    await this.page.goto('/');
  }

  async filterByDate(start: string, end: string) {
    await this.dateRange.enterDateRange(start, end);
  }


  async addConsumer(consumer: any) {

    await this.addconsumer.click();
    await this.firstname.fill(consumer.firstname);
    await this.lastname.fill(consumer.lastname);
    await this.email.fill(consumer.email);
    await this.phonenumber.fill(consumer.phone);
    await this.Idtype.select(consumer.idtype);
    await this.Idnumber.fill(consumer.idnumber);
    await this.AssetProperty.click();
    await this.propertytype.select(consumer.propertytype);
    await this.moveindate.selectDate(consumer.moveindate);
    await this.accounttype.select(consumer.accounttype);
    await this.saveBtn.click();
  }
 
}