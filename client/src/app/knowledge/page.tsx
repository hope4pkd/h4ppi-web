import { ContentSection, EmptyState, FeatureCard, FeatureGrid, FeatureItem, PageHero, SectionHeading } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "PKD Knowledge Centre", description: "A medically reviewed, dated, referenced and accessible PKD information centre in development.", alternates: { canonical: "/knowledge" } };

export default function KnowledgePage() {
  return (
    <Layout>
      <PageHero eyebrow="PKD Knowledge Centre" title="Clear information, with medical review you can verify." description="Articles will show authorship, reviewer qualifications, references, publication and review dates, a disclaimer and the next review date." />

      {/* The review programme is not built yet, so the page opens with what does exist rather than
          with three collections that cannot be read. */}
      <ContentSection tone="teal" size="compact">
        <SectionHeading eyebrow="Readable today" title="Start with the Learn About PKD pages." description="Plain-language explanations adapted from a named external source, each stating that Hope4PKD has not medically reviewed it." />
        <FeatureGrid columns={3}>
          <FeatureCard title="What is PKD?" description="What the cysts do to the kidneys, why it runs in families, and the two inherited forms." href="/pkd" linkLabel="Read the overview" />
          <FeatureCard title="Symptoms and diagnosis" description="What people notice, when to ask a professional about it, and the scans that confirm an answer." href="/pkd/symptoms-and-diagnosis" linkLabel="Read symptoms and diagnosis" />
          <FeatureCard title="Treatment and care" description="What care can do about cyst growth, blood pressure and kidney failure, and the complications it watches for." href="/pkd/treatment-and-care" linkLabel="Read treatment and care" />
        </FeatureGrid>
      </ContentSection>

      <ContentSection>
        <SectionHeading eyebrow="Planned collections" title="Information for each point in the journey." />
        <FeatureGrid columns={3}>
          <FeatureItem title="Understanding PKD">Foundational information about inherited cystic kidney disease and questions to discuss with a clinician.</FeatureItem>
          <FeatureItem title="Diagnosis &amp; monitoring">Responsible explanations of tests, appointments and monitoring without replacing clinical advice.</FeatureItem>
          <FeatureItem title="Living with PKD">Practical, reviewed guidance for patients, caregivers and families.</FeatureItem>
          <FeatureItem title="Treatment pathways">Plain-language orientation to care pathways, dialysis and transplantation.</FeatureItem>
          <FeatureItem title="Caregiving">Support for the people coordinating care, appointments and family communication.</FeatureItem>
          <FeatureItem title="Rights &amp; support">Information about consent, privacy, support processes and responsible fundraising.</FeatureItem>
        </FeatureGrid>
        <EmptyState title="Medical review is being established" description="No article is labelled medically reviewed until a qualified reviewer account, independence rule, references and next-review date are complete. For personal medical advice, speak with a qualified healthcare professional." actionLabel="Read the medical disclaimer" actionHref="/medical-disclaimer" />
      </ContentSection>
    </Layout>
  );
}
