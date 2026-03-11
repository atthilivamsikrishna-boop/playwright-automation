export const DASHBOARD_ENDPOINTS = {
  DASHBOARD: "/dashboard", // added leading slash

  TAMPER_EVENTS: "/dashboard/latest-tamper-events",

  WIDGET_DATA: "/dashboard/widget-data", // remove query params; pass them dynamically in DashboardApi

  TARIFF: "/dashboard/tariff",

  GRAPH_ANALYTICS: "/dashboard/graph-analytics",
};