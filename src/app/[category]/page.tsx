import Link from "next/link";
import { getContent, getDynamicCategories, formatTitle, BaseFrontmatter } from "@/lib/md";
import { buildUrl, siteOpenGraph, siteTwitter } from "@/lib/seo";
import BlogFilter from "@/components/BlogFilter";

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

  const items = getContent<BaseFrontmatter>(category, true);
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
    <BlogFilter 
      items={items} 
      title={title} 
      description={CATEGORY_DESCRIPTIONS[category]} 
      categorySlug={category} 
    />
  );
}
