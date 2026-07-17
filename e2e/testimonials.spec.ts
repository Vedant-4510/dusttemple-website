import { test, expect } from "@playwright/test";

test("testimonials advance to the next quote", async ({ page }) => {
  await page.goto("/#testimonials");
  await expect(page.getByText("Shreya", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /next testimonial/i }).click();
  await expect(page.getByText("Nikit", { exact: true })).toBeVisible();
});
