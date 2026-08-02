"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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
  { href: "/anti-portfolio", label: "Anti-Portfolio" },
  { href: "/decision-log", label: "Decision Log" },
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

  const scrollToContact = () => {
    const form = document.getElementById("contact-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const nameInput = form.querySelector('input[type="text"]') as HTMLInputElement;
        if (nameInput) nameInput.focus();
      }, 600);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-ctp-base/90 backdrop-blur-md border-b border-ctp-surface0/30">
      <div className="max-w-2xl mx-auto w-full px-6 flex items-center justify-between py-4 text-sm">
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
            {moreLinks.map((link) => (
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

        {/* Desktop: primary links + More dropdown (hidden below sm) */}
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

          <DropdownMenu>
            <DropdownMenuTrigger className="text-ctp-subtext0 hover:text-ctp-text transition-colors cursor-pointer">
              More ▾
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              {moreLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <DropdownMenuItem key={link.href} className="p-0">
                    <NavLink href={link.href} active={active}>
                      {link.label}
                    </NavLink>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToContact}
            className="font-mono text-[10px] sm:text-xs uppercase tracking-widest bg-[#81c8be] text-ctp-base px-2 sm:px-2.5 py-1 rounded-[4px] font-bold cursor-pointer transition-colors hover:bg-ctp-text dark:text-ctp-crust whitespace-nowrap"
          >
            Get in touch
          </button>
          <a
            href="/portfolio/attachments/elhaiba_hamza.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block font-mono text-[10px] sm:text-xs uppercase tracking-widest bg-ctp-peach text-ctp-base px-2 sm:px-2.5 py-1 rounded-[4px] font-bold transition-colors hover:bg-ctp-text dark:text-ctp-crust whitespace-nowrap"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
