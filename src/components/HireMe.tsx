"use client";

import { useState } from "react";

// Get your free Formspree endpoint at https://formspree.io
// Then set NEXT_PUBLIC_FORMSPREE_ID in your env, or paste the ID directly here
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

interface HireMeProps {
  onClose: () => void;
}

export default function HireMe({ onClose }: HireMeProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    hook: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (res.ok) {
        setFormStatus("sent");
        setFormData({ name: "", email: "", company: "", role: "", hook: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const handleClear = () => {
    setFormData({ name: "", email: "", company: "", role: "", hook: "", message: "" });
    setFormStatus("idle");
  };

  const handleCloseAndClear = () => {
    handleClear();
    onClose();
  };

  // ── Shared header buttons ──
  function HeaderButtons() {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="text-ctp-yellow font-bold cursor-pointer transition-colors hover:opacity-80"
          aria-label="Hide hire me panel"
        >
          [-]
        </button>
        <button
          onClick={handleCloseAndClear}
          className="text-ctp-red font-bold cursor-pointer transition-colors hover:opacity-80"
          aria-label="Close and clear form"
        >
          [x]
        </button>
      </div>
    );
  }

  // ═══════════════════════════
  //  SENT CONFIRMATION
  // ═══════════════════════════
  if (formStatus === "sent") {
    return (
      <>
        <div className="mb-4 flex items-center justify-between text-ctp-surface2 select-none uppercase tracking-widest text-xs">
          <span className="text-ctp-mauve font-bold"># hire me</span>
          <HeaderButtons />
        </div>
        <div className="flex flex-col justify-center flex-grow">
          <p className="text-ctp-green">✓ form submitted.</p>
          <p className="text-ctp-surface2 mt-1 text-xs">
            i&apos;ll review it and get back to you.
          </p>
          <button
            onClick={() => setFormStatus("idle")}
            className="text-left text-ctp-subtext0 hover:text-ctp-mauve transition-colors mt-4 text-xs uppercase tracking-widest cursor-pointer"
          >
            [submit another]
          </button>
        </div>
      </>
    );
  }

  // ═══════════════════════════
  //  FORM
  // ═══════════════════════════
  return (
    <>
      <div className="mb-4 flex items-center justify-between text-ctp-surface2 select-none uppercase tracking-widest text-xs">
          <span className="text-ctp-mauve font-bold"># hire me</span>
          <HeaderButtons />
        </div>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col flex-grow min-h-0"
      >
        {/* Scrollable fields */}
        <div className="flex-grow overflow-y-auto no-scrollbar overscroll-contain space-y-3">
          <FieldRow
            label="name"
            value={formData.name}
            onChange={(v) => handleFormChange("name", v)}
            placeholder="required"
          />
          <FieldRow
            label="email"
            value={formData.email}
            onChange={(v) => handleFormChange("email", v)}
            placeholder="required"
            type="email"
          />
          <FieldRow
            label="company"
            value={formData.company}
            onChange={(v) => handleFormChange("company", v)}
            placeholder="optional"
          />
          <FieldRow
            label="role"
            value={formData.role}
            onChange={(v) => handleFormChange("role", v)}
            placeholder="full-time / contract / other"
          />
          <FieldRow
            label="hook"
            value={formData.hook}
            onChange={(v) => handleFormChange("hook", v)}
            placeholder="what caught your eye?"
          />

          {/* Message — multi-line */}
          <div className="pt-1">
            <span className="text-ctp-subtext0 font-bold select-none text-xs">
              message
            </span>
            <textarea
              value={formData.message}
              onChange={(e) => handleFormChange("message", e.target.value)}
              className="w-full bg-transparent outline-none text-ctp-text font-mono text-sm resize-none no-scrollbar overscroll-contain mt-1"
              placeholder="your pitch. make it count."
              rows={3}
              spellCheck={false}
            />
          </div>
        </div>

        {/* Submit row */}
        <div className="mt-3 flex items-center justify-between">
          {formStatus === "error" && (
            <span className="text-ctp-red text-xs">✗ failed. try again.</span>
          )}
          <div className="flex-1" />
          <button
            type="submit"
            disabled={formStatus === "sending" || !formData.name || !formData.email}
              className={`text-xs uppercase tracking-widest select-none transition-colors font-bold ${
              formStatus === "sending"
                ? "text-ctp-surface1 animate-pulse"
                : !formData.name || !formData.email
                  ? "text-ctp-surface1 cursor-not-allowed"
                  : "text-ctp-text hover:text-ctp-green cursor-pointer dark:text-ctp-subtext1 dark:hover:text-ctp-green"
            }`}
          >
            {formStatus === "sending" ? "$ sending..." : "[Submit]"}
          </button>
        </div>
      </form>
    </>
  );
}

// ─────────────────────────────────────
//  Field row helper
// ─────────────────────────────────────
function FieldRow({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-ctp-subtext0 font-bold shrink-0 select-none text-xs">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none text-ctp-text font-mono text-sm border-b border-transparent focus:border-ctp-mauve caret-ctp-mauve transition-colors pb-0.5 placeholder:text-ctp-surface1"
        placeholder={placeholder}
      />
    </div>
  );
}
