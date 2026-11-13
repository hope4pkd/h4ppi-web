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

test("/support asks for a short email instead of a form, and marks nothing coming soon", async ({ page }) => {
  await page.goto("/support");
  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: "Ask for support", exact: true })).toHaveAttribute("href", "/support#request");
  await expect(main.getByRole("link", { name: "Email us" })).toHaveAttribute(
    "href",
    "mailto:info@hope4pkd.org?subject=Support%20request",
  );
  await expect(main.getByText("Please do not send medical records.")).toBeVisible();
  await expect(main.getByRole("link", { name: "+234(0)9076412444" })).toHaveAttribute("href", "tel:+2349076412444");
  await expect(main.getByRole("link", { name: "+234(0)8106411664" })).toHaveAttribute("href", "tel:+2348106411664");
  await expect(main.getByText("Coming soon", { exact: true })).toHaveCount(0);
  await expect(main.locator("form")).toHaveCount(0);
  await expect(main.getByText("Hope4PKD cannot provide emergency care")).toBeVisible();
});

const youtubeHosts = /youtube|ytimg|doubleclick/;

test("the support video asks before it loads YouTube when the reader has not allowed it", async ({ page }) => {
  const youtubeRequests: string[] = [];
  page.on("request", (request) => {
    if (youtubeHosts.test(new URL(request.url()).hostname)) youtubeRequests.push(request.url());
  });
  await page.goto("/support");
  await page.getByRole("button", { name: "Essential only" }).click();
  const play = page.getByRole("button", { name: /^Play video: / });
  await play.scrollIntoViewIfNeeded();
  await play.click();

  // Pressing play is not consent: the frame asks, and still nothing has gone to YouTube.
  await expect(page.getByText("This video plays from YouTube")).toBeVisible();
  await expect(page.getByRole("link", { name: "Watch on YouTube" })).toHaveAttribute("href", /^https:\/\/www\.youtube\.com\/watch\?v=/);
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(youtubeRequests).toEqual([]);

  await page.getByRole("button", { name: "Allow and play" }).click();
  await expect(page.locator('iframe[src^="https://www.youtube-nocookie.com/embed/"]')).toHaveCount(1);
  // Allowing one video grants video only, never Google measurement.
  expect(await page.evaluate(() => window.localStorage.getItem("hope4pkd-consent"))).toBe("video");
});

test("the support video plays on the first press once the reader allows all", async ({ page }) => {
  const youtubeRequests: string[] = [];
  page.on("request", (request) => {
    if (youtubeHosts.test(new URL(request.url()).hostname)) youtubeRequests.push(request.url());
  });
  await page.goto("/support");
  await page.getByRole("button", { name: "Allow all" }).click();
  const play = page.getByRole("button", { name: /^Play video: / });
  await play.scrollIntoViewIfNeeded();
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(youtubeRequests).toEqual([]);

  await play.click();
  await expect(page.locator('iframe[src^="https://www.youtube-nocookie.com/embed/"]')).toHaveCount(1);
});

test("the cookie banner asks once, sets no cookie, and the choice can be changed on /cookies", async ({ page, context }) => {
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Your cookie choice" });
  await expect(banner).toBeVisible();
  await expect(banner.getByRole("link", { name: "Cookies notice" })).toHaveAttribute("href", "/cookies");
  await expect(banner.getByRole("link", { name: "Privacy notice" })).toHaveAttribute("href", "/policies/privacy");

  await banner.getByRole("button", { name: "Essential only" }).click();
  await expect(banner).toHaveCount(0);
  expect(await context.cookies()).toEqual([]);

  // The answer is remembered on the next page, and /cookies shows it and lets the reader change it.
  await page.goto("/cookies");
  await expect(banner).toHaveCount(0);
  const main = page.getByRole("main");
  await expect(main.getByRole("button", { name: "Essential only" })).toHaveAttribute("aria-pressed", "true");
  await main.getByRole("button", { name: "YouTube video only" }).click();
  await expect(main.getByRole("status")).toHaveText("You allowed YouTube video only. Videos play when you press play, and Google measurement is off.");
  expect(await page.evaluate(() => window.localStorage.getItem("hope4pkd-consent"))).toBe("video");
  await main.getByRole("button", { name: "Allow all" }).click();
  await expect(main.getByRole("button", { name: "Allow all" })).toHaveAttribute("aria-pressed", "true");
  expect(await page.evaluate(() => window.localStorage.getItem("hope4pkd-consent"))).toBe("all");
  expect(await context.cookies()).toEqual([]);
});

test("the privacy notice says what the site collects today and how to use your rights", async ({ page }) => {
  await page.goto("/policies/privacy");
  const main = page.getByRole("main");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy notice");
  await expect(main.getByText("The website has no forms, no accounts and no online payment")).toBeVisible();
  await expect(main.getByText("Nigeria Data Protection Act 2023")).toBeVisible();
  await expect(main.getByText("Last updated 13 November 2026.")).toBeVisible();
});

