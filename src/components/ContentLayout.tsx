"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
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
  const [scrollDistanceToBottom, setScrollDistanceToBottom] = useState(1000);
  const [footerHeight, setFooterHeight] = useState(150);

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

  // Track scroll distance for the footer reveal fade-out
  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const distance = documentHeight - (scrollY + windowHeight);
      setScrollDistanceToBottom(Math.max(0, distance));

      const spacerEl = document.getElementById("footer-spacer");
      if (spacerEl) {
        setFooterHeight(spacerEl.clientHeight);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleSelect = (chapter: Chapter) => {
    const el = document.getElementById(chapter.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const squishProgress = Math.min(1, Math.max(0, (footerHeight - scrollDistanceToBottom) / footerHeight));
  const opacity = 1 - (squishProgress * 1);
  const scale = 1 - (squishProgress * 0.1);
  const translateY = `calc(-50% + ${squishProgress * 50}px)`;

  return (
    <div className="relative w-full">
      {/* Main Content */}
      <div className="w-full">
        {children}
      </div>

      {/* Sidebar TOC - Fixed to the right of the screen, fades out when footer reveals */}
      {chapters.length > 0 && (
        <motion.aside 
          className="hidden lg:block fixed right-8 xl:right-12 top-1/2 z-40 origin-right"
          style={{ opacity, scale, translateY }}
        >
          <ChapterScrubber
            chapters={chapters}
            currentIndex={activeIndex}
            onSelect={handleSelect}
            side="left"
            rowHeight={16}
            restLength={50}
            peakLength={76}
            radius={1}
          />
        </motion.aside>
      )}
    </div>
  );
}
