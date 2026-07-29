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

const panelActions = [
  { id: "scratchpad" as const, label: "Scratchpad" },
  { id: "hireme" as const, label: "Hire Me" },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-ctp-base/80 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto w-full px-6 flex items-center justify-end gap-8 py-4 text-sm">
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
          <DropdownMenuContent align="end" className="w-44">
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
            <div className="border-t border-ctp-surface-1 my-1" />
            {panelActions.map((action) => (
              <DropdownMenuItem key={action.id} className="p-0">
                <button
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("open-sidepanel", { detail: action.id })
                    );
                  }}
                  className="block w-full text-left px-2 py-1.5 text-ctp-subtext-0 hover:text-ctp-mauve hover:font-bold transition-colors"
                >
                  {action.label}
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
