import { describe, expect, it } from "vitest";
import {
  audienceLinks,
  contactLink,
  donateLink,
  footerGroups,
  homeLink,
  isActiveHref,
  isNavLink,
  legalNavLinks,
  primaryLinks,
  supportLink,
  type NavItem,
} from "@/lib/navigation";

const everyItem: readonly NavItem[] = [
  ...footerGroups.flatMap((group) => [...group.items]),
  ...primaryLinks,
  ...audienceLinks,
  ...legalNavLinks,
  homeLink,
  contactLink,
  supportLink,
  donateLink,
];

// Routes deleted when the client became front-end only. Nothing may link to them.
const deletedRoutes = [
  "/support/request",
  "/support/confirmation",
  "/case-status",
  "/case",
  "/donate/confirmation",
  "/onboarding",
  "/admin",
  "/api",
];

describe("navigation items", () => {
  it("gives every item exactly one of href or comingSoon", () => {
    for (const item of everyItem) {
      const hasHref = "href" in item;
      const hasComingSoon = "comingSoon" in item;
      expect(hasHref !== hasComingSoon, `${item.label} must be a link or coming-soon, not both or neither`).toBe(true);
      expect(isNavLink(item)).toBe(hasHref);
    }
  });

  it("points every href at a root-relative path", () => {
    for (const item of everyItem.filter(isNavLink)) {
      expect(item.href.startsWith("/"), `${item.label} -> ${item.href}`).toBe(true);
    }
  });

  it("never links to a route deleted with the backend", () => {
    for (const item of everyItem.filter(isNavLink)) {
      for (const route of deletedRoutes) {
        expect(item.href === route || item.href.startsWith(`${route}/`), `${item.label} -> ${item.href}`).toBe(false);
      }
    }
  });
});

describe("primary navigation", () => {
  // The header renders these flat, so the shape here is the shape the e2e specs assert.
  it("keeps the five flat links in the reader's order", () => {
    expect(primaryLinks.map((link) => [link.label, link.href])).toEqual([
      ["About", "/about"],
      ["Understanding PKD", "/pkd"],
      ["Get Support", "/support"],
      ["Get Involved", "/get-involved"],
      ["Transparency", "/impact"],
    ]);
  });

  it("carries only live links — a primary item can never be coming-soon", () => {
    for (const link of primaryLinks) expect(isNavLink(link), link.label).toBe(true);
  });

  it("keeps the two persistent header buttons pointing at support and donate", () => {
    expect(supportLink).toEqual({ label: "Get support", href: "/support" });
    expect(donateLink).toEqual({ label: "Donate", href: "/donate" });
  });
});

describe("footer groups", () => {
  it("mirrors every primary destination in a footer column", () => {
    const footerHrefs = footerGroups.flatMap((group) => group.items.filter(isNavLink).map((item) => item.href));
    for (const link of primaryLinks) expect(footerHrefs, link.label).toContain(link.href);
  });

  it("keeps the backend-dependent support actions as coming-soon, and only in the Get Support column", () => {
    for (const group of footerGroups) {
      const comingSoon = group.items.filter((item) => !isNavLink(item)).map((item) => item.label);
      if (group.label === "Get Support") expect(comingSoon).toEqual(["Request Support", "Check Case Status"]);
      else expect(comingSoon, group.label).toEqual([]);
    }
  });

  it("gives every group a label and at least one item", () => {
    for (const group of footerGroups) {
      expect(group.label.length).toBeGreaterThan(0);
      expect(group.items.length, group.label).toBeGreaterThan(0);
    }
  });
});

describe("audience routing", () => {
  it("routes every audience under /for/ so check-content's legacy-route rule cannot fire", () => {
    for (const link of audienceLinks) {
      expect(link.href.startsWith("/for/"), link.label).toBe(true);
    }
  });

  it("surfaces the audiences and contact in the footer, since the header no longer carries them", () => {
    const startHere = footerGroups[0];
    expect(startHere.label).toBe("Start here");
    expect(startHere.items.filter(isNavLink).map((item) => item.href)).toEqual([
      ...audienceLinks.map((link) => link.href),
      contactLink.href,
    ]);
  });
});

describe("active-state helpers", () => {
  it("matches a path and its descendants but not sibling prefixes", () => {
    expect(isActiveHref("/about", "/about")).toBe(true);
    expect(isActiveHref("/about/founder-story", "/about")).toBe(true);
    expect(isActiveHref("/aboutus", "/about")).toBe(false);
    expect(isActiveHref("/about", "/")).toBe(false);
  });

  it("lights the Understanding PKD link from any of its sub-pages", () => {
    expect(isActiveHref("/pkd/treatment-and-care", "/pkd")).toBe(true);
    expect(isActiveHref("/pkd/early-detection", "/pkd")).toBe(true);
    expect(isActiveHref("/support", "/pkd")).toBe(false);
  });
});
