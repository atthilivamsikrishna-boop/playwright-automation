import { APIRequestContext, Page } from "@playwright/test";

export class ConsumerApi {
    constructor(private request: APIRequestContext, page: Page) { }
    async getTableRecords() {
        const response = await this.request.get(process.env.CONSUMER_TABLE_API_URL!);
        return response.json();
    }
    async getMonthlyConsumption(consumerNumber: string, startDate: string, endDate: string) {
        const response = await this.request.get(
            `/gmr/api/consumers/${consumerNumber}/report`,
            {
                params: {
                    startDate,
                    endDate,
                    reportType: 'monthly-consumption',
                },
            }
        );

        if (!response.ok()) throw new Error(`API failed with status ${response.status()}`);
        return response.json();
    }

}