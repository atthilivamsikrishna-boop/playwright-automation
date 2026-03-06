# 🚀 Playwright TypeScript Automation Framework

A scalable **End-to-End Test Automation Framework** built using **Playwright + TypeScript**.
This project demonstrates **enterprise-level automation architecture** using best practices like **Page Object Model (POM), fixtures, reusable utilities, environment configuration, and CI/CD integration**.

This framework supports **cross-browser testing, parallel execution, reporting, screenshots, and videos for debugging**.

---

# 📌 Features

* ✅ Playwright Test Runner
* ✅ TypeScript support
* ✅ Page Object Model (POM) design pattern
* ✅ Cross-browser testing (Chromium, Firefox, WebKit)
* ✅ Parallel test execution
* ✅ HTML reports
* ✅ Screenshots on failure
* ✅ Video recording of test execution
* ✅ Trace viewer for debugging
* ✅ Environment-based configuration
* ✅ CI/CD ready framework
* ✅ Scalable folder structure

---

# 🏗 Project Structure

```
playwright-typescript-framework
│
├── tests/                 # Test specifications
│   ├── login.spec.ts
│   └── checkout.spec.ts
│
├── pages/                 # Page Object Models
│   ├── LoginPage.ts
│   └── DashboardPage.ts
│
├── fixtures/              # Custom fixtures
│
├── utils/                 # Utility/helper functions
│
├── test-data/             # Test data files
│
├── config/                # Environment configurations
│
├── reports/               # HTML reports
│
├── playwright.config.ts   # Playwright configuration
│
├── package.json
└── README.md
```

---

# ⚙️ Tech Stack

* **Playwright**
* **TypeScript**
* **Node.js**
* **Playwright Test Runner**
* **HTML Reporter**

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/your-repository-name.git
```

Navigate to project directory

```bash
cd your-repository-name
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# ▶️ Running Tests

Run all tests

```bash
npx playwright test
```

Run tests in headed mode

```bash
npx playwright test --headed
```

Run tests in specific browser

```bash
npx playwright test --project=chromium
```

Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

---

# 📊 Test Reports

After execution, view the HTML report:

```bash
npx playwright show-report
```

Reports include:

* Test results
* Screenshots
* Videos
* Execution logs

---

# 🌐 Cross Browser Testing

This framework supports:

* Chromium
* Firefox
* WebKit

Browser configuration is defined in:

```
playwright.config.ts
```

---

# 🧪 Sample Test

```typescript
import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {
  await page.goto('https://example.com');

  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password');

  await page.click('#login');

  await expect(page).toHaveURL(/dashboard/);
});
```

---

# 📄 Page Object Example

```typescript
import { Page } from '@playwright/test';

export class LoginPage {

  constructor(private page: Page) {}

  async login(username: string, password: string) {

    await this.page.fill('#username', username);
    await this.page.fill('#password', password);

    await this.page.click('#login');
  }

}
```

---

# 📸 Test Artifacts

The framework automatically generates:

* Screenshots for failed tests
* Videos for test execution
* Trace files for debugging

These artifacts help in **quick failure analysis and debugging**.

---

# 🔄 Continuous Integration (CI)

This framework can be integrated with:

* GitHub Actions
* Jenkins
* Azure DevOps
* GitLab CI

Example GitHub Actions workflow:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - run: npm install
      - run: npx playwright install
      - run: npx playwright test
```

---

# 👨‍💻 Author

QA Automation Engineer

---

# 📜 License

This project is licensed under the **MIT License**.
