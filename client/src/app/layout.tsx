import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import "./globals.css";
import logo from "@public/assets/logo.png";
import favicon from "@public/assets/h4ppi_logo.ico";

const appName = "Hope4PKD Initiative";
const appMetaTitle = `${appName} - A Patient Support Ecosystem for PKD in Nigeria`;
const appMetaDescription =
  "Hope4PKD is a trusted patient support ecosystem for individuals living with Polycystic Kidney Disease (PKD) in Nigeria — providing patient navigation, medical verification, financial access, community, awareness, and advocacy. No one should navigate PKD alone. #Hope4PKD #Hope4PKDPatients #Hope4PKDPatientsInitiative #Health #Healthcare #PKD";
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
    shortcut: favicon.src,
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
