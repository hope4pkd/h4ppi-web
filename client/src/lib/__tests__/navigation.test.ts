import { describe, expect, it } from "vitest";
import {
  audienceLinks,
  contactLink,
  donateLink,
  footerGroups,
  homeLink,
  isActiveGroup,
  isActiveHref,
  isNavLink,
  legalNavLinks,
  navGroups,
  type NavGroup,
  type NavItem,
} from "@/lib/navigation";

const allGroups: readonly NavGroup[] = [...navGroups, ...footerGroups];

const everyItem: readonly NavItem[] = [
  ...allGroups.flatMap((group) => [...group.items]),
  ...audienceLinks,
  ...legalNavLinks,
  homeLink,
  contactLink,
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

  it("keeps the backend-dependent support actions as coming-soon", () => {
    const supportGroup = navGroups.find((group) => group.label === "Get Support");
    const comingSoon = supportGroup?.items.filter((item) => !isNavLink(item)).map((item) => item.label);
    expect(comingSoon).toEqual(["Request Support", "Check Case Status"]);
  });

  it("keeps the top-level nav shape the header and e2e specs rely on", () => {
    expect(navGroups.map((group) => group.label)).toEqual([
      "About",
      "Learn About PKD",
      "Get Support",
      "Get Involved",
      "Campaigns",
    ]);
  });
});

describe("mega-panel groups", () => {
  // items is derived from columns; if the two ever diverge the footer and sitemap silently lose links.
  it("flattens every column item into the group's items list", () => {
    for (const group of navGroups) {
      if (!group.columns) continue;
      const fromColumns = group.columns.flatMap((column) => column.items);
      expect(group.items, group.label).toEqual(fromColumns);
    }
  });

  it("gives every column a label and at least one item", () => {
    for (const group of navGroups) {
      for (const column of group.columns ?? []) {
        expect(column.label.length, `${group.label} has an unlabelled column`).toBeGreaterThan(0);
        expect(column.items.length, `${group.label} / ${column.label} is empty`).toBeGreaterThan(0);
      }
    }
  });

  // The panel lays columns and the featured card out in one row, so a fourth column plus a card wraps.
  it("never pairs a featured card with more than two columns", () => {
    for (const group of navGroups) {
      if (!group.featured) continue;
      expect(group.columns?.length ?? 0, group.label).toBeLessThanOrEqual(2);
    }
  });
});

describe("audience routing", () => {
  it("routes every audience under /for/ so check-content's legacy-route rule cannot fire", () => {
    for (const link of audienceLinks) {
      expect(link.href.startsWith("/for/"), link.label).toBe(true);
    }
  });

  it("surfaces the audiences and contact in the footer, since the bar is hidden on phones", () => {
    const startHere = footerGroups[0];
    expect(startHere.label).toBe("Start here");
    expect(startHere.items.filter(isNavLink).map((item) => item.href)).toEqual([
      ...audienceLinks.map((link) => link.href),
      contactLink.href,
    ]);
  });

  it("mirrors every header group in the footer", () => {
    const footerLabels = footerGroups.map((group) => group.label);
    for (const group of navGroups) expect(footerLabels).toContain(group.label);
  });
});

describe("active-state helpers", () => {
  it("matches a path and its descendants but not sibling prefixes", () => {
    expect(isActiveHref("/about", "/about")).toBe(true);
    expect(isActiveHref("/about/founder-story", "/about")).toBe(true);
    expect(isActiveHref("/aboutus", "/about")).toBe(false);
    expect(isActiveHref("/about", "/")).toBe(false);
  });

  it("ignores coming-soon items when resolving the active group", () => {
    const supportGroup = navGroups.find((group) => group.label === "Get Support")!;
    expect(isActiveGroup("/support", supportGroup)).toBe(true);
    expect(isActiveGroup("/help", supportGroup)).toBe(true);
    expect(isActiveGroup("/impact", supportGroup)).toBe(false);
  });

  it("resolves a columned group from any of its columns", () => {
    const learnGroup = navGroups.find((group) => group.label === "Learn About PKD")!;
    expect(isActiveGroup("/pkd/treatment-and-care", learnGroup)).toBe(true);
    expect(isActiveGroup("/pkd/early-detection", learnGroup)).toBe(true);
    expect(isActiveGroup("/knowledge", learnGroup)).toBe(true);
    expect(isActiveGroup("/support", learnGroup)).toBe(false);
  });
});
