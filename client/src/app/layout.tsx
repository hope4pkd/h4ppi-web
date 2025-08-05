import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import "./globals.css";

const appName = "Hope4PKD Patients Initiative";
const appMetaTitle = `${appName} - Restoring Hope, one Kidney at a time.`;
const appMetaDescription = "Nigeria's first platform that connects Polycystic Kidney Disease (PKD) patients with verified kidney donors and crowdfunded financial aid. #Hope4PKD #Hope4PKDPatients #Hope4PKDPatientsInitiative #Health #Healthcare #HealthTech #PKD";
const imageAlt = "Hope4PKD Patients Initiative Logo";

export const metadata: Metadata = {
  title: appMetaTitle,
  description: appMetaDescription,
  openGraph: {
    title: appMetaTitle,
    description: appMetaDescription,
    images: [
      {
        url: "/hope4pkd-logo.png",
        alt: imageAlt,
      },
    ],
    url: "https://hope4pkd.com",
    siteName: appName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appMetaTitle,
    description: appMetaDescription,
    images: [
      {
        url: "/images/logo.png",
        alt: imageAlt,
      },
    ],
  },
  icons: {
    icon: [
      { url: '/hope4pkd_logo.ico', type: 'image/x-icon' },     
      {
        url: "/hope4pkd_logo.png",
        type: "image/png",
        sizes: "any",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" >
      <body
        className={`antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
