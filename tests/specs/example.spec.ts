import { expect, test } from "@playwright/test";
import path from "path";

import { envRoleUsers } from "../../libs/envRoleUsers";

// add page objects here


const ENV = process.env.PW_ENV || "local";
const users = envRoleUsers[ENV];

for (const [role, user] of Object.entries(users)) {
  if (!user.capabilities.includes("capabilityString")) continue;

  test.describe("page/capability under test", () => {
    test.use({
      storageState: path.resolve(`.auth/ENV/${role}.json`),
    });

    test.describe(`${role} test description`, () => {
      // new tests go here
        test('has title', async ({ page }) => {
          await page.goto('https://playwright.dev/');

          // Expect a title "to contain" a substring.
          await expect(page).toHaveTitle(/Playwright/);
        });
      
        test('get started link', async ({ page }) => {
          await page.goto('https://playwright.dev/');

          // Click the get started link.
          await page.getByRole('link', { name: 'Get started' }).click();

          // Expects page to have a heading with the name of Installation.
          await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
      });
    });
  });
}
