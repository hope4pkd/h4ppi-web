"use client";

import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { setConsent, useConsent } from "@/lib/consent";

const noticeLinks = [
  { label: "Cookies notice", href: "/cookies" },
  { label: "Privacy notice", href: "/policies/privacy" },
] as const;

/**
 * Asks the site's consent question: may the optional Google services (YouTube video and Google
 * measurement) run. It shows until the visitor answers and never again after that; /cookies carries the
 * same answers, plus "YouTube video only", for changing it.
 *
 * It is a bar, not a dialog. Nothing on the site is withheld while it is open, so it does not trap
 * focus or dim the page. It is mounted ahead of the page in the root layout so a keyboard reaches it
 * straight after the skip link.
 */
export function CookieBanner() {
  const consent = useConsent();
  if (consent !== "undecided") return null;

  return (
    <Box
      as="section"
      aria-labelledby="cookie-banner-title"
      position="fixed"
      insetX={0}
      bottom={0}
      // Above the sticky header (50) so it is never tucked under page chrome.
      zIndex={60}
      bg="white"
      borderTopWidth="1px"
      borderColor="navy.200"
      boxShadow="float"
      py={{ base: 4, md: 5 }}
    >
      <Container maxW="7xl">
        <Stack direction={{ base: "column", lg: "row" }} gap={{ base: 4, lg: 10 }} align={{ base: "stretch", lg: "center" }} justify="space-between">
          <Box maxW="measureWide">
            <Text id="cookie-banner-title" as="h2" fontFamily="body" textStyle="body" fontWeight="700" color="navy.900">
              Your cookie choice
            </Text>
            <Text textStyle="bodySm" color="navy.500" mt={1}>
              Our videos play from YouTube, and Google measurement counts visits and which of our ads brought people here. Both may
              store cookies on your device and stay off unless you allow them. You can choose each one in the cookies notice.{" "}
              {noticeLinks.map((link, index) => (
                <Text as="span" key={link.href}>
                  {index > 0 && " · "}
                  <Link href={link.href}>
                    <Text as="span" color="action.700" fontWeight="700" textDecoration="underline" textUnderlineOffset="3px">
                      {link.label}
                    </Text>
                  </Link>
                </Text>
              ))}
            </Text>
          </Box>
          {/* Equal weight on purpose: refusing must be as easy as accepting. */}
          {/* Side by side at every width so the bar stays short on a phone; a label may wrap on the narrowest. */}
          <Stack direction="row" gap={3} flexShrink={0}>
            <Button size="sm" h="auto" minH="44px" py={2} px={{ base: 3, sm: 4 }} flex={{ base: 1, lg: "none" }} whiteSpace="normal" lineHeight="1.2" variant="outline" onClick={() => setConsent("essential")}>
              Essential only
            </Button>
            <Button size="sm" h="auto" minH="44px" py={2} px={{ base: 3, sm: 4 }} flex={{ base: 1, lg: "none" }} whiteSpace="normal" lineHeight="1.2" variant="outline" onClick={() => setConsent("all")}>
              Allow all
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
