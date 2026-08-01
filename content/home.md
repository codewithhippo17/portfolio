---
title: "Hamza El Haiba"
description: "Architect in Digital Technologies"
---

## Architecture is a Conversation, Not a Monument

The **most expensive mistake** in software isn't bad code. It's building a monument to **assumptions that haven't been tested yet**. We build rigid, tightly coupled monuments to our own cleverness, only to watch them fracture when the business actually succeeds.

![[hamza-photo.jpg|left]]

**I'm Hamza El Haiba, an Architect in Digital Technologies.**
*I specialize in systems that have outgrown their assumptions.*

I don't draw perfect, static blueprints. I draw **boundaries** — strict ones — and I relax them only when the **cost of isolation exceeds the cost of coupling**. Architecture isn't about predicting the future. It's about making the future **cheap to build**.

When you localize state and enforce **strict boundaries**, testing stops being a separate project and starts being a **natural consequence** of the structure. The system absorbs changing requirements with grace. But more importantly, the **human friction disappears**.

**Recently:** I untangled a logistics platform where **12 teams** shared **one database schema** and **zero ownership boundaries**. Six months later, they **deploy independently**, and a schema change in one service no longer pages three teams at 2 AM.

The result isn't just a resilient codebase. **It's a fearless team, finally free from the paralysis of cascading failures.**

---

## What you'll find here

- **[Projects](/portfolio/projects)** — Systems I've built, untangled, or killed. With the *real* constraints.
- **[Blog](/portfolio/blog)** — Deep dives and postmortems.
- **[Failure Log](/portfolio/failure-log)** — Mistakes that cost me sleep, and what they *taught me*.
- **[Mental Models](/portfolio/mental-models)** — The lenses I see systems through.
- **[Engineering Principles](/portfolio/engineering-principles)** — The rules I refuse to break.
- **[Anti Portfolio](/portfolio/anti-portfolio)** — Tech I walked away from, and why.
- **[Decision Log](/portfolio/decision-log)** — Big calls, with the trade-offs on record.

---

## Featured

Four builds that shaped how I think about systems — and the stories behind them.

- **[Industrial Copilot (OCP)](/portfolio/projects/industrial-copilot)** — An AI energy platform where a facility manager can ask *"Why did energy consumption spike in Sector 4 yesterday at 2 PM?"* — and a local LLM answers it, on hardware that never leaves the building. *(The build story: [Merging legacy energy with modern LLMs](/portfolio/blog/building-industrial-copilot))*

- **[Minishell](/portfolio/projects/minishell)** — A bash-like shell in C: lexer, AST, pipelines, heredocs, signals. It also taught me that **file descriptors are like memory** — the one `close()` I forgot froze an entire pipeline. *(The postmortem: [The Minishell Pipe Deadlock](/portfolio/failure-log/minishell-ast-deadlock))*

- **[IRC Server](/portfolio/projects/irc)** — A C++98 server that real clients connect to. Silently swallowing malformed packets bought me memory corruption hours later — and a principle: [fail fast and loudly](/portfolio/engineering-principles/fail-fast).

- **[Inception](/portfolio/projects/inception)** — A Docker infrastructure built from scratch: no pre-built images, one TLS entry point, MariaDB isolated from the network. Boring technology, on purpose. *(The principle: [Boring Technology is Good](/portfolio/engineering-principles/boring-tech))*