test("routes that needed the backend are gone", async ({ page }) => {
  for (const route of ["/support/request", "/case-status", "/admin", "/donate/confirmation"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(404);
  }
});

const primaryLabels = ["About", "Understanding PKD", "Get Support", "Get Involved", "Transparency"];

test("the header is five flat links and one persistent button, with no Donate", async ({ page }) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  const hamburger = header.getByRole("button", { name: "Open navigation menu" });

  // Get support stays visible at every width. The site takes no payment, so there is no Donate button.
  // `exact` matters: the nav link "Get Support" also matches case-insensitively.
  await expect(header.getByRole("link", { name: "Get support", exact: true })).toBeVisible();
  await expect(header.getByRole("link", { name: "Donate" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Donate", exact: true })).toHaveCount(0);

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
  // Nothing in the footer is a placeholder: no coming-soon entry and no unpublished page.
  await expect(footer.getByText("Coming soon")).toHaveCount(0);
  for (const label of ["Request Support", "Shop", "Events", "Campaigns", "Knowledge Centre"]) {
    await expect(footer.getByText(label, { exact: true })).toHaveCount(0);
  }
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
    ["/get-involved", "Ways to help"],
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
    ["/contact", "Email or call us"],
    ["/donate", "Giving to Hope4PKD"],
  ] as const;

  for (const [route, heading] of destinations) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
  }
});

// ADR-12: a page either offers something that works or is unpublished. No page shows a "Coming soon"
// marker or a "not open yet" panel.
test("no page carries a coming-soon marker, and each enquiry page has a working email action", async ({ page }) => {
  const subjects = [
    ["/volunteer", "Volunteer"],
    ["/partner", "Partner"],
    ["/complaints", "Complaint"],
    ["/donate", "Donation"],
    ["/for/health-professionals", "Referral"],
  ] as const;
  for (const [route, subject] of subjects) {
    await page.goto(route);
    await expect(page.getByRole("main").getByRole("link", { name: "Email us" })).toHaveAttribute(
      "href",
      `mailto:info@hope4pkd.org?subject=${subject}`,
    );
  }

  for (const route of ["/", "/contact", "/find-care", "/community", "/get-involved", "/for/patients", "/for/caregivers", "/support/process"]) {
    await page.goto(route);
    await expect(page.getByText("Coming soon", { exact: true }), route).toHaveCount(0);
    await expect(page.getByText(/not open yet/i), route).toHaveCount(0);
  }

  await page.goto("/contact");
  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: "+234(0)9076412444" })).toHaveAttribute("href", "tel:+2349076412444");
  await expect(main.getByRole("link", { name: "+234(0)8106411664" })).toHaveAttribute("href", "tel:+2348106411664");
  await expect(main.getByText("Plot 1556 Cadastral Zone B08").first()).toBeVisible();
});

test("unpublished placeholder pages redirect to a page with content", async ({ page }) => {
  for (const [route, destination] of [["/shop", /\/get-involved$/], ["/events", /\/get-involved$/], ["/campaigns", /\/get-involved$/], ["/knowledge", /\/pkd$/]] as const) {
    await page.goto(route);
    await expect(page, route).toHaveURL(destination);
  }
});

// A crawler that runs no JavaScript must get the redirect from the HTTP response itself, not from a
// script in a 200 page (which is what redirect() in a page.tsx produces under the root loading.tsx).
test("unpublished placeholder pages answer with an HTTP redirect, without JavaScript", async ({ request }) => {
  for (const [route, destination] of [["/shop", "/get-involved"], ["/events", "/get-involved"], ["/campaigns", "/get-involved"], ["/knowledge", "/pkd"]] as const) {
    const response = await request.get(route, { maxRedirects: 0 });
    expect(response.status(), route).toBe(307);
    expect(response.headers()["location"], route).toBe(destination);
  }
});

// The roster is data (content/team.ts). Advisors stay an EmptyState until one is confirmed — the page
// must never fill that gap with a name nobody supplied.
test("registration details sit in the footer of every page and again on About and Contact", async ({ page }) => {
  for (const path of ["/", "/support", "/about", "/contact"]) {
    await page.goto(path);
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByText("Registration No: 9996845")).toBeVisible();
    await expect(footer.getByRole("link", { name: "info@hope4pkd.org" })).toHaveAttribute("href", "mailto:info@hope4pkd.org");
    await expect(footer.getByRole("link", { name: "Hope4PKD on Instagram" })).toHaveAttribute("href", "https://www.instagram.com/hope4pkd/");
    await expect(footer.getByRole("link", { name: "Hope4PKD on LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/company/hope4pkd");
  }
  for (const path of ["/about", "/contact"]) {
    await page.goto(path);
    const main = page.getByRole("main");
    await expect(main.getByRole("heading", { name: "Registration details" })).toBeVisible();
    await expect(main.getByText("Registered in Nigeria with the Corporate Affairs Commission as an Incorporated Trustee")).toBeVisible();
  }
});

test("/about names the leadership team and no advisor it cannot confirm", async ({ page }) => {
  await page.goto("/about");
  const team = page.getByRole("list", { name: "Leadership team" });
  await expect(team.getByRole("listitem")).toHaveCount(5);
  await expect(team.getByRole("heading", { level: 3, name: "Onyekachi Nwakaihe" })).toBeVisible();
  await expect(team.getByRole("img", { name: "Portrait of Maureen Alor" })).toBeVisible();
  await expect(page.getByText("Advisor profiles are not published yet")).toBeVisible();
  await expect(page.getByRole("list", { name: "Advisors" })).toHaveCount(0);
});

test("legacy and alias routes still land somewhere real", async ({ page }) => {
  await page.goto("/advocacy");
  await expect(page).toHaveURL(/\/awareness$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Most people meet PKD for the first time");
});
