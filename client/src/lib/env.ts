import "server-only";

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://hope4pkd.org";
}
