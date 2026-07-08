import { test, expect } from "@playwright/test";

test("primary booking button is present and labelled", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("button", { name: /begin a conversation/i }).first();
  await expect(cta).toBeVisible();
});
