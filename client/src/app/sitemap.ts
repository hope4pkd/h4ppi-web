import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

const routes = ["", "/about", "/about/founder-story", "/about/leadership", "/pkd", "/pkd/symptoms-and-diagnosis", "/pkd/treatment-and-care", "/support", "/support/process", "/knowledge", "/campaigns", "/impact", "/partner", "/donate", "/events", "/volunteer", "/help", "/contact", "/complaints"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return routes.map((route) => ({ url: `${base}${route}`, changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/support" ? 0.9 : 0.7 }));
}
