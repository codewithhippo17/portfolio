---
title: "Philosophers"
category: "Systems"
date: "2023-03-01"
tags: [c, multithreading, mutexes, concurrency]
role: "Developer"
github: "https://github.com/codewithhippo17/philosophers"
status: "completed"
featured: false
description: "A solution to the classic dining philosophers problem using threads and mutexes."
---

## Overview

This project is a dive into the basics of threading a process. It tackles the classic "Dining Philosophers Problem" to learn about concurrent programming, deadlocks, data races, and mutexes.

## Implementation Details

- Each philosopher is a thread.
- Forks are protected by mutexes to prevent data races.
- A highly optimized monitoring system to ensure precise timing for dying, eating, and sleeping.
- Strict resource management to prevent memory leaks and deadlocks.
