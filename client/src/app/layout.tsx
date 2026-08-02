import { Provider } from "@/components/ui/provider";
import { siteUrl } from "@/lib/env";
import type { Metadata, Viewport } from "next";
import { Gabarito, Newsreader } from "next/font/google";
import "./globals.css";
import logo from "@public/assets/logo-new.png";
import favicon from "@public/assets/h4ppi_logo.ico";

const gabarito = Gabarito({ subsets: ["latin"], variable: "--font-gabarito", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" });

const appName = "Hope4PKD Patients Initiative";
const description = "A coordinated support pathway for people and families navigating polycystic kidney disease in Nigeria.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${appName} | No one should navigate PKD alone`, template: `%s | ${appName}` },
  description,
  applicationName: appName,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_NG", siteName: appName, title: appName, description, images: [{ url: logo.src, alt: appName }] },
  twitter: { card: "summary_large_image", title: appName, description, images: [logo.src] },
  icons: { icon: [{ url: favicon.src, type: "image/x-icon" }, { url: logo.src, type: "image/png" }], shortcut: favicon.src },
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
