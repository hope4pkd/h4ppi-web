import { Box, Link as ChakraLink, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Eyebrow } from "@/components/common/PublicPage";

/**
 * The footnote that has to sit under any page carrying clinical information: who published the facts,
 * where to read them in full, and the explicit statement that Hope4PKD has not medically reviewed them.
 *
 * Deliberately a hairline footnote rather than a panel — it is provenance, not a call to action, and a
 * card-weight surface at the end of every article would compete with the section above it.
 *
 * Inline links are Chakra's `Link` (external) and a plain `next/link` wrapping a span (internal), never
 * `asChild`: authored in a server component, `asChild` receives the Link as a React.lazy client reference
 * and Children.only throws during prerender (DECISIONS.log 2026-08-14). The `chakra.a` factory is also
 * out — under `optimizePackageImports` it resolves to undefined and the page fails to prerender.
 */

const inlineLink = {
  color: "action.700",
  fontWeight: "700",
  textDecoration: "underline",
  textDecorationColor: "action.200",
  textUnderlineOffset: "4px",
  _hover: { textDecorationColor: "currentColor" },
} as const;

export function SourceNote({
  publisher,
  title,
  href,
}: {
  publisher: string;
  title: string;
  href: string;
}) {
  return (
    <HStack as="section" align="start" gap={4} layerStyle="hairline" pt={6} maxW="measureWide">
      <Box color="action.700" flexShrink={0} pt={1}>
        <BookOpen aria-hidden="true" size={18} />
      </Box>
      <VStack align="start" gap={2}>
        <Eyebrow>Where this comes from</Eyebrow>
        <Text textStyle="bodySm" color="navy.500">
          Adapted from{" "}
          <ChakraLink href={href} target="_blank" rel="noopener noreferrer" {...inlineLink}>
            {publisher}, “{title}”
          </ChakraLink>
          . Hope4PKD has not medically reviewed this page, so it carries no reviewed label. It is general
          information, not advice about your own care — speak with a qualified healthcare professional, and
          read our{" "}
          <Link href="/medical-disclaimer">
            <Text as="span" {...inlineLink}>
              medical disclaimer
            </Text>
          </Link>
          .
        </Text>
      </VStack>
    </HStack>
  );
}
