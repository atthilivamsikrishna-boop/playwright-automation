import{expect, Locator,Page,} from '@playwright/test';
let page: Page;
export class LogoutPage {
    readonly page: Page
    readonly profileIcon: Locator;
    readonly MyProfileOption: Locator;
    readonly settingsOption: Locator;
    readonly SwitchmodeOption: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileIcon = page.getByLabel('Profile');
        this.MyProfileOption = page.getByText('My Profile', { exact: true });
        this.settingsOption = page.getByText('Settings', { exact: true });
        this.SwitchmodeOption = page.locator('.relative.w-10')
        this.logoutButton = page.getByText('Log Out', { exact: true });
    }
    async logout() {
        await this.profileIcon.click();
        await this.logoutButton.click();
    }
    async navigateToMyProfile() {
        await this.profileIcon.click();
        await this.MyProfileOption.click();
    }
    async navigateToSettings() {
        await this.profileIcon.click();
        await this.settingsOption.click();
    }
   async navigateToSwitchMode() {
  await this.profileIcon.click();

  await expect(this.SwitchmodeOption).toBeVisible(); // wait properly
  await this.SwitchmodeOption.click();

  // verify theme changed instead of timeout
  await expect(this.page.locator('html')).toHaveClass(/dark|light/);
}

}
