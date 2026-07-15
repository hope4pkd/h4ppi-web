import { Layout } from "@/components/layout/Layout"
import { HeroSection, PkdDayRibbon, WhatWeDoSection, AboutSection, HowItWorksSection, PartnerSection } from "@/components/home"

// ProblemSection and CoreFocusSection are intentionally unmounted (superseded
// by WhatWeDoSection in the Warm Sky Editorial redesign) but kept on disk.
export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <PkdDayRibbon />
      <WhatWeDoSection />
      <AboutSection />
      <HowItWorksSection />
      <PartnerSection />
    </Layout>
  )
}
