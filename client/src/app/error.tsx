"use client";

import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <Container maxW="3xl" py={24}><VStack align="start" gap={5}><Text color="action.700" fontWeight="800">SOMETHING WENT WRONG</Text><Heading as="h1" fontSize="5xl">This page could not be loaded.</Heading><Text color="navy.500">No form submission or payment should be assumed complete. Try once more, or return later if the problem continues.</Text><Button onClick={reset}>Try again</Button></VStack></Container>;
}
