import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Hope4PKD Patients Initiative", short_name: "Hope4PKD", description: "PKD information and support planning in Nigeria.", start_url: "/", display: "standalone", background_color: "#FCFAF7", theme_color: "#0B1F33", icons: [{ src: "/assets/logo-new.png", sizes: "any", type: "image/png" }] };
}
