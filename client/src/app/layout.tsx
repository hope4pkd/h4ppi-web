import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hope4PKD Patients Initiative",
  description: "Restoring Hope, one Kidney at a time.",
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
