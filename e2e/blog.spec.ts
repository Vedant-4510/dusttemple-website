import { test, expect } from "@playwright/test";

test("blog nav link navigates to the listing page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Blog", exact: true }).first().click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/writing/i);
});

test("listing page links to the first post and renders it", async ({ page }) => {
  await page.goto("/blog");
  await page.getByRole("link", { name: /anxiety is a terrible fortune teller/i }).click();
  await expect(page).toHaveURL(/\/blog\/anxiety-is-a-terrible-fortune-teller$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/anxiety is a terrible fortune teller/i);
  await expect(page.getByRole("link", { name: /back to blog/i })).toBeVisible();
});
