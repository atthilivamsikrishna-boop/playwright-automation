/*Vadid Login Test Cases for GMR Portal using Playwright*/
import { test, expect } from 'UI/Fixtures/page';
import {Loginpage} from 'UI/Pages/Login';
import { env } from 'node:process';
/*TEST CASE_1: VALID LOGIN
1. Navigate to the login page.
2. Enter valid credentials 
3. Click the login button.
4. Verify that the user is redirected to the dashboard page.,*/
test.use({ storageState: undefined as any });
test('Login with Valid Credentials', async ({page,loginPage}) => {
  await page.goto(env.BASE_URL!);
  await loginPage.login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
  await expect(page).toHaveURL('https://portal.gmr.bestinfra.app/');
});
/*TEST CASE_2: INVALID LOGIN
1. Navigate to the login page.
2. Enter invalid credentials (e.g., wrong username or password).
3. Click the login button.*/
test('Login with Invalid Credentials', async ({page,loginPage}) => {
  await page.goto(env.BASE_URL!);
  await loginPage.login('invalid_user', 'invalid_pass');
  const errormessage = await page.getByText('Invalid username/email or password');
  await errormessage.allTextContents();
  await expect(errormessage).toHaveText('Invalid username/email or password');
});
/*TEST CASE_3: EMPTY FIELDS
1. Navigate to the login page.
2. Leave the username and password fields empty.
3. Click the login button.
4. Verify that appropriate error messages are displayed for both fields.*/
test('Login with Empty Fields', async ({page,loginPage}) => {
  await page.goto(env.BASE_URL!);
  await loginPage.login('', '');
  const errormessage = await expect(page.locator('#identifier-error')).toHaveText('Invalid value');
  await expect(page.locator('#password-error')).toHaveText('Invalid value');
  
});       
