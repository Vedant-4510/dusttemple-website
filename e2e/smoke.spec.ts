import { test, expect } from "@playwright/test";

test("homepage renders the brand name", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /dustt temple/i })).toBeVisible();
});
