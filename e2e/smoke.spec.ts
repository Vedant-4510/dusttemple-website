import { test, expect } from "@playwright/test";

test("homepage renders hero and brand", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /build a temple/i })).toBeVisible();
  await expect(page.getByRole("img", { name: /dustt temple/i }).first()).toBeVisible();
});
