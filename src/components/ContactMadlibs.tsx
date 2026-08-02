"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Formspree endpoint for the contact form.
// https://formspree.io/f/xykroqbb — ID injected at build time:
//   local: .env.local (NEXT_PUBLIC_FORMSPREE_ID)
//   CI:    .github/workflows/deploy.yml maps secrets.FORMSPREE_ID → NEXT_PUBLIC_FORMSPREE_ID
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const opportunities = [
  { value: "fulltime", label: "a full-time engineering role" },
  { value: "internship", label: "an internship opportunity" },
  { value: "freelance", label: "a freelance/consulting project" },
  { value: "opensource", label: "an open-source collaboration" },
  { value: "podcast", label: "an interview or podcast appearance" },
  { value: "coffee", label: "grabbing a coffee to talk tech" },
];

// MUST be defined outside the main component so React doesn't unmount it on every render
const AutoSizeInput = ({ 
  value, 
  onChange, 
  placeholder, 
  type = "text",
  required = false
}: { 
  value: string; 
  onChange: (val: string) => void; 
  placeholder: string;
  type?: string;
  required?: boolean;
}) => {
  return (
    <div className="inline-grid [grid-template-columns:min-content] relative items-center align-baseline">
      {/* The Invisible Mirror */}
      <span className={`invisible col-start-1 row-start-1 whitespace-pre px-2 pointer-events-none ${value ? 'font-bold' : 'font-light'}`}>
        {value || placeholder}
      </span>
      {/* The Actual Input */}
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="col-start-1 row-start-1 w-full min-w-0 bg-transparent border-b border-ctp-surface2 focus:border-ctp-mauve outline-none px-2 py-0 text-ctp-text font-bold placeholder:font-light placeholder:text-ctp-surface2 transition-colors"
      />
    </div>
  );
};

export default function ContactMadlibs() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [opportunity, setOpportunity] = useState("");
  
  // Controlled states for dynamic sizing
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!opportunity) {
      alert("Please select an opportunity before sending.");
      return;
    }
    setFormStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: JSON.stringify({
          name,
          company,
          email,
          opportunity: opportunities.find((o) => o.value === opportunity)?.label,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (res.ok) {
        setFormStatus("sent");
        setName("");
        setCompany("");
        setEmail("");
        setOpportunity("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const selectedLabel = opportunities.find((o) => o.value === opportunity)?.label;

  return (
    <section id="contact-form" className="py-16 border-t border-ctp-surface0/50 mt-12 mb-4">
      <h2 className="text-2xl font-bold text-ctp-text mb-8 tracking-tight">Let's build something resilient.</h2>
      <form onSubmit={handleSubmit} className="text-lg md:text-xl leading-loose text-ctp-subtext0 font-light max-w-3xl">
        Hi Hamza, my name is{" "}
        <AutoSizeInput value={name} onChange={setName} placeholder="your name" required />
        {" "}and I'm reaching out from{" "}
        <AutoSizeInput value={company} onChange={setCompany} placeholder="company (optional)" />
        . I'd love to get in touch with you regarding{" "}
        
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-transparent border-b border-ctp-surface2 focus:border-ctp-mauve outline-none px-2 py-0 text-ctp-text cursor-pointer transition-colors inline-flex items-center gap-1 group">
            {selectedLabel ? (
              <span className="font-bold">{selectedLabel}</span>
            ) : (
              <span className="text-ctp-surface2 font-light">an opportunity...</span>
            )}
            <span className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">▾</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[320px] bg-ctp-base border border-ctp-surface0 shadow-lg p-1 z-50">
            {opportunities.map((opt) => (
              <DropdownMenuItem 
                key={opt.value} 
                onClick={() => setOpportunity(opt.value)}
                className="cursor-pointer text-ctp-subtext0 hover:text-ctp-mauve hover:bg-ctp-surface0 px-3 py-2 text-base transition-colors rounded-sm"
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <input type="hidden" name="opportunity" value={opportunity} required />

        . You can reach me at{" "}
        <AutoSizeInput value={email} onChange={setEmail} placeholder="your@email.com" type="email" required />
        {" "}to discuss potential next steps.
        
        <div className="mt-10 flex items-center gap-3">
          {formStatus === "sent" && (
            <span className="text-ctp-green text-sm">✓ sent — i&apos;ll get back to you soon.</span>
          )}
          {formStatus === "error" && (
            <span className="text-ctp-red text-sm">✗ failed. try again.</span>
          )}
          <button 
            type="submit" 
            disabled={formStatus === "sending" || !email || !name}
            className="font-mono text-xs uppercase tracking-widest bg-ctp-mauve text-[#4c4f69] px-2.5 py-1 rounded-[4px] font-bold cursor-pointer transition-colors hover:bg-ctp-text dark:text-ctp-crust disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formStatus === "sending" ? "sending..." : "submit_"}
          </button>
        </div>
      </form>
    </section>
  );
}
