import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProjectFrontmatter {
  title: string;
  category: string;
  date: string;
  tags: string[];
  role: string;
  github?: string;
  live?: string;
  status: "completed" | "ongoing" | "archived";
  featured?: boolean;
  description?: string;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  description?: string;
}

export interface PageFrontmatter {
  title: string;
  description?: string;
}

export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  html: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const contentDir = path.join(process.cwd(), "content");

/** Reads all .md files from a directory, parses frontmatter + renders body */
export function getContent<T>(subdir: string): ContentItem<T>[] {
  const dir = path.join(contentDir, subdir);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      return { slug, frontmatter: data as T, content };
    })
    .map((item) => {
      const result = remark().use(html).processSync(item.content);
      return { ...item, html: result.toString() };
    })
    .sort((a, b) => {
      // Sort by date descending if available
      const dateA = (a.frontmatter as any).date;
      const dateB = (b.frontmatter as any).date;
      if (dateA && dateB) return dateB.localeCompare(dateA);
      return 0;
    });
}

/** Get a single content item by slug */
export function getContentBySlug<T>(
  subdir: string,
  slug: string
): ContentItem<T> | null {
  const items = getContent<T>(subdir);
  return items.find((item) => item.slug === slug) ?? null;
}

/** Get all projects, optionally filtered by category */
export function getProjects(category?: string) {
  const projects = getContent<ProjectFrontmatter>("projects");

  // Also search subdirectories (web-apps, ai-ml, etc.)
  const projectDir = path.join(contentDir, "projects");
  let allProjects: ContentItem<ProjectFrontmatter>[] = [...projects];

  if (fs.existsSync(projectDir)) {
    const subdirs = fs
      .readdirSync(projectDir)
      .filter((f) => fs.statSync(path.join(projectDir, f)).isDirectory());

    for (const sub of subdirs) {
      allProjects = [
        ...allProjects,
        ...getContent<ProjectFrontmatter>(path.join("projects", sub)),
      ];
    }
  }

  if (category) {
    allProjects = allProjects.filter(
      (p) => p.frontmatter.category === category
    );
  }

  return allProjects.sort((a, b) => {
    const dateA = a.frontmatter.date;
    const dateB = b.frontmatter.date;
    if (dateA && dateB) return dateB.localeCompare(dateA);
    return 0;
  });
}

/** Get featured projects only */
export function getFeaturedProjects() {
  return getProjects().filter((p) => p.frontmatter.featured);
}

/** Get all project categories with their projects */
export function getProjectCategories() {
  const all = getProjects();
  const categories = new Map<string, ContentItem<ProjectFrontmatter>[]>();

  for (const project of all) {
    const cat = project.frontmatter.category || "uncategorized";
    const existing = categories.get(cat) || [];
    existing.push(project);
    categories.set(cat, existing);
  }

  return categories;
}

/** Get blog posts */
export function getBlogPosts() {
  return getContent<BlogFrontmatter>("blog");
}

/** Get a single blog post */
export function getBlogPost(slug: string) {
  return getContentBySlug<BlogFrontmatter>("blog", slug);
}

/** Get all unique tags from blog posts */
export function getBlogTags() {
  const posts = getBlogPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags?.forEach((t) => tags.add(t)));
  return [...tags].sort();
}
