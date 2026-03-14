import { test as base } from '@playwright/test';
import fs from 'fs';

export const test = base;

test.afterEach(async ({}, testInfo) => {

  const trace = testInfo.attachments.find(a => a.name === 'trace');

  if (trace && trace.path) {
    const buffer = fs.readFileSync(trace.path);

    await testInfo.attach('Playwright Trace', {
      body: buffer,
      contentType: 'application/zip'
    });
  }

});