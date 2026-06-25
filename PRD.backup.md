---
title: "Portfolio Website"
status: idea
priority: 2
due:
created: 2026-06-25
updated: 2026-06-25
tags:
  - project
---

Tags: [[3- Tags/PRD]]

# 🧑‍💻 Portfolio Website — elhaiba-hamza.tech

> [!quote] TL;DR
> Personal portfolio website at elhaiba-hamza.tech with a Catppuccin Macchiato theme, built with Next.js + Tailwind CSS, content-driven by markdown files, deployed free on GitHub Pages. Combines standard sections (Projects, Blog, Skills, Contact) with standout sections that demonstrate engineering judgment and personality.

## 🎯 Problem Statement

Traditional developer portfolios show *what* you built but not *how you think*. Recruiters, founders, and peers need to see engineering judgment, decision-making, and intellectual honesty — not just a list of projects.

This portfolio solves that by combining standard portfolio sections with personality-driven standout sections (Failure Log, Mental Models, Engineering Principles, Tools You Built, Anti-Portfolio, Decision Log) that demonstrate how you approach problems, what you've learned from failures, and what you believe about software engineering.

**Target Users:** Tech recruiters/hiring managers, startup founders/CTOs, and developer peers. All three audiences need a different depth — recruiters scan, peers dig deep, founders evaluate judgment.

## 📈 Success Metrics

- **Primary:** Site is live and accessible at elhaiba-hamza.tech
- **Secondary:** Adding a new project or blog post takes less than 5 minutes (just write markdown, push to GitHub)
- **Guardrails:** Lighthouse scores ≥ 95 across all categories; load time under 2s on 3G; zero runtime errors

## 📦 Scope

**In scope:**
- [x] Next.js static site with Tailwind CSS
- [x] Catppuccin Macchiato theme (dark mode only)
- [x] Content managed via markdown files in `/content/` directory
- [x] Sections: Projects (categorized by type), Blog, Skills, Contact
- [x] Standout sections: Failure Log, Mental Models, Engineering Principles, Tools You Built, Anti-Portfolio, Decision Log
- [x] Project categorization (Web Apps, AI/ML, Tools, Open Source, etc.)
- [x] Blog seeded with 2-3 posts
- [x] GitHub Pages deployment via GitHub Actions (static export)
- [x] Custom domain: elhaiba-hamza.tech with auto HTTPS
- [x] Mobile-responsive design
- [x] Catppuccin Tailwind plugin for first-class color support

**Out of scope (explicitly):**
- [ ] Backend / API routes (static export only — no SSR)
- [ ] Database (all content comes from markdown files)
- [ ] CMS or admin dashboard (markdown-only workflow)
- [ ] Dark/light mode toggle (Macchiato dark mode is the single theme)
- [ ] User comments on blog posts
- [ ] Analytics / tracking (can add later)
- [ ] Newsletter or email capture

## ✅ Requirements

- [ ] Next.js project with `output: 'export'` for fully static hosting
- [ ] Tailwind CSS configured with the Catppuccin Macchiato color palette (base, mantle, crust, surface, overlay, text, subtext, and accent colors: mauve, blue, lavender, green, peach, red)
- [ ] Markdown content pipeline using gray-matter (frontmatter) + remark (markdown rendering)
- [ ] `/content/` directory structure with organized subdirectories per section
- [ ] Page layouts: Home, Projects (category overview), Project detail, Blog index, Blog post, Skills, Contact, each standout section page
- [ ] Project categorization with category landing pages and tag-based metadata
- [ ] Mobile-first responsive design
- [ ] GitHub Actions workflow: on push to main → build with `next build` → deploy to `gh-pages` branch
- [ ] Custom CNAME record and GitHub Pages domain config for elhaiba-hamza.tech
- [ ] Content authoring README documenting the markdown format for each section

## 🔨 Tasks

