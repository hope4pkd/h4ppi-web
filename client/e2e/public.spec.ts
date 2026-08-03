import { expect, test } from "@playwright/test";

test("homepage exposes the twelve-section trust journey", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("No one should navigate PKD alone");
  await expect(page.getByRole("link", { name: "Get support" }).first()).toBeVisible();
  await expect(page.getByText("No verified campaigns are public yet")).toBeVisible();
  await expect(page.getByText("Pilot reporting state").first()).toBeVisible();
  await expect(page.locator("[data-nextjs-dialog]")).toHaveCount(0);
  expect(consoleErrors).toEqual([]);
});

test("backend-dependent support actions are marked coming soon and do not link", async ({ page }) => {
  await page.goto("/support");
  const main = page.getByRole("main");
  await expect(main.getByText("Start a request", { exact: true })).toBeVisible();
  await expect(main.getByText("Check case status", { exact: true })).toBeVisible();
  await expect(main.getByText("Coming soon", { exact: true })).toHaveCount(2);
  await expect(page.getByRole("link", { name: "Start a request" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Check case status" })).toHaveCount(0);
});

test("routes that needed the backend are gone", async ({ page }) => {
  for (const route of ["/support/request", "/case-status", "/admin", "/donate/confirmation"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(404);
  }
});

test("navigation groups destinations behind a reduced top level", async ({ page }) => {
  await page.goto("/");
  const hamburger = page.getByRole("button", { name: "Open navigation menu" });

  if (await hamburger.isVisible()) {
    await hamburger.click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNav.getByRole("link", { name: "Home" })).toBeVisible();
    await mobileNav.getByRole("button", { name: "Learn" }).click();
    await expect(mobileNav.getByRole("link", { name: "Learn About PKD" })).toBeVisible();
  } else {
    const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(primaryNav.getByRole("button")).toHaveText(["About", "Get Support", "Learn", "Get Involved"]);
    await expect(primaryNav.getByRole("link")).toHaveText(["Home", "Contact"]);
    await primaryNav.getByRole("button", { name: "Learn" }).click();
    await expect(page.getByRole("menuitem", { name: "Learn About PKD" })).toBeVisible();
  }
});
