import { getProjectCategories } from "@/lib/md";
import { buildUrl, siteOpenGraph, siteTwitter } from "@/lib/seo";
import ProjectsFilter from "@/components/ProjectsFilter";

export function generateMetadata() {
  const title = "Projects";
  const description =
    "Systems I've built, untangled, or killed — with the real constraints. Full-stack, systems, AI/ML, networking, graphics, and DevOps projects by Hamza El Haiba.";

  return {
    title,
    description,
    alternates: { canonical: buildUrl("/projects") },
    openGraph: siteOpenGraph("/projects", { title, description, type: "website" }),
    twitter: siteTwitter({ title, description }),
  };
}

export default function ProjectsPage() {
  const categories = getProjectCategories();

  if (categories.size === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-ctp-text mb-6 tracking-tight">
          Projects
        </h1>
        <p className="text-ctp-subtext0">
          No projects yet. Add markdown files to{" "}
          <code className="text-ctp-peach bg-ctp-surface0 px-1 rounded">
            content/projects/
          </code>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <ProjectsFilter categoriesMap={Array.from(categories.entries())} />
    </div>
  );
}
