import Link from "next/link";
import { getProjectCategories } from "@/lib/md";

// Map category names to Catppuccin accent colors for the badges
const categoryColors: Record<string, string> = {
  "Web Apps": "text-ctp-mauve border-ctp-mauve",
  "AI/ML": "text-ctp-green border-ctp-green",
  Tools: "text-ctp-blue border-ctp-blue",
  "Open Source": "text-ctp-peach border-ctp-peach",
};

const categoryBorderColors: Record<string, string> = {
  "Web Apps": "border-ctp-mauve",
  "AI/ML": "border-ctp-green",
  Tools: "border-ctp-blue",
  "Open Source": "border-ctp-peach",
};

export default function ProjectsPage() {
  const categories = getProjectCategories();

  if (categories.size === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-ctp-text mb-6 tracking-tight">
          Projects
        </h1>
        <p className="text-ctp-subtext-0">
          No projects yet. Add markdown files to <code className="text-ctp-peach bg-ctp-surface-0 px-1 rounded">content/projects/</code>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ctp-text mb-2 tracking-tight">
        Projects
      </h1>
      <p className="text-ctp-subtext-0 mb-8 text-sm">
        Things I&apos;ve built — organized by category.
      </p>

      {Array.from(categories.entries()).map(([category, projects]) => {
        const borderColor = categoryBorderColors[category] ?? "border-ctp-surface-1";
        const textColor = categoryColors[category]?.split(" ")[0] ?? "text-ctp-subtext-0";

        return (
          <section key={category} className="mb-10">
            <h2 className={`text-lg font-semibold ${textColor} mb-3 tracking-tight`}>
              {category}
            </h2>

            <div className="space-y-3">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={`block border-l-2 ${borderColor} pl-4 py-2 hover:bg-ctp-surface-0 transition-colors rounded-r-lg`}
                >
                  <h3 className="text-ctp-text font-medium">
                    {project.frontmatter.title}
                  </h3>
                  {project.frontmatter.description && (
                    <p className="text-ctp-subtext-0 text-sm mt-0.5">
                      {project.frontmatter.description}
                    </p>
                  )}
                  <div className="flex gap-2 mt-1.5">
                    <span className={`text-xs ${textColor}`}>
                      {project.frontmatter.status}
                    </span>
                    {project.frontmatter.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-ctp-overlay-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
