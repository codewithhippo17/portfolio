"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const opportunities = [
  { value: "fulltime", label: "a full-time engineering role" },
  { value: "internship", label: "an internship opportunity" },
  { value: "freelance", label: "a freelance/consulting project" },
  { value: "opensource", label: "an open-source collaboration" },
  { value: "podcast", label: "an interview or podcast appearance" },
  { value: "coffee", label: "grabbing a coffee to talk tech" },
];

export default function ContactMadlibs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [opportunity, setOpportunity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opportunity) {
      alert("Please select an opportunity before sending.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const selectedLabel = opportunities.find((o) => o.value === opportunity)?.label;

  return (
    <section className="py-16 border-t border-ctp-surface-0/50 mt-12 mb-4">
      <h2 className="text-2xl font-bold text-ctp-text mb-8 tracking-tight">Let's build something resilient.</h2>
      <form onSubmit={handleSubmit} className="text-lg md:text-xl leading-loose text-ctp-subtext-0 font-light max-w-3xl">
        Hi Hamza, my name is{" "}
        <input 
          type="text" 
          placeholder="your name" 
          required
          className="bg-transparent border-b border-ctp-surface-2 focus:border-ctp-mauve outline-none px-2 py-0 text-ctp-text w-40 placeholder:text-ctp-surface-2 transition-colors"
        />{" "}
        and I'm reaching out from{" "}
        <input 
          type="text" 
          placeholder="company/org (optional)" 
          className="bg-transparent border-b border-ctp-surface-2 focus:border-ctp-mauve outline-none px-2 py-0 text-ctp-text w-56 placeholder:text-ctp-surface-2 transition-colors"
        />
        . I'd love to get in touch with you regarding{" "}
        
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-transparent border-b border-ctp-surface-2 focus:border-ctp-mauve outline-none px-2 py-0 text-ctp-text cursor-pointer transition-colors inline-flex items-center gap-1 group">
            {selectedLabel ? (
              <span>{selectedLabel}</span>
            ) : (
              <span className="text-ctp-surface-2">an opportunity...</span>
            )}
            <span className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">▾</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[320px] bg-ctp-base border border-ctp-surface-0 shadow-lg p-1 z-50">
            {opportunities.map((opt) => (
              <DropdownMenuItem 
                key={opt.value} 
                onClick={() => setOpportunity(opt.value)}
                className="cursor-pointer text-ctp-subtext-0 hover:text-ctp-mauve hover:bg-ctp-surface-0 px-3 py-2 text-base transition-colors rounded-sm"
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <input type="hidden" name="opportunity" value={opportunity} required />

        . You can reach me at{" "}
        <input 
          type="email" 
          placeholder="your@email.com" 
          required
          className="bg-transparent border-b border-ctp-surface-2 focus:border-ctp-mauve outline-none px-2 py-0 text-ctp-text w-56 placeholder:text-ctp-surface-2 transition-colors"
        />{" "}
        to discuss potential next steps.
        
        <div className="mt-10">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-ctp-text text-ctp-base px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-ctp-mauve transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
}
