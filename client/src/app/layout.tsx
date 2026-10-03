import { Provider } from "@/components/ui/provider";
import { siteUrl } from "@/lib/env";
import type { Metadata, Viewport } from "next";
import { Gabarito, Newsreader } from "next/font/google";
import "./globals.css";
import shareImage from "@public/assets/images/og-support-hands.jpg";
import { organisation } from "@/content/organisation";

const gabarito = Gabarito({ subsets: ["latin"], variable: "--font-gabarito", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" });

const appName = organisation.brandName;
const description = "PKD information and coordinated support planning for people and families in Nigeria.";
const shareImageAlt = "A patient's hands held in a caregiver's hands";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${appName} | No one should navigate PKD alone`, template: `%s | ${appName}` },
  description,
  applicationName: appName,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_NG", siteName: appName, title: appName, description, images: [{ url: shareImage.src, width: shareImage.width, height: shareImage.height, alt: shareImageAlt }] },
  twitter: { card: "summary_large_image", title: appName, description, images: [{ url: shareImage.src, alt: shareImageAlt }] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B1F33", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${gabarito.variable} ${newsreader.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
