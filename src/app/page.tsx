import { getContent, type PageFrontmatter } from "@/lib/md";
import Link from "next/link";

export default function Home() {
  const home = getContent<PageFrontmatter>(".").find((c) => c.slug === "home");

  if (!home) {
    return (
      <p className="text-ctp-subtext-0">Create content/home.md to get started.</p>
    );
  }

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section>
        <h1 className="text-5xl font-bold text-ctp-text mb-2 tracking-tight">
          Hamza El Haiba
        </h1>
        <div className="w-16 h-0.5 bg-ctp-mauve mb-8 rounded-full" />

        <div
          className="prose prose-invert max-w-2xl text-ctp-subtext-0 leading-relaxed text-base
            [&_a]:text-ctp-mauve [&_a]:no-underline [&_a:hover]:underline"
          dangerouslySetInnerHTML={{ __html: home.html }}
        />

        <div className="flex gap-8 mt-8 text-sm">
          <a
            href="https://github.com/elhaibahamza"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ctp-subtext-0 hover:text-ctp-text transition-colors"
          >
            GitHub →
          </a>
          <a
            href="https://linkedin.com/in/elhaibahamza"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ctp-subtext-0 hover:text-ctp-text transition-colors"
          >
            LinkedIn →
          </a>
          <a
            href="mailto:contact@elhaiba-hamza.tech"
            className="text-ctp-subtext-0 hover:text-ctp-text transition-colors"
          >
            Email →
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xs font-semibold text-ctp-overlay-1 uppercase tracking-widest">
            Featured Projects
          </h2>
          <div className="flex-1 h-px bg-ctp-surface-0" />
        </div>

        <div className="space-y-4">
          {[
            { title: "Hasata", desc: "Vehicle auction platform with live bidding via WebSockets", tags: ["Next.js", "PostgreSQL", "WebSocket"] },
            { title: "Industrial Copilot", desc: "LLM-powered dashboard for real-time factory KPIs", tags: ["AI", "MCP", "Plotly"] },
            { title: "OCP SDK", desc: "SDK for building agent-based systems with MCP integration", tags: ["TypeScript", "MCP", "Agents"] },
          ].map((project) => (
            <div
              key={project.title}
              className="group flex items-start gap-4 p-4 -mx-4 rounded-lg hover:bg-ctp-surface-0 transition-colors cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-ctp-green mt-2 shrink-0" />
              <div className="min-w-0">
                <div className="font-medium text-ctp-text group-hover:text-ctp-mauve transition-colors">
                  {project.title}
                </div>
                <div className="text-sm text-ctp-subtext-0 mt-0.5">
                  {project.desc}
                </div>
                <div className="flex gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-ctp-surface-0 group-hover:bg-ctp-surface-1 text-ctp-subtext-0 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xs font-semibold text-ctp-overlay-1 uppercase tracking-widest">
            Latest Posts
          </h2>
          <div className="flex-1 h-px bg-ctp-surface-0" />
        </div>

        <p className="text-ctp-subtext-0 text-sm">Blog posts coming soon. Seed with 2-3 posts to get started.</p>
      </section>

      {/* Explore */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xs font-semibold text-ctp-overlay-1 uppercase tracking-widest">
            Explore
          </h2>
          <div className="flex-1 h-px bg-ctp-surface-0" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { href: "/projects", label: "Projects" },
            { href: "/blog", label: "Blog" },
            { href: "/failure-log", label: "Failure Log" },
            { href: "/mental-models", label: "Mental Models" },
            { href: "/engineering-principles", label: "Principles" },
            { href: "/tools-built", label: "Tools" },
            { href: "/anti-portfolio", label: "Anti-Portfolio" },
            { href: "/decision-log", label: "Decision Log" },
            { href: "/skills", label: "Skills" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 bg-ctp-surface-0 rounded-lg text-ctp-subtext-0 hover:text-ctp-text hover:bg-ctp-surface-1 transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
