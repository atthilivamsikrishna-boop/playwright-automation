import { test, expect } from 'UI/Fixtures/page';
import { LogoutPage } from 'UI/Pages/Logout';

test.describe('Profile Dropdown Navigation', () => {

  let logoutPage: LogoutPage;

  test.beforeEach(async ({ page ,logoutpage}) => {
    await page.goto('/');
  });
/* Test cases for Logout functionality and navigation to My Profile, Settings, and Switch Mode */
  test('Logout user and redirect to login page', async ({ page,logoutpage }) => {
    await logoutpage.logout();
    await expect(page).toHaveURL(/login/);
  });

  test('Navigate to Switch Mode', async ({ page,logoutpage }) => {
    await logoutpage.navigateToSwitchMode();
  });

  test('Navigate to My Profile', async ({ page,logoutpage }) => {
    await logoutpage.navigateToMyProfile();
  });

  test('Navigate to Settings', async ({ page ,logoutpage}) => {
    await logoutpage.navigateToSettings();
  });

});
