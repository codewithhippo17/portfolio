"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChapterScrubber, type Chapter } from "@/components/ui/chapter-scrubber";

interface ContentLayoutProps {
  children: React.ReactNode;
  headings: { id: string; title: string; depth: number }[];
}

export default function ContentLayout({ children, headings }: ContentLayoutProps) {
  // Only use H2 and H3 for chapters to avoid clutter
  const chapters: Chapter[] = headings
    .filter((h) => h.depth === 2 || h.depth === 3)
    .map((h, i) => ({
      id: h.id,
      title: h.title,
      meta: h.depth === 3 ? "Subsection" : undefined,
    }));

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (chapters.length === 0) return;
    
    // Setup intersection observer to track which heading is currently in view
    const headingElements = chapters.map((ch) => document.getElementById(ch.id));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = chapters.findIndex((ch) => ch.id === entry.target.id);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 }
    );

    headingElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [chapters]);

  const handleSelect = (chapter: Chapter) => {
    const el = document.getElementById(chapter.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Main Content */}
      <div className="w-full">
        {children}
      </div>

      {/* Sidebar TOC - Pushed to the right of the 2xl container on larger screens */}
      {chapters.length > 0 && (
        <aside className="hidden lg:block absolute left-full top-24 ml-12 h-[calc(100vh-6rem)]">
          <ChapterScrubber
            chapters={chapters}
            currentIndex={activeIndex}
            onSelect={handleSelect}
            side="left"
          />
        </aside>
      )}
    </div>
  );
}
