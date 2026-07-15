"use client";

import {
  Box,
  Container,
  VStack,
  Text,
  Button,
  SimpleGrid,
  Input,
  Textarea,
} from "@chakra-ui/react";

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <VStack align="start" gap={1} w="full">
    <Text fontSize="sm" fontWeight="semibold" color="gray.700">
      {label}
      {required && (
        <Text as="span" color="red.500">
          {" "}
          *
        </Text>
      )}
    </Text>
    {children}
  </VStack>
);

export function PatientIntakeForm() {
  return (
    <Box id="intake" py={{ base: 16, md: 20 }} bg="gray.50">
      <Container maxW="4xl">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
            >
              Begin Your Patient Intake
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
              Tell us about yourself and the support you need. Our patient
              support team will reach out to guide you through onboarding and
              medical verification.
            </Text>
          </VStack>

          <Box
            w="full"
            p={8}
            bg="white"
            rounded="xl"
            shadow="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <VStack gap={6} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <Field label="Full Name" required>
                  <Input placeholder="Enter your full name" />
                </Field>
                <Field label="Email Address" required>
                  <Input type="email" placeholder="your.email@example.com" />
                </Field>
                <Field label="Phone Number" required>
                  <Input placeholder="+234 xxx xxx xxxx" />
                </Field>
                <Field label="State of Residence" required>
                  <Input placeholder="e.g. Lagos, FCT Abuja, Rivers" />
                </Field>
              </SimpleGrid>

              <Field label="I am reaching out as">
                <Input placeholder="A patient, caregiver, or family member" />
              </Field>

              <Field label="Tell us about your situation and the support you need" required>
                <Textarea
                  placeholder="Share your diagnosis status, current treatment (if any), and the kind of support you are looking for — guidance, financial access, community, or something else"
                  rows={5}
                />
              </Field>

              <Button variant="solid" size="lg" rounded="full" alignSelf="center">
                Submit Support Request
              </Button>

              <Text fontSize="sm" color="gray.600" textAlign="center">
                All medical information is kept strictly confidential.
                Submitting this form is the first step of our structured intake
                process — medical verification follows before any support is
                mobilised.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
