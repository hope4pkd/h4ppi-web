import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ActionLink,
  ComingSoonPanel,
  ContentSection,
  DirectoryList,
  DirectoryRow,
  MediaFrame,
  PageHero,
  SectionHeading,
  StatementBand,
} from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";
import bottle from "@public/assets/images/bottle-merch.png";
import cap from "@public/assets/images/cap-merch.png";
import handband from "@public/assets/images/handband-merch.png";
import shirt from "@public/assets/images/shirt-merch.png";
import tote from "@public/assets/images/tote-merch.png";
import umbrella from "@public/assets/images/umbrella-merch.png";

// Product mock-ups on a display plinth, not photographs of manufactured stock — the alt text and the
// caption below both say so, because a rendered product shot reads as an in-stock listing otherwise.
const range = [
  { name: "T-shirt", image: shirt, alt: "Mock-up of a cream t-shirt carrying the Hope4PKD logo and wordmark." },
  { name: "Cap", image: cap, alt: "Mock-up of a cap carrying the Hope4PKD logo and wordmark." },
  { name: "Tote bag", image: tote, alt: "Mock-up of a tote bag carrying the Hope4PKD logo and wordmark." },
  { name: "Water bottle", image: bottle, alt: "Mock-up of a water bottle carrying the Hope4PKD logo and wordmark." },
  { name: "Wristband", image: handband, alt: "Mock-up of a blue silicone wristband carrying the Hope4PKD logo and wordmark." },
  { name: "Umbrella", image: umbrella, alt: "Mock-up of an umbrella carrying the Hope4PKD logo and wordmark." },
];

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The Hope4PKD merchandise range, why nothing can be ordered yet, and the policies that will govern where the money goes.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Shop"
        title="Merchandise that says the thing out loud."
        description="A wristband in a waiting room starts more conversations about PKD than a leaflet ever will. These are the designs. None of them can be ordered yet, and this page will not pretend otherwise."
      />

      <ContentSection>
        <SectionHeading eyebrow="The range" title="Six items carrying the Hope4PKD mark." />
        <SimpleGrid columns={{ base: 2, md: 3 }} gap={{ base: 5, md: 6 }}>
          {range.map((item) => (
            <VStack key={item.name} align="start" gap={3}>
              <MediaFrame src={item.image} alt={item.alt} ratio={1} />
              <Text textStyle="featureTitle" color="navy.900">
                {item.name}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
        <Text textStyle="bodySm" color="navy.400" maxW="measureWide">
          These are design mock-ups rather than photographs of stock. No price, size, colour or delivery option
          has been set for any of them, and nothing here is a listing.
        </Text>
      </ContentSection>

      <ContentSection tone="teal" size="compact">
        <ComingSoonPanel
          title="The store is not open"
          description="Selling anything needs the payment service Hope4PKD does not currently run, plus a confirmed supplier, a stated price, a delivery method and a returns route. Until all five exist there is nothing to buy, and a checkout button here would be a lie about the first of them."
        />
      </ContentSection>

      <ContentSection tone="white">
        <SectionHeading
          eyebrow="Where the money will go"
          title="We are not going to answer that yet."
          description="A charity that tells you what its merchandise funds before it has written the policy is telling you something it cannot be held to."
        />
        <VStack align="start" gap={5} color="navy.500" textStyle="lede" maxW="measure">
          <Text>
            Hope4PKD has approved policies covering donations, refunds and what happens to a campaign surplus.
            It has not yet approved one covering merchandise: what counts as cost, what counts as proceeds, and
            which programme the remainder is allocated to.
          </Text>
          <Text>
            That policy is being written. When it is approved it will be published alongside the others, and the
            answer will appear on this page in the same sentence as the store opening — not before it.
          </Text>
        </VStack>
        <DirectoryList>
          <DirectoryRow href="/donations" title="Donations policy">
            How Hope4PKD will handle donated money, what a donor is told, and what happens when a payment
            cannot be allocated as intended.
          </DirectoryRow>
          <DirectoryRow href="/campaign-surplus" title="Campaign surplus policy">
            What happens to money raised beyond a campaign’s validated costs, and who decides it.
          </DirectoryRow>
          <DirectoryRow href="/impact" title="Impact and transparency">
            How verified results are separated from targets, and what has to be true before a figure is
            published at all.
          </DirectoryRow>
        </DirectoryList>
      </ContentSection>

      <StatementBand eyebrow="In the meantime" statement="Awareness costs nothing and works now.">
        <Text textStyle="lede" color="navy.100" maxW="measure">
          The point of a wristband is the conversation it starts. You can have that conversation today without
          waiting for a store to open.
        </Text>
        <HStack gap={3} flexWrap="wrap" justify="center" pt={2}>
          <ActionLink href="/awareness" surface="dark">
            Raise awareness
          </ActionLink>
          <ActionLink href="/donate" variant="outline" surface="dark">
            Donate
          </ActionLink>
        </HStack>
      </StatementBand>
    </Layout>
  );
}
