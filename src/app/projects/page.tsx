import Link from "next/link";
import { getProjectCategories } from "@/lib/md";
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

// Map category names to Catppuccin accent colors for the badges
const categoryColors: Record<string, string> = {
  "Web Apps": "text-ctp-mauve border-ctp-mauve",
  "AI/ML": "text-ctp-green border-ctp-green",
  Tools: "text-ctp-blue border-ctp-blue",
  "Open Source": "text-ctp-peach border-ctp-peach",
  Systems: "text-ctp-red border-ctp-red",
  Graphics: "text-ctp-teal border-ctp-teal",
  Networking: "text-ctp-sky border-ctp-sky",
  DevOps: "text-ctp-lavender border-ctp-lavender",
};

const categoryBorderColors: Record<string, string> = {
  "Web Apps": "border-ctp-mauve",
  "AI/ML": "border-ctp-green",
  Tools: "border-ctp-blue",
  "Open Source": "border-ctp-peach",
  Systems: "border-ctp-red",
  Graphics: "border-ctp-teal",
  Networking: "border-ctp-sky",
  DevOps: "border-ctp-lavender",
};

export default function ProjectsPage() {
  const categories = getProjectCategories();

  if (categories.size === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-ctp-text mb-6 tracking-tight">
          Projects
        </h1>
        <p className="text-ctp-subtext0">
          No projects yet. Add markdown files to <code className="text-ctp-peach bg-ctp-surface0 px-1 rounded">content/projects/</code>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ctp-text mb-2 tracking-tight">
        Projects
      </h1>
      <p className="text-ctp-subtext0 mb-8 text-sm">
        Systems I&apos;ve built, untangled, or killed. With the real constraints.
      </p>

      {Array.from(categories.entries()).map(([category, projects]) => {
        const borderColor = categoryBorderColors[category] ?? "border-ctp-surface1";
        const textColor = categoryColors[category]?.split(" ")[0] ?? "text-ctp-subtext0";

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
                  className={`flex items-start justify-between border-l-2 ${borderColor} pl-4 py-3 hover:bg-ctp-surface0 transition-colors rounded-r-lg gap-4`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-ctp-text font-medium truncate">
                      {project.frontmatter.title}
                    </h3>
                    {project.frontmatter.description && (
                      <p className="text-ctp-subtext0 text-sm mt-0.5 line-clamp-2">
                        {project.frontmatter.description}
                      </p>
                    )}
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      <span className={`text-xs ${textColor}`}>
                        {project.frontmatter.status}
                      </span>
                      {project.frontmatter.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-ctp-overlay1"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.frontmatter.thumbnail && (
                    <div className="flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/portfolio/attachments/${project.frontmatter.thumbnail}`}
                        alt={project.frontmatter.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-ctp-surface1"
                        loading="lazy"
                      />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
