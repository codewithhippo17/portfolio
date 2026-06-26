---
title: "Anti-Portfolio: Heavy Abstractions"
date: "2024-01-01"
tags: [anti-portfolio, philosophy]
description: "Why I prefer raw control over magic frameworks."
---

## The Avoidance
I actively avoid massive, "black-box" abstractions when learning a new concept.

## The Why
While building the **IRC Server**, I could have used a modern networking library that handles socket multiplexing automatically. Instead, I wrote the raw `poll()` and `select()` loops in C++98.

Frameworks like Express or Spring Boot are amazing for shipping products quickly, but they obscure the underlying protocols. By avoiding these abstractions during my foundational learning, I gained an intimate understanding of HTTP, TCP/IP, and process blocking. I now use frameworks because they save time, not because I don't know how to build without them.
