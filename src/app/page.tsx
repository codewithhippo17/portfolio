import { getContent, type PageFrontmatter } from "@/lib/md";

export default function Home() {
  const home = getContent<PageFrontmatter>(".").find((c) => c.slug === "home");

  if (!home) {
    return (
      <p className="text-ctp-subtext-0">Create content/home.md to get started.</p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ctp-text mb-6 tracking-tight">
        Hamza El Haiba
      </h1>

      <div className="space-y-6">
        <div className="markdown-content text-ctp-subtext-0 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: home.html }} />
        </div>
      </div>
    </div>
  );
}
