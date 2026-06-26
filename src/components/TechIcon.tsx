// Maps tech names to Iconify icons automatically.
// Add new entries here when you use a new tech — icons load by name.
// Icon sets installed: logos, simple-icons, devicon

import { Icon } from "@iconify/react";

const iconMap: Record<string, string> = {
  typescript: "logos:typescript-icon",
  javascript: "logos:javascript",
  react: "logos:react",
  nextjs: "logos:nextjs-icon",
  python: "logos:python",
  go: "logos:go",
  golang: "logos:go",
  rust: "logos:rust",
  "machine-learning": "logos:tensorflow",
  llm: "carbon:machine-learning-model",
  rag: "carbon:search",
  cli: "carbon:terminal",
  markdown: "logos:markdown",
  authentication: "carbon:security",
  ai: "logos:openai",
  "open-source": "octicon:repo-16",
};

export default function TechIcon({
  name,
  size = 16,
}: {
  name: string;
  size?: number;
}) {
  const key = name.toLowerCase().trim();
  const icon = iconMap[key];

  if (!icon) {
    // Fallback: show a generic code icon for unknown tech
    return (
      <Icon
        icon="carbon:code"
        width={size}
        height={size}
        className="inline-block align-middle text-ctp-overlay-1"
      />
    );
  }

  return (
    <Icon
      icon={icon}
      width={size}
      height={size}
      className="inline-block align-middle"
    />
  );
}
