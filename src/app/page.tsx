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
        <div className="text-ctp-subtext-0 leading-relaxed space-y-4">
          <div
            className="[&_a]:text-ctp-mauve [&_a]:no-underline [&_a:hover]:underline"
            dangerouslySetInnerHTML={{ __html: home.html }}
          />
        </div>

        <div className="flex gap-4 text-sm text-ctp-subtext-0">
          <a href="https://github.com/elhaibahamza" target="_blank" rel="noopener noreferrer" className="hover:text-ctp-text transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/elhaibahamza" target="_blank" rel="noopener noreferrer" className="hover:text-ctp-text transition-colors">
            LinkedIn
          </a>
          <a href="mailto:contact@elhaiba-hamza.tech" className="hover:text-ctp-text transition-colors">
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
