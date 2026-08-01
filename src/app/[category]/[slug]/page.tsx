import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getContent, getDynamicCategories, formatTitle, BaseFrontmatter } from "@/lib/md";
import ContentLayout from "@/components/ContentLayout";
import JsonLd from "@/components/JsonLd";
import MarkdownContent from "@/components/MarkdownContent";
import { AUTHOR, SITE_NAME, buildUrl, siteOpenGraph, siteTwitter } from "@/lib/seo";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const items = getContent<BaseFrontmatter>(category);
  const item = items.find((i) => i.slug === slug);

  if (!item) return {};

  const title = item.frontmatter.title ?? formatTitle(slug);
  const description = item.frontmatter.description ?? undefined;
  const date = item.frontmatter.date;
  const path = `/${category}/${slug}`;

  const base = {
    title,
    description,
    alternates: { canonical: buildUrl(path) },
    openGraph: siteOpenGraph(path, { title, description: description ?? title, type: "article" }),
    twitter: siteTwitter({ title, description: description ?? title }),
  };

  // Article pages gain structured data via JSON-LD injected in the page body.
  return {
    ...base,
    other: {
      ...(base as any).other,
      ...(date
        ? {
            "article:published_time": date,
            "article:author": AUTHOR.name,
          }
        : {}),
    },
  };
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
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: item.frontmatter.title ?? formatTitle(slug),
          ...(item.frontmatter.description
            ? { description: item.frontmatter.description }
            : {}),
          ...(item.frontmatter.date
            ? { datePublished: item.frontmatter.date, dateModified: item.frontmatter.date }
            : {}),
          author: { "@type": "Person", name: AUTHOR.name, url: buildUrl("/") },
          publisher: { "@type": "Person", name: SITE_NAME, url: buildUrl("/") },
          mainEntityOfPage: buildUrl(`/${category}/${slug}`),
        }}
      />
      <ContentLayout headings={item.headings || []}>
      <article>
        {/* Back link */}
        <Link
          href={`/${category}`}
          className="inline-flex items-center text-sm text-ctp-subtext0 hover:text-ctp-text transition-colors"
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
          <div className="text-sm text-ctp-subtext0 mb-6">
            {item.frontmatter.date}
          </div>
        )}

        {/* Divider */}
        <hr className="border-ctp-surface0 mb-8" />

        {/* Content */}
        <MarkdownContent html={item.html} />
      </article>
      </ContentLayout>
    </>
  );
}

