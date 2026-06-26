"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/skills", label: "Skills" },
  { href: "/failure-log", label: "Failure Log" },
  { href: "/mental-models", label: "Mental Models" },
  { href: "/engineering-principles", label: "Principles" },
  { href: "/tools-built", label: "Tools" },
  { href: "/anti-portfolio", label: "Anti-Portfolio" },
  { href: "/decision-log", label: "Decision Log" },
];

export default function Nav() {
  return (
    <nav className="flex flex-wrap md:flex-col gap-4 md:gap-3 text-sm">
      <div className="font-bold text-ctp-text mb-2 hidden md:block tracking-tight">Hamza El Haiba</div>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-ctp-subtext-0 hover:text-ctp-text hover:translate-x-1 transition-all"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
