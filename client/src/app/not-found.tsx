import { ActionLink, ContentSection, PageHero } from "@/components/common/PublicPage";
import { Layout } from "@/components/layout/Layout";

export default function NotFound() {
  return <Layout><PageHero eyebrow="Page not found" title="This page is not available." description="It may be unpublished, moved, or protected behind an approval or access gate." /><ContentSection><ActionLink href="/">Return home</ActionLink></ContentSection></Layout>;
}
