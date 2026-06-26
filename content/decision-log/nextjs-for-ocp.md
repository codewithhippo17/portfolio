---
title: "Next.js for Industrial Copilot"
date: "2024-02-10"
tags: [decision, nextjs, architecture]
description: "Choosing the App Router for an AI interface."
---

## Context
For **Industrial Copilot**, I needed a framework capable of handling streaming AI responses, complex state management, and strict access controls.

## Decision
I selected **Next.js (App Router)** over a traditional React SPA + Express backend.

## Rationale
1. **Server Actions**: Moving database interactions and API calls to Server Actions removed the need for a separate REST API layer.
2. **Streaming AI**: Vercel's AI SDK integrates seamlessly with Next.js, making it incredibly easy to stream tokens from local Ollama instances directly to the UI.
3. **Edge Readiness**: While currently deployed heavily on local hardware, Next.js allows future migration of specific microservices to Edge functions if required.

## Consequences
The learning curve for React Server Components (RSC) was steep, but the resulting reduction in client-side JavaScript payload made the application incredibly fast on low-power industrial tablets.
