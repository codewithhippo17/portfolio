"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="mb-8 relative overflow-hidden rounded-xl border border-ctp-surface0/70 shadow-sm bg-ctp-surface0 skeleton-shimmer min-h-[200px] sm:min-h-[300px]">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`relative z-10 w-full h-auto max-h-[400px] object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
