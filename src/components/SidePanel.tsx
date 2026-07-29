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

  // ── Listen for nav-triggered opens from mobile ──
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const m = e.detail as PanelMode;
      setMode(m);
      setIsOpen(true);
    };
    window.addEventListener("open-sidepanel" as any, handler as any);
    return () => window.removeEventListener("open-sidepanel" as any, handler as any);
  }, []);

  const handleOpen = (m: PanelMode) => {
    setIsOpen(true);
    setMode(m);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Desktop positioning — to the right of centered content
  const panelStyle = {
    left: "calc(50vw + 416px)",
    width: "300px",
    maxWidth: "calc(50vw - 416px - 2rem)",
  } as const;

  // ── Desktop closed state ──
  const desktopClosed = (
    <aside
      className="hidden xl:flex fixed top-16 flex-col font-mono text-sm"
      style={panelStyle}
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
  );

  // ── Desktop open state ──
  const desktopOpen = (
    <aside
      className="hidden xl:flex fixed top-16 flex-col font-mono text-sm group"
      style={panelStyle}
    >
      {mode === "scratchpad" ? (
        <Scratchpad onClose={handleClose} />
      ) : (
        <HireMe onClose={handleClose} />
      )}
    </aside>
  );

  // ── Mobile overlay (open state, triggered from Nav) ──
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

  // ═══════════════════════════
  //  RENDER — desktop-only sidebar,
  //  mobile overlay triggered by Nav
  // ═══════════════════════════
  if (isOpen) {
    return (
      <>
        {desktopOpen}
        {mobileOpen}
      </>
    );
  }

  return <>{desktopClosed}</>;
}
