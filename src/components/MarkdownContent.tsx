"use client";

import { useEffect, useRef } from "react";

/**
 * Renders markdown-generated HTML with skeleton-shimmer image loading.
 *
 * Obsidian image embeds are wrapped in `<span class="md-img-wrap skeleton-shimmer">`
 * at build time (postprocessObsidianImages). The shimmer lives on the wrapper
 * via the existing `skeleton-shimmer` ::after sweep, while the `<img>` starts
 * at opacity 0. This effect fades each image in (`.md-loaded`) and strips the
 * shimmer class from its wrapper once loaded.
 *
 * A minimum shimmer duration guarantees the effect is visible even for
 * cached images (otherwise settle is instant and the shimmer never shows).
 */
export default function MarkdownContent({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const wraps = Array.from(container.querySelectorAll(".md-img-wrap"));
    const timers: ReturnType<typeof setTimeout>[] = [];
    const mountTime = performance.now();
    const MIN_SHIMMER_MS = 600;

    wraps.forEach((wrap) => {
      const img = wrap.querySelector("img");
      if (!img) return;

      const settle = (error = false) => {
        if (img.classList.contains("md-loaded") || img.classList.contains("md-error")) return;

        const remaining = Math.max(0, MIN_SHIMMER_MS - (performance.now() - mountTime));
        const tid = setTimeout(() => {
          if (img.classList.contains("md-loaded") || img.classList.contains("md-error")) return;
          img.classList.add(error ? "md-error" : "md-loaded");
          wrap.classList.remove("skeleton-shimmer");
        }, remaining);
        timers.push(tid);
      };

      if (img.complete) {
        settle(img.naturalWidth === 0);
        return;
      }
      img.addEventListener("load", () => settle(), { once: true });
      img.addEventListener("error", () => settle(true), { once: true });
    });

    // Safety net: never leave images invisible.
    const safetyNet = setTimeout(() => {
      wraps.forEach((wrap) => {
        const img = wrap.querySelector("img");
        if (img && !img.classList.contains("md-loaded") && !img.classList.contains("md-error")) {
          img.classList.add("md-loaded");
          wrap.classList.remove("skeleton-shimmer");
        }
      });
    }, 3000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(safetyNet);
    };
  }, [html]);

  return (
    <div
      ref={ref}
      className={`markdown-content text-ctp-subtext0 leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
