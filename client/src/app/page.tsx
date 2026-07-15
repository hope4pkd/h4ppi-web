import { Layout } from "@/components/layout/Layout"
import { HeroSection, AboutSection, ProblemSection, CoreFocusSection, HowItWorksSection, PartnerSection } from "@/components/home"

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ProblemSection />
      <CoreFocusSection />
      <HowItWorksSection />
      <PartnerSection />
    </Layout>
  )
}
