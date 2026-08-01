"use client";
import React, { useRef, useEffect, useState } from "react";

export default function StickyFooterReveal({ children }: { children: React.ReactNode }) {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
    
    const observer = new ResizeObserver((entries) => {
      setHeight(entries[0].target.clientHeight);
    });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Spacer that creates the scrollable area at the bottom of the page */}
      <div style={{ height }} className="w-full" />
      
      {/* The actual footer content, fixed at the bottom of the viewport, behind main content */}
      <div className="fixed bottom-0 left-0 w-full z-[-1] pointer-events-none">
        <div 
          ref={ref} 
          className="absolute bottom-0 left-0 w-full pointer-events-auto"
        >
          {children}
        </div>
      </div>
    </>
  );
}
