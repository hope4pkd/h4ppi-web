import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

const routes = [
  "",
  // Audience hubs — the entry points the header's audience bar routes to.
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

// Audience hubs sit just below the homepage: they are the routes the nav is built to send people to.
const audienceHubs = new Set(["/for/patients", "/for/caregivers", "/for/health-professionals", "/for/everyone"]);

function priority(route: string) {
  if (route === "") return 1;
  if (route === "/support" || audienceHubs.has(route)) return 0.9;
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
