import { getContent, type PageFrontmatter } from "@/lib/md";
import ContentLayout from "@/components/ContentLayout";

export default function Home() {
  const home = getContent<PageFrontmatter>(".").find((c) => c.slug === "home");

  if (!home) {
    return (
      <p className="text-ctp-subtext-0">Create content/home.md to get started.</p>
    );
  }

  return (
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
  );
}
