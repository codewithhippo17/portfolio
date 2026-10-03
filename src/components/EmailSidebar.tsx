"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * EmailSidebar — faithful port of brittanychiang.com v4's right-side email rail.
 *
 * v4 source (github.com/bchiang7/v4, "fork with credit" license):
 *   src/components/side.js    → StyledSideElement: 40px wide, fixed bottom-right,
 *                               z-10, light-slate, hidden on mobile, fades in on mount
 *   src/components/email.js   → StyledLinkWrapper: vertical-rl mono email + 1px trailing line
 *
 * Like the sibling SocialSidebar, the rail squishes away as the sticky footer
 * reveals so it never overlaps the footer at the bottom of the page.
 * Animation is scroll-driven via the same `style` motion values used by
 * SocialSidebar (opacity → 0, y → 50, scale → 0.8, line shrinks to 0).
 */

export const SITE_EMAIL = "elhaiba.hamza@proton.me";

export default function EmailSidebar() {
  const [squishProgress, setSquishProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const distance = documentHeight - (scrollY + windowHeight);
      
      const spacerEl = document.getElementById("footer-spacer");
      const footerHeight = spacerEl ? spacerEl.clientHeight : 150;
      
      const progress = Math.min(1, Math.max(0, (footerHeight - distance) / footerHeight));
      
      setSquishProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const opacity = 1 - squishProgress;
  const y = squishProgress * 50;
  const scale = 1 - squishProgress * 0.2;

  return (
    <motion.aside
      aria-label="Email"
      style={{ opacity, y, scale }}
      className="hidden md:flex w-10 fixed bottom-0 right-10 z-10 flex-col items-center text-ctp-subtext0 origin-bottom"
    >
      {/* StyledLinkWrapper: flex column, centered, relative */}
      <div className="flex flex-col items-center relative w-full h-full">
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="p-2 font-mono text-sm leading-relaxed tracking-[0.15em] [writing-mode:vertical-rl] text-ctp-subtext0 transition-transform duration-300 hover:-translate-y-[3px] focus-visible:-translate-y-[3px] hover:text-ctp-mauve focus-visible:text-ctp-mauve outline-none"
        >
          {SITE_EMAIL}
        </a>

        {/* :after — the 1px × 90px trailing line, shrinks like SocialSidebar */}
        <motion.div
          style={{
            width: "1px",
            height: `${90 * (1 - squishProgress)}px`,
            backgroundColor: "var(--catppuccin-color-subtext0)",
            marginTop: "20px",
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      </div>
    </motion.aside>
  );
}
