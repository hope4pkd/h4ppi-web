"use client";

import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { setConsent, useConsent } from "@/lib/consent";

const buttonProps = { size: "sm", h: "auto", minH: "44px", py: 2, px: 5, flex: { base: 1, md: "none" } } as const;

/**
 * Asks the site's consent question: may the optional Google services (YouTube video and Google
 * measurement) run. It shows until the visitor answers and never again after that. "Cookie settings"
 * opens /cookies, which carries the same answers plus "YouTube video only", for choosing each service on
 * its own or changing the answer later.
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
      aria-label="Your cookie choice"
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
          <Text textStyle="bodySm" color="navy.700" maxW="measureWide">
            We use optional Google services to play our videos and to count visits, including which of our ads brought
            people here. They may store cookies on your device. You can accept them all, decline them, or choose in cookie
            settings. To learn more, read our{" "}
            <Link href="/cookies">
              <Text as="span" color="action.700" fontWeight="700" textDecoration="underline" textUnderlineOffset="3px">
                cookies notice
              </Text>
            </Link>
            .
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} gap={3} align={{ base: "stretch", sm: "center" }} flexShrink={0}>
            <Box asChild order={{ base: 2, sm: 0 }} alignSelf="center" px={2} py={2} minH="44px" display="inline-flex" alignItems="center">
              <Link href="/cookies">
                <Text as="span" textStyle="bodySm" color="action.700" fontWeight="700" textDecoration="underline" textUnderlineOffset="3px">
                  Cookie settings
                </Text>
              </Link>
            </Box>
            {/* Same style, same size, side by side: declining must be as easy as accepting. */}
            <Stack direction="row" gap={3}>
              <Button {...buttonProps} variant="solid" onClick={() => setConsent("all")}>
                Accept all
              </Button>
              <Button {...buttonProps} variant="solid" onClick={() => setConsent("essential")}>
                Decline all
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
