"use client";

import { useEffect, useRef, useState } from "react";
import TechIcon from "@/components/TechIcon";

/**
 * Project thumbnail with a skeleton-shimmer loader.
 *
 * - No `src` (or a broken image): renders an animated shimmer placeholder
 *   with the project's tech icon tinted by its category accent.
 * - Has `src`: shows the shimmer until the image loads, then fades it in.
 */
export default function ProjectThumbnail({
  src,
  alt,
  iconName,
  tintClass = "text-ctp-mauve",
  className = "",
}: {
  src?: string;
  alt: string;
  iconName?: string;
  tintClass?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If the image finished loading before React hydrated (cached/fast),
  // the `load` event already fired — mark it loaded immediately.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  const showPlaceholder = !src || failed;

  return (
    <div className={`relative z-0 overflow-hidden bg-ctp-surface0 ${className}`}>
      {showPlaceholder ? (
        <div className="skeleton-shimmer absolute inset-0 flex items-center justify-center">
          <span className={`opacity-40 ${tintClass}`}>
            <TechIcon name={iconName ?? "code"} size={26} />
          </span>
        </div>
      ) : (
        <>
          {!loaded && <div className="skeleton-shimmer absolute inset-0" />}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      )}
    </div>
  );
}
