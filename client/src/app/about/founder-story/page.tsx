import { ActionLink, ContentSection, MediaFrame, PageHero, PullQuote, StatementBand } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import { founderStory } from "@/content/founder";
import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import founderHospitalImage from "@public/assets/images/hospital.jpg";

export const metadata: Metadata = {
  title: "Founder’s story",
  description: founderStory.heroDescription,
  alternates: { canonical: "/about/founder-story" },
};

function StoryParagraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
      {paragraphs.map((paragraph) => (
        <Text key={paragraph}>{paragraph}</Text>
      ))}
    </VStack>
  );
}

export default function FounderStoryPage() {
  return (
    <Layout>
      <PageHero eyebrow="Founder’s story" title={founderStory.title} description={founderStory.heroDescription} />

      <ContentSection>
        <Grid templateColumns={{ base: "1fr", lg: "0.72fr 1.28fr" }} gap={{ base: 8, lg: 16 }} alignItems="start">
          <Box as="figure" w="full" maxW={{ base: "420px", lg: "360px" }}>
            <MediaFrame
              src={founderHospitalImage}
              alt="Onyekachi Nwakaihe in a surgical gown, cap and mask during a hospital visit as a caregiver"
              ratio={4 / 5}
              objectPosition="50% 82%"
            />
            <Text as="figcaption" textStyle="bodySm" color="navy.400" pt={3}>
              Onyekachi Nwakaihe during a hospital visit as a caregiver.
            </Text>
          </Box>
          <StoryParagraphs paragraphs={founderStory.mother} />
        </Grid>
      </ContentSection>

      <ContentSection tone="white">
        <StoryParagraphs paragraphs={founderStory.brother.beforeQuote} />
        <PullQuote>“{founderStory.quotes.john}”</PullQuote>
        <StoryParagraphs paragraphs={founderStory.brother.afterQuote} />
      </ContentSection>

      <ContentSection tone="teal">
        <StoryParagraphs paragraphs={founderStory.aftermath} />
      </ContentSection>

      <ContentSection size="spacious">
        <StoryParagraphs paragraphs={founderStory.organisation} />
      </ContentSection>

      <StatementBand statement={founderStory.quotes.promise}>
        <VStack gap={5} color="navy.100" textStyle="lede" maxW="measure">
          {founderStory.close.map((paragraph) => (
            <Text key={paragraph}>{paragraph}</Text>
          ))}
        </VStack>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/support" surface="dark">
            Explore support
          </ActionLink>
          <ActionLink href="/about" variant="outline" surface="dark">
            Back to About
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
