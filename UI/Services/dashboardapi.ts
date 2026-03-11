import { APIRequestContext } from "@playwright/test";
import { DASHBOARD_ENDPOINTS } from "./Endpoints/Dashboardendpoints";

export class DashboardApi {
  private headers: Record<string, string> = {};

  constructor(private request: APIRequestContext, token?: string) {
    if (token) this.setToken(token);
  }

  setToken(token: string) {
    this.headers = { Authorization: `Bearer ${token}` };
  }

  private async get(endpoint: string) {
    const response = await this.request.get(endpoint, { headers: this.headers });
    if (!response.ok()) {
      const text = await response.text();
      throw new Error(`API call failed: ${response.status()} \n${text}`);
    }
    return response.json();
  }
  async GetDashboardstats(){
    const reponse = await this.request.get(`${process.env.API_BASE_URL}/api/dashboard`);
    return reponse.json();
  }

  // Latest tamper events with dynamic pagination
  async getTamperEvents(page = 1, limit = 20) {
    const endpoint = `${process.env.API_BASE_URL}/api/dashboard/latest-tamper-events?page=${page}&limit=${limit}`;
    return this.get(endpoint);
  }

  // Meter status
  async getMeterStatus() {
    const response = await this.request.get(`${process.env.API_BASE_URL}/api/consumers/meter-status`);
    return response.json();
  }

  // Graph analytics
  async getGraphAnalytics() {
    const endpoint = `${process.env.API_BASE_URL}/api/dashboard/graph-analytics`;
    return this.get(endpoint);
  }

  // Tariff
  async getTariff() {
    const endpoint = `${process.env.API_BASE_URL}/api/dashboard/tariff`;
    return this.get(endpoint);
  }

  // Widget data — you can add query params dynamically if needed
  async getWidgetData(startDate: string, endDate: string, data: string) {

    const response =await this.request.get(`${process.env.API_BASE_URL}/api/dashboard/widget-data?startDate=${startDate}&endDate=${endDate}&data=${data}`);
    return response.json();
  }
}