---
title: "Building Industrial Copilot"
date: "2024-02-28"
tags: [ai, nextjs, architecture]
description: "Merging legacy energy systems with modern LLMs."
---

## The Challenge

Industrial environments are incredibly resistant to change. The machinery and PLCs (Programmable Logic Controllers) powering energy grids often run on software written decades ago. The challenge with the **Optimization & Control Platform (OCP)** was to bridge the gap between these legacy systems and modern generative AI.

## The Approach

We needed a frontend that could speak both "industrial" and "AI". We chose Next.js.
By utilizing Ollama, we were able to deploy local Llama models directly on the client's hardware. This satisfied their strict data privacy requirements—no sensitive energy consumption metrics were ever sent to OpenAI or Anthropic.

## The Result

The result is a chat interface where a facility manager can ask, "Why did energy consumption spike in Sector 4 yesterday at 2 PM?" The local LLM queries the SQL database via a tool-calling framework, analyzes the time-series data, and returns a human-readable explanation along with a generated Plotly chart.

It's not just a wrapper around ChatGPT; it's a deeply integrated industrial tool.
