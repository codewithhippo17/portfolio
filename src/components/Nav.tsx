"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <nav className="sticky top-0 z-50 bg-ctp-base/90 backdrop-blur-md border-b border-ctp-surface-0/30">
      <div className="max-w-2xl mx-auto w-full px-6 flex items-center justify-between py-4 text-sm">
        
        {/* Primary Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "text-ctp-mauve font-bold underline underline-offset-4 decoration-2 transition-colors"
                    : "text-ctp-subtext-0 hover:text-ctp-text transition-colors"
                }
              >
                {link.label}
              </Link>
            );
          })}

          <DropdownMenu>
            <DropdownMenuTrigger className="text-ctp-subtext-0 hover:text-ctp-text transition-colors cursor-pointer">
              More ▾
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              {moreLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <DropdownMenuItem key={link.href} className="p-0">
                    <Link
                      href={link.href}
                      className={
                        active
                          ? "block w-full px-2 py-1.5 text-ctp-mauve font-bold transition-colors"
                          : "block w-full px-2 py-1.5 text-ctp-subtext-0 hover:text-ctp-text transition-colors"
                      }
                    >
                      {link.label}
                    </Link>
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
            className="font-mono text-[10px] sm:text-xs uppercase tracking-widest bg-ctp-green text-ctp-crust px-2 sm:px-2.5 py-1 rounded-[4px] font-bold cursor-pointer transition-colors hover:bg-ctp-text whitespace-nowrap"
          >
            Get in touch
          </button>
          <a
            href="/portfolio/attachments/elhaiba_hamza.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block font-mono text-[10px] sm:text-xs uppercase tracking-widest bg-ctp-peach text-ctp-crust px-2 sm:px-2.5 py-1 rounded-[4px] font-bold transition-colors hover:bg-ctp-text whitespace-nowrap"
          >
            Resume
          </a>
        </div>

      </div>
    </nav>
  );
}
