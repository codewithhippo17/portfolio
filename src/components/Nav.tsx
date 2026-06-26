"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home" },
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
    <nav className="sticky top-0 z-50 bg-ctp-base/80 backdrop-blur-sm">
      <div className="max-w-xl mx-auto w-full px-6 flex items-center justify-end gap-8 py-4 text-sm">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-ctp-subtext-0 hover:text-ctp-text transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger className="text-ctp-subtext-0 hover:text-ctp-text transition-colors cursor-pointer">
            More ▾
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {moreLinks.map((link) => (
              <DropdownMenuItem key={link.href} className="p-0">
                <Link
                  href={link.href}
                  className="block w-full px-2 py-1.5 text-ctp-subtext-0 hover:text-ctp-text"
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
