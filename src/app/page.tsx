import { getContent, type PageFrontmatter } from "@/lib/md";
import Link from "next/link";

export default function Home() {
  const home = getContent<PageFrontmatter>(".").find((c) => c.slug === "home");

  if (!home) {
    return (
      <div className="text-ctp-subtext-0">
        <p>Create content/home.md to get started.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="mb-16">
        <div
          className="prose prose-invert max-w-none text-ctp-subtext-0 leading-relaxed [&_a]:text-ctp-mauve [&_a]:no-underline [&_a:hover]:underline"
          dangerouslySetInnerHTML={{ __html: home.html }}
        />
      </section>

      {/* Social links */}
      <section className="flex gap-6 text-sm mb-16">
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
      </section>

      {/* Quick links to standout sections */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-ctp-overlay-1 uppercase tracking-wider">
          Explore
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { href: "/projects", label: "Projects" },
            { href: "/blog", label: "Blog" },
            { href: "/failure-log", label: "Failure Log" },
            { href: "/mental-models", label: "Mental Models" },
            { href: "/engineering-principles", label: "Principles" },
            { href: "/tools-built", label: "Tools" },
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
