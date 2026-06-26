---
title: "Inversion"
date: "2023-12-10"
tags: [mental-model, problem-solving]
description: "Solving problems by figuring out how to guarantee failure."
---

## The Concept
Coined by mathematician Carl Jacobi ("Invert, always invert"), this model suggests looking at a problem backward. Instead of asking "How do I achieve success?", ask "How do I guarantee failure?" and then avoid those things.

## In Practice
When designing the architecture for **Industrial Copilot**, ensuring zero downtime was critical. 
Instead of asking "How do I make this server perfect?", I asked "How can I easily bring this server down?"

1. *Unbounded memory usage.* (Solution: Implement strict memory limits on the Node process).
2. *A blocking infinite loop in the LLM query.* (Solution: Implement strict timeouts and WebSockets).
3. *A single point of failure in the database.* (Solution: Use connection pooling and automatic retries).

By protecting against the worst-case scenarios, stability became a natural byproduct.
