import Link from "next/link";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

const moreLinks = [
  { href: "/failure-log", label: "Failure Log" },
  { href: "/mental-models", label: "Mental Models" },
  { href: "/engineering-principles", label: "Principles" },
  { href: "/tools-built", label: "Tools" },
  { href: "/anti-portfolio", label: "Anti-Portfolio" },
  { href: "/decision-log", label: "Decision Log" },
  { href: "/skills", label: "Skills" },
];

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-6">
      <Link href="/" className="text-ctp-text font-semibold text-lg">
        Hamza El Haiba
      </Link>

      <div className="flex items-center gap-8 text-sm">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-ctp-subtext-0 hover:text-ctp-text transition-colors"
          >
            {link.label}
          </Link>
        ))}

        {/* More dropdown */}
        <div className="relative group">
          <button className="text-ctp-subtext-0 hover:text-ctp-text transition-colors cursor-pointer">
            More ▾
          </button>
          <div className="absolute right-0 top-full mt-2 w-44 bg-ctp-surface-0 border border-ctp-surface-1 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
            <div className="py-2">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-ctp-subtext-0 hover:text-ctp-text hover:bg-ctp-surface-1 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
