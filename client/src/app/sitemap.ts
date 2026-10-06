import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

const routes = [
  "",
  // Audience hubs — the entry points Home's "Where would you like to start?" routes to.
  "/for/patients",
  "/for/caregivers",
  "/for/health-professionals",
  "/for/everyone",
  "/about",
  "/about/founder-story",
  "/about/leadership",
  "/pkd",
  "/pkd/symptoms-and-diagnosis",
  "/pkd/treatment-and-care",
  "/pkd/early-detection",
  "/support",
  "/support/process",
  "/find-care",
  "/community",
  "/knowledge",
  "/get-involved",
  "/campaigns",
  "/donate",
  "/shop",
  "/impact",
  "/partner",
  "/volunteer",
  "/awareness",
  "/events",
  "/help",
  "/contact",
  "/complaints",
];

// The five primary-nav hubs and the audience hubs sit just below the homepage: they are the routes the
// site is built to send people to.
const hubs = new Set([
  "/about",
  "/pkd",
  "/support",
  "/get-involved",
  "/impact",
  "/for/patients",
  "/for/caregivers",
  "/for/health-professionals",
  "/for/everyone",
]);

function priority(route: string) {
  if (route === "") return 1;
  if (hubs.has(route)) return 0.9;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: priority(route),
  }));
}
