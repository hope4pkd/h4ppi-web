import { HomePage } from "@/components/home/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PKD support in Nigeria",
  description: "Understand PKD, learn how support will work, explore verified campaigns and follow Hope4PKD’s patient-support work in Nigeria.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
