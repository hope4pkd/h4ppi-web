import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import {
  ContactHero,
  ContactInfoSection,
  ContactFormSection,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us | Hope4PKD Initiative",
  description:
    "Reach out to the Hope4PKD Initiative — for patient support, partnership enquiries, or any questions about our work supporting PKD patients in Nigeria.",
};

export default function ContactPage() {
  return (
    <Layout>
      <ContactHero />
      <ContactInfoSection />
      <ContactFormSection />
    </Layout>
  );
}
