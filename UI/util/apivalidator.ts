import { expect, APIResponse } from '@playwright/test';

export class ApiValidator {

  static validateStatus(response: APIResponse, expectedStatus: number = 200) {
    expect(response.status()).toBe(expectedStatus);
  }

  static validateSuccess(body: any) {
    expect(body.success).toBe(true);
  }

  static validateArray(data: any[]) {
    expect(Array.isArray(data)).toBeTruthy();
  }

  static validatePagination(pagination: any) {
    expect(pagination).toBeDefined();
    expect(pagination.currentPage).toBeGreaterThan(0);
    expect(pagination.limit).toBeGreaterThan(0);
  }

  static validateTotalRecords(data: any[], pagination: any) {
    expect(data.length).toBeLessThanOrEqual(pagination.limit);
    expect(data.length).toBeLessThanOrEqual(pagination.totalCount);
  }

  static validateFields(record: any, fields: string[]) {
    fields.forEach(field => {
      expect(record).toHaveProperty(field);
    });
  }

}