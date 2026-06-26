---
title: "Principle: If It Leaks, It's Broken"
date: "2023-01-01"
tags: [principles, c, c++]
description: "A core engineering belief instilled by 42 School."
---

## The Principle
**If your program works perfectly but leaks memory, it does not work.**

## The Background
At 42, the automated testing framework (Norminette/Moulinette) enforces strict memory management. A single leaked byte results in a failing grade, regardless of how well the algorithm performs.

## Application
I apply this principle rigorously in all systems programming:
- Every `malloc` must have a clearly defined owner responsible for its `free`.
- In C++, I default to RAII (Resource Acquisition Is Initialization) and smart pointers.
- Error handling paths are the most common source of leaks; I design teardown functions specifically to handle graceful degradation.
