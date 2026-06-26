import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Preserve href paths without trailing slash redirects
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
