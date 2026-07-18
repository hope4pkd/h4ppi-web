import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import logo from "@public/assets/logo-new.png";
import favicon from "@public/assets/h4ppi_logo.ico";

const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
  display: "swap",
});

const appName = "Hope4PKD Patients Initiative";
const appMetaTitle = `${appName} - A Patient Support Ecosystem for PKD in Nigeria`;
const appMetaDescription =
  "Hope4PKD Patients Initiative is a trusted patient support ecosystem for individuals living with Polycystic Kidney Disease (PKD) in Nigeria — providing patient navigation, medical verification, financial access, community, awareness, and advocacy. No one should navigate PKD alone. #Hope4PKD #Hope4PKDPatients #Hope4PKDPatientsInitiative #Health #Healthcare #PKD";

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
      <body className={`${gabarito.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
