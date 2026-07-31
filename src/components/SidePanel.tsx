"use client";

import { useState, useEffect } from "react";
import Scratchpad from "./Scratchpad";

export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(false);

  // ── Load persisted state, open by default on desktop ──
  useEffect(() => {
    const savedState = localStorage.getItem("sidepanel_is_open");
    if (savedState !== null) {
      setIsOpen(savedState === "true");
    } else if (window.innerWidth >= 1280) {
      setIsOpen(true);
    }
  }, []);

  // Persist open/close
  useEffect(() => {
    localStorage.setItem("sidepanel_is_open", String(isOpen));
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const scrollToContact = () => {
    const form = document.getElementById("contact-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
      // Add a slight delay to allow the smooth scroll to finish before focusing
      setTimeout(() => {
        const nameInput = form.querySelector('input[type="text"]') as HTMLInputElement;
        if (nameInput) nameInput.focus();
      }, 600);
    }
  };

  // ── Persistent top-right CTA bar (mobile) and sidebar CTAs (desktop) ──
  if (!isOpen) {
    return (
      <>
        {/* Mobile: top-right bar */}
        <div className="flex xl:hidden justify-end gap-3 pb-2 pt-[10px]">
          <button
            onClick={handleOpen}
            className="text-xs uppercase tracking-widest bg-ctp-mauve text-ctp-crust px-2.5 py-1 rounded-[4px] font-bold cursor-pointer hover:bg-ctp-text transition-colors select-none"
          >
            Scratchpad
          </button>
          <button
            onClick={scrollToContact}
            className="text-xs uppercase tracking-widest bg-ctp-green text-ctp-crust px-2.5 py-1 rounded-[4px] font-bold cursor-pointer hover:bg-ctp-text transition-colors select-none"
          >
            Get in touch
          </button>
          <a
            href="/portfolio/attachments/elhaiba_hamza.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest bg-ctp-peach text-ctp-crust px-2.5 py-1 rounded-[4px] font-bold hover:bg-ctp-text transition-colors select-none"
          >
            Resume
          </a>
        </div>
        {/* Desktop: sidebar CTAs */}
        <aside
          className="hidden xl:flex fixed top-16 flex-col font-mono text-base gap-2"
          style={{
            left: "calc(50vw + 416px)",
            width: "300px",
            maxWidth: "calc(50vw - 416px - 2rem)",
          }}
        >
          <button
            onClick={handleOpen}
            className="text-left select-none uppercase tracking-widest text-xs bg-ctp-mauve text-ctp-crust px-2.5 py-1 rounded-[4px] font-bold cursor-pointer transition-colors hover:bg-ctp-text self-start"
          >
            Scratchpad
          </button>
          <button
            onClick={scrollToContact}
            className="text-left select-none uppercase tracking-widest text-xs bg-ctp-green text-ctp-crust px-2.5 py-1 rounded-[4px] font-bold cursor-pointer transition-colors hover:bg-ctp-text self-start"
          >
            Get in touch
          </button>
          <a
            href="/portfolio/attachments/elhaiba_hamza.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-left uppercase tracking-widest text-xs bg-ctp-peach text-ctp-crust px-2.5 py-1 rounded-[4px] font-bold transition-colors hover:bg-ctp-text self-start"
          >
            Resume
          </a>
        </aside>
      </>
    );
  }

  // ── Desktop sidebar ──
  const desktopOpen = (
    <aside
      className="hidden xl:flex fixed top-16 flex-col font-mono text-sm group"
      style={{
        left: "calc(50vw + 416px)",
        width: "300px",
        maxWidth: "calc(50vw - 416px - 2rem)",
      }}
    >
      <Scratchpad onClose={handleClose} />
    </aside>
  );

  // ── Mobile overlay ──
  const mobileOpen = (
    <div className="fixed inset-0 z-50 flex xl:hidden bg-ctp-base p-6 pt-20 overflow-y-auto">
      <div className="flex flex-col w-full font-mono text-sm">
        <Scratchpad onClose={handleClose} />
      </div>
    </div>
  );

  return (
    <>
      {desktopOpen}
      {mobileOpen}
    </>
  );
}
