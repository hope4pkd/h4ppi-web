import { ContentSection, FeatureGrid, FeatureItem, PageHero, RegistrationDetails, SectionHeading, TextLink } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { contact, mailto, registration } from "@/content/organisation";
import { Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email or phone Hope4PKD, and find its registered address and registration details.",
  alternates: { canonical: "/contact" },
};

const linkStyle = { color: "action.700", textDecoration: "underline", textUnderlineOffset: "3px", overflowWrap: "anywhere" } as const;

export default function ContactPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Contact"
        title="Email or call us."
        description="Use these for general questions, volunteering, partnerships and complaints. If you need help with PKD, the Get support page says what to send. For an urgent medical need, go to a qualified healthcare provider."
      />
      <ContentSection>
        <FeatureGrid columns={3}>
          <FeatureItem title="Email">
            <Text asChild {...linkStyle}>
              <a href={mailto("Enquiry")}>{registration.email}</a>
            </Text>
          </FeatureItem>
          <FeatureItem title="Phone">
            <VStack align="start" gap={1}>
              {contact.phones.map((phone) => (
                <Text key={phone.href} asChild {...linkStyle}>
                  <a href={phone.href}>{phone.display}</a>
                </Text>
              ))}
            </VStack>
          </FeatureItem>
          <FeatureItem title="Registered address">{registration.address}</FeatureItem>
        </FeatureGrid>
        <Text textStyle="body" color="navy.500" maxW="measure">
          Please do not send medical records, identity documents or bank details by email.
        </Text>
        <TextLink href="/support#request">Ask for patient support</TextLink>
      </ContentSection>
      <ContentSection tone="white" id="registration" size="compact">
        <SectionHeading title="Registration details" />
        <RegistrationDetails />
      </ContentSection>
    </Layout>
  );
}
