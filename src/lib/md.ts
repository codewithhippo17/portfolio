import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

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
    
    // Wrap in a shimmer container so the skeleton shows while the
    // image is opacity-0. The <MarkdownContent/> client component
    // removes `.skeleton-shimmer` and fades the image in on load.
    return `<span class="md-img-wrap skeleton-shimmer obsidian-img ${alignClass}"><img src="${src}" alt="${filename}" loading="lazy" /></span>`;
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
  headings: { id: string; title: string; depth: number }[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const contentDir = path.join(process.cwd(), "content");

function appendIconToLinksPlugin() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName === "a") {
        // Add an arrow-up-right SVG
        node.children.push({
          type: "element",
          tagName: "svg",
          properties: {
            xmlns: "http://www.w3.org/2000/svg",
            width: "12",
            height: "12",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: ["inline-block", "ml-1", "opacity-70", "mb-1"],
          },
          children: [
            {
              type: "element",
              tagName: "path",
              properties: { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" },
              children: [],
            },
            {
              type: "element",
              tagName: "path",
              properties: { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" },
              children: [],
            },
          ],
        });
      }
    });
  };
}
// Plugin to extract headings
function extractHeadingsPlugin() {
  return (tree: any, file: any) => {
    file.data.headings = [];
    visit(tree, "heading", (node: any) => {
      let text = "";
      visit(node, "text", (textNode: any) => {
        text += textNode.value;
      });
      // Basic slugification (rehype-slug does something similar)
      const id = text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
      file.data.headings.push({
        depth: node.depth,
        title: text,
        id,
      });
    });
  };
}

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
      const processor = remark()
        .use(extractHeadingsPlugin)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(appendIconToLinksPlugin)
        .use(rehypeSlug)
        .use(rehypeStringify, { allowDangerousHtml: true });

      const result = processor.processSync(item.content);
      const headings = (result.data.headings as any) || [];
      const htmlStr = postprocessHighlights(postprocessWikilinks(postprocessObsidianImages(result.toString())));
      return { ...item, html: htmlStr, headings };
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
