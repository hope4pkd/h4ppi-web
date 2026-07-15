import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { HelpHero, FaqSection, HelpCTA } from "@/components/help";

export const metadata: Metadata = {
  title: "Help Center & FAQ | Hope4PKD Initiative",
  description:
    "Answers to common questions about Polycystic Kidney Disease (PKD), how Hope4PKD supports patients in Nigeria, and how you can support a patient.",
};

export default function HelpPage() {
  return (
    <Layout>
      <HelpHero />
      <FaqSection />
      <HelpCTA />
    </Layout>
  );
}
