---
title: "Electron for Desktop Apps"
date: "2024-03-01"
tags: [anti-portfolio, desktop, performance]
description: "Why I avoid shipping full Chrome instances for basic utilities."
---

## The Avoidance
I avoid using Electron to build lightweight desktop applications.

## The Why
Electron bundles an entire Chromium rendering engine and Node.js runtime into every application. While it allows web developers to build desktop apps quickly, the resulting binaries often consume 500MB+ of RAM just to display a simple window. 

After spending months squeezing performance out of raw C in projects like **Cube3D**, I have a deep appreciation for system resources. If I need to build a native tool, I prefer leaning into languages like Rust, Go, or even C++ rather than forcing a web browser to pretend it's a native application.
