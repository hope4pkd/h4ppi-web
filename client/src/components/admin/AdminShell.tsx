import { Box, Container, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import type { ReactNode } from "react";

const links = [
  ["Overview", "/admin"], ["Cases", "/admin/cases"], ["Campaigns", "/admin/campaigns"],
  ["Donations", "/admin/donations"], ["Content", "/admin/content"], ["Reports", "/admin/reports"],
  ["Audit", "/admin/audit"], ["Settings", "/admin/settings"],
] as const;

export function AdminShell({ children, profile }: { children: ReactNode; profile: { display_name: string; role: string } }) {
  return <Box minH="100dvh" bg="navy.50"><Box bg="navy.900" color="white"><Container maxW="8xl" py={4}><HStack justify="space-between"><Link href="/admin"><Text fontWeight="800">Hope4PKD Operations</Text></Link><VStack align="end" gap={0}><Text fontSize="sm" fontWeight="700">{profile.display_name}</Text><Text color="navy.200" fontSize="xs">{profile.role.replaceAll("_", " ")}</Text></VStack></HStack></Container></Box><Container maxW="8xl" py={6}><Grid templateColumns={{ base: "1fr", lg: "220px 1fr" }} gap={8}><VStack as="nav" aria-label="Administration" align="stretch" gap={1}>{links.map(([label, href]) => <Link key={href} href={href}><Text as="span" display="block" minH="44px" px={3} py={2.5} borderRadius="lg" fontWeight="700" _hover={{ bg: "white" }}>{label}</Text></Link>)}</VStack><Box as="main" id="main-content">{children}</Box></Grid></Container></Box>;
}
