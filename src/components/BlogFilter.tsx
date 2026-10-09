"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Circle } from "lucide-react";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectEmpty,
  MultiSelectGroup,
  MultiSelectInput,
  MultiSelectItem,
  MultiSelectLabel,
  MultiSelectList,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/motion/multi-select";
import type { ContentItem, BaseFrontmatter } from "@/lib/md";
import ProjectThumbnail from "@/components/ProjectThumbnail";

function formatTitle(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Subfolder → Catppuccin accent classes
const folderAccents: Record<string, { text: string, hoverText: string, hoverBg: string }> = {
  "anti-portfolio": { text: "text-ctp-red", hoverText: "group-hover:text-ctp-red", hoverBg: "group-hover:bg-ctp-red" },
  "decision-log": { text: "text-ctp-blue", hoverText: "group-hover:text-ctp-blue", hoverBg: "group-hover:bg-ctp-blue" },
  "mental-models": { text: "text-ctp-mauve", hoverText: "group-hover:text-ctp-mauve", hoverBg: "group-hover:bg-ctp-mauve" },
  "failure-log": { text: "text-ctp-peach", hoverText: "group-hover:text-ctp-peach", hoverBg: "group-hover:bg-ctp-peach" },
  "engineering-principles": { text: "text-ctp-green", hoverText: "group-hover:text-ctp-green", hoverBg: "group-hover:bg-ctp-green" },
  "general": { text: "text-ctp-teal", hoverText: "group-hover:text-ctp-teal", hoverBg: "group-hover:bg-ctp-teal" },
};

const defaultAccent = { text: "text-ctp-subtext0", hoverText: "group-hover:text-ctp-subtext0", hoverBg: "group-hover:bg-ctp-subtext0" };

export default function BlogFilter({
  items,
  title,
  description,
  categorySlug,
}: {
  items: ContentItem<BaseFrontmatter>[];
  title: string;
  description?: string;
  categorySlug: string;
}) {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [filterOpacity, setFilterOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById("contact");
      if (!contactEl) return;
      
      const rect = contactEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top > windowHeight) {
        setFilterOpacity(1);
      } else {
        const fadeDistance = 400; // Pixels of scroll over which to fade out
        const visibleAmount = windowHeight - rect.top;
        const newOpacity = Math.max(0, 1 - visibleAmount / fadeDistance);
        setFilterOpacity(newOpacity);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Group items by folder
  const foldersMap = new Map<string, ContentItem<BaseFrontmatter>[]>();
  for (const item of items) {
    const folder = item.folder || "general";
    const existing = foldersMap.get(folder) || [];
    existing.push(item);
    foldersMap.set(folder, existing);
  }

  const sortedFolders = Array.from(foldersMap.keys()).sort();

  return (
    <div suppressHydrationWarning className="space-y-8">
      {/* Filter fixed at the top left of the entire page */}
      {sortedFolders.length > 0 && (
        <div 
          className="fixed top-24 left-4 md:left-8 z-50 w-full max-w-[240px]"
          style={{ 
            opacity: filterOpacity, 
            pointerEvents: filterOpacity < 0.2 ? 'none' : 'auto',
            transition: 'opacity 0.1s ease-out'
          }}
        >
          <MultiSelect 
            value={selectedFolders} 
            onValueChange={setSelectedFolders}
          >
            <MultiSelectTrigger>
              <MultiSelectValue placeholder="Filter by topic">
                {(value, label) => {
                  const accent = folderAccents[value] ?? defaultAccent;
                  return (
                    <span className="flex items-center gap-1.5">
                      <Circle
                        aria-hidden="true"
                        className={`size-2 ${accent.text}`}
                        fill="currentColor"
                      />
                      {label}
                    </span>
                  );
                }}
              </MultiSelectValue>
              <MultiSelectInput aria-label="Search topics" />
            </MultiSelectTrigger>
            <MultiSelectContent>
              <MultiSelectList ariaLabel="Topics">
                <MultiSelectGroup>
                  <MultiSelectLabel>Topics</MultiSelectLabel>
                  {sortedFolders.map((folder) => {
                    const accent = folderAccents[folder] ?? defaultAccent;
                    const displayName = formatTitle(folder);
                    return (
                      <MultiSelectItem key={folder} value={folder} textValue={displayName}>
                        <span className="flex items-center gap-2.5">
                          <Circle 
                            aria-hidden="true" 
                            className={`size-2.5 ${accent.text}`} 
                            fill="currentColor"
                          />
                          {displayName}
                        </span>
                      </MultiSelectItem>
                    );
                  })}
                </MultiSelectGroup>
                <MultiSelectEmpty>No topics found.</MultiSelectEmpty>
              </MultiSelectList>
            </MultiSelectContent>
          </MultiSelect>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-ctp-text mb-2 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-ctp-subtext0 mb-8 text-sm">
            {description}
          </p>
        )}
      </div>

      {/* Render grouped items */}
      {Array.from(foldersMap.entries()).map(([folder, folderItems]) => {
        // If there is an active filter, hide unselected folders
        if (selectedFolders.length > 0 && !selectedFolders.includes(folder)) {
          return null;
        }

        const accent = folderAccents[folder] ?? defaultAccent;
        const displayName = formatTitle(folder);

        return (
          <section key={folder} className="mb-10">
            <h2 className={`mb-3 text-lg font-semibold tracking-tight ${accent.text}`}>
              {displayName !== "General" ? displayName : "Other"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {folderItems.map((item) => {
                const thumbSrc = item.frontmatter.thumbnail
                  ? `/portfolio/attachments/${item.frontmatter.thumbnail}`
                  : undefined;

                return (
                  <div
                    key={item.slug}
                    className="group relative flex items-stretch overflow-hidden rounded-lg border border-ctp-surface0/70 bg-ctp-mantle/50 transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-1 hover:bg-ctp-surface0/40"
                  >
                    <Link
                      href={`/${categorySlug}/${item.slug}`}
                      className="absolute inset-0 z-10 rounded-lg"
                      aria-label={`Read ${item.frontmatter.title || item.slug}`}
                    />

                    <span className={`absolute inset-y-0 left-0 w-0.5 bg-ctp-surface2 transition-colors ${accent.hoverBg}`} />

                    <div className="relative flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                      <h3 className={`text-base font-semibold text-ctp-text transition-colors ${accent.hoverText} truncate`}>
                        {item.frontmatter.title || item.slug}
                      </h3>
                      
                      {item.frontmatter.description && (
                        <p className="mt-1 text-sm text-ctp-subtext0 line-clamp-2 leading-relaxed">
                          {item.frontmatter.description}
                        </p>
                      )}

                      <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-3">
                        {item.frontmatter.date && (
                          <span className="text-xs text-ctp-text font-mono uppercase tracking-wider">
                            {item.frontmatter.date}
                          </span>
                        )}
                      </div>
                    </div>

                    <ProjectThumbnail
                      src={thumbSrc}
                      alt={item.frontmatter.title || "Thumbnail"}
                      className="w-28 shrink-0 sm:w-44 border-l border-ctp-surface0/70"
                      iconName="markdown"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
