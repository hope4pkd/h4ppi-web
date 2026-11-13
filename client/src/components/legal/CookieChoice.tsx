"use client";

import { Box, Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { setConsent, useConsent, type ConsentChoice, type ConsentState } from "@/lib/consent";

const status: Record<ConsentState, string> = {
  pending: "",
  undecided: "You have not chosen yet, so Google measurement is off and a video will ask before it plays.",
  essential: "You chose essential only. Google measurement is off and a video will ask before it plays.",
  video: "You allowed YouTube video only. Videos play when you press play, and Google measurement is off.",
  all: "You allowed YouTube video and Google measurement.",
};

const choices: { value: ConsentChoice; label: string }[] = [
  { value: "essential", label: "Essential only" },
  { value: "video", label: "YouTube video only" },
  { value: "all", label: "Allow all" },
];

/**
 * The cookies notice's own controls: the banner's two answers plus "YouTube video only", so each
 * optional service can be chosen on its own and a choice changed or withdrawn as easily as it was given.
 */
export function CookieChoice() {
  const consent = useConsent();

  return (
    <Box layerStyle="panel" maxW="4xl">
      <VStack align="start" gap={4} maxW="measure">
        <Heading as="h2" textStyle="cardTitle" color="navy.900">
          Your choice in this browser
        </Heading>
        <Text textStyle="body" color="navy.500" role="status" minH="1lh">
          {status[consent]}
        </Text>
        <Stack direction={{ base: "column", sm: "row" }} gap={3} w={{ base: "full", sm: "auto" }}>
          {choices.map(({ value, label }) => (
            <Button key={value} size="sm" minH="44px" variant={consent === value ? "solid" : "outline"} aria-pressed={consent === value} onClick={() => setConsent(value)}>
              {label}
            </Button>
          ))}
        </Stack>
      </VStack>
    </Box>
  );
}
