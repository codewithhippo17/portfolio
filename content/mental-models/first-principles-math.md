---
title: "Mental Model: First Principles in Rendering"
date: "2023-04-10"
tags: [mental-model, math, graphics]
description: "Deconstructing modern game engines down to raw trigonometry."
---

## The Concept
First Principles thinking involves boiling a complex subject down to its most fundamental truths and building back up from there.

## In Practice
When assigned the **Cube3D** project, I couldn't use Unity or OpenGL. I had to render a 3D world using only a pixel drawing function. 

Instead of searching for "how to make a 3D game," I broke it down:
1. What is a 3D projection? It's sending a ray from the player's eye.
2. How do I calculate where the ray hits a wall? Trigonometry (Sine, Cosine) and Digital Differential Analysis (DDA).
3. How do I draw a vertical line that represents the distance? Division and simple pixel loops.

By ignoring high-level abstractions, I learned the underlying math that powers every modern rendering engine.
