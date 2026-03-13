import fs from "fs";

export function getFailedTests() {
  const results = JSON.parse(fs.readFileSync("test-results/results.json", "utf8"));

  const failedTests: any[] = [];

  results.suites.forEach((suite: any) => {
    suite.specs.forEach((spec: any) => {
      spec.tests.forEach((test: any) => {
        if (test.status === "failed") {
          failedTests.push(spec.title);
        }
      });
    });
  });

  return failedTests;
}