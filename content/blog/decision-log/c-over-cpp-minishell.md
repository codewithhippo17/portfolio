---
title: "C over C++ for Minishell"
date: "2023-07-10"
tags: [decision, c, shell]
description: "Why I chose pure C for parsing and executing a POSIX shell."
---

## Context
When starting **Minishell**, I had the option to use C++. The Standard Template Library (STL) string manipulation functions would have saved weeks of effort writing a custom lexer.

## Decision
I actively chose to stick to C99 and build everything from scratch.

## Rationale
1. **Understanding the OS**: A shell is the bridge between the user and the operating system. C maps directly to system calls (`fork`, `execve`, `pipe`). 
2. **Memory Discipline**: Writing a recursive-descent parser in C forces you to manage every single node of the Abstract Syntax Tree manually.
3. **No Magic**: I wanted to know exactly how a command string was tokenized without relying on `std::string::find`.

## Consequences
The lexer took twice as long to write, but I emerged with an airtight understanding of ASTs and POSIX system architecture.
