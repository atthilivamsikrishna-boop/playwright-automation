import { APIRequestContext, APIResponse, Page } from "@playwright/test";
import fs from 'fs';

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
    async ExportApi() {
        const response = await this.request.get(process.env.EXPORT_URL!);
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
        const response = await this.request.get(process.env.DETAILS_URL!,{params : {date:date,timeRange:timeRange}
        });
        return response;
    }
    async MeterStatus(){
        const response = await this.request.get(process.env.METER_STATUS_URL!);
        return response.json();
        return response;
    }
}