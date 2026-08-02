import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Staff sign in", robots: { index: false, follow: false } };
export default function AdminLoginPage() { return <Box minH="100dvh" bg="navy.900" py={16}><Container maxW="lg"><VStack align="stretch" gap={6} bg="canvas.50" borderRadius="2xl" p={{ base: 6, md: 10 }}><Text color="action.700" fontWeight="800">INTERNAL ACCESS</Text><Heading as="h1" fontSize="4xl">Staff sign in</Heading><Text color="navy.500">Invite-only passwordless access. A verified authenticator code is required before any operational record can be opened.</Text><AdminLoginForm /></VStack></Container></Box>; }
