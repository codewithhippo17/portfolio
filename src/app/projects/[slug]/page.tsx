import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/md";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { frontmatter, html } = project;

  const statusColor: Record<string, string> = {
    completed: "text-ctp-green",
    ongoing: "text-ctp-blue",
    archived: "text-ctp-overlay-1",
  };

  return (
    <article>
      {/* Back link */}
      <Link
        href="/projects"
        className="text-sm text-ctp-subtext-0 hover:text-ctp-text transition-colors"
      >
        ← Back to projects
      </Link>

      {/* Header */}
      <h1 className="text-2xl font-bold text-ctp-text mt-4 mb-2 tracking-tight">
        {frontmatter.title}
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ctp-subtext-0 mb-6">
        <span className={statusColor[frontmatter.status] ?? "text-ctp-subtext-0"}>
          {frontmatter.status}
        </span>
        <span>{frontmatter.date}</span>
        <span>{frontmatter.role}</span>
      </div>

      {/* Tags */}
      {frontmatter.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-ctp-overlay-1 bg-ctp-surface-0 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      {(frontmatter.github || frontmatter.live) && (
        <div className="flex gap-4 mb-8">
          {frontmatter.github && (
            <a
              href={frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ctp-mauve hover:text-ctp-text transition-colors"
            >
              GitHub →
            </a>
          )}
          {frontmatter.live && (
            <a
              href={frontmatter.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ctp-blue hover:text-ctp-text transition-colors"
            >
              Live Demo →
            </a>
          )}
        </div>
      )}

      {/* Divider */}
      <hr className="border-ctp-surface-0 mb-8" />

      {/* Content */}
      <div
        className="markdown-content text-ctp-subtext-0 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
