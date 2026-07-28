import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * Post-process HTML to replace Obsidian [[wikilinks]] with functional links.
 * Must run AFTER remark-html converts markdown, because remark strips
 * raw HTML tags from markdown content.
 */
function postprocessWikilinks(htmlContent: string): string {
  return htmlContent.replace(/\[\[([^\]]+)\]\]/g, (_, text) => {
    const parts = text.split("|");
    const target = parts[0].trim();
    const display = parts.length > 1 ? parts[1].trim() : target;
    
    // Convert "Failure Log" -> "failure-log"
    const slug = target.toLowerCase().replace(/\s+/g, "-");
    
    return `<a href="/portfolio/${slug}" class="wikilink">${display}</a>`;
  });
}

/**
 * Post-process HTML to replace Obsidian ==highlights== with styled spans.
 * Must run AFTER remark-html.
 */
function postprocessHighlights(htmlContent: string): string {
  return htmlContent.replace(/==([^=]+)==/g, '<span class="highlight">$1</span>');
}

/**
 * Post-process HTML to replace Obsidian image embeds ![[filename.png|align]]
 * Must run BEFORE postprocessWikilinks so it doesn't get consumed as a regular link.
 */
function postprocessObsidianImages(htmlContent: string): string {
  return htmlContent.replace(/!\[\[([^\]]+)\]\]/g, (_, text) => {
    const parts = text.split("|");
    const filename = parts[0].trim();
    const align = parts.length > 1 ? parts[1].trim().toLowerCase() : "";
    
    let alignClass = "obs-align-default";
    if (align === "left") alignClass = "obs-align-left";
    if (align === "right") alignClass = "obs-align-right";
    if (align === "center") alignClass = "obs-align-center";

    // Next.js uses basePath "/portfolio" in this project
    const src = `/portfolio/attachments/${filename}`;
    
    return `<img src="${src}" alt="${filename}" class="obsidian-img ${alignClass}" loading="lazy" />`;
  });
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BaseFrontmatter {
  title?: string;
  date?: string;
  description?: string;
  thumbnail?: string;
}

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
  thumbnail?: string;
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
      const htmlStr = postprocessHighlights(postprocessWikilinks(postprocessObsidianImages(result.toString())));
      return { ...item, html: htmlStr };
    })
    .sort((a, b) => {
      // Sort by date descending if available
      const dateA = (a.frontmatter as { date?: string }).date;
      const dateB = (b.frontmatter as { date?: string }).date;
      if (dateA && dateB) return dateB.localeCompare(dateA);
      return 0;
    });
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

/** Get a single project by slug, searching across all subdirectories */
export function getProjectBySlug(slug: string): ContentItem<ProjectFrontmatter> | null {
  return getProjects().find((p) => p.slug === slug) ?? null;
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

/** Get dynamic categories (subdirectories in content, excluding custom routes) */
export function getDynamicCategories() {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter(
      (f) =>
        f !== "projects" &&
        f !== "attachments" &&
        fs.statSync(path.join(contentDir, f)).isDirectory()
    );
}

/** Format a slug string into a readable title */
export function formatTitle(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
