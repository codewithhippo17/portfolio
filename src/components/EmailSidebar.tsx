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
  const [scrollDistanceToBottom, setScrollDistanceToBottom] = useState(1000);
  const [footerHeight, setFooterHeight] = useState(150);

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

  const squishProgress = Math.min(
    1,
    Math.max(0, (footerHeight - scrollDistanceToBottom) / footerHeight)
  );
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
      <div className="flex flex-col items-center relative">
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="m-5 p-2.5 font-mono text-xs leading-[1.125rem] tracking-[0.1em] [writing-mode:vertical-rl] text-ctp-subtext0 transition-transform duration-300 hover:-translate-y-[3px] focus-visible:-translate-y-[3px] hover:text-ctp-mauve focus-visible:text-ctp-mauve outline-none"
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
