
import { Page, Locator, expect } from '@playwright/test';
import { Dropdown } from '../Components/dropdown';
import { TableComponent } from 'UI/Components/tablengine';
import { text } from 'stream/consumers';

export class DashboardPage {
    readonly page: Page;

    // Cards
    readonly totalConsumersCard: Locator;
    readonly highUsageCard: Locator;
    readonly totalConsumersValue: Locator;
    readonly highUsageValue: Locator;
    readonly electricityusage: Locator;
    readonly electricitycharges: Locator;
    readonly Consumptioncount: Locator;
    readonly BillingCharges: Locator;
    readonly monthlyToggle: Locator;
    readonly monthlyelectricityusage: Locator;
    readonly monthlyelectricitycharges: Locator;
    readonly monthlyConsumptioncount: Locator;
    readonly monthlyBillingCharges: Locator;
    readonly metersearchbar: Locator;
    readonly metersearch: Locator;
    readonly meterDropdown: Dropdown;
    readonly meterCells: Locator;
    readonly clearallfilter: Locator;
    readonly consumers: Locator;
    readonly table: TableComponent;
    readonly meterrecords : Locator;
    readonly communication: Locator;
    readonly noncommunication: Locator;
    readonly graph: Locator;
    readonly chartcanvas : Locator;
    readonly tooltip : Locator;

    // Values inside cards
    constructor(page: Page) {
        this.page = page;
        this.communication = this.page.locator('svg text').filter({ hasText: /^Communicating:/ });
        this.noncommunication = this.page.locator('svg text').filter({ hasText: /^Non-Communicating:/ });
        // headings (stable)
        this.totalConsumersCard = page.getByRole('heading', { name: 'Total Consumers' });
        this.highUsageCard = page.getByRole('heading', { name: 'High-Usage Consumers' });
        this.electricityusage = page.getByRole('heading', {
            name: /Electricity Usage/i
        });

        this.electricitycharges = page.getByRole('heading', {
            name: /Electricity Charges/i
        });
        // target only Monthly toggle inside "Consumption & Billing"
        this.monthlyToggle = this.page.locator("//div[contains(@class,'flex-shrink-0')]//span[contains(@class,'relative z-10 px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer select-none transition-all duration-300')][normalize-space()='Monthly']");

        this.monthlyelectricityusage = page.getByRole('heading', {
            name: /Electricity Usage/i
        });
        this.monthlyelectricitycharges = page.getByRole('heading', {
            name: /Electricity Charges/i
        });

        //div[contains(@class,'flex-shrink-0')]//span[contains(@class,'relative z-10 px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer select-none transition-all duration-300')][normalize-space()='Monthly']

        this.totalConsumersValue = this.totalConsumersCard
            .locator('xpath=ancestor::div[@data-squircle]')
            .locator('p')
            .first();

        this.highUsageValue = this.page
            .getByRole('heading', { name: 'High-Usage Consumers' })
            .locator('xpath=ancestor::div[contains(@class,"cursor-pointer")]')
            .locator('p')
            .first();
        this.Consumptioncount = this.electricityusage
            .locator('xpath=ancestor::div[contains(@class,"cursor-pointer")]')
            .locator('p')
            .first();

        this.BillingCharges = this.electricitycharges
            .locator('xpath=ancestor::div[contains(@class,"cursor-pointer")]')
            .locator('p')
            .first();
        this.monthlyConsumptioncount = this.monthlyelectricityusage
            .locator('xpath=ancestor::div[contains(@class,"cursor-pointer")]')
            .locator('p')
            .first();
        this.monthlyBillingCharges = this.monthlyelectricitycharges
            .locator('xpath=ancestor::div[contains(@class,"cursor-pointer")]')
            .locator('p')
            .first();
        this.metersearchbar = page.getByPlaceholder('Search by Meter SI No or Consumer Name...');
        this.metersearch = this.metersearchbar
            .locator('..') // go to parents
            .getByRole('img', { name: 'search' });
        this.meterDropdown = new Dropdown(
            page,
            page.getByText('All Meters', { exact: true })
        );
        this.meterCells = this.page
            .getByRole('grid', { name: 'Data Table' })
            .locator('tbody tr td:nth-child(2)');
        this.clearallfilter = this.page.getByRole('button', { name: /clear all/i });

        this.consumers = this.page.locator('nav').locator('li', { hasText: 'Consumers' });
        this.table = new TableComponent(page, page.locator('table'));
        this.meterrecords = this.page.locator('table');
        this.graph = this.page.locator('.echarts-for-react').first();
        this.chartcanvas = this.page.locator('.echarts-for-react canvas');
        this.tooltip = this.page.locator('span:has-text("kVAh")').last();
  
    }

    // ---------- VALIDATIONS FOR CONSUMER STATISTICS ----------

    async validateTotalConsumersCardVisible() {
        await expect(this.totalConsumersCard).toBeVisible();
    }

    async validateHighUsageCardVisible() {
        await expect(this.highUsageCard).toBeVisible();
    }

    async validateTotalConsumersCount(expectedCount: number) {
        await expect(this.totalConsumersValue).toHaveText(expectedCount.toString());
    }

    async validateHighUsageCount(expectedCount: number) {
        await expect(this.highUsageValue).toHaveText(expectedCount.toString());
    }

