"use client";

import { useState, useEffect } from "react";
import Scratchpad from "./Scratchpad";
import HireMe from "./HireMe";

type PanelMode = "scratchpad" | "hireme";

export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<PanelMode>("scratchpad");

  // ── Load persisted state, open by default on desktop ──
  useEffect(() => {
    const savedState = localStorage.getItem("sidepanel_is_open");
    if (savedState !== null) {
      setIsOpen(savedState === "true");
    } else if (window.innerWidth >= 1280) {
      setIsOpen(true);
    }

    const savedMode = localStorage.getItem("sidepanel_mode");
    if (savedMode === "scratchpad" || savedMode === "hireme") setMode(savedMode);
  }, []);

  // Persist mode changes
  useEffect(() => {
    localStorage.setItem("sidepanel_mode", mode);
  }, [mode]);

  // Persist open/close
  useEffect(() => {
    localStorage.setItem("sidepanel_is_open", String(isOpen));
  }, [isOpen]);

  const handleOpen = (m: PanelMode) => {
    setIsOpen(true);
    setMode(m);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // ── Persistent top-right CTA bar (mobile) and sidebar CTAs (desktop) ──
  if (!isOpen) {
    return (
      <>
        {/* Mobile: top-right bar */}
        <div className="flex xl:hidden justify-end gap-3 pb-2 pt-[10px]">
          <button
            onClick={() => handleOpen("scratchpad")}
            className="text-xs uppercase tracking-widest bg-ctp-mauve text-ctp-crust px-2.5 py-1 rounded-[4px] font-bold cursor-pointer hover:bg-ctp-text transition-colors select-none"
          >
            Scratchpad
          </button>
          <button
            onClick={() => handleOpen("hireme")}
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
            onClick={() => handleOpen("scratchpad")}
            className="text-left select-none uppercase tracking-widest text-xs bg-ctp-mauve text-ctp-crust px-2.5 py-1 rounded-[4px] font-bold cursor-pointer transition-colors hover:bg-ctp-text self-start"
          >
            Scratchpad
          </button>
          <button
            onClick={() => handleOpen("hireme")}
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
      {mode === "scratchpad" ? (
        <Scratchpad onClose={handleClose} />
      ) : (
        <HireMe onClose={handleClose} />
      )}
    </aside>
  );

  // ── Mobile overlay ──
  const mobileOpen = (
    <div className="fixed inset-0 z-50 flex xl:hidden bg-ctp-base p-6 pt-20 overflow-y-auto">
      <div className="flex flex-col w-full font-mono text-sm">
        {mode === "scratchpad" ? (
          <Scratchpad onClose={handleClose} />
        ) : (
          <HireMe onClose={handleClose} />
        )}
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
