import { test, expect } from "@playwright/test";

test("primary booking link is present, labelled, and points to Calendly", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: /begin a conversation/i }).first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "https://calendly.com/vedant-scoutflo/new-meeting");
  await expect(cta).toHaveAttribute("target", "_blank");
});
