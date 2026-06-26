---
title: "Decision Log: Local Ollama vs OpenAI API"
date: "2024-02-15"
tags: [architecture, ai, decision]
description: "Why Industrial Copilot uses local models instead of cloud APIs."
---

## Context
While building Industrial Copilot (OCP), I needed to choose an AI backend for the chat capabilities. The obvious choice was OpenAI's API.

## Decision
I opted to use **Ollama** running local models (like Llama 3) instead of OpenAI.

## Rationale
1. **Data Privacy**: Energy data and system logs are highly sensitive. Sending them to a third-party cloud API is a security risk for industrial platforms.
2. **Latency & Reliability**: Relying on an external API means depending on internet connectivity. A local model guarantees uptime even if the external network goes down.
3. **Cost**: Running local inference is practically free after hardware costs, whereas API usage scales linearly with prompts.

## Consequences
We had to invest more in the initial hardware setup to support local GPU inference, but the long-term privacy and cost benefits outweighed the upfront investment.
