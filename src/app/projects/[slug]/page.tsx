import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getProjects, getProjectBySlug } from "@/lib/md";
import TechIcon from "@/components/TechIcon";

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
        className="inline-flex items-center text-sm text-ctp-subtext-0 hover:text-ctp-text transition-colors"
      >
        <ChevronLeft size={16} className="mr-1 -ml-1" />
        Back to projects
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
        <div className="flex flex-wrap gap-3 mb-6">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 text-xs text-ctp-overlay-1 bg-ctp-surface-0 px-2 py-0.5 rounded"
            >
              <TechIcon name={tag} size={14} />
              {tag}
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
              className="hover:text-ctp-mauve transition-colors"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
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
