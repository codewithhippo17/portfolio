import Link from "next/link";
import { getContent, getDynamicCategories, formatTitle, BaseFrontmatter } from "@/lib/md";
import { buildUrl, siteOpenGraph, siteTwitter } from "@/lib/seo";

export const dynamicParams = false;

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
  const description = `${title} — notes and write-ups by Hamza El Haiba.`;

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
        <p className="text-ctp-subtext-0">No entries yet. Add markdown files to <code className="text-ctp-peach bg-ctp-surface-0 px-1 rounded">content/{category}/</code>.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ctp-text mb-6 tracking-tight">
        {title}
      </h1>

      <div className="space-y-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/${category}/${item.slug}`}
            className="flex items-start justify-between border-l-2 border-ctp-surface-2 hover:border-ctp-mauve pl-4 py-3 hover:bg-ctp-surface-0 transition-all rounded-r-lg group gap-4"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-ctp-text font-medium group-hover:text-ctp-mauve transition-colors truncate">
                {item.frontmatter.title || item.slug}
              </h3>
              {item.frontmatter.date && (
                <span className="text-xs text-ctp-subtext-0 block mt-1">
                  {item.frontmatter.date}
                </span>
              )}
              {item.frontmatter.description && (
                <p className="text-ctp-subtext-0 text-sm mt-1 line-clamp-2">
                  {item.frontmatter.description}
                </p>
              )}
            </div>
            {item.frontmatter.thumbnail && (
              <div className="flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`/portfolio/attachments/${item.frontmatter.thumbnail}`} 
                  alt={item.frontmatter.title || "Thumbnail"} 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-ctp-surface-1"
                  loading="lazy"
                />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
