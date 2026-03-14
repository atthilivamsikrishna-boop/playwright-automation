import { test } from "@playwright/test";

test.afterEach(async ({ page }, testInfo) => {

  // only attach when test fails
  if (testInfo.status !== testInfo.expectedStatus) {

    const screenshot = await page.screenshot();

    await testInfo.attach("Failure Screenshot", {
      body: screenshot,
      contentType: "image/png",
    });

  }

});