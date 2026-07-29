"use client";

import { useState, useEffect } from "react";
import Scratchpad from "./Scratchpad";
import HireMe from "./HireMe";

type PanelMode = "scratchpad" | "hireme";

export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [mode, setMode] = useState<PanelMode>("scratchpad");

  // ── Load persisted state ──
  useEffect(() => {
    const savedState = localStorage.getItem("sidepanel_is_open");
    if (savedState !== null) setIsOpen(savedState === "true");

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

  // Shared positioning
  const panelStyle = {
    left: "calc(50vw + 416px)",
    width: "300px",
    maxWidth: "calc(50vw - 416px - 2rem)",
  } as const;

  // ═══════════════════════════
  //  CLOSED STATE — two CTAs
  // ═══════════════════════════
  if (!isOpen) {
    return (
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
  }

  // ═══════════════════════════
  //  OPEN STATE — delegate to
  //  the active component
  // ═══════════════════════════
  return (
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
}
