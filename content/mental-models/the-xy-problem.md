---
title: "The XY Problem"
date: "2023-11-05"
tags: [mental-model, debugging, communication]
description: "Focusing on the root goal rather than the attempted solution."
---

## The Concept
The XY Problem occurs when a person wants to solve problem *X*, thinks *Y* is the way to do it, gets stuck on *Y*, and asks for help with *Y* instead of *X*.

## In Practice
When I was struggling with parsing quotes in **Minishell**, I spent three days trying to write a complex regex engine in C (Problem Y). I was asking peers how to implement lookaheads in C.

Finally, someone asked: "Why do you need regex?" I explained I needed to separate strings by quotes (Problem X). They pointed out that a simple state machine (toggling a `in_quotes` boolean as I iterate through the string) solves Problem X perfectly in 20 lines of code.

By recognizing when I am asking about *Y*, I save myself from building unnecessary complexity.
