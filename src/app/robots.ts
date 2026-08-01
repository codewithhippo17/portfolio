import type { MetadataRoute } from "next";
import { buildUrl } from "@/lib/seo";

// Required for static export: bake robots.txt at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: buildUrl("/sitemap.xml"),
  };
}
