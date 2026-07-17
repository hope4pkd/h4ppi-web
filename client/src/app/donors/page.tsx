import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { DonorHeroSection } from "@/components/donors/DonorHeroSection";
import { DonorTrustSection } from "@/components/donors/DonorTrustSection";
import { DonorProcess } from "@/components/donors/DonorProcess";
import { DonorInterestForm } from "@/components/donors/DonorInterestForm";

export const metadata: Metadata = {
  title: "Support a Patient | Hope4PKD",
  description:
    "Give hope to verified PKD patients in Nigeria. Every case is medically verified before support is mobilised — transparent, coordinated, and accountable giving.",
};

export default function DonorsPage() {
  return (
    <Layout>
      <DonorHeroSection />
      <DonorTrustSection />
      <DonorProcess />
      <DonorInterestForm />
    </Layout>
  );
}
