"use client";

import { Box, Container, Flex, Text, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";

export function PkdDayRibbon() {
  return (
    <Box as="section" id="pkd-day" scrollMarginTop="80px" py={{ base: 4, md: 6 }}>
      <Container maxW="7xl">
        <Box
          bg="brand.500"
          rounded="20px"
          px={{ base: 6, md: 9 }}
          py={{ base: 8, md: 7 }}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
            gap={6}
          >
            <Box>
              <Text
                fontSize="xs"
                letterSpacing="2px"
                textTransform="uppercase"
                color="sky.200"
                fontWeight="700"
                mb={1.5}
              >
                PKD Awareness Day
              </Text>
              <Heading as="h2" fontSize={{ base: "2xl", md: "28px" }} fontWeight="800" color="white">
                Walk with us — September 4, Abuja
              </Heading>
              <Text color="brand.200" mt={1.5} fontSize="15px">
                A city-wide awareness walk. Registration ₦5,000 — every step
                funds patient care.
              </Text>
            </Box>
            <Link href="/campaigns">
              <Button
                bg="sky.300"
                color="sky.800"
                _hover={{ bg: "sky.200", transform: "translateY(-2px)" }}
                fontSize="md"
                fontWeight="700"
                px={7}
                py={6}
                rounded="full"
                whiteSpace="nowrap"
              >
                Register for the walk
              </Button>
            </Link>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
