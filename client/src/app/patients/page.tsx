import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import { PatientHeroSection } from "@/components/patients/PatientHeroSection";
import { PatientJourney } from "@/components/patients/PatientJourney";
import { PatientIntakeForm } from "@/components/patients/PatientIntakeForm";
import { PatientSupport } from "@/components/patients/PatientSupport";

export const metadata: Metadata = {
  title: "For Patients | Hope4PKD",
  description:
    "Structured guidance, financial access, and community for individuals living with Polycystic Kidney Disease (PKD) in Nigeria. You don't have to face PKD alone.",
};

export default function PatientsPage() {
  return (
    <Layout>
      <PatientHeroSection />
      <PatientJourney />
      <PatientIntakeForm />
      <PatientSupport />
    </Layout>
  );
}
