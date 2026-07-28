"use client";

import { useState, useEffect } from "react";

export default function Scratchpad() {
  const [isOpen, setIsOpen] = useState(true);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load text from local storage on mount
    const savedText = localStorage.getItem("scratchpad_text");
    if (savedText) {
      setText(savedText);
    }
    
    // Remember if the user left it open or closed
    const savedState = localStorage.getItem("scratchpad_is_open");
    if (savedState !== null) {
      setIsOpen(savedState === "true");
    }
  }, []);

  const handleToggle = (open: boolean) => {
    setIsOpen(open);
    localStorage.setItem("scratchpad_is_open", String(open));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    localStorage.setItem("scratchpad_text", e.target.value);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) {
    return (
      <aside 
        className="hidden xl:flex fixed top-16 flex-col font-mono text-sm cursor-pointer hover:text-ctp-mauve text-ctp-surface-2 transition-colors" 
        style={{ 
          left: 'calc(50vw + 416px)', 
          width: '300px', 
          maxWidth: 'calc(50vw - 416px - 2rem)' 
        }}
        onClick={() => handleToggle(true)}
      >
        <div className="select-none uppercase tracking-widest text-xs">
          [+ open scratchpad]
        </div>
      </aside>
    );
  }

  return (
    <aside 
      className="hidden xl:flex fixed top-16 bottom-16 flex-col font-mono text-sm group" 
      style={{ 
        left: 'calc(50vw + 416px)', 
        width: '300px', 
        maxWidth: 'calc(50vw - 416px - 2rem)' 
      }}
    >
      <div className="mb-4 flex items-center justify-between text-ctp-surface-2 select-none uppercase tracking-widest text-xs">
        <span># Scratchpad</span>
        <button 
          onClick={() => handleToggle(false)}
          className="hover:text-ctp-red transition-colors"
          aria-label="Close scratchpad"
          title="Hide scratchpad"
        >
          [x]
        </button>
      </div>
      <textarea 
        className="w-full flex-grow bg-transparent resize-none outline-none text-ctp-text placeholder-ctp-surface-1 no-scrollbar overscroll-contain"
        placeholder="> _"
        spellCheck={false}
        value={text}
        onChange={handleTextChange}
      ></textarea>
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
    </aside>
  );
}