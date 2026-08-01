import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import ProjectThumbnail from "@/components/ProjectThumbnail";
import type { ContentItem, ProjectFrontmatter } from "@/lib/md";

export function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

const statusPill: Record<string, string> = {
  completed: "text-ctp-green border-ctp-green/40 bg-ctp-green/10",
  ongoing: "text-ctp-blue border-ctp-blue/40 bg-ctp-blue/10",
  archived: "text-ctp-overlay1 border-ctp-overlay1/40 bg-ctp-overlay1/10",
};

export default function ProjectCard({
  project,
  accentText,
  accentBar,
  featured = false,
}: {
  project: ContentItem<ProjectFrontmatter>;
  accentText: string;
  accentBar: string;
  featured?: boolean;
}) {
  const { slug, frontmatter } = project;
  const { title, description, date, tags, role, github, status, thumbnail } =
    frontmatter;
  const statusClass = statusPill[status] ?? statusPill.completed;
  const thumbSrc = thumbnail
    ? `/portfolio/attachments/${thumbnail}`
    : undefined;
  const iconName = tags?.[0]?.toLowerCase();

  return (
    <div
      className={`group relative flex items-stretch overflow-hidden rounded-lg border border-ctp-surface0/70 bg-ctp-mantle/50 transition-colors hover:bg-ctp-surface0/40 ${
        featured ? "flex-col sm:flex-row" : ""
      }`}
    >
      {/* Stretched link — whole card navigates to the project */}
      <Link
        href={`/projects/${slug}`}
        className="absolute inset-0 z-0 rounded-lg"
        aria-label={`View project: ${title}`}
      />

      {/* Category accent bar on the left edge */}
      <span
        className={`absolute inset-y-0 left-0 w-0.5 ${accentBar} ${
          featured ? "rounded-l-lg" : ""
        }`}
      />

      {/* Content */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <h3
          className={`font-semibold text-ctp-text transition-colors group-hover:text-ctp-mauve ${
            featured ? "text-xl sm:text-2xl" : "text-base"
          }`}
        >
          {title}
        </h3>

        {description && (
          <p
            className={`mt-1 text-ctp-subtext0 leading-relaxed ${
              featured ? "line-clamp-3 text-sm sm:text-base" : "line-clamp-2 text-sm"
            }`}
          >
            {description}
          </p>
        )}

        {featured && (
          <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ctp-mauve">
            View project <ArrowRight size={13} />
          </span>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-ctp-overlay1">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-3">
          <span
            className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusClass}`}
          >
            {status}
          </span>
          <span className="text-xs text-ctp-overlay1">
            {formatDate(date ?? "")}
          </span>
          {role && (
            <span className="hidden text-xs text-ctp-overlay1 sm:inline">
              · {role}
            </span>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} source on GitHub`}
              className="relative z-10 ml-auto inline-flex items-center gap-1 text-xs text-ctp-subtext0 transition-colors hover:text-ctp-text"
            >
              GitHub <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Thumbnail — always present; skeleton shimmer when missing */}
      <ProjectThumbnail
        src={thumbSrc}
        alt={`${title} thumbnail`}
        iconName={iconName}
        tintClass={accentText}
        className={
          featured
            ? "h-40 w-full shrink-0 sm:h-auto sm:w-72"
            : "w-28 shrink-0 sm:w-44"
        }
      />
    </div>
  );
}
