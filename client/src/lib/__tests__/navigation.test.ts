import { describe, expect, it } from "vitest";
import {
  donateLink,
  footerGroups,
  homeLink,
  isActiveGroup,
  isActiveHref,
  isNavLink,
  legalNavLinks,
  navGroups,
  standaloneNavLinks,
  type NavGroup,
  type NavItem,
} from "@/lib/navigation";

// Widen away the `as const` tuple literals so flatMap infers a plain NavItem[].
const allGroups: readonly NavGroup[] = [...navGroups, ...footerGroups];

const everyItem: readonly NavItem[] = [
  ...allGroups.flatMap((group) => [...group.items]),
  ...standaloneNavLinks,
  ...legalNavLinks,
  homeLink,
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
    expect(navGroups.map((group) => group.label)).toEqual(["About", "Get Support", "Learn", "Get Involved"]);
    expect(standaloneNavLinks.map((link) => link.label)).toEqual(["Contact"]);
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
});
