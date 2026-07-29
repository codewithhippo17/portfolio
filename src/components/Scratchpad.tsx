"use client";

import { useState, useEffect } from "react";

interface ScratchpadProps {
  onClose: () => void;
}

export default function Scratchpad({ onClose }: ScratchpadProps) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Load text from local storage on mount
  useEffect(() => {
    const savedText = localStorage.getItem("scratchpad_text");
    if (savedText) setText(savedText);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    localStorage.setItem("scratchpad_text", e.target.value);
  };

  const handleClear = () => {
    setText("");
    localStorage.setItem("scratchpad_text", "");
  };

  const handleCloseAndClear = () => {
    handleClear();
    onClose();
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between text-ctp-surface-2 select-none uppercase tracking-widest text-xs">
        <span className="text-ctp-mauve font-bold"># Scratchpad</span>
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-ctp-yellow font-bold cursor-pointer transition-colors hover:opacity-80"
            aria-label="Hide scratchpad"
          >
            [-]
          </button>
          <button
            onClick={handleCloseAndClear}
            className="text-ctp-red font-bold cursor-pointer transition-colors hover:opacity-80"
            aria-label="Close and clear scratchpad"
          >
            [x]
          </button>
        </div>
      </div>
      <textarea
        className="w-full h-[300px] bg-transparent resize-none outline-none text-ctp-text placeholder-ctp-surface-1 no-scrollbar overscroll-contain"
        placeholder="> _"
        spellCheck={false}
        value={text}
        onChange={handleTextChange}
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleCopy}
          className={`text-xs uppercase tracking-widest select-none transition-colors ${
            copied ? "text-ctp-green" : "text-ctp-surface-2 hover:text-ctp-mauve"
          }`}
          aria-label="Copy to clipboard"
        >
          {copied ? "[copied!]" : "[copy]"}
        </button>
      </div>
    </>
  );
}
