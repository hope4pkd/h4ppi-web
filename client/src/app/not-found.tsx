import { ActionLink, ContentSection, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";

export default function NotFound() {
  return <Layout><PageHero eyebrow="Page not found" title="This page is not available." description="The address may be wrong, or the page may have moved or not been published." /><ContentSection><ActionLink href="/">Return home</ActionLink></ContentSection></Layout>;
}
