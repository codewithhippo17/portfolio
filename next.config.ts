import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // We'll use elhaiba-hamza.tech as the custom domain
  // No basePath needed with custom domains on GitHub Pages

  // Preserve href paths without trailing slash redirects
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
