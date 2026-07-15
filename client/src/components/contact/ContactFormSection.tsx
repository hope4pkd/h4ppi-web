"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

// TODO: replace placeholder address and wire the form to a backend/API when
// one becomes available.
const CONTACT_EMAIL = "hello@hope4pkd.org";

export function ContactFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Box bg="gray.50" py={{ base: 16, md: 20 }} width="100%">
      <Container maxW="3xl">
        <VStack gap={4} textAlign="center" mb={10}>
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            color="brand.500"
          >
            Send Us a Message
          </Heading>
          <Text
            maxW="2xl"
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
          >
            Fill in the form below and we will get back to you as soon as we
            can.
          </Text>
        </VStack>
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          p={{ base: 6, md: 10 }}
        >
          <Stack gap={5}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
              <Field.Root required>
                <Field.Label>
                  Name <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </Field.Root>
              <Field.Root required>
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </Field.Root>
            </SimpleGrid>
            <Field.Root required>
              <Field.Label>
                Subject <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What is this about?"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Message <Field.RequiredIndicator />
              </Field.Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can help..."
                rows={6}
              />
            </Field.Root>
            <Button type="submit" size="lg" rounded="full" variant="solid">
              Send Message
            </Button>
            <Text
              fontSize="sm"
              color="gray.500"
              textAlign="center"
            >
              This opens your email app with your message ready to send. You
              can also write to us directly at {CONTACT_EMAIL}.
            </Text>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
