import { test, expect } from "@playwright/test";

test("a service can be expanded to reveal its offerings", async ({ page }) => {
  await page.goto("/#services");
  const trigger = page.getByRole("button", { name: /numerology/i }).first();
  await trigger.click();
  await expect(page.getByText(/life path analysis/i)).toBeVisible();
});
