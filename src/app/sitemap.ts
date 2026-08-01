import type { MetadataRoute } from "next";
import {
  getContent,
  getDynamicCategories,
  getProjects,
  type BaseFrontmatter,
} from "@/lib/md";
import { buildUrl } from "@/lib/seo";

// Required for static export: bake sitemap.xml at build time.
export const dynamic = "force-static";

/**
 * Static sitemap.xml for the /portfolio basePath.
 * Includes home, projects, every dynamic category index, and every
 * content note + project page.
 *
 * NOTE: `lastModified` is omitted (static export); entries use the
 * frontmatter date where available for `lastmod` best practice.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static top-level pages
  const staticPages = ["/", "/projects"];
  for (const page of staticPages) {
    entries.push({ url: buildUrl(page), changeFrequency: "weekly", priority: 1.0 });
  }

  // Dynamic category indexes (e.g. /blog, /mental-models)
  const categories = getDynamicCategories();
  for (const category of categories) {
    entries.push({
      url: buildUrl(`/${category}`),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Content notes within each category (e.g. /blog/foo)
  for (const category of categories) {
    const items = getContent<BaseFrontmatter>(category);
    for (const item of items) {
      entries.push({
        url: buildUrl(`/${category}/${item.slug}`),
        lastModified: item.frontmatter.date ? new Date(item.frontmatter.date) : undefined,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Projects (all subdirectories included by getProjects)
  const projects = getProjects();
  for (const project of projects) {
    entries.push({
      url: buildUrl(`/projects/${project.slug}`),
      lastModified: project.frontmatter.date ? new Date(project.frontmatter.date) : undefined,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  return entries;
}
