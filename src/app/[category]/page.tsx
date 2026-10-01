import Link from "next/link";
import { getContent, getDynamicCategories, formatTitle, BaseFrontmatter } from "@/lib/md";
import { buildUrl, siteOpenGraph, siteTwitter } from "@/lib/seo";
import ProjectThumbnail from "@/components/ProjectThumbnail";

export const dynamicParams = false;

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "blog": "Thoughts, tutorials, and deep dives on software engineering and design.",
  "decision-log": "Architectural decisions, trade-offs, and the rigorous reasoning behind them.",
  "anti-portfolio": "Projects that failed, abstractions that leaked, and what I learned from them.",
  "mental-models": "Frameworks for thinking about systems, startups, and robust code.",
  "failure-log": "A transparent record of outages, deadlocks, and architectural collapses. Because systems fail, and we learn.",
  "engineering-principles": "The immutable rules and methodologies that govern how I write code and design systems."
};


export async function generateStaticParams() {
  return getDynamicCategories().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const title = formatTitle(category);
  const description = CATEGORY_DESCRIPTIONS[category] || `${title} — notes and write-ups by Hamza El Haiba.`;

  return {
    title,
    description,
    alternates: { canonical: buildUrl(`/${category}`) },
    openGraph: siteOpenGraph(`/${category}`, { title, description, type: "website" }),
    twitter: siteTwitter({ title, description }),
  };
}

export default async function FolderIndexPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const validCategories = getDynamicCategories();

  if (!validCategories.includes(category)) {
    return <div>Not found</div>;
  }

  const items = getContent<BaseFrontmatter>(category);
  const title = formatTitle(category);

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-ctp-text mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-ctp-subtext0">No entries yet. Add markdown files to <code className="text-ctp-peach bg-ctp-surface0 px-1 rounded">content/{category}/</code>.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ctp-text mb-2 tracking-tight">
        {title}
      </h1>
      {CATEGORY_DESCRIPTIONS[category] && (
        <p className="text-ctp-subtext0 mb-8 text-sm">
          {CATEGORY_DESCRIPTIONS[category]}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => {
          const thumbSrc = item.frontmatter.thumbnail
            ? `/portfolio/attachments/${item.frontmatter.thumbnail}`
            : undefined;

          return (
            <div
              key={item.slug}
              className="group relative flex items-stretch overflow-hidden rounded-lg border border-ctp-surface0/70 bg-ctp-mantle/50 transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-1 hover:bg-ctp-surface0/40"
            >
              <Link
                href={`/${category}/${item.slug}`}
                className="absolute inset-0 z-10 rounded-lg"
                aria-label={`Read ${item.frontmatter.title || item.slug}`}
              />

              <span className="absolute inset-y-0 left-0 w-0.5 bg-ctp-surface2 transition-colors group-hover:bg-ctp-mauve" />

              <div className="relative flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-base font-semibold text-ctp-text transition-colors group-hover:text-ctp-mauve truncate">
                  {item.frontmatter.title || item.slug}
                </h3>
                
                {item.frontmatter.description && (
                  <p className="mt-1 text-sm text-ctp-subtext0 line-clamp-2 leading-relaxed">
                    {item.frontmatter.description}
                  </p>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-3">
                  {item.frontmatter.date && (
                    <span className="text-xs text-ctp-overlay1 font-mono uppercase tracking-wider">
                      {item.frontmatter.date}
                    </span>
                  )}
                </div>
              </div>

              {/* Show placeholder shimmer if no thumb, or actual thumb if exists. */}
              <ProjectThumbnail
                src={thumbSrc}
                alt={item.frontmatter.title || "Thumbnail"}
                className="w-28 shrink-0 sm:w-44 border-l border-ctp-surface0/70"
                iconName="markdown"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
