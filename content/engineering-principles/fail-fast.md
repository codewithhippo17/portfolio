---
title: "Principle: Fail Fast and Loudly"
date: "2023-05-15"
tags: [principles, debugging, c]
description: "Why silent errors are the enemy of stable software."
---

## The Principle
**A program should crash immediately upon encountering an invalid state rather than limping along.**

## The Background
While building my **IRC Server** in C++, I initially tried to catch and silently ignore malformed packets to keep the server "running." This resulted in bizarre, impossible-to-reproduce memory corruption hours later.

## Application
Now, I aggressively validate inputs and invariants. If a pointer should never be null, I `assert()` it. If a configuration file is missing, the application refuses to start. Failing fast localizes the error to the exact line of code where the logic broke, rather than a seemingly unrelated function a million CPU cycles later.
