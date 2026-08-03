import { HomePage } from "@/components/home/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PKD support in Nigeria",
  description: "Understand PKD, request coordinated support, explore verified campaigns, and see how Hope4PKD is building accountable patient support in Nigeria.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
