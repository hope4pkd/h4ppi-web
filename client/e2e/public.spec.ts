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

test("navigation groups destinations behind five mega panels", async ({ page }) => {
  await page.goto("/");
  const hamburger = page.getByRole("button", { name: "Open navigation menu" });

  if (await hamburger.isVisible()) {
    await hamburger.click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    // The audience bar is hidden below lg, so the drawer has to carry the audiences itself.
    await expect(mobileNav.getByRole("link", { name: "Caregivers" })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Home" })).toBeVisible();
    await mobileNav.getByRole("button", { name: "Learn About PKD" }).click();
    await expect(mobileNav.getByRole("link", { name: "What Is PKD?" })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Early Detection & Family Testing" })).toBeVisible();
  } else {
    const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });
    // Home and Contact are gone from this row: five triggers plus the Donate pill is the width budget.
    await expect(primaryNav.getByRole("button")).toHaveText([
      "About",
      "Learn About PKD",
      "Get Support",
      "Get Involved",
      "Campaigns",
    ]);
    await expect(primaryNav.getByRole("link")).toHaveCount(0);

    await primaryNav.getByRole("button", { name: "Learn About PKD" }).click();
    // Both columns and the featured card render inside one panel.
    await expect(page.getByRole("menuitem", { name: "What Is PKD?" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Early Detection & Family Testing" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /The patient route/ })).toBeVisible();
    await page.keyboard.press("Escape");

    // A group with no columns still renders as the plain list it always was.
    // `exact` matters: "About" is also a substring of "Learn About PKD".
    await primaryNav.getByRole("button", { name: "About", exact: true }).click();
    await expect(page.getByRole("menuitem", { name: "Founder's Story" })).toBeVisible();
  }
});

test("the audience bar routes by who the reader is", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const audienceNav = page.getByRole("navigation", { name: "Audience navigation" });
  await expect(audienceNav.getByRole("link")).toHaveText([
    "Patients",
    "Caregivers",
    "Health Professionals",
    "Everyone",
    "Contact",
  ]);

  await audienceNav.getByRole("link", { name: "Caregivers" }).click();
  await expect(page).toHaveURL(/\/for\/caregivers$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Someone has to hold all of it");
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
  await expect(page.getByText("Hope4PKD has not medically reviewed it")).toBeVisible();
  await expect(page.getByRole("link", { name: /Mayo Clinic/ })).toHaveAttribute("target", "_blank");
});

// Every nav item must resolve to a page that exists — nothing in the menu points at a route we plan to write.
test("the nav destinations added for the owner's structure all resolve", async ({ page }) => {
  const destinations = [
    ["/about/founder-story", "Turning Pain into Purpose"],
    ["/about/leadership", "How Hope4PKD separates authority"],
    ["/support/process", "What happens at each stage"],
    ["/help", "Know what Hope4PKD can do"],
    ["/for/patients", "You have PKD"],
    ["/for/caregivers", "Someone has to hold all of it"],
    ["/for/health-professionals", "We are not a clinical service"],
    ["/for/everyone", "You probably do not have PKD"],
    ["/pkd/early-detection", "Early detection and family testing"],
    ["/find-care", "A referral list is only worth having if it is true"],
    ["/community", "The people who already know"],
    ["/awareness", "Most people meet PKD for the first time"],
    ["/shop", "Merchandise that says the thing out loud"],
  ] as const;

  for (const [route, heading] of destinations) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
  }
});

// The new sections all describe things that do not work yet. None of them may offer a control that
// pretends otherwise — ADR-3b.
test("the new sections are honest about what does not exist yet", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.getByRole("main").getByText("The store is not open")).toBeVisible();
  await expect(page.getByRole("button", { name: /add to (cart|basket)/i })).toHaveCount(0);
  await expect(page.getByRole("main").getByText("₦")).toHaveCount(0);

  await page.goto("/find-care");
  await expect(page.getByText("No facility has completed verification yet")).toBeVisible();

  await page.goto("/community");
  await expect(page.getByText("No community channel is open yet")).toBeVisible();
});
