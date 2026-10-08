import Link from "next/link";
import ProjectThumbnail from "@/components/ProjectThumbnail";
import GithubButton from "@/components/GithubButton";
import { Badge } from "@/components/reui/badge";
import type { ContentItem, ProjectFrontmatter } from "@/lib/md";

export function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

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
  const thumbSrc = thumbnail
    ? `/portfolio/attachments/${thumbnail}`
    : undefined;
  const iconName = tags?.[0]?.toLowerCase();

  // Map string status to valid Badge variants
  const badgeVariant = (
    ["completed", "ongoing", "archived"].includes(status?.toLowerCase() || "") 
      ? status?.toLowerCase() 
      : "default"
  ) as "completed" | "ongoing" | "archived" | "default";

  return (
        <div
      className={`group relative flex overflow-hidden rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-ctp-mauve/10 ${
        featured 
          ? "flex-col bg-gradient-to-br from-ctp-surface0/40 to-ctp-mantle/60 border-ctp-mauve/30" 
          : "flex-col sm:flex-row items-stretch bg-ctp-mantle/50 border-ctp-surface0/70 hover:bg-ctp-surface0/40"
      }`}
    >
      {/* Stretched link — whole card navigates to the project.
          Keep this ABOVE content/thumbnail (z-10) so clicks anywhere
          on the card land on it. Interactive elements (GitHub) sit
          higher at z-20. */}
      <Link
        href={`/projects/${slug}`}
        className="absolute inset-0 z-10 rounded-lg"
        // aria-label={`View project: ${title}`}
      />

      {/* Category accent bar on the left edge */}
      <span
        className={`absolute z-20 ${
          featured ? `top-0 inset-x-0 h-1 ${accentBar}` : `inset-y-0 left-0 w-0.5 ${accentBar}`
        }`}
      />

      {/* Content — sits BELOW the stretched link so clicks pass through.
          NOTE: no z-index here on purpose. A `z-0` would create a stacking
          context and CAP the GitHub link (z-20 inside) below the link (z-10).
          Plain `relative` lets z-20 participate at the card level. */}
      <div className={`relative flex min-w-0 flex-1 flex-col ${featured ? "p-5 sm:p-7" : "p-5 sm:p-6"}`}>
        {/* Header Section: Title and Description */}
        <div className="flex flex-col gap-1.5">
          <h3
            className={`text-ctp-text transition-colors group-hover:text-ctp-mauve ${
              featured ? "text-xl sm:text-2xl font-bold tracking-tight" : "text-base sm:text-lg font-semibold"
            }`}
          >
            {title}
          </h3>

          {description && (
            <p
              className={`text-ctp-subtext0 leading-relaxed ${
                featured ? "line-clamp-3 text-sm sm:text-base" : "line-clamp-2 text-sm"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        

        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-md bg-ctp-surface0/50 px-2 py-1 text-[10px] font-medium tracking-wide text-ctp-subtext0">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta Row: Status Badge, Date, Github */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <Badge variant={badgeVariant}>
            <span className="ms-0.25 mr-1.5 size-1.25 rounded-full! bg-[currentColor]" />{" "}
            {status}
          </Badge>
          <span className="font-mono text-xs text-ctp-overlay1">
            {formatDate(date ?? "")}
          </span>
          {role && (
            <span className="hidden font-mono text-xs text-ctp-overlay1 sm:inline">
              · {role}
            </span>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} source on GitHub`}
              className="relative z-20 ml-auto inline-flex items-center transition-colors"
            >
              <GithubButton />
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
            ? "order-first w-full h-48 sm:h-56 shrink-0 border-b border-ctp-surface0/70"
            : "w-32 shrink-0 border-l border-ctp-surface0/70 sm:w-48"
        }
      />
    </div>
  );
}
