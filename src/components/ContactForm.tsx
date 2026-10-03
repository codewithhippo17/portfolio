"use client";

import React, { useState } from "react";
import { Button, buttonVariants, cn } from "@/components/ui/button";

const TOPICS = ["Opportunity", "Collaboration", "Other"];
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export default function ContactForm() {
  const [topic, setTopic] = useState("Opportunity");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("elhaiba.hamza@proton.me");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return; // Honeypot trap
    if (!email || !message) return;
    
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID || "xykroqbb"}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, message, topic }),
      });
      
      if (!res.ok) throw new Error("Failed to send message");
      
      setStatus("success");
      setEmail("");
      setMessage("");
      setTopic("Opportunity");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg("Failed to send. Please try the email button instead.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-left flex flex-col gap-6">
      {/* Header section */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-ctp-green/10 text-ctp-green border border-ctp-green/20 w-fit self-start">
          <span className="w-2 h-2 rounded-full bg-ctp-green animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Open to opportunities</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-ctp-text tracking-tight">
          Let's build something resilient.
        </h2>
        
        <p className="text-sm text-ctp-subtext0">
          Email is fastest. I reply within 24 hours.
        </p>
      </div>

      {/* Email Quick Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <a 
          href="mailto:elhaiba.hamza@proton.me?subject=Hello%20Hamza"
          className={cn(buttonVariants({ variant: "primary" }))}
        >
          EMAIL ME
        </a>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleCopyEmail}
          className="w-[120px]" 
        >
          {copied ? "COPIED" : "COPY EMAIL"}
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full opacity-60 py-2">
        <div className="flex-1 h-px bg-ctp-surface1" />
        <span className="text-xs font-mono uppercase tracking-widest text-ctp-subtext0">or send a message</span>
        <div className="flex-1 h-px bg-ctp-surface1" />
      </div>

      {/* Form */}
      {status === "success" ? (
        <div className="p-4 rounded-md bg-ctp-green/10 border border-ctp-green/20 text-ctp-green text-sm flex items-center justify-center font-medium">
          Message sent successfully! I'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="hidden" aria-hidden="true">
            <input type="text" tabIndex={-1} value={honey} onChange={(e) => setHoney(e.target.value)} />
          </div>

          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  topic === t 
                    ? "bg-ctp-surface1 border-ctp-surface2 text-ctp-text font-medium" 
                    : "bg-transparent border-ctp-surface0 text-ctp-subtext0 hover:border-ctp-surface1"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-ctp-base border border-ctp-surface0 rounded-md px-3 py-2 text-sm text-ctp-text placeholder:text-ctp-surface2 focus:outline-none focus:border-ctp-mauve focus:ring-1 focus:ring-ctp-mauve transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              required
              maxLength={2000}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can I help?"
              className="w-full bg-ctp-base border border-ctp-surface0 rounded-md px-3 py-2 text-sm text-ctp-text placeholder:text-ctp-surface2 focus:outline-none focus:border-ctp-mauve focus:ring-1 focus:ring-ctp-mauve transition-colors resize-none"
            />
          </div>

          {status === "error" && (
            <div className="text-xs text-ctp-red font-medium">{errorMsg}</div>
          )}

          <Button 
            type="submit" 
            variant="outline" 
            disabled={status === "sending" || !email || !message}
            className="self-end"
          >
            {status === "sending" ? "SENDING..." : "SEND"}
          </Button>
        </form>
      )}
    </div>
  );
}
