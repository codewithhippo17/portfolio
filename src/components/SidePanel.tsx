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
        <div className="flex xl:hidden justify-end gap-4 pb-2 pt-[10px]">
          <button
            onClick={() => handleOpen("scratchpad")}
            className="text-xs uppercase tracking-widest text-ctp-mauve font-bold cursor-pointer hover:opacity-80 transition-colors select-none"
          >
            [+ scratchpad]
          </button>
          <button
            onClick={() => handleOpen("hireme")}
            className="text-xs uppercase tracking-widest text-ctp-green font-bold cursor-pointer hover:opacity-80 transition-colors select-none"
          >
            [hire me]
          </button>
        </div>
        {/* Desktop: sidebar CTAs */}
        <aside
          className="hidden xl:flex fixed top-16 flex-col font-mono text-sm"
          style={{
            left: "calc(50vw + 416px)",
            width: "300px",
            maxWidth: "calc(50vw - 416px - 2rem)",
          }}
        >
          <button
            onClick={() => handleOpen("scratchpad")}
            className="text-left select-none uppercase tracking-widest text-xs text-ctp-mauve font-bold cursor-pointer transition-colors hover:opacity-80"
          >
            [+ open scratchpad]
          </button>
          <button
            onClick={() => handleOpen("hireme")}
            className="text-left select-none uppercase tracking-widest text-xs text-ctp-green font-bold cursor-pointer transition-colors hover:opacity-80 mt-2"
          >
            [hire me]
          </button>
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
