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
    await mobileNav.getByRole("button", { name: "Learn About PKD" }).click();
    await expect(mobileNav.getByRole("link", { name: "What Is PKD?" })).toBeVisible();
  } else {
    const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(primaryNav.getByRole("button")).toHaveText(["About", "Learn About PKD", "Get Support", "Get Involved"]);
    await expect(primaryNav.getByRole("link")).toHaveText(["Home", "Contact"]);
    await primaryNav.getByRole("button", { name: "Learn About PKD" }).click();
    await expect(page.getByRole("menuitem", { name: "What Is PKD?" })).toBeVisible();
  }
});

test("the Learn About PKD pages explain the disease and name their source", async ({ page }) => {
  await page.goto("/pkd");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Polycystic kidney disease");
  await expect(page.getByRole("link", { name: "Symptoms and diagnosis" }).first()).toBeVisible();

  await page.goto("/pkd/symptoms-and-diagnosis");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Symptoms and diagnosis");

  await page.goto("/pkd/treatment-and-care");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Treatment and care");
  // Clinical copy must always carry its provenance and the "not medically reviewed" statement.
  await expect(page.getByText("Hope4PKD has not medically reviewed this page")).toBeVisible();
  await expect(page.getByRole("link", { name: /Mayo Clinic/ })).toHaveAttribute("target", "_blank");
});

// Every nav item must resolve to a page that exists — nothing in the menu points at a route we plan to write.
test("the nav destinations added for the owner's structure all resolve", async ({ page }) => {
  const destinations = [
    ["/about/leadership", "Who decides"],
    ["/support/process", "What happens at each stage"],
    ["/help", "Clear answers"],
  ] as const;

  for (const [route, heading] of destinations) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
  }
});
