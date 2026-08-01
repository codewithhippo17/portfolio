import { getContent, type PageFrontmatter } from "@/lib/md";
import ContentLayout from "@/components/ContentLayout";
import JsonLd from "@/components/JsonLd";
import {
  SITE_NAME,
  AUTHOR,
  SAME_AS,
  buildUrl,
  siteOpenGraph,
  siteTwitter,
} from "@/lib/seo";

export function generateMetadata() {
  const home = getContent<PageFrontmatter>(".").find((c) => c.slug === "home");
  const title = home?.frontmatter.title ?? SITE_NAME;
  const description = home?.frontmatter.description ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: buildUrl("/") },
    openGraph: siteOpenGraph("/", { title, description: description ?? title, type: "website" }),
    twitter: siteTwitter({ title, description: description ?? title }),
  };
}

export default function Home() {
  const home = getContent<PageFrontmatter>(".").find((c) => c.slug === "home");

  if (!home) {
    return (
      <p className="text-ctp-subtext-0">Create content/home.md to get started.</p>
    );
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE_NAME,
          url: buildUrl("/"),
          jobTitle: AUTHOR.jobTitle,
          email: `mailto:${AUTHOR.email}`,
          sameAs: SAME_AS,
        }}
      />
      <ContentLayout headings={home.headings || []}>
        <div>
          <h1 className="text-2xl font-bold text-ctp-text mb-1 tracking-tight">
            {home.frontmatter.title}
          </h1>
          {home.frontmatter.description && (
            <p className="text-ctp-subtext-1 text-sm mb-6">
              {home.frontmatter.description}
            </p>
          )}

          <div className="space-y-6">
            <div className="markdown-content text-ctp-subtext-0 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: home.html }} />
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
