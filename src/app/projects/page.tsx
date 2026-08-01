import { getProjectCategories } from "@/lib/md";
import ProjectCard from "@/components/ProjectCard";
import { Sparkles } from "lucide-react";
import { buildUrl, siteOpenGraph, siteTwitter } from "@/lib/seo";

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

// Category → Catppuccin accent classes (full literal strings so Tailwind picks them up)
const categoryAccents: Record<string, { text: string; bar: string }> = {
  "Web Apps": { text: "text-ctp-mauve", bar: "bg-ctp-mauve" },
  "AI/ML": { text: "text-ctp-green", bar: "bg-ctp-green" },
  Tools: { text: "text-ctp-blue", bar: "bg-ctp-blue" },
  "Open Source": { text: "text-ctp-peach", bar: "bg-ctp-peach" },
  Systems: { text: "text-ctp-red", bar: "bg-ctp-red" },
  Graphics: { text: "text-ctp-teal", bar: "bg-ctp-teal" },
  Networking: { text: "text-ctp-sky", bar: "bg-ctp-sky" },
  DevOps: { text: "text-ctp-lavender", bar: "bg-ctp-lavender" },
};

const defaultAccent = { text: "text-ctp-subtext0", bar: "bg-ctp-surface2" };

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

  const allProjects = [...categories.values()].flat();
  const featured = allProjects.filter((p) => p.frontmatter.featured);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ctp-text mb-2 tracking-tight">
        Projects
      </h1>
      <p className="text-ctp-subtext0 mb-8 text-sm">
        Systems I&apos;ve built, untangled, or killed. With the real
        constraints.
      </p>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight text-ctp-mauve">
            <Sparkles size={16} /> Featured
          </h2>
          <div className="space-y-4">
            {featured.map((project) => {
              const accent =
                categoryAccents[project.frontmatter.category] ?? defaultAccent;
              return (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  accentText={accent.text}
                  accentBar={accent.bar}
                  featured
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Category lists (featured projects already shown above, don't repeat) */}
      {Array.from(categories.entries()).map(([category, projects]) => {
        const accent = categoryAccents[category] ?? defaultAccent;
        const rest = projects.filter((p) => !p.frontmatter.featured);

        if (rest.length === 0) return null;

        return (
          <section key={category} className="mb-10">
            <h2
              className={`mb-3 text-lg font-semibold tracking-tight ${accent.text}`}
            >
              {category}
            </h2>
            <div className="space-y-3">
              {rest.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  accentText={accent.text}
                  accentBar={accent.bar}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
