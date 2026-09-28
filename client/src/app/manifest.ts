import type { MetadataRoute } from "next";
import { organisation } from "@/content/organisation";

export default function manifest(): MetadataRoute.Manifest {
  return { name: organisation.brandName, short_name: organisation.shortName, description: "PKD information and support planning in Nigeria.", start_url: "/", display: "standalone", background_color: "#FCFAF7", theme_color: "#0B1F33", icons: [{ src: "/assets/logo-new.png", sizes: "any", type: "image/png" }] };
}
