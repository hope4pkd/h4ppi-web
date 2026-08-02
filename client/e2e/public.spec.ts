import { expect, test } from "@playwright/test";

test("homepage exposes the twelve-section trust journey", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("No one should navigate PKD alone");
  await expect(page.getByRole("link", { name: "Request support" }).first()).toBeVisible();
  await expect(page.getByText("No verified campaigns are public yet")).toBeVisible();
  await expect(page.getByText("Pilot reporting state").first()).toBeVisible();
  await expect(page.locator("[data-nextjs-dialog]")).toHaveCount(0);
  expect(consoleErrors).toEqual([]);
});

test("support intake fails closed without operational configuration", async ({ page }) => {
  await page.goto("/support/request");
  await expect(page.getByRole("heading", { name: "Support intake is not active yet" })).toBeVisible();
  await expect(page.getByText("Do not include medical documents")).toBeVisible();
});

test("mobile navigation exposes the required information architecture", async ({ page }) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation menu" });
  if (await menu.isVisible()) {
    await menu.click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Knowledge" })).toBeVisible();
  } else {
    await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Knowledge" })).toBeVisible();
  }
});
