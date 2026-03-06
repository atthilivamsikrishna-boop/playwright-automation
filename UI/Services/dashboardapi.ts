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
  async (){
    
  }
}