import { expect, test } from "@playwright/test";

test("homepage answers the audience table and states what is not live", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("No one should navigate PKD alone");
  await expect(page.getByRole("heading", { name: "Where would you like to start?" })).toBeVisible();
  // The five audience rows replace the old audience bar.
  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: /I care for someone with PKD/ })).toHaveAttribute("href", "/for/caregivers");
  await expect(main.getByRole("link", { name: /I want to help/ })).toHaveAttribute("href", "/get-involved");
  // Clinical copy on the home page carries its provenance like every other page.
  await expect(main.getByText("Hope4PKD has not medically reviewed it")).toBeVisible();
  await expect(main.getByText("No programme report has been published yet")).toBeVisible();
  await expect(page.locator("[data-nextjs-dialog]")).toHaveCount(0);
  expect(consoleErrors).toEqual([]);
});

test("backend-dependent support actions are marked coming soon and do not link", async ({ page }) => {
  await page.goto("/support");
  const main = page.getByRole("main");
  await expect(main.getByText("Start a request", { exact: true })).toBeVisible();
  await expect(main.getByText("Check case status", { exact: true })).toBeVisible();
  // Two actions plus the panel standing in for the mockup's request form.
  await expect(main.getByText("Coming soon", { exact: true })).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Start a request" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Check case status" })).toHaveCount(0);
  await expect(main.locator("form")).toHaveCount(0);
  await expect(main.getByText("Hope4PKD cannot provide emergency care")).toBeVisible();
});

test("routes that needed the backend are gone", async ({ page }) => {
  for (const route of ["/support/request", "/case-status", "/admin", "/donate/confirmation"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(404);
  }
});

const primaryLabels = ["About", "Understanding PKD", "Get Support", "Get Involved", "Transparency"];

test("the header is five flat links and two persistent buttons", async ({ page }) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  const hamburger = header.getByRole("button", { name: "Open navigation menu" });

  // Donate stays visible at every width; Get support joins it from sm.
  await expect(header.getByRole("link", { name: "Donate" })).toBeVisible();

  if (await hamburger.isVisible()) {
    await hamburger.click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNav.getByRole("link")).toHaveText(["Home", ...primaryLabels, "Contact"]);
    await mobileNav.getByRole("link", { name: "Get Support" }).click();
    await expect(page).toHaveURL(/\/support$/);
  } else {
    const primaryNav = header.getByRole("navigation", { name: "Primary navigation" });
    // No dropdown triggers: every item is a link to a hub page.
    await expect(primaryNav.getByRole("link")).toHaveText(primaryLabels);
    await expect(primaryNav.getByRole("button")).toHaveCount(0);
    // `exact` matters: the nav link "Get Support" also matches case-insensitively.
    await expect(header.getByRole("link", { name: "Get support", exact: true })).toBeVisible();

    await primaryNav.getByRole("link", { name: "Understanding PKD" }).click();
    await expect(page).toHaveURL(/\/pkd$/);
    await expect(primaryNav.getByRole("link", { name: "Understanding PKD" })).toHaveAttribute("aria-current", "page");
  }
});

test("the footer carries every sub-page the flat header does not", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  for (const label of ["Start here", "Understanding PKD", "Get Support", "Get Involved", "Organisation", "Trust & Legal"]) {
    await expect(footer.getByText(label, { exact: true })).toBeVisible();
  }
  await expect(footer.getByRole("link", { name: "Caregivers" })).toHaveAttribute("href", "/for/caregivers");
  await expect(footer.getByRole("link", { name: "Early Detection & Family Testing" })).toBeVisible();
  await expect(footer.getByRole("link", { name: "Awareness & Advocacy" })).toHaveAttribute("href", "/awareness");
  // Coming-soon destinations render as text, never as links.
  await expect(footer.getByRole("link", { name: "Request Support" })).toHaveCount(0);
  await expect(footer.getByText("Request Support")).toBeVisible();
});

test("the Understanding PKD pages explain the disease and name their source", async ({ page }) => {
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
    ["/about", "built by a family that needed one"],
    ["/about/founder-story", "Turning Pain into Purpose"],
    ["/about/leadership", "How Hope4PKD separates authority"],
    ["/support", "Let’s work out your next step together"],
    ["/support/process", "What happens at each stage"],
    ["/get-involved", "Every kind of help has a place here"],
    ["/impact", "Trust you can check"],
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

test("legacy and alias routes still land somewhere real", async ({ page }) => {
  await page.goto("/advocacy");
  await expect(page).toHaveURL(/\/awareness$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Most people meet PKD for the first time");
});
