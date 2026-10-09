import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getProjects, getProjectBySlug } from "@/lib/md";
import TechIcon from "@/components/TechIcon";
import ContentLayout from "@/components/ContentLayout";
import JsonLd from "@/components/JsonLd";
import MarkdownContent from "@/components/MarkdownContent";
import GithubButton from "@/components/GithubButton";
import HeroImage from "@/components/HeroImage";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AUTHOR, buildUrl, siteOpenGraph, siteTwitter } from "@/lib/seo";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const { frontmatter } = project;
  const title = frontmatter.title;
  const description = frontmatter.description ?? undefined;
  const path = `/projects/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: buildUrl(path) },
    openGraph: siteOpenGraph(path, { title, description: description ?? title, type: "article" }),
    twitter: siteTwitter({ title, description: description ?? title }),
    other: {
      "article:author": AUTHOR.name,
      ...(frontmatter.date ? { "article:published_time": frontmatter.date } : {}),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { frontmatter, html, headings } = project;

  const statusColor: Record<string, string> = {
    completed: "text-ctp-green",
    ongoing: "text-ctp-blue",
    archived: "text-ctp-overlay1",
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: frontmatter.title,
          ...(frontmatter.description ? { description: frontmatter.description } : {}),
          ...(frontmatter.date
            ? { datePublished: frontmatter.date, dateModified: frontmatter.date }
            : {}),
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any",
          ...(frontmatter.github ? { codeRepository: frontmatter.github } : {}),
          ...(frontmatter.live ? { url: frontmatter.live } : {}),
          author: { "@type": "Person", name: AUTHOR.name, url: buildUrl("/") },
          mainEntityOfPage: buildUrl(`/projects/${slug}`),
        }}
      />
      <ContentLayout headings={headings || []}>
      <article>
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-ctp-subtext0 hover:text-ctp-text transition-colors"
        >
          <ChevronLeft size={16} className="mr-1 -ml-1" />
          Back to projects
        </Link>

        {/* Header Block with Links on the Right */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mt-4 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-ctp-text mb-2 tracking-tight">
              {frontmatter.title}
            </h1>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ctp-subtext0 mb-6">
              <span className={statusColor[frontmatter.status] ?? "text-ctp-subtext0"}>
                {frontmatter.status}
              </span>
              <span>{frontmatter.date}</span>
              <span>{frontmatter.role}</span>
            </div>

            {frontmatter.tags?.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 text-xs text-ctp-text font-medium"
                  >
                    <TechIcon name={tag} size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          {(frontmatter.github || frontmatter.live) && (
            <div className="flex items-center sm:justify-end gap-6 shrink-0 mt-2 sm:mt-1">
              {frontmatter.github && (
                <a
                  href={frontmatter.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-20 inline-flex items-center transition-colors"
                >
                  <GithubButton />
                </a>
              )}
              {frontmatter.live && (
                <a
                  href={frontmatter.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Visit Site ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* Hero Thumbnail */}
        {frontmatter.thumbnail && (
          <HeroImage
            src={`/portfolio/attachments/${frontmatter.thumbnail}`}
            alt={frontmatter.title || "Project thumbnail"}
          />
        )}

        {/* Divider */}
        <hr className="border-ctp-surface0 mb-8" />

        {/* Content */}
        <MarkdownContent html={html} />
      </article>
      </ContentLayout>
    </>
  );
}
