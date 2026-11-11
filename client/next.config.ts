import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "react-icons"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Thumbnails for embedded YouTube videos (VideoEmbed). Proxied through /_next/image, so the
    // reader's browser does not contact YouTube before they press play.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  // Unpublished 2026-11-11 (ADR-12): placeholder pages with nothing to act on. Redirected here, not with
  // redirect() in a page.tsx: the root loading.tsx makes a page-level redirect stream a 200 with an empty
  // shell that only forwards in the browser, so a crawler that runs no JavaScript sees a blank page.
  // These answer with a 307 and a Location header before any HTML. Temporary, because a page may return.
  async redirects() {
    return [
      { source: "/shop", destination: "/get-involved", permanent: false },
      { source: "/events", destination: "/get-involved", permanent: false },
      { source: "/campaigns", destination: "/get-involved", permanent: false },
      { source: "/knowledge", destination: "/pkd", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