- [ ] Scaffold Next.js project with TypeScript and Tailwind CSS
- [ ] Install and configure Catppuccin Tailwind plugin (@catppuccin/tailwindcss)
- [ ] Set up `/content/` directory structure with example markdown files
- [ ] Implement markdown content pipeline (gray-matter + remark)
- [ ] Build layout shell: header navigation, footer, responsive container
- [ ] Build Home page with summary, featured projects, latest blog posts
- [ ] Build Projects section with category overview and project detail pages
- [ ] Build Blog section with index and post detail pages
- [ ] Build Skills page
- [ ] Build Contact page
- [ ] Build standout pages: Failure Log, Mental Models, Engineering Principles, Tools Built, Anti-Portfolio, Decision Log
- [ ] Configure GitHub Actions for static export + GitHub Pages deploy
- [ ] Configure custom domain (CNAME, DNS settings)
- [ ] Write initial content: 2-3 blog posts, populate project placeholders
- [ ] Create content authoring README
- [ ] Browser validation across mobile and desktop
- [ ] Lighthouse audit and performance optimization

## ⚙️ Technical Considerations

**Stack:** Next.js 14+ (static export) + TypeScript + Tailwind CSS + Catppuccin theme.

**Content Pipeline:** gray-matter to parse YAML frontmatter from .md files. remark + remark-html to render markdown body content. No MDX needed — all content is plain markdown.

**Deployment:** Next.js `output: 'export'` produces a fully static `out/` directory. GitHub Actions runs `next build` on push to main, then deploys the `out/` directory to the `gh-pages` branch. GitHub Pages serves from `gh-pages` with the custom domain.

**Catppuccin Palette (Macchiato):**
- Base colors: `base: #24273a`, `mantle: #1e2030`, `crust: #181926`, `surface0: #363a4f`, `surface1: #494d64`, `surface2: #5b6078`
- Text colors: `text: #cad3f5`, `subtext1: #b8c0e0`, `subtext0: #a5adcb`
- Accent colors: `mauve: #c6a0f6`, `blue: #8aadf4`, `lavender: #b7bdf8`, `green: #a6da95`, `peach: #f5a97f`, `red: #ed8796`, `yellow: #eed49f`, `teal: #8bd5ca`

**Content Structure:**
```
/content/
  projects/
    web-apps/
      project-name.md
    ai-ml/
      project-name.md
    tools/
      project-name.md
  blog/
    post-slug.md
  skills/
    skills.md
  failure-log/
    entry-slug.md
  mental-models/
    model-name.md
  engineering-principles/
    principles.md
  tools-built/
    tool-name.md
  anti-portfolio/
    entry-slug.md
  decision-log/
    entry-slug.md
  contact/
    contact.md
```

**Project Markdown Format:**
```yaml
---
title: "Project Name"
category: "web-apps"  # or ai-ml, tools, open-source, etc.
date: 2026-01-01
tags: [React, Node.js, PostgreSQL]
role: "Full-stack Developer"
github: https://github.com/username/repo
live: https://project-url.com
status: completed  # or ongoing, archived
featured: true
---
Project description, architecture decisions, outcomes, and learnings.
```

**Key Architecture Decisions:**
- No runtime dependencies on any CMS or database — pure markdown → HTML pipeline
- Static export avoids any server costs while keeping fast load times
- GitHub Actions provides free CI/CD with zero maintenance
- Catppuccin gives us a proven, beautiful design system without inventing our own colors

## ❓ Open Questions

| Question | Owner | Status |
|----------|-------|--------|
| Should categories be tags or separate pages? (Decision: separate category pages with tag filtering) | — | Resolved |
| How many projects initially? Will populate as we build and content is prepared | — | Open |
| Favicon/logo design — use Catppuccin icon or custom? | — | Open |
| Should mental models include Excalidraw diagrams? The vault has Excalidraw support | — | Open |
| Blog posts — source from existing vault notes or write fresh? | — | Open |

---

## 📝 Changelog

| Date | Change |
|------|--------|
| 2026-06-25 | Initial draft — scoped from Portfolio Blueprint vault note + user preferences |