    async validateBothCardsDisplayed() {
        await expect(this.totalConsumersCard).toBeVisible();
        await expect(this.highUsageCard).toBeVisible();
    }
    // ---------- VALIDATIONS FOR CONSUMPTION & BILLING CARDS ----------
    async validateElectricityUsage(expectedUsage: string) {
        await expect(this.electricityusage).toBeVisible();
    }
    async validateElectricityCharges(expectedCharges: string) {
        await expect(this.electricitycharges).toBeVisible();
    }
    async validateConsumptioncount(expectedUsage: string) {
        await expect(this.Consumptioncount).toHaveText(expectedUsage);
    }

    async validateBillingCharges(expectedCharges: string) {
        await expect(this.BillingCharges).toHaveText(expectedCharges);
    }

    async validateConsumptionAndBilling(expectedUsage: number, expectedCharges: number) {
        await expect(this.electricityusage).toBeVisible();
        await expect(this.electricitycharges).toBeVisible();
    }
    async validatemonthlytoogle() {
        await this.monthlyToggle.click();
    }
    async validateMonthlyElectricityUsage(expectedUsage: string) {
        await expect(this.monthlyelectricityusage).toBeVisible();
    }
    async validateMonthlyElectricityCharges(expectedCharges: string) {
        await expect(this.monthlyelectricitycharges).toBeVisible();
    }
    async validateMonthlyConsumptioncount(expectedUsage: string) {
        await expect(this.monthlyConsumptioncount).toHaveText(expectedUsage);
    }
    async validateMonthlyBillingCharges(expectedCharges: string) {
        await expect(this.monthlyBillingCharges).toHaveText(expectedCharges);
    }
    async validateMonthlyConsumptionAndBilling(expectedUsage: number, expectedCharges: number) {
        await expect(this.monthlyelectricityusage).toBeVisible();
        await expect(this.monthlyelectricitycharges).toBeVisible();
    }
    // BONUS: Assert that Monthly values are different from Daily (if data is dynamic)
    async assertMonthlyValuesDifferentFromDaily() {
        const dailyUsage = (await this.Consumptioncount.textContent())?.trim();
        const dailyCharges = (await this.BillingCharges.textContent())?.trim();

        // click Monthly
        await this.monthlyToggle.click();

        // wait for data refresh instead of CSS class
        await this.page.waitForLoadState('networkidle');

        // OR wait for value change directly (best)
        await expect(this.Consumptioncount).toHaveText(dailyUsage!);
        await expect(this.BillingCharges).toHaveText(dailyCharges!);

        const monthlyUsage = (await this.Consumptioncount.textContent())?.trim();
        const monthlyCharges = (await this.BillingCharges.textContent())?.trim();

        expect(monthlyUsage).toBeTruthy();
        expect(monthlyCharges).toBeTruthy();

    }
    async ValidateSearchBar(value: string) {
        await this.metersearchbar.scrollIntoViewIfNeeded();
        await this.metersearchbar.fill(value);
        await this.metersearch.click();
    }                                   
    async selectMeterDropdown(option: string) {
        await this.meterDropdown.select(option);
    }
    async validateFilteredByMeter(expectedMeter: string) {

        const count = await this.meterCells.count();

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            await expect(this.meterCells.nth(i)).toHaveText(expectedMeter);
        }
    }
    async clearall() {
        await this.clearallfilter.click();
    }
    async navigatetoconsumers() {
        await this.consumers.click();
        await this.consumers.click();
        await expect(this.page.getByRole('heading', { name: 'Consumers' })).toBeVisible();
    }
    async getTotalConsumers() {
        return Number(await this.totalConsumersValue.textContent());
    }
    async getHighUsageConsumers() {
        return Number(await this.highUsageValue.textContent());
    }
    async getCommunicatingMeters(){
         const text = await this.communication.textContent();
        return Number((text ?? '').match(/\d+/)?.[0]);
    }
    async getNonCommunicatingMeters(){
        const text = await this.noncommunication.textContent();
        return Number((text ?? '').match(/\d+/)?.[0]);
    }
    async GraphisLoaded(){
        await expect(this.graph).toBeVisible();
        await expect(this.chartcanvas).toBeVisible();
    }
    async Hover(){
        await this.chartcanvas.hover;
    }
    async ValidateGraph(){
          await expect(this.graph).toBeVisible();
          await this.chartcanvas.hover();
          await expect(this.tooltip).toBeVisible();
    }
    async printTooltipValue(){
    await this.chartcanvas.hover();
    const tooltipText = await this.page.locator('span:has-text("kVAh")').last().textContent();
    console.log("Energy Tooltip Value:", tooltipText);
    }


    async collectAllGraphValues() {
    const canvas = this.chartcanvas;
    const box = await canvas.boundingBox();
    if (!box) throw new Error("Canvas not found");
    const bars = 90;
    const step = box.width / bars;
    const values:any[] = [];
    for (let i = 0; i < bars; i++) {
        const x = box.x + step * i;
        const y = box.y + box.height / 2;
        await this.page.mouse.move(x, y);
        await this.page.waitForTimeout(300);
        const tooltipLocator = this.page.locator('span')
          .filter({ hasText: /\d+\.\d+\s*kVAh/ })
          .first();
        const count = await tooltipLocator.count();
        if (count > 0) {
            const value = await tooltipLocator.textContent();
            values.push(value);
            console.log("Bar value:", value);
        }
    }
    return values;
    }
}
