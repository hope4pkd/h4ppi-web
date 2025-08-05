import { Layout } from "@/components/layout/Layout"
import { DonorHeroSection } from "@/components/donors/DonorHeroSection"
import { DonorRegistrationForm } from "@/components/donors/DonorRegistrationForm"
import { DonorRequirements } from "@/components/donors/DonorRequirements"
import { DonorProcess } from "@/components/donors/DonorProcess"

export default function DonorsPage() {
  return (
    <Layout>
      <DonorHeroSection />
      <DonorRequirements />
      <DonorRegistrationForm />
      <DonorProcess />
    </Layout>
  )
}