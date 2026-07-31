"use client";
import React, { useState } from "react";

export default function ContactMadlibs() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1000); // Simulate submit
  };

  return (
    <section className="py-16 border-t border-ctp-surface-0/50 mt-12 mb-4">
      <h2 className="text-2xl font-bold text-ctp-text mb-8 tracking-tight">Got a project? Let's talk.</h2>
      <form onSubmit={handleSubmit} className="text-lg md:text-xl leading-loose text-ctp-subtext-0 font-light">
        Hi, my name is{" "}
        <input 
          type="text" 
          placeholder="your name" 
          required
          className="bg-transparent border-b border-ctp-surface-2 focus:border-ctp-mauve outline-none px-2 py-0 text-ctp-text w-40 placeholder:text-ctp-surface-2 transition-colors"
        />{" "}
        and I'm looking for an engineer to help me build{" "}
        <select required defaultValue="" className="bg-transparent border-b border-ctp-surface-2 focus:border-ctp-mauve outline-none px-2 py-0 text-ctp-text appearance-none cursor-pointer transition-colors max-w-full">
          <option value="" disabled>a specific project</option>
          <option value="frontend">a frontend application</option>
          <option value="fullstack">a full-stack product</option>
          <option value="design">a design system</option>
          <option value="other">something else</option>
        </select>
        . You can reach me at{" "}
        <input 
          type="email" 
          placeholder="your@email.com" 
          required
          className="bg-transparent border-b border-ctp-surface-2 focus:border-ctp-mauve outline-none px-2 py-0 text-ctp-text w-56 placeholder:text-ctp-surface-2 transition-colors"
        />{" "}
        to discuss the details.
        
        <div className="mt-10">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-ctp-text text-ctp-base px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-ctp-mauve transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </div>
      </form>
    </section>
  );
}
