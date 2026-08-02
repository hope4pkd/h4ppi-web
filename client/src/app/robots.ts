import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/", "/onboarding/", "/case/", "/case-status", "/support/confirmation", "/donate/confirmation"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
