"use client";

import { useEffect, useRef } from "react";

/**
 * Renders markdown-generated HTML with skeleton-shimmer image loading.
 *
 * Every <img> in the content gets a shimmer placeholder that fades the
 * image in once loaded. The `.md-images-loading` class is added on mount
 * (not at SSR time) so content never flashes invisible before JS runs.
 *
 * Handles the cached-image case: if the image finished loading before
 * hydration (browser cache), the `load` event never fires again, so we
 * check `img.complete` on mount — same guard as ProjectThumbnail.
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

    container.classList.add("md-images-loading");

    const images = Array.from(container.querySelectorAll("img"));
    let settled = 0;

    const settle = (img: HTMLImageElement, error = false) => {
      if (img.classList.contains("md-loaded") || img.classList.contains("md-error")) {
        return;
      }
      img.classList.add(error ? "md-error" : "md-loaded");
      settled += 1;
      if (settled === images.length) {
        container.classList.remove("md-images-loading");
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        // Already loaded (cached) or failed before hydration.
        settle(img, img.naturalWidth === 0);
        return;
      }
      img.addEventListener("load", () => settle(img), { once: true });
      img.addEventListener("error", () => settle(img, true), { once: true });
    });

    // Zero images (or all settled synchronously) — no shimmer needed.
    if (settled === images.length) {
      container.classList.remove("md-images-loading");
    }

    // Safety net: if no images exist, or a load event is missed
    // (e.g. lazy images below the fold), never leave content invisible.
    const timeout = setTimeout(() => {
      if (settled !== images.length) {
        images.forEach((img) => {
          if (!img.classList.contains("md-loaded") && !img.classList.contains("md-error")) {
            settle(img);
          }
        });
      }
      container.classList.remove("md-images-loading");
    }, 3000);

    return () => {
      clearTimeout(timeout);
      container.classList.remove("md-images-loading");
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
