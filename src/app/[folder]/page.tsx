import Link from "next/link";
import fs from "fs";
import path from "path";
import { getContent } from "@/lib/md";

// The folders we want to dynamically route
const DYNAMIC_FOLDERS = [
  "anti-portfolio",
  "decision-log",
  "engineering-principles",
  "failure-log",
  "mental-models",
  "blog",
];

export function generateStaticParams() {
  return DYNAMIC_FOLDERS.map((folder) => ({ folder }));
}

function formatTitle(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function FolderIndexPage({
  params,
}: {
  params: Promise<{ folder: string }>;
}) {
  const { folder } = await params;

  if (!DYNAMIC_FOLDERS.includes(folder)) {
    return <div>Not found</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = getContent<any>(folder);
  const title = formatTitle(folder);

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-ctp-text mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-ctp-subtext-0">No entries yet.</p>
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
            href={`/${folder}/${item.slug}`}
            className="block border-l-2 border-ctp-surface-2 hover:border-ctp-mauve pl-4 py-2 hover:bg-ctp-surface-0 transition-all rounded-r-lg group"
          >
            <h3 className="text-ctp-text font-medium group-hover:text-ctp-mauve transition-colors">
              {item.frontmatter.title || item.slug}
            </h3>
            {item.frontmatter.date && (
              <span className="text-xs text-ctp-subtext-0 block mt-1">
                {item.frontmatter.date}
              </span>
            )}
            {item.frontmatter.description && (
              <p className="text-ctp-subtext-0 text-sm mt-1">
                {item.frontmatter.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
