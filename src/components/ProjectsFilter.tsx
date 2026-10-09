"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Sparkles, Circle } from "lucide-react";
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
import type { ContentItem, ProjectFrontmatter } from "@/lib/md";

type Project = ContentItem<ProjectFrontmatter>;

// Category → Catppuccin accent classes
const categoryAccents: Record<string, { text: string; bar: string }> = {
  "Web Apps": { text: "text-ctp-mauve", bar: "bg-ctp-mauve" },
  "AI/ML": { text: "text-ctp-green", bar: "bg-ctp-green" },
  Tools: { text: "text-ctp-blue", bar: "bg-ctp-blue" },
  "Open Source": { text: "text-ctp-peach", bar: "bg-ctp-peach" },
  Systems: { text: "text-ctp-red", bar: "bg-ctp-red" },
  Graphics: { text: "text-ctp-teal", bar: "bg-ctp-teal" },
  Networking: { text: "text-ctp-sky", bar: "bg-ctp-sky" },
  DevOps: { text: "text-ctp-lavender", bar: "bg-ctp-lavender" },
};

const defaultAccent = { text: "text-ctp-subtext0", bar: "bg-ctp-surface2" };

export default function ProjectsFilter({
  categoriesMap,
}: {
  categoriesMap: [string, Project[]][];
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
  
  const allProjects = categoriesMap.flatMap(([_, projs]) => projs);
  const featured = allProjects.filter((p) => p.frontmatter.featured);

  return (
    <div suppressHydrationWarning className="space-y-8">
      {/* Filter fixed at the top left of the entire page */}
      <div 
        className="fixed top-24 left-4 md:left-8 z-50 w-full max-w-[240px]"
        style={{ 
          opacity: filterOpacity, 
          pointerEvents: filterOpacity < 0.2 ? 'none' : 'auto',
          transition: 'opacity 0.1s ease-out'
        }}
      >
        <MultiSelect 
          value={selectedCategories} 
          onValueChange={setSelectedCategories}
        >
          <MultiSelectTrigger>
            <MultiSelectValue placeholder="Filter by category">
              {(value, label) => {
                const accent = categoryAccents[value] ?? defaultAccent;
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
            <MultiSelectInput aria-label="Search categories" />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectList ariaLabel="Categories">
              <MultiSelectGroup>
                <MultiSelectLabel>Categories</MultiSelectLabel>
                {categoriesMap.map(([category]) => {
                  const accent = categoryAccents[category] ?? defaultAccent;
                  return (
                    <MultiSelectItem key={category} value={category} textValue={category}>
                      <span className="flex items-center gap-2.5">
                        <Circle 
                          aria-hidden="true" 
                          className={`size-2.5 ${accent.text}`} 
                          fill="currentColor"
                        />
                        {category}
                      </span>
                    </MultiSelectItem>
                  );
                })}
              </MultiSelectGroup>
              <MultiSelectEmpty>No categories found.</MultiSelectEmpty>
            </MultiSelectList>
          </MultiSelectContent>
        </MultiSelect>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-ctp-text mb-2 tracking-tight">
          Projects
        </h1>
        <p className="text-ctp-subtext0 text-sm">
          Systems I&apos;ve built, untangled, or killed. With the real
          constraints.
        </p>
      </div>

      {/* Featured (only show if no filter or if their category is selected) */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight text-ctp-mauve">
            <Sparkles size={16} /> Featured
          </h2>
          <div className="space-y-4">
            {featured.filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.frontmatter.category)).map((project) => {
              const accent =
                categoryAccents[project.frontmatter.category] ?? defaultAccent;
              return (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  accentText={accent.text}
                  accentBar={accent.bar}
                  featured
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Category lists */}
      {categoriesMap.map(([category, projects]) => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
          return null;
        }

        const accent = categoryAccents[category] ?? defaultAccent;
        const rest = projects.filter((p) => !p.frontmatter.featured);

        if (rest.length === 0) return null;

        return (
          <section key={category} className="mb-10">
            <h2
              className={`mb-3 text-lg font-semibold tracking-tight ${accent.text}`}
            >
              {category}
            </h2>
            <div className="space-y-3">
              {rest.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  accentText={accent.text}
                  accentBar={accent.bar}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
