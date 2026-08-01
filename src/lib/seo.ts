/**
 * Central SEO configuration for the portfolio.
 * Single source of truth for canonical URLs, OG tags, and structured data.
 *
 * NOTE: this site is a static export served at the /portfolio basePath
 * (GitHub Pages), so every absolute URL below includes that prefix.
 */

/** Public origin where the site is served (no trailing slash). */
export const SITE_URL = "https://codewithhippo17.github.io";

/** Site path prefix (Next.js basePath). */
export const SITE_BASE_PATH = "/portfolio";

/** Absolute URL helper: joins base + path, e.g. buildUrl("/projects") */
export function buildUrl(path: string): string {
  return `${SITE_URL}${SITE_BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE_NAME = "Hamza El Haiba";
export const SITE_DESCRIPTION =
  "Architect in Digital Technologies. Full-stack engineer building scalable systems that have outgrown their assumptions — with real constraints, documented failure logs, and working software.";

/** Author/social profile used in metadata + Person JSON-LD. */
export const AUTHOR = {
  name: SITE_NAME,
  email: "elhaiba.hamza@proton.me",
  jobTitle: "Architect in Digital Technologies",
  github: "https://github.com/codewithhippo17",
  linkedin: "https://linkedin.com/in/el-haiba-hamza-1628a1403",
  x: "https://x.com/elhaiba__hamza",
  reddit: "https://www.reddit.com/u/LongFaithlessness366",
  medium: "https://medium.com/@elhaiba.hamza",
};

/** Social profile URLs for the `sameAs` array in Person JSON-LD. */
export const SAME_AS = [
  AUTHOR.github,
  AUTHOR.linkedin,
  AUTHOR.x,
  AUTHOR.reddit,
  AUTHOR.medium,
];

/** Default OG image (1200x630) — generated at public/og.png */
export const OG_IMAGE = buildUrl("/og.png");

/** Shared Open Graph + Twitter defaults merged into every page's metadata. */
export function siteOpenGraph(path: string, opts: { title: string; description: string; type?: "website" | "article" }) {
  const url = buildUrl(path);
  return {
    url,
    siteName: SITE_NAME,
    locale: "en_US",
    type: opts.type ?? "website",
    title: opts.title,
    description: opts.description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: opts.title }],
  };
}

export function siteTwitter(opts: { title: string; description: string }) {
  return {
    card: "summary_large_image",
    title: opts.title,
    description: opts.description,
    images: [OG_IMAGE],
  };
}
