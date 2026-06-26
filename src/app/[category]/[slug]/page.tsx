import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/md";

const DYNAMIC_FOLDERS = [
  "anti-portfolio",
  "decision-log",
  "engineering-principles",
  "failure-log",
  "mental-models",
  "blog",
];

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  
  for (const category of DYNAMIC_FOLDERS) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = getContent<any>(category);
    for (const item of items) {
      params.push({ category, slug: item.slug });
    }
  }
  
  return params;
}

function formatTitle(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  if (!DYNAMIC_FOLDERS.includes(category)) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = getContent<any>(category);
  const item = items.find((i) => i.slug === slug);

  if (!item) notFound();

  return (
    <article>
      {/* Back link */}
      <Link
        href={`/${category}`}
        className="text-sm text-ctp-subtext-0 hover:text-ctp-text transition-colors"
      >
        ← Back to {formatTitle(category)}
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
