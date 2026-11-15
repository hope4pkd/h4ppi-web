import { HomePage } from "@/components/home/HomePage";
import { organisation } from "@/content/organisation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Absolute, because the layout's `%s | brand` template does not apply to a page in the layout's own
  // segment: without it the homepage title carried no name at all.
  title: { absolute: `${organisation.brandName} | PKD support in Nigeria` },
  description: "Understand PKD, learn how support will work, explore verified campaigns and follow Hope4PKD’s patient-support work in Nigeria.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
