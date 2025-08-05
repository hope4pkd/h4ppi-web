import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import "./globals.css";
import logo from "@public/assets/logo.png";
import favicon from "@public/assets/h4ppi_logo.ico";

const appName = "Hope4PKD Patients Initiative";
const appMetaTitle = `${appName} - Restoring Hope, one Kidney at a time.`;
const appMetaDescription =
  "Nigeria's first platform that connects Polycystic Kidney Disease (PKD) patients with verified kidney donors and crowdfunded financial aid. #Hope4PKD #Hope4PKDPatients #Hope4PKDPatientsInitiative #Health #Healthcare #HealthTech #PKD";
const imageAlt = "Hope4PKD Patients Initiative Logo";

export const metadata: Metadata = {
  title: appMetaTitle,
  description: appMetaDescription,
  icons: {
    icon: [
      { url: favicon.src, type: "image/x-icon" },
      {
        url: logo.src,
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
    <html suppressHydrationWarning lang="en">
      <body className={`antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
