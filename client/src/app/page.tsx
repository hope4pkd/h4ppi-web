import { Layout } from "@/components/layout/Layout"
import { HeroSection, TestimonialsSection, PartnerSection, StatsSection, HowItWorksSection, CoreFocusSection, AboutSection } from "@/components/home"

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <CoreFocusSection />
      <AboutSection />
      {/* <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PartnerSection /> */}
    </Layout>
  )
}   