import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getContent, getDynamicCategories, formatTitle, BaseFrontmatter } from "@/lib/md";

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  const validCategories = getDynamicCategories();
  
  for (const category of validCategories) {
    const items = getContent<BaseFrontmatter>(category);
    for (const item of items) {
      params.push({ category, slug: item.slug });
    }
  }
  
  return params;
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const validCategories = getDynamicCategories();

  if (!validCategories.includes(category)) {
    notFound();
  }

  const items = getContent<BaseFrontmatter>(category);
  const item = items.find((i) => i.slug === slug);

  if (!item) notFound();

  return (
    <article>
      {/* Back link */}
      <Link
        href={`/${category}`}
        className="inline-flex items-center text-sm text-ctp-subtext-0 hover:text-ctp-text transition-colors"
      >
        <ChevronLeft size={16} className="mr-1 -ml-1" />
        Back to {formatTitle(category)}
      </Link>

      {/* Header */}
      <h1 className="text-2xl font-bold text-ctp-text mt-4 mb-2 tracking-tight">
        {item.frontmatter.title}
      </h1>

      {/* Meta row */}
      {item.frontmatter.date && (
        <div className="text-sm text-ctp-subtext-0 mb-6">
          {item.frontmatter.date}
        </div>
      )}

      {/* Divider */}
      <hr className="border-ctp-surface-0 mb-8" />

      {/* Content */}
      <div
        className="markdown-content text-ctp-subtext-0 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: item.html }}
      />
    </article>
  );
}
