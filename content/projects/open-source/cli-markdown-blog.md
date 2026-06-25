---
title: "CLI Markdown Blog"
category: "Open Source"
date: "2025-06-01"
tags: [typescript, cli, markdown, open-source]
role: "Creator"
github: "https://github.com/elhaibahamza/cli-markdown-blog"
status: "completed"
featured: true
description: "A CLI tool that converts markdown files into a fully static blog, deployable anywhere."
---

## Overview

A zero-config CLI that takes a folder of markdown files and generates a static blog. No database, no CMS, no build complexity — just write markdown and ship.

## Philosophy

Blogging should be about writing, not infrastructure. This tool is opinionated: it makes ==opinionated defaults so you can focus on content==.

## Features

- File-system routing (mirrors your folder structure)
- Frontmatter-based metadata
- RSS feed generation
- Syntax highlighting
- Deploy to any static host (Vercel, Netlify, GitHub Pages)
- Custom themes via CSS variables

## Usage

```bash
npx cli-markdown-blog init
npx cli-markdown-blog build
npx cli-markdown-blog deploy
```

## Community

The project has 2.3k GitHub stars and contributors from around the world. The most impactful contribution was adding i18n support, which opened the tool to non-English writers.
