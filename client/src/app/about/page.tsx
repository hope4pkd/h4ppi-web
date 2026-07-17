import type { Metadata } from "next";
import { Layout } from "@/components/layout/Layout";
import {
  AboutHero,
  OurStorySection,
  VisionMissionSection,
  CoreValuesSection,
  DifferenceSection,
  TeamSection,
  AboutCTA,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About Us | Hope4PKD Initiative",
  description:
    "Learn about the Hope4PKD Initiative — our story, vision, mission, values, and the team behind Nigeria's patient support ecosystem for Polycystic Kidney Disease.",
};

export default function AboutPage() {
  return (
    <Layout>
      <AboutHero />
      <OurStorySection />
      <VisionMissionSection />
      <CoreValuesSection />
      <DifferenceSection />
      <TeamSection />
      <AboutCTA />
    </Layout>
  );
}
