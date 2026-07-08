import { test, expect } from "@playwright/test";

test("testimonials advance to the next quote", async ({ page }) => {
  await page.goto("/#testimonials");
  await expect(page.getByText(/vikramjit singh chugh/i)).toBeVisible();
  await page.getByRole("button", { name: /next testimonial/i }).click();
  await expect(page.getByText(/varsha koppikar/i)).toBeVisible();
});
