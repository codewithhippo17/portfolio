---
title: "RAG Tutor"
category: "AI/ML"
date: "2026-01-20"
tags: [python, go, rag, machine-learning]
role: "ML Engineer"
github: "https://github.com/elhaibahamza/rag-tutor"
status: "ongoing"
featured: true
description: "An interactive learning platform powered by RAG that teaches complex topics through conversation."
---

## Overview

RAG Tutor is an educational platform that uses Retrieval-Augmented Generation to teach complex technical topics through natural conversation. Instead of static documentation, students can ask questions and get answers grounded in curated learning materials.

## How It Works

1. **Ingest** — Course materials are chunked and embedded into a vector database
2. **Retrieve** — When a student asks a question, relevant chunks are retrieved
3. **Generate** — The LLM synthesizes an answer from the retrieved context
4. **Adapt** — The system tracks what the student understands and adjusts difficulty

## Key Challenges

### Chunking Strategy

#### Why Semantic Chunking Won

After testing fixed-window, paragraph, and semantic approaches, semantic chunking consistently outperformed on our eval set.

##### Retrieval Recall by Strategy

Semantic chunking achieved 94% recall vs 78% for fixed-window and 85% for paragraph-based.

Finding the right chunk size was trial and error. Too small and context gets lost. Too large and retrieval becomes noisy. We settled on **semantic chunking** — splitting on natural boundaries (sections, paragraphs) rather than fixed token counts.

### Evaluation

We built a comprehensive eval suite that tests the tutor against ==known question-answer pairs== before every deployment. This caught regressions early and gave us confidence to iterate quickly.

## Stack

- **Backend**: Python, FastAPI, LangChain
- **Vector Store**: Pinecone
- **LLM**: GPT-4o, Claude 3.5 Sonnet
- **Frontend**: Next.js, Tailwind CSS
