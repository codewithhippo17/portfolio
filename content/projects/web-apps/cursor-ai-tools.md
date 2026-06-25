---
title: "Cursor AI Tools"
category: "Web Apps"
date: "2026-03-15"
tags: [react, nextjs, ai, typescript]
role: "Lead Engineer"
github: "https://github.com/elhaibahamza/cursor-ai-tools"
live: "https://cursor-ai-tools.vercel.app"
status: "completed"
featured: true
description: "A suite of AI-powered developer tools built into the editor experience."
---

## Overview

Built a collection of AI-powered utilities that integrate directly into the Cursor editor, helping developers write better code faster. The tools range from intelligent code review agents to automated refactoring pipelines.

## Key Features

- **Smart Review Agent** — Auto-reviews PRs against team conventions and best practices
- **Refactor Pipeline** — One-click refactoring with diff preview and rollback support
- **Context Engine** — Automatically pulls in relevant code context based on what you're working on

## Architecture

The system uses a plugin architecture where each tool registers itself with a central dispatcher. Tools communicate via events, making the system extensible — anyone can write a new tool without touching existing ones.

## Tech Stack

- **Frontend**: React, Next.js, TypeScript
- **AI**: OpenAI API, custom fine-tuned models
- **Infrastructure**: Vercel Edge Functions, PostgreSQL, Redis

## Lessons

The biggest lesson was that ==developer tools need to be fast== — if a suggestion takes more than 200ms, developers ignore it. We optimized aggressively for latency, caching context aggressively and streaming responses.
