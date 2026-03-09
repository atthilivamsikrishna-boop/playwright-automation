import { APIRequestContext, Page } from "@playwright/test";

export class DashboardApi {
  constructor(private request: APIRequestContext, page: Page) { }

  async getDashboardStats() {
    const response = await this.request.get(process.env.API_URL!);
    return response.json();
  }
  async getTableRecords() {
    const response = await this.request.get(process.env.TABLE_API_URL!);
    return response.json();
  }
  async getwigdetsrecords() {
    const response = await this.request.get(process.env.WIDGET_URL!);
    return response.json();
  }
  async getMeterEvent() {
    const response = await this.request.get(process.env.METER_EVENT!);
    return response.json();
  }
  async Trariff(){
    const response = await this.request.get(process.env.TARIFF_URL!);
    return response.json();
  }
  async Graph(){
    const response = await this.request.get(process.env.GRAPH_URL!);
    return response.json();
  }

}