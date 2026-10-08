"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants, cn } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "block w-full px-2 py-1.5 text-ctp-mauve font-bold transition-colors"
          : "block w-full px-2 py-1.5 text-ctp-subtext0 hover:text-ctp-text transition-colors"
      }
    >
      {children}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-ctp-base/80 backdrop-blur-md border-b border-ctp-surface0/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.25)]">
      <div className="max-w-3xl mx-auto w-full px-6 flex items-center justify-between py-4 text-sm">
        {/* Mobile: hamburger menu (hidden at sm+) */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open menu"
            className="sm:hidden -ml-1 p-1.5 text-ctp-subtext0 hover:text-ctp-text transition-colors cursor-pointer"
          >
            <Menu className="size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 sm:hidden">
            {navLinks.map((link) => (
              <DropdownMenuItem key={link.href} className="p-0">
                <NavLink href={link.href} active={isActive(link.href)}>
                  {link.label}
                </NavLink>
              </DropdownMenuItem>
            ))}
            <div className="my-1 border-t border-ctp-surface0/30" role="separator" />
            <DropdownMenuItem className="p-0">
              <a
                href="/portfolio/attachments/elhaiba_hamza.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ctp-peach hover:text-ctp-text transition-colors"
              >
                Resume ↗
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Desktop: primary links (hidden below sm) */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-6">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "text-ctp-mauve font-bold underline underline-offset-4 decoration-2 transition-colors"
                    : "text-ctp-subtext0 hover:text-ctp-text transition-colors"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          {/* Secondary CTA: Resume */}
          <a
            href="/portfolio/attachments/elhaiba_hamza.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download my resume as a PDF document"
            className={cn(buttonVariants({ variant: "outline" }), "hidden sm:inline-flex group h-9 px-3.5")}
          >
            Resume
            <Download className="size-3.5 ml-2 transition-transform group-hover:-translate-y-[2px]" aria-hidden="true" />
          </a>

          {/* Primary CTA: Reach Out */}
          <a href="#contact" className={cn(buttonVariants(), "h-9 px-4")}>
            Reach Out
          </a>
        </div>
      </div>
    </nav>
  );
}
