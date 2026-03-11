import { APIRequestContext, APIResponse, Page } from "@playwright/test";
import fs from 'fs';

export class ConsumerApi {
    constructor(private request: APIRequestContext, page: Page) { }
    async getTableRecords() {
        const response = await this.request.get(`${process.env.API_BASE_URL!}/api/consumers?page=1&limit=50`)
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
    async ExportApi() {
        const response = await this.request.get(`${process.env.API_BASE_URL!}/api/consumers/export`);
        return response;
    }
    async downloadFile(response: APIResponse, filePath: string) {
        const body = await response.body();

        const dir = 'downloads';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        fs.writeFileSync(filePath, body);
    }
    async getConsumerdetailsbyDate(date:string,timeRange:string){
        const response = await this.request.get(`${process.env.API_BASE_URL!}/api/consumers/by-date?date=01%2F01%2F2026&timeRange=Monthly`,{params : {date:date,timeRange:timeRange}
        });
        return response;
    }
    async MeterStatus(){
        const response = await this.request.get(`${process.env.API_BASE_URL!}/api/consumers/meter-status`);
        return response.json();
        return response;
    }
}